import { useQuery } from '@tanstack/react-query'
import { fetchKpi } from '../services/mockData'
import { KpiResponse } from '../types'

export const useKpi = () =>
  useQuery<KpiResponse>({
    queryKey: ['kpi'],
    queryFn: fetchKpi,
    refetchInterval: 30_000,
    staleTime: 25_000,
  })