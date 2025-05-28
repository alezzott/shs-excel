import { z } from 'zod'

export const uploadExcelSchema = z.object({
   file: z.instanceof(File).refine(
      (file) => {
         const ext = file.name.split('.').pop()?.toLowerCase()
         return ext === 'xls' || ext === 'xlsx'
      },
      { message: 'Only excel files (.xls or .xlsx) are allowed' }
   ),
})
