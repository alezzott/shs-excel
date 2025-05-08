import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogAction,
} from '@/components/ui/alert-dialog'

interface DeleteSelectedDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   selectedCount: number
   onConfirm: () => void
}

export function DeleteSelectedDialog({
   open,
   onOpenChange,
   selectedCount,
   onConfirm,
}: DeleteSelectedDialogProps) {
   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Remover selecionados?</AlertDialogTitle>
               <AlertDialogDescription>
                  Tem certeza que deseja remover {selectedCount} item
                  {selectedCount > 1 ? 's' : ''} selecionado
                  {selectedCount > 1 ? 's' : ''}? Esta ação não pode ser
                  desfeita.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction
                  onClick={onConfirm}
                  className="bg-destructive text-white hover:bg-destructive/90"
               >
                  Remover
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
