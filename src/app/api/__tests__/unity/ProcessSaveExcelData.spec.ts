/**
 * @jest-environment node
 */
import client from '@/app/api/lib/prisma/client'
import { prismaExcelRepository } from '@/app/api/repository/excel-repository'
import { handleUploadExcel } from '@/app/api/services/excel/excel.service'
import XLSX from 'xlsx'

describe('handleUploadExcel', () => {
   const items = Array.from({ length: 100 }).map((_, i) => [
      `C${i + 1}`,
      `Item ${i + 1}`,
      `${i + 1}`,
      `${(i + 1) * 10}`,
      `${(i + 1) * (i + 1) * 10}`,
   ])
   const aoa = [['Cod', 'Descricção', 'Qtd', 'Preço', 'Preço total'], ...items]

   let buffer: Buffer

   beforeAll(() => {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet(aoa)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet-dev')
      buffer = XLSX.write(workbook, { type: 'buffer' })
   })

   beforeEach(async () => {
      await client.excel_items.deleteMany({})
   })

   afterAll(async () => {
      await client.excel_items.deleteMany({})
      await client.$disconnect()
   })

   it('extracts and saves 100 excel items to database', async () => {
      const file = new File([buffer], 'test.xlsx')
      await handleUploadExcel(file, prismaExcelRepository)

      const allItems = await client.excel_items.findMany()
      expect(allItems.length).toBe(100)

      expect(allItems[0].code).toBe('C1')
      expect(allItems[0].description).toBe('Item 1')
      expect(allItems[0].quantity).toBe(1)
      expect(Number(allItems[0].price)).toBe(10)
      expect(Number(allItems[0].total_price)).toBe(10)

      expect(allItems[99].code).toBe('C100')
      expect(allItems[99].description).toBe('Item 100')
      expect(allItems[99].quantity).toBe(100)
      expect(Number(allItems[99].price)).toBe(1000)
      expect(Number(allItems[99].total_price)).toBe(100000)
   })
})
