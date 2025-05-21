interface Excel {
   id: number
   code: string
   description: string
   quantity: number
   price: number
   total_price: number
   created_at: Date
   updated_at: Date
}

interface ExcelProps {
   items: Excel[]
   pagination: {
      totalItems: number
   }
}

type FetchParams = {
   currentPage: number
   pageSize: number
   filter: string
}

type ExcelItem = Excel & { key: number }

type FetchResult = {
   items: ExcelItem[]
   totalItems: number
}

type QueryKey = [string, FetchParams]
