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
   SortingState,
   getSortedRowModel,
} from '@tanstack/react-table'
import { useFetch } from '@/hooks/useFetch'
import { useDelete } from '@/hooks/useDelete'
import { ModalDetailsItem } from '../modal/ModalDetailsItem'
import { formatToBRL } from '@/app/api/utils/FormatCurrency'
import { Trash, X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useDebounce } from 'use-debounce'

import { TableActionBar } from './TableActionBar'
import { DeleteSelectedDialog } from './TableAlertDialog'
import { toast } from 'sonner'
import { TablePagination } from './TablePagination'
import { Input } from '../ui/input'
import { TableSelectItemPage } from './TableSelectItemPage'
import { TableSortableHeader } from './TableSorteableHeader'

export function TableExcelItem() {
   const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
   const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
   const [filter, setFilter] = useState('')
   const [pageIndex, setPageIndex] = useState(0)
   const [pageSize, setPageSize] = useState(10)
   const [sorting, setSorting] = useState<SortingState>([])

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
            header: ({ column }) => {
               return (
                  <>
                     <TableSortableHeader title="id" type={column} />
                  </>
               )
            },
            cell: (info) => (
               <span className="font-medium">{info.getValue() as string}</span>
            ),
         },
         {
            accessorKey: 'code',
            header: ({ column }) => {
               return (
                  <>
                     <TableSortableHeader title="Cód" type={column} />
                  </>
               )
            },
         },
         { accessorKey: 'description', header: 'Descrição' },
         { accessorKey: 'quantity', header: 'Qtd' },
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
            cell: ({ row }) => (
               <div className="flex gap-2 justify-end">
                  <ModalDetailsItem
                     item={row.original}
                     onUpdateSuccess={handleUpdateSuccess}
                  />
                  <Button
                     variant="outline"
                     className="border-green-500 text-green-600 hover:bg-green-500 group"
                     onClick={() => setDeleteItemId(row.original.id)}
                     size="icon"
                     title="remover linha"
                  >
                     <Trash className="h-4 w-4 transition-colors group-hover:text-green-100" />
                  </Button>
               </div>
            ),
         },
      ],
      [handleUpdateSuccess]
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
         sorting,
      },
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
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
      <div className="w-auto m-auto max-w-6xl my-1">
         <section className="my-4">
            <Input
               type="text"
               placeholder="Buscar por código ou descrição"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="bg-background"
            />
            {filter && (
               <Button
                  size="default"
                  className="bg-green-500 hover:bg-green-600 text-white text-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => setFilter('')}
                  aria-label="Limpar busca"
               >
                  <X />
               </Button>
            )}
         </section>

         <section className="!rounded-md border border-neutral-300 bg-background">
            <Table>
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
                           className="text-center py-4"
                        >
                           Nenhum resultado encontrado.
                        </TableCell>
                     </TableRow>
                  ) : (
                     filteredRows.map((row) => (
                        <TableRow
                           key={row.id}
                           className={`
                              hover:bg-muted/50
                              ${row.getIsSelected() ? 'bg-zinc-100' : ''}
                           `}
                        >
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
         </section>
         <section className="flex flex-row my-8 items-center">
            <section className="flex-1 text-sm text-gray-500">
               {table.getFilteredSelectedRowModel().rows.length} de{' '}
               {table.getFilteredRowModel().rows.length} coluna(s) selecionadas
            </section>
            <section className="gap-2 flex-row flex">
               <TableSelectItemPage
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setPageIndex={setPageIndex}
               />
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
