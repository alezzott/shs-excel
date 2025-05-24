import { NextRequest, NextResponse } from 'next/server'

export function withErrorHandler(
   handler: (req: NextRequest) => Promise<NextResponse>
) {
   return async (req: NextRequest) => {
      try {
         return await handler(req)
      } catch (error: any) {
         return NextResponse.json(
            { error: error?.message || 'Internal server error' },
            { status: error?.status || 500 }
         )
      }
   }
}
