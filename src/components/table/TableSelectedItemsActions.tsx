import { FileDown, Trash2, X } from 'lucide-react'
import { Button } from '../ui/button'
import React from 'react'
import { TableActionBarProps } from '@/@types/table-actions'

export function TableSelectedItemsActions({
   selectedCount,
   onClearSelection,
   onDeleteSelected,
   onExportSelected,
}: TableActionBarProps) {
   if (selectedCount === 0) return null

   return (
      <React.Fragment>
         <section className="flex items-center rounded-md border border-neutral-300">
            <span className="px-4 text-sm">
               {selectedCount} item{selectedCount > 1 ? 's' : ''} selecionado
               {selectedCount > 1 ? 's' : ''}
            </span>
            {onClearSelection && (
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClearSelection}
                  className="rounded-l-none border-l border-neutral-300"
                  aria-label="Limpar seleção"
                  title="limpar selecionados"
               >
                  <X className="h-10 w-10" />
               </Button>
            )}
         </section>
         <section className="flex gap-3">
            {onDeleteSelected && (
               <Button
                  variant="destructive"
                  size="icon"
                  onClick={onDeleteSelected}
                  title="remover selecionados"
               >
                  <Trash2 />
               </Button>
            )}
            {onExportSelected && (
               <Button
                  className="bg-green-500 hover:bg-green-600"
                  size="icon"
                  onClick={onExportSelected}
                  title="Exportar selecionados"
                  aria-label="Exportar selecionados"
               >
                  <FileDown className="h-5 w-5" />
               </Button>
            )}
         </section>
      </React.Fragment>
   )
}
