import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
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

export function handlePaginationRange(
   pageCount: number,
   pageIndex: number,
   siblingCount = 1
): (number | 'dots')[] {
   const totalPage = siblingCount * 2 + 5
   if (pageCount <= totalPage) {
      return Array.from({ length: pageCount }, (_, i) => i)
   }

   const startPage = Math.max(pageIndex - siblingCount, 1)
   const endPage = Math.min(pageIndex + siblingCount, pageCount - 2)
   const range: (number | 'dots')[] = [0]

   startPage > 1 ? range.push('dots') : null

   for (let i = startPage; i <= endPage; i++) {
      range.push(i)
   }

   endPage < pageCount - 2 ? range.push('dots') : null

   range.push(pageCount - 1)
   return range
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
   const range = handlePaginationRange(pageCount, pageIndex)

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
               {range.map((page, idx) =>
                  page === 'dots' ? (
                     <PaginationItem key={`dot-${idx}`}>
                        <PaginationEllipsis />
                     </PaginationItem>
                  ) : (
                     <PaginationItem key={page}>
                        <PaginationLink
                           href="#"
                           isActive={pageIndex === page}
                           onClick={() => onPageChange(page)}
                        >
                           {page + 1}
                        </PaginationLink>
                     </PaginationItem>
                  )
               )}
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
