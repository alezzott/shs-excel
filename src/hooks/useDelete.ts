import api from '@/config/axios'
import { useMutation } from 'react-query'

const deleteItem = async (id: any) => {
   const response = await api.common.delete(`/upload`, {
      data: { id: id },
      headers: {
         'Content-Type': 'application/json',
      },
   })
   return response.data
}

export const useDelete = () => {
   return useMutation(deleteItem)
}
