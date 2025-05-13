import { useQuery } from 'react-query'
import api from '../config/axios'

const fetchItems = async ({
   queryKey,
}: any): Promise<{ items: Excel[]; totalItems: number }> => {
   const [, { currentPage, pageSize, filter }] = queryKey
   // await new Promise((resolve) => setTimeout(resolve, 5000))
   const { data } = await api.common.get<ExcelProps>(
      `/upload?page=${currentPage}&limit=${pageSize}&filter=${encodeURIComponent(filter || '')}`
   )

   const items = data.items?.map((excel, index) => ({
      ...excel,
      key: index,
   }))

   return {
      items,
      totalItems: data.pagination?.totalItems,
   }
}

export const useFetch = (
   currentPage: number,
   pageSize: number,
   filter = ''
) => {
   return useQuery<{ items: Excel[]; totalItems: number }, Error>(
      ['upload', { currentPage, pageSize, filter }],
      fetchItems,
      { keepPreviousData: true }
   )
}
