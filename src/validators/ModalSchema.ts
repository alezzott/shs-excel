import { parseBRLValue } from '@/app/api/utils/FormatCurrency'
import { z } from 'zod'

export const modalSchema = z.object({
   description: z.string().min(1, 'Descrição é obrigatória'),
   quantity: z
      .union([z.string(), z.number(), z.null()])
      .transform((value) => {
         if (typeof value === 'string') {
            const parsed = Number(value.replace(/\D/g, ''))
            return isNaN(parsed) ? null : parsed
         }
         return value
      })
      .nullable()
      .refine((value) => typeof value === 'number' && Number.isInteger(value), {
         message: 'Quantidade é obrigatória',
      })
      .refine((value) => typeof value === 'number' && value > 0, {
         message: 'Quantidade deve ser maior que zero',
      }),
   price: z
      .union([z.number(), z.string()])
      .transform((value) => {
         if (typeof value === 'string') {
            return parseBRLValue(value)
         }
         return value
      })
      .refine((value) => typeof value === 'number' && !isNaN(value), {
         message: 'O preço é obrigatório',
      })
      .refine((value) => value > 0, {
         message: 'O preço deve ser maior que zero',
      }),
})
