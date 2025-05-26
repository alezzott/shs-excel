import { render, screen } from '@testing-library/react'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationPrevious,
   PaginationNext,
   PaginationEllipsis,
} from '../../pagination'

test('renderiza o componente Pagination', () => {
   render(
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#" isActive>
                  1
               </PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationNext href="#" />
            </PaginationItem>
            <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
   expect(screen.getByLabelText('pagination')).toBeInTheDocument()
   expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
   expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
   expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page')
   expect(screen.getByText('2')).not.toHaveAttribute('aria-current')
   expect(screen.getByLabelText('pagination')).toContainElement(
      screen.getByText('1')
   )
   expect(screen.getByLabelText('pagination')).toContainElement(
      screen.getByText('2')
   )
   expect(screen.getByLabelText('pagination')).toBeVisible()
})
