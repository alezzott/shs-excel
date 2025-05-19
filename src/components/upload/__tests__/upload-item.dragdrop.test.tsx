import { fireEvent, screen } from '@testing-library/react'
import { UploadItem } from '../UploadItem'
import { renderWithQueryClient } from '@/helpers/renderWithQueryClient'

describe('UploadItem - Drag and Drop', () => {
   it('ativa dragActive ao arrastar arquivo', () => {
      renderWithQueryClient(<UploadItem />)
      const dropzone = screen.getByLabelText(
         /Área para selecionar ou arrastar arquivos/i
      )
      fireEvent.dragEnter(dropzone)
      // Aqui você pode testar se a classe de dragActive foi aplicada, se for visível na UI
      // Exemplo: expect(dropzone).toHaveClass('border-green-500')
   })

   it('desativa dragActive ao sair do dropzone', () => {
      renderWithQueryClient(<UploadItem />)
      const dropzone = screen.getByLabelText(
         /Área para selecionar ou arrastar arquivos/i
      )
      fireEvent.dragEnter(dropzone)
      fireEvent.dragLeave(dropzone)
      // Teste visual ou de estado, se aplicável
   })
})
