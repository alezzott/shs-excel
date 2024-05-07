import { useQuery } from 'react-query'
import api from '../config/axios'

const fetchItems = async ({
   queryKey,
}: any): Promise<{ items: Excel[]; totalItems: number }> => {
   const [, { currentPage, pageSize }] = queryKey
   const { data } = await api.common.get<ExcelProps>(
      `/upload?page=${currentPage}&limit=${pageSize}`
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

export const useFetch = (currentPage: number, pageSize: number) => {
   return useQuery<{ items: Excel[]; totalItems: number }, Error>(
      ['upload', { currentPage, pageSize }],
      fetchItems
   )
}
