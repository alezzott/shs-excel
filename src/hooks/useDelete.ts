import api from '@/config/axios'
import { useMutation } from '@tanstack/react-query'

const deleteItem = async (id: string | number) => {
   const response = await api.common.delete(`/upload`, {
      data: { id },
      headers: {
         'Content-Type': 'application/json',
      },
   })
   return response.data
}

export const useDelete = (
   onSuccess?: () => void,
   onError?: (error: unknown) => void
) => {
   return useMutation({
      mutationFn: deleteItem,
      onSuccess,
      onError,
   })
}
