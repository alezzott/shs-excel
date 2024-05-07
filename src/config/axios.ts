import axios from 'axios'

const common = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

const api = {
   common,
}

export default api
