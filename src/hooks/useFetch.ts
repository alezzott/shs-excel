import {
   keepPreviousData,
   QueryFunctionContext,
   useQuery,
} from '@tanstack/react-query'
import api from '../config/axios'

const fetchItems = async (
   context: QueryFunctionContext<QueryKey>
): Promise<FetchResult> => {
   const [, { currentPage, pageSize, filter }] = context.queryKey
   // await new Promise((resolve) => setTimeout(resolve, 5000))
   const { data } = await api.common.get<ExcelProps>(
      `/upload?page=${currentPage}&limit=${pageSize}&filter=${encodeURIComponent(filter)}`
   )

   const items = (data.items ?? []).map((excel, index) => ({
      ...excel,
      key: index,
   }))

   return {
      items,
      totalItems: data.pagination?.totalItems ?? 0,
   }
}

export const useFetch = (
   currentPage: number,
   pageSize: number,
   filter = ''
) => {
   return useQuery<FetchResult, Error, FetchResult, QueryKey>({
      queryKey: ['upload', { currentPage, pageSize, filter }],
      queryFn: fetchItems,
      placeholderData: keepPreviousData,
   })
}
