import client from '../lib/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
   handeGetPaginationParams,
   handleGetExcelItems,
   handleRemoveExcelItemById,
   handleUpdateExcelItems,
   handleUploadExcel,
} from '../services/upload-service'

function respondWithError(
   errorMessage: string,
   statusCode: number
): NextResponse {
   return NextResponse.json({ error: errorMessage }, { status: statusCode })
}

function isValidExcelFile(fileExtension: string): boolean {
   return fileExtension === 'xls' || fileExtension === 'xlsx'
}

export async function POST(request: NextRequest): Promise<NextResponse> {
   try {
      const formData = await request.formData()
      const fileEntry = formData.get('file')

      if (!fileEntry) {
         return respondWithError('file not found or invalid', 404)
      }

      const file = fileEntry as File
      const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? ''

      if (!isValidExcelFile(fileExtension)) {
         return respondWithError('Only excel files (.xls or.xlsx)', 500)
      }
      await handleUploadExcel(file)
      return NextResponse.json({ message: 'Upload completo' }, { status: 201 })
   } catch (error) {
      return respondWithError('Error during file upload', 500)
   }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
   try {
      const { id, description, quantity, price, ...rest } =
         (await request.json()) as Excel

      if (Object.keys(rest).length > 0) {
         return respondWithError('Invalid fields provided', 400)
      }

      const itemExists = await client.excel_items.findUnique({
         where: { id: id },
      })

      if (!itemExists) {
         return respondWithError('ID not found', 404)
      }

      const updatedItem = await handleUpdateExcelItems(Number(id), {
         description,
         quantity,
         price,
      })
      return NextResponse.json(
         {
            message: 'Item atualizado com sucesso',
            item: updatedItem,
         },
         { status: 200 }
      )
   } catch (error) {
      return respondWithError('Error updating item', 500)
   }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
   try {
      const url = new URL(request.url)
      const { page, limit } = handeGetPaginationParams(url)
      const { items, totalItems } = await handleGetExcelItems({ page, limit })
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
