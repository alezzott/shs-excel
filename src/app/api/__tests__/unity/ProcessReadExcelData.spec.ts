import { handleReadExcelData } from '@/app/api/utils/read-excel-data'
import XLSX from 'xlsx'

describe('handleReadExcelData', () => {
   it('should correctly read 100 Excel items', async () => {
      const items = Array.from({ length: 100 }).map((_, i) => [
         `C${i + 1}`,
         `Item ${i + 1}`,
         `${i + 1}`,
         `${(i + 1) * 10}`,
         `${(i + 1) * (i + 1) * 10}`,
      ])
      const aoa = [
         ['Code', 'Description', 'Quantity', 'Price', 'Total Price'],
         ...items,
      ]
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet(aoa)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'filee')
      const buffer = XLSX.write(workbook, { type: 'buffer' })

      const data = handleReadExcelData(buffer)

      expect(data).toHaveLength(100)
      expect(data[0]).toMatchObject({
         code: 'C1',
         description: 'Item 1',
         quantity: 1,
         price: 10,
         total_price: 10,
      })
      expect(data[99]).toMatchObject({
         code: 'C100',
         description: 'Item 100',
         quantity: 100,
         price: 1000,
         total_price: 100000,
      })
   })
})
