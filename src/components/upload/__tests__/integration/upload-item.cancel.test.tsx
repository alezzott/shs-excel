import { fireEvent, screen } from '@testing-library/react'
import { UploadItem } from '../../UploadItem'

// Importa o mock do toast
import { toast } from 'sonner'
import { renderWithQueryClient } from '@/helpers/renderWithQueryClient'

jest.mock('sonner', () => ({
   toast: {
      error: jest.fn(),
   },
}))

describe('UploadItem - Cancelamento', () => {
   it('cancela upload e mostra toast de cancelamento', async () => {
      renderWithQueryClient(<UploadItem />)
      const input = screen.getByLabelText(/Selecionar arquivos para upload/i)
      const file = new File(['dummy'], 'test.xlsx', {
         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      fireEvent.change(input, { target: { files: [file] } })

      // Aguarda renderização da lista de arquivos
      await screen.findByText(/test.xlsx/)

      // Clica no botão de cancelar upload
      const cancelBtn = screen.getByLabelText(/Cancelar upload/i)
      fireEvent.click(cancelBtn)

      expect(toast.error).toHaveBeenCalledWith(
         expect.stringMatching(/Upload cancelado/i)
      )
   })
})
