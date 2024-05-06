import { processExcelData } from '../utils/ProcessExcelData'
import client from '../lib/prisma/client'

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
   const updateExcel = await client.excel_items.update({
      where: { id: id },
      data: updates,
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

export async function handleGetExcelItems({ page, limit }: any): Promise<{
   items: any
   totalItems: number
   page: number
   limit: number
}> {
   const offset = (page - 1) * limit

   const items = await client.excel_items.findMany({
      skip: offset,
      take: limit,
   })

   const totalItems = await client.excel_items.count()

   return {
      items,
      totalItems,
      page,
      limit,
   }
}

export async function handleRemoveExcelItemById(id: number) {
   const deletedItem = await client.excel_items.delete({
      where: { id: id },
   })

   return deletedItem
}
