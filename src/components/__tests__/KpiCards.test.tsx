import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect } from 'vitest'
import KpiCards from '../KpiCards'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('KpiCards', () => {
  it('renders loading state initially', () => {
    renderWithQueryClient(<KpiCards />)
    expect(screen.getByText('Loading KPIs...')).toBeInTheDocument()
  })
})