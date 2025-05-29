import { NextResponse } from 'next/server'
import { ZodSchema } from 'zod'

export function validateRequest<T>(
   schema: ZodSchema<T, any, any>,
   data: unknown
): { valid: true; data: T } | { valid: false; response: NextResponse } {
   const parsed = schema.safeParse(data)
   if (!parsed.success) {
      return {
         valid: false,
         response: NextResponse.json(
            { error: parsed.error.errors[0].message },
            { status: 400 }
         ),
      }
   }
   return { valid: true, data: parsed.data }
}
