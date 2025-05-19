import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, RenderOptions } from '@testing-library/react'

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
