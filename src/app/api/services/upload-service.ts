import { processExcelData } from '../utils/ProcessExcelData'
import client from '../lib/prisma/client'
import dayjs from 'dayjs'
import { Prisma } from '@prisma/client'

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
      quantity: number
      price: number
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

   const total_price = quantity * price

   const updateExcel = await client.excel_items.update({
      where: { id: id },
      data: { ...updates, total_price },
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

   console.log(filter)

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

   const formattedItems = items.map((item) => ({
      ...item,
      created_at: dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss'),
      updated_at: dayjs(item.updated_at).format('DD/MM/YYYY HH:mm:ss'),
   }))

   const totalItems = await client.excel_items.count({ where })

   console.log(filter, totalItems, page)

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
