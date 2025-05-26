import { screen } from '@testing-library/react'
import { UploadItem } from '../../UploadItem'
import { renderWithQueryClient } from '@/helpers/renderWithQueryClient'

describe('UploadItem - Renderização', () => {
   it('renderiza a dropzone', () => {
      renderWithQueryClient(<UploadItem />)
      expect(
         screen.getByLabelText(/Área para selecionar ou arrastar arquivos/i)
      ).toBeInTheDocument()
   })

   it('renderiza o botão de download do arquivo modelo', () => {
      renderWithQueryClient(<UploadItem />)
      expect(
         screen.getByLabelText(/Baixar arquivo modelo Excel/i)
      ).toBeInTheDocument()
   })
})
