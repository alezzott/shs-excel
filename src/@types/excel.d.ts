interface Excel {
   id: number
   code: string
   description: string
   quantity?: string | number
   price?: string | number
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

type SelectedRow = {
   original: ExcelItem
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
