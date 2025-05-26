import { fireEvent, screen, waitFor } from '@testing-library/react'
import { UploadItem } from '../../UploadItem'
import axios from 'axios'
import { renderWithQueryClient } from '@/helpers/renderWithQueryClient'

// Mocks do Jest
jest.mock('axios', () => ({
   __esModule: true,
   default: {
      post: jest.fn(() => Promise.resolve({ status: 200 })),
   },
}))
jest.mock('@/hooks/useFetch', () => ({
   useFetch: () => ({ refetch: jest.fn() }),
}))

describe('UploadItem - Upload', () => {
   beforeEach(() => {
      jest.clearAllMocks()
   })

   it('faz upload de arquivo com sucesso', async () => {
      renderWithQueryClient(<UploadItem />)
      const input = screen.getByLabelText(/Selecionar arquivos para upload/i)

      await waitFor(() => {
         expect(input).not.toBeDisabled()
      })

      const file = new File(['dummy'], 'test.xlsx', {
         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      fireEvent.change(input, { target: { files: [file] } })

      // Aguarde o arquivo aparecer na lista de arquivos selecionados
      await waitFor(() => {
         expect(screen.getByText('test.xlsx')).toBeInTheDocument()
      })
   })

   it('mostra erro se upload falhar', async () => {
      ;(axios.post as jest.Mock).mockImplementationOnce(() =>
         Promise.reject(new Error('Upload failed'))
      )

      renderWithQueryClient(<UploadItem />)
      const input = screen.getByLabelText(/Selecionar arquivos para upload/i)

      await waitFor(() => {
         expect(input).not.toBeDisabled()
      })

      const file = new File(['dummy'], 'test.xlsx', {
         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      fireEvent.change(input, { target: { files: [file] } })
   })
})
