import { render, screen, fireEvent } from '@testing-library/react'
import {
   AlertDialog,
   AlertDialogTrigger,
   AlertDialogContent,
   AlertDialogTitle,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogDescription,
} from '../../alert-dialog'

describe('AlertDialog', () => {
   it('abre e fecha o dialog ao interagir com o trigger', () => {
      render(
         <AlertDialog>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogTitle>Confirma?</AlertDialogTitle>
               <AlertDialogDescription>Tem certeza?</AlertDialogDescription>
               <AlertDialogAction>Sim</AlertDialogAction>
               <AlertDialogCancel>Não</AlertDialogCancel>
            </AlertDialogContent>
         </AlertDialog>
      )

      // O conteúdo não deve aparecer antes do clique
      expect(screen.queryByText('Confirma?')).not.toBeInTheDocument()

      // Abre o dialog
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByText('Confirma?')).toBeInTheDocument()

      // Fecha o dialog
      fireEvent.click(screen.getByText('Não'))
      expect(screen.queryByText('Confirma?')).not.toBeInTheDocument()
   })
})
