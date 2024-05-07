import { z } from 'zod'

export const modalSchema = z.object({
   description: z.string().min(1, 'Descrição é obrigatória'),
   quantity: z
      .number()
      .nullable()
      .refine(
         (value) => {
            return typeof value === 'number' && Number.isInteger(value)
         },
         {
            message: 'Quantidade é obrigatória',
         }
      ),
   price: z
      .union([z.number(), z.string()])
      .nullable()
      .refine(
         (value) => {
            return (
               typeof value === 'number' ||
               (typeof value === 'string' && !isNaN(parseFloat(value)))
            )
         },
         {
            message: 'O preço é obrigatório',
         }
      ),
})
