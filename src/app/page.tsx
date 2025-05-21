'use client'

import { TableExcelItem } from '../components/table/TableExcelItem'
import { UploadItem } from '@/components/upload/UploadItem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Home() {
   const [queryClient] = useState(() => new QueryClient())

   return (
      <QueryClientProvider client={queryClient}>
         <UploadItem />
         <TableExcelItem />
      </QueryClientProvider>
   )
}
