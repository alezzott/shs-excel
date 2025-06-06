import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from '../ui/pagination'

interface TablePaginationProps {
   pageCount: number
   pageIndex: number
   canPreviousPage: boolean
   canNextPage: boolean
   onPreviousPage: () => void
   onNextPage: () => void
}

export function TablePagination({
   pageCount,
   pageIndex,
   canPreviousPage,
   canNextPage,
   onPreviousPage,
   onNextPage,
}: TablePaginationProps) {
   return (
      <section className="flex flex-row items-center gap-8">
         <article>
            <h1 className="text-sm text-nowrap text-[#252525]">
               Página <b>{pageIndex + 1}</b> de <b>{pageCount}</b>
            </h1>
         </article>
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     href="/"
                     aria-disabled={!canPreviousPage}
                     onClick={(e) => {
                        e.preventDefault()
                        onPreviousPage()
                     }}
                     tabIndex={!canPreviousPage ? -1 : 0}
                     className={
                        'border border-gray-300 hover:bg-white' +
                        (!canPreviousPage
                           ? ' cursor-not-allowed opacity-50'
                           : '')
                     }
                  />
               </PaginationItem>
               <PaginationItem>
                  <PaginationNext
                     onClick={(e) => {
                        e.preventDefault()
                        onNextPage()
                     }}
                     aria-disabled={!canNextPage}
                     href="/"
                     tabIndex={!canNextPage ? -1 : 0}
                     className={
                        'border border-gray-300 hover:bg-white' +
                        (!canNextPage ? ' cursor-not-allowed opacity-50' : '')
                     }
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </section>
   )
}
