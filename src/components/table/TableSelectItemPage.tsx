import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../ui/select'

interface TableSelectItemPageProps {
   pageSize: number
   setPageSize: (size: number) => void
   setPageIndex: (index: number) => void
}

export function TableSelectItemPage({
   pageSize,
   setPageSize,
   setPageIndex,
}: TableSelectItemPageProps) {
   const pageSizes = [10, 30, 50, 100]

   return (
      <section className="flex items-center gap-2">
         <span className="text-sm text-gray-500">Itens por página:</span>
         <Select
            value={String(pageSize)}
            onValueChange={(value) => {
               setPageSize(Number(value))
               setPageIndex(0)
            }}
         >
            <SelectTrigger className="w-auto">
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               {pageSizes.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                     {size}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </section>
   )
}
