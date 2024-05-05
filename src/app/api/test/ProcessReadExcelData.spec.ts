import { describe, expect, it } from 'vitest'
import { handleReadExcelData } from '../utils/ProcessExcelData'
import XLSX from 'xlsx'

describe('handleReadExcelData', () => {
   it('should correctly read Excel data', async () => {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet([
         ['Code', 'Description', 'Quantity', 'Price', 'Total Price'],
         ['A001', 'Item 1', '10', '100.00', '1000.00'],
         ['A002', 'Item 2', '5', '200.00', '1000.00'],
         ['A003', 'Item 3', '3', '300.00', '900.00'],
         ['A004', 'Item 4', '2', '400.00', '800.00'],
      ])
      XLSX.utils.book_append_sheet(workbook, worksheet, 'filee')
      const buffer = XLSX.write(workbook, { type: 'buffer' })

      const data = handleReadExcelData(buffer)

      expect(data).toEqual([
         ['A001', 'Item 1', '10', '100.00', '1000.00'],
         ['A002', 'Item 2', '5', '200.00', '1000.00'],
         ['A003', 'Item 3', '3', '300.00', '900.00'],
         ['A004', 'Item 4', '2', '400.00', '800.00'],
      ])
   })
})
