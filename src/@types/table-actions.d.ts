import { Row } from '@tanstack/react-table'

type TableActionBarProps = {
   selectedCount: number
   onDeleteSelected?: () => void
   onClearSelection?: () => void
   onExportSelected?: () => void
   onEditingSelected?: () => void
   children?: React.ReactNode
   onSelectedRows?: Row<Excel>[]
}

interface TablePaginationProps {
   pageCount: number
   pageIndex: number
   canPreviousPage: boolean
   canNextPage: boolean
   onPreviousPage: () => void
   onNextPage: () => void
   onPageChange: (page: number) => void
}
