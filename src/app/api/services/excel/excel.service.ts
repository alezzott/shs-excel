import { ModalPatchInput } from '@/validators/modal-schema'
import { ExcelRepository } from '../../repository/excel-repository'
import client from '../../lib/prisma/client'
import { processExcelData } from '../../utils/ProcessExcelData'
import { Prisma } from '@prisma/client'
import { formatItemsDate } from '../../utils/format-data'

export async function updateExcelItemService(
   repo: ExcelRepository,
   data: ModalPatchInput
) {
   const { id, description, quantity, price, ...rest } = data

   if (!id) {
      return { error: 'ID required', status: 400 }
   }

   if (Object.keys(rest).length > 0) {
      return { error: 'Invalid fields provided', status: 400 }
   }

   const itemExists = await repo.findById(Number(id))
   if (!itemExists) {
      return { error: 'ID not found', status: 404 }
   }

   const updatedItem = await handleUpdateExcelItems(Number(id), {
      description,
      quantity,
      price,
   })
   return { item: updatedItem }
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export async function handleUploadExcel(file: File) {
   const buffer = await file.arrayBuffer()
   const fileBuffer = Buffer.from(buffer)
   await processExcelData(fileBuffer)
}

export async function handleUpdateExcelItems(
   id: number,
   updates: Partial<{
      description: string
      quantity: number | null
      price: number | null
      updated_at: Date
   }>
) {
   const currentItem = await client.excel_items.findUnique({
      where: { id: id },
   })

   if (!currentItem) {
      throw new Error('Item not found')
   }

   const { quantity = currentItem.quantity, price = currentItem.price }: any =
      updates

   const updateData = {
      total_price: quantity * price,
      description: updates.description,
      quantity,
      price,
      updated_at: updates.updated_at,
   }

   const updateExcel = await client.excel_items.update({
      where: { id: id },
      data: updateData,
   })

   return updateExcel
}

export function handeGetPaginationParams(url: URL) {
   const page = parseInt(url.searchParams.get('page') || `${DEFAULT_PAGE}`, 10)
   const limit = parseInt(
      url.searchParams.get('limit') || `${DEFAULT_LIMIT}`,
      10
   )
   return { page, limit }
}

export async function handleGetExcelItems({
   page,
   limit,
   filter = '',
}: any): Promise<{
   items: any
   totalItems: number
   page: number
   limit: number
   filter: string
}> {
   const offset = (page - 1) * limit

   const where = filter
      ? {
           OR: [
              {
                 code: { contains: filter, mode: Prisma.QueryMode.insensitive },
              },
              {
                 description: {
                    contains: filter,
                    mode: Prisma.QueryMode.insensitive,
                 },
              },
           ],
        }
      : {}

   const items = await client.excel_items.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
         updated_at: 'desc',
      },
   })

   const formattedItems = formatItemsDate(items)
   const totalItems = await client.excel_items.count({ where })

   return {
      items: formattedItems,
      totalItems,
      page,
      limit,
      filter,
   }
}

export async function handleRemoveExcelItemById(id: number) {
   const deletedItem = await client.excel_items.delete({
      where: { id: id },
   })

   return deletedItem
}
