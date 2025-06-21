import { Suspense } from 'react'
import KpiCards from '../components/KpiCards'
import GrowthLineChart from '../components/GrowthLineChart'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="animate-pulse">Loading KPIs...</div>}>
        <KpiCards />
      </Suspense>
      
      <Suspense fallback={<div className="animate-pulse">Loading chart...</div>}>
        <GrowthLineChart />
      </Suspense>
    </div>
  )
}