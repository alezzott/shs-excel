import XLSX from 'xlsx'

export function handleReadExcelData(buffer: Buffer) {
   const workbook = XLSX.read(buffer, { type: 'buffer' })
   const sheetName = workbook.SheetNames[0]
   const worksheet = workbook.Sheets[sheetName]
   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[]
   return data.slice(1).map((table) => ({
      code: table[0],
      description: table[1],
      quantity: parseInt(table[2], 10),
      price: parseFloat(table[3]),
      total_price: parseFloat(table[4]),
   }))
}
