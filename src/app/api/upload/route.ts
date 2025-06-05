import { NextRequest, NextResponse } from 'next/server'
import {
   handeGetPaginationParams,
   handleDeleteItem,
   handleGetExcelItems,
   handleUploadExcel,
} from '../services/excel/excel.service'
import { prismaExcelRepository } from '../repository/excel-repository'
import { updateExcelItemService } from '../services/excel/excel.service'
import { withErrorHandler } from '../middlewares/error-handler'
import { modalSchema } from '@/validators/modal-schema'
import { validateRequest } from '../middlewares/validate-request'
import { uploadExcelSchema } from '@/validators/upload-schema'

export const POST = withErrorHandler(
   async (request: NextRequest): Promise<NextResponse> => {
      const formData = await request.formData()
      const fileEntry = formData.get('file')

      const validation = validateRequest(uploadExcelSchema, { file: fileEntry })
      if (!validation.valid) return validation.response

      const file = validation.data.file
      await handleUploadExcel(file, prismaExcelRepository)
      return NextResponse.json({ message: 'Upload completo' }, { status: 201 })
   }
)

export const PATCH = withErrorHandler(
   async (request: NextRequest): Promise<NextResponse> => {
      const data = await request.json()
      const validation = validateRequest(modalSchema, data)
      if (!validation.valid) return validation.response

      const result = await updateExcelItemService(prismaExcelRepository, data)
      if (result.error) {
         throw new Error(result.error)
      }

      return NextResponse.json(
         {
            message: 'Item atualizado com sucesso',
            item: result.item,
         },
         { status: 201 }
      )
   }
)

export const GET = withErrorHandler(
   async (request: NextRequest): Promise<NextResponse> => {
      const url = new URL(request.url)
      const { page, limit } = handeGetPaginationParams(url)
      const filter = url.searchParams.get('filter') || ''
      const { items, totalItems } = await handleGetExcelItems({
         page,
         limit,
         filter,
      })
      return NextResponse.json(
         {
            message: 'Success !',
            items,
            pagination: {
               totalItems,
               page,
               limit,
               totalPages: Math.ceil(totalItems / limit),
            },
         },
         { status: 200 }
      )
   }
)

export const DELETE = withErrorHandler(
   async (request: NextRequest): Promise<NextResponse> => {
      const { id } = await request.json()
      const result = await handleDeleteItem(prismaExcelRepository, Number(id))

      if (result.error) {
         throw new Error(result.error)
      }

      return NextResponse.json(
         { message: 'Item removed successfully', id: result.id },
         { status: 200 }
      )
   }
)
