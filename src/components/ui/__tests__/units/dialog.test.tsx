import { render, screen, fireEvent } from '@testing-library/react'
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogTitle,
   DialogDescription,
   DialogClose,
} from '../../dialog'

describe('Dialog', () => {
   it('abre e fecha o dialog ao interagir com o trigger', () => {
      render(
         <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
               <DialogTitle>Confirmação</DialogTitle>
               <DialogDescription>Tem certeza?</DialogDescription>
               <DialogClose>Fechar</DialogClose>
            </DialogContent>
         </Dialog>
      )

      // O conteúdo não deve aparecer antes do clique
      expect(screen.queryByText('Confirmação')).not.toBeInTheDocument()

      // Abre o dialog
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByText('Confirmação')).toBeInTheDocument()

      // Fecha o dialog
      fireEvent.click(screen.getByText('Fechar'))
      expect(screen.queryByText('Confirmação')).not.toBeInTheDocument()
   })
})
