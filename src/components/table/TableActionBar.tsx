import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface TableActionBarProps {
   selectedCount: number
   onDeleteSelected?: () => void
   onClearSelection?: () => void
   children?: React.ReactNode
}

export function TableActionBar({
   selectedCount,
   onDeleteSelected,
   onClearSelection,
   children,
}: TableActionBarProps) {
   return (
      <div
         className={`
        fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-white border shadow-lg rounded-lg px-6 py-3 flex items-center gap-4
        min-w-[320px]
        transition-all duration-300
        ${
           selectedCount > 0
              ? 'opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none translate-y-10'
        }
      `}
         style={{
            willChange: 'transform, opacity',
         }}
         aria-hidden={selectedCount === 0}
      >
         <section className="flex items-center border border-neutral-300 rounded-md">
            <span className="text-sm px-4">
               {selectedCount} item{selectedCount > 1 ? 's' : ''} selecionado
               {selectedCount > 1 ? 's' : ''}
            </span>
            {onClearSelection && (
               <>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={onClearSelection}
                     className="border-l rounded-l-none border-neutral-300"
                     aria-label="Limpar seleção"
                     title="limpar selecionados"
                  >
                     <X className="h-10 w-10" />
                  </Button>
               </>
            )}
         </section>

         {onDeleteSelected && (
            <Button
               variant="destructive"
               size="default"
               onClick={onDeleteSelected}
               title="remover selecionados"
            >
               Remover selecionados
            </Button>
         )}
         {children}
      </div>
   )
}
