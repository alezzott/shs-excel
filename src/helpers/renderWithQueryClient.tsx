import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function renderWithQueryClient(
   ui: ReactElement,
   options?: RenderOptions
) {
   const queryClient = new QueryClient()
   return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
      options
   )
}
