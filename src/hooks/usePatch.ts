import api from '@/config/axios'
import { useMutation } from 'react-query'

const updateItems = async (updateData: any) => {
   const response = await api.common.patch('/upload', updateData)
   return response.data
}

export const usePatch = () => {
   return useMutation(updateItems)
}
