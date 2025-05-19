/**
 * @jest-environment node
 */
import client from '@/app/api/lib/prisma/client'
import { processExcelData } from '@/app/api/utils/ProcessExcelData'
import XLSX from 'xlsx'

describe('processExcelData', () => {
   beforeEach(async () => {
      await client.excel_items.deleteMany({})
   })

   afterAll(async () => {
      await client.excel_items.deleteMany({})
      await client.$disconnect()
   })

   it('extract excel data and save database', async () => {
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
      expect(items).toHaveLength(4)
      expect({
         ...items[0],
         price: items[0].price.toString(),
         total_price: items[0].total_price.toString(),
      }).toMatchObject({
         code: 'A001',
         description: 'Item 1',
         quantity: 10,
         price: '100',
         total_price: '1000',
      })

      expect({
         ...items[1],
         price: items[1].price.toString(),
         total_price: items[1].total_price.toString(),
      }).toMatchObject({
         code: 'A002',
         description: 'Item 2',
         quantity: 5,
         price: '200',
         total_price: '1000',
      })
   })
})
