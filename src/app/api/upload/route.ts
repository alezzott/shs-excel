import { NextRequest, NextResponse } from 'next/server'
import {
   handeGetPaginationParams,
   handleGetExcelItems,
   handleRemoveExcelItemById,
   handleUploadExcel,
} from '../services/excel/excel.service'
import { prismaExcelRepository } from '../repository/excel-repository'
import { updateExcelItemService } from '../services/excel/excel.service'
import { withErrorHandler } from '../middlewares/error-handler'
import { modalSchema } from '@/validators/modal-schema'
import { validateRequest } from '../middlewares/validate-request'
import { uploadExcelSchema } from '@/validators/upload-schema'

function respondWithError(
   errorMessage: string,
   statusCode: number
): NextResponse {
   return NextResponse.json({ error: errorMessage }, { status: statusCode })
}

export const POST = withErrorHandler(
   async (request: NextRequest): Promise<NextResponse> => {
      const formData = await request.formData()
      const fileEntry = formData.get('file')

      const validation = uploadExcelSchema.safeParse({ file: fileEntry })
      if (!validation.success) {
         return respondWithError(validation.error.errors[0].message, 400)
      }

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
         return NextResponse.json(
            { error: result.error },
            { status: result.status }
         )
      }

      return NextResponse.json(
         {
            message: 'Item atualizado com sucesso',
            item: result.item,
         },
         { status: 200 }
      )
   }
)

export async function GET(request: NextRequest): Promise<NextResponse> {
   try {
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
   } catch (error) {
      return respondWithError('Error get excel items', 500)
   }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
   try {
      const { id } = await request.json()

      if (!id) {
         return respondWithError('ID required', 400)
      }

      const deletedItem = await handleRemoveExcelItemById(Number(id))

      if (!deletedItem) {
         return respondWithError('ID not found', 404)
      }

      return NextResponse.json(
         { message: 'Item removed successfully', id: deletedItem.id },
         { status: 200 }
      )
   } catch (error) {
      return respondWithError('Error while removing excel item', 500)
   }
}
