import XLSX from 'xlsx'
import client from '../lib/prisma/client'

export function handleReadExcelData(buffer: Buffer) {
   const workbook = XLSX.read(buffer, { type: 'buffer' })
   const sheetName = workbook.SheetNames[0]
   const worksheet = workbook.Sheets[sheetName]
   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
   return data.slice(1)
}

export async function SaveExcelDataToDatabase(data: any[]) {
   const transformedData = data.map((table) => ({
      code: table[0],
      description: table[1],
      quantity: parseInt(table[2], 10),
      price: parseFloat(table[3]),
      total_price: parseFloat(table[4]),
   }))

   await client.excel_items.createMany({
      data: transformedData,
   })
}

export async function processExcelData(buffer: Buffer): Promise<void> {
   try {
      const excelData = handleReadExcelData(buffer)
      await SaveExcelDataToDatabase(excelData)
   } catch (error) {
      throw error
   }
}
