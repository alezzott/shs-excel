import { processExcelData } from '../utils/ProcessExcelData'
import client from '../lib/prisma/client'

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

export async function handleGetExcelItems() {
   const get = await client.excel_items.findMany()
   return get
}

export async function handleRemoveExcelItemById(id: number) {
   const deletedItem = await client.excel_items.delete({
      where: { id: id },
   })

   return deletedItem
}
