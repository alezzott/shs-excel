import { TableActionBarProps } from '@/@types/table-actions'
import { TableSelectedItemsActions } from './TableSelectedItemsActions'
import * as XLSX from 'xlsx'
import { BatchEditModal } from './BatchEditModal'
import { useState } from 'react'

export function TableActionBar({
   selectedCount,
   onDeleteSelected,
   onClearSelection,
   children,
   onSelectedRows,
}: TableActionBarProps) {
   const [editModalOpen, setEditModalOpen] = useState(false)
   const [editIndex, setEditIndex] = useState(0)

   const handleEditSelected = () => {
      setEditIndex(0)
      setEditModalOpen(true)
   }

   const handleExportSelected = () => {
      if (!onSelectedRows || onSelectedRows.length === 0) return

      const exportData = onSelectedRows.map((row) => ({
         Código: row.original.code,
         Descrição: row.original.description,
         Quantidade: row.original.quantity,
         Preço: row.original.price,
         'Preço Total': row.original.total_price,
         'Data de criação': row.original.created_at,
         'Data de atualização': row.original.updated_at,
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Items selecionados')
      XLSX.writeFile(wb, 'itens-selecionados.xlsx')
   }

   return (
      <main
         className={`fixed bottom-6 left-1/2 z-50 flex min-w-[320px] -translate-x-1/2 items-center gap-3 rounded-lg border bg-white px-6 py-3 shadow-lg transition-all duration-300 ${
            selectedCount > 0
               ? 'pointer-events-auto translate-y-0 opacity-100'
               : 'pointer-events-none translate-y-10 opacity-0'
         } `}
         style={{
            willChange: 'transform, opacity',
         }}
         aria-hidden={selectedCount === 0}
      >
         <TableSelectedItemsActions
            selectedCount={selectedCount}
            onClearSelection={onClearSelection}
            onDeleteSelected={onDeleteSelected}
            onExportSelected={handleExportSelected}
            onEditingSelected={handleEditSelected}
         />
         {children}

         {editModalOpen && onSelectedRows && onSelectedRows.length > 0 && (
            <BatchEditModal
               items={onSelectedRows.map((row) => row.original)}
               open={editModalOpen}
               index={editIndex}
               onClose={() => setEditModalOpen(false)}
               onNext={() => setEditIndex((i) => i + 1)}
               onPrevious={() => setEditIndex((i) => i - 1)}
               onFinish={() => setEditModalOpen(false)}
            />
         )}
      </main>
   )
}
