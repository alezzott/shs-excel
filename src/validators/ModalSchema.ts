import { z } from 'zod'

export const ModalSchema = z.object({
   description: z.string().refine((value) => value.trim().length > 0, {
      message:
         'Descrição é obrigatória e não pode conter apenas espaços em branco',
   }),
   quantity: z
      .number()
      .int()
      .nonnegative(
         'Quantidade é obrigatória e deve ser um número inteiro não negativo'
      ),
   price: z
      .number()
      .int()
      .nonnegative(
         'Preço é obrigatória e deve ser um número inteiro não negativo'
      ),
})
