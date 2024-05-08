'use client'

import { TableExcelItem } from '../components/table/TableExcelItem'
import { UploadItem } from '@/components/upload/UploadItem'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Home() {
   const queryClient = new QueryClient()

   return (
      <QueryClientProvider client={queryClient}>
         <UploadItem />
         <TableExcelItem />
      </QueryClientProvider>
   )
}
