import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '../ui/pagination'

interface TablePaginationProps {
   pageCount: number
   pageIndex: number
   canPreviousPage: boolean
   canNextPage: boolean
   onPageChange: (page: number) => void
   onPreviousPage: () => void
   onNextPage: () => void
}

export function TablePagination({
   pageCount,
   pageIndex,
   canPreviousPage,
   canNextPage,
   onPageChange,
   onPreviousPage,
   onNextPage,
}: TablePaginationProps) {
   return (
      <section>
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     aria-disabled={!canPreviousPage}
                     onClick={onPreviousPage}
                     href="#"
                     tabIndex={!canPreviousPage ? -1 : 0}
                     className={
                        'hover:bg-neutral-200' +
                        (!canPreviousPage
                           ? ' opacity-50 cursor-not-allowed'
                           : '')
                     }
                  />
               </PaginationItem>
               {Array.from({ length: pageCount }).map((_, i) => (
                  <PaginationItem key={i}>
                     <PaginationLink
                        isActive={pageIndex === i}
                        onClick={() => onPageChange(i)}
                        href="#"
                     >
                        {i + 1}
                     </PaginationLink>
                  </PaginationItem>
               ))}
               <PaginationItem>
                  <PaginationNext
                     onClick={onNextPage}
                     aria-disabled={!canNextPage}
                     href="#"
                     tabIndex={!canNextPage ? -1 : 0}
                     className={
                        'hover:bg-neutral-200' +
                        (!canNextPage ? ' opacity-50 cursor-not-allowed' : '')
                     }
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </section>
   )
}
