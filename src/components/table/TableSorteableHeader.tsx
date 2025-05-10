import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { Column } from '@tanstack/react-table'
import { ReactNode } from 'react'

interface SortableHeaderProps<TData, TValue> {
   title: string
   type: Column<TData, TValue>
   icon?: ReactNode
}

export function TableSortableHeader<TData, TValue>({
   title,
   type,
   icon,
}: SortableHeaderProps<TData, TValue>) {
   return (
      <section className="flex items-center gap-1">
         {title}
         <Button
            variant="ghost"
            size="icon"
            onClick={() => type.toggleSorting(type.getIsSorted() === 'asc')}
         >
            {icon ?? <ChevronsUpDown />}
         </Button>
      </section>
   )
}
