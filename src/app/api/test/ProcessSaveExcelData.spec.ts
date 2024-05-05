import { processExcelData } from '../utils/ProcessExcelData'
import XLSX from 'xlsx'
import { describe, expect, it } from 'vitest'
import client from '../lib/prisma/client'

describe('processExcelData', () => {
   it('extract excel data and save database'),
      async () => {
         const workbook = XLSX.utils.book_new()
         const worksheet = XLSX.utils.aoa_to_sheet([
            ['Code', 'Description', 'Quantity', 'Price', 'Total Price'],
            ['A001', 'Item 1', '10', '100.00', '1000.00'],
            ['A002', 'Item 2', '5', '200.00', '1000.00'],
            ['A003', 'Item 3', '3', '300.00', '900.00'],
            ['A004', 'Item 4', '2', '400.00', '800.00'],
         ])
         XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet-dev')

         const buffer = XLSX.write(workbook, { type: 'buffer' })
         await processExcelData(buffer)

         const items = await client.excel_items.findMany()
         expect(items).toHaveLength(2)
         expect(items[0]).toMatchObject({
            code: 'A001',
            description: 'Item 1',
            quantity: 10,
            price: 100.0,
            total_price: 1000.0,
         })

         expect(items[1]).toMatchObject({
            code: 'A002',
            description: 'Item 2',
            quantity: 5,
            price: 200.0,
            total_price: 1000.0,
         })
      }
})
