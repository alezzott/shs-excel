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
