'use client'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
   Table,
   TableHeader,
   TableBody,
   TableHead,
   TableRow,
   TableCell,
} from '@/components/ui/data-table'
import {
   useReactTable,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   flexRender,
   RowSelectionState,
   ColumnDef,
} from '@tanstack/react-table'
import { useFetch } from '@/hooks/useFetch'
import { useDelete } from '@/hooks/useDelete'
import { ModalDetailsItem } from '../modal/ModalDetailsItem'
import { formatToBRL } from '@/app/api/utils/FormatCurrency'
import { Trash } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useDebounce } from 'use-debounce'

import { TableActionBar } from './TableActionBar'
import { DeleteSelectedDialog } from './TableAlertDialog'
import { toast } from 'sonner'
import { TablePagination } from './TablePagination'

export function TableExcelItem() {
   const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
   const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
   const [filter, setFilter] = useState('')
   const [pageIndex, setPageIndex] = useState(0)
   const [pageSize, setPageSize] = useState(10)

   const [debouncedFilter] = useDebounce(filter, 400)
   const {
      data: upload,
      isLoading,
      refetch,
   } = useFetch(pageIndex + 1, pageSize, debouncedFilter)
   const deleteItemMutation = useDelete()
   const data = useMemo(() => upload?.items || [], [upload])

   const handleUpdateSuccess = () => refetch()

   const handleDeleteItem = useCallback(
      (id: number) => {
         deleteItemMutation.mutate(id, {
            onSuccess: () => {
               toast.success('Item removido com sucesso!')
               refetch()
            },
            onError: () => {
               toast.error('Erro ao remover item.')
            },
         })
      },
      [deleteItemMutation, refetch]
   )

   // Definição das colunas
   const columns = useMemo<ColumnDef<Excel>[]>(
      () => [
         {
            id: 'select',
            header: ({ table }) => (
               <Checkbox
                  checked={
                     table.getIsAllPageRowsSelected() ||
                     (table.getIsSomePageRowsSelected() && 'indeterminate')
                  }
                  onCheckedChange={(value) =>
                     table.toggleAllPageRowsSelected(!!value)
                  }
                  aria-label="Selecionar todos"
               />
            ),
            cell: ({ row }) => (
               <Checkbox
                  checked={
                     row.getIsSelected() ||
                     (row.getIsSomeSelected() && 'indeterminate')
                  }
                  onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label={`Selecionar linha ${row.id}`}
               />
            ),
            size: 32,
         },
         {
            accessorKey: 'id',
            header: 'id',
            cell: (info) => (
               <span className="font-medium">{info.getValue() as string}</span>
            ),
         },
         { accessorKey: 'code', header: 'Cód.' },
         { accessorKey: 'description', header: 'Descrição' },
         { accessorKey: 'quantity', header: 'Quantidade' },
         {
            accessorKey: 'price',
            header: 'Preço',
            cell: (info) => formatToBRL(info.row.original.price),
         },
         {
            accessorKey: 'total_price',
            header: 'Preço total',
            cell: (info) => formatToBRL(info.row.original.total_price),
         },
         { accessorKey: 'created_at', header: 'Data de criação' },
         { accessorKey: 'updated_at', header: 'Data de Atualização' },
         {
            id: 'actions',
            header: () => <span className="text-right">Opções</span>,
            cell: ({ row }) => (
               <div className="flex gap-2 justify-end">
                  <Button
                     variant="outline"
                     className="border-green-500 text-green-600 hover:bg-green-50"
                     onClick={() => setDeleteItemId(row.original.id)}
                     size="icon"
                  >
                     <Trash />
                  </Button>
               </div>
            ),
         },
      ],
      []
   )

   // Instância da tabela
   const table = useReactTable({
      data,
      columns,
      pageCount: Math.ceil((upload?.totalItems || 0) / pageSize),
      state: {
         rowSelection,
         globalFilter: '',
         pagination: { pageIndex, pageSize },
      },
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      manualPagination: true,
      onPaginationChange: (updater) => {
         const next =
            typeof updater === 'function'
               ? updater({ pageIndex, pageSize })
               : updater
         setPageIndex(next.pageIndex ?? 0)
         setPageSize(next.pageSize ?? pageSize)
      },
   })

   const selectedRows = table.getSelectedRowModel().rows
   const selectedCount = Object.keys(rowSelection).length

   const handleConfirmDelete = useCallback(
      ({ id }: { id?: number } = {}) => {
         if (id !== undefined && id !== null) {
            handleDeleteItem(id)
            setDeleteItemId(null)
            setOpenDeleteDialog(false)
            setRowSelection({})
         } else {
            selectedRows.forEach((row) => handleDeleteItem(row.original.id))
            setOpenDeleteDialog(false)
            setRowSelection({})
         }
      },
      [handleDeleteItem, selectedRows]
   )

   if (isLoading) {
      return (
         <div className="flex justify-center items-center py-20">
            <svg
               className="animate-spin h-16 w-16 text-green-500"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
            >
               <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
               ></circle>
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
               ></path>
            </svg>
         </div>
      )
   }

   const filteredRows = table.getRowModel().rows

   return (
      <div className="w-full mx-auto max-w-6xl my-1">
         <div className="flex flex-wrap gap-4 mb-4">
            <input
               type="text"
               placeholder="Buscar por código ou descrição"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
            />
         </div>

         <Table className="rounded-md border bg-background">
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-muted/50">
                     {headerGroup.headers.map((header) => (
                        <TableHead
                           key={header.id}
                           style={{ width: header.getSize() }}
                           className={
                              header.id === 'actions' ? 'text-right' : ''
                           }
                        >
                           {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                           )}
                        </TableHead>
                     ))}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {filteredRows.length === 0 ? (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className="text-center"
                     >
                        Nenhum resultado encontrado.
                     </TableCell>
                  </TableRow>
               ) : (
                  filteredRows.map((row) => (
                     <TableRow key={row.id} className="hover:bg-muted/50">
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
         <section className="my-10">
            <TablePagination
               pageCount={table.getPageCount()}
               pageIndex={table.getState().pagination.pageIndex}
               canPreviousPage={table.getCanPreviousPage()}
               canNextPage={table.getCanNextPage()}
               onPageChange={table.setPageIndex}
               onPreviousPage={table.previousPage}
               onNextPage={table.nextPage}
            />
         </section>
         <TableActionBar
            selectedCount={selectedCount}
            onDeleteSelected={() => setOpenDeleteDialog(true)}
            onClearSelection={() => setRowSelection({})}
         />
         <DeleteSelectedDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
            selectedCount={selectedRows.length}
            onConfirm={() => handleConfirmDelete()}
         />
         <DeleteSelectedDialog
            open={deleteItemId !== null}
            onOpenChange={(open) => {
               if (!open) setDeleteItemId(null)
            }}
            selectedCount={1}
            onConfirm={() => handleConfirmDelete({ id: deleteItemId! })}
         />
      </div>
   )
}
