import { parseBRLValue } from '@/app/shared/utils/format-currency'
import { z } from 'zod'

export const modalSchema = z.object({
   description: z.string().min(1, 'Descrição é obrigatória'),
   quantity: z
      .union([z.string(), z.number()])
      .transform((value) => {
         if (typeof value === 'string') {
            const parsed = Number(value.replace(/\D/g, ''))
            return isNaN(parsed) ? null : parsed
         }
         return value
      })
      .superRefine((val, ctx) => {
         if (typeof val !== 'number' || !Number.isInteger(val)) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'Quantidade é obrigatória',
            })
         } else if (val <= 0) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'Quantidade deve ser maior que zero',
            })
         }
      }),
   price: z
      .union([z.number(), z.string()])
      .transform((value) =>
         typeof value === 'string' ? parseBRLValue(value) : value
      )
      .superRefine((value, ctx) => {
         if (typeof value !== 'number' || isNaN(value)) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'O preço é obrigatório',
            })
         } else if (value <= 0) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'O preço deve ser maior que zero',
            })
         }
      }),
})

export const modalPatchSchema = modalSchema.extend({
   id: z.number({ required_error: 'ID required' }),
})

export type ModalPatchInput = z.infer<typeof modalPatchSchema>
