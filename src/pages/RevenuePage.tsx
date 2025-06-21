import { useEffect, useState, Suspense } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { fetchRevenueData } from '../services/mockData'
import { RevenueData } from '../types'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

function RevenueMetrics({ data }: { data: RevenueData[] }) {
  const latestMonth = data[data.length - 1]
  const totalRevenue = latestMonth?.netRevenue || 0
  const refundRate = latestMonth ? (latestMonth.refunds / latestMonth.netRevenue * 100).toFixed(1) : '0'
  const avgMonthlyGrowth = data.length > 1 
    ? (((data[data.length - 1].netRevenue - data[0].netRevenue) / data[0].netRevenue) / (data.length - 1) * 100).toFixed(1)
    : '0'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue (Current Month)</h3>
        <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Refund Rate</h3>
        <p className="text-3xl font-bold text-red-600">{refundRate}%</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Monthly Growth</h3>
        <p className="text-3xl font-bold text-green-600">+{avgMonthlyGrowth}%</p>
      </div>
    </div>
  )
}

function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue by Plan Type</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
          <Bar dataKey="starter" fill={COLORS[0]} name="Starter" />
          <Bar dataKey="pro" fill={COLORS[1]} name="Pro" />
          <Bar dataKey="enterprise" fill={COLORS[2]} name="Enterprise" />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RevenueTrendChart({ data }: { data: RevenueData[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Net Revenue Trend</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Net Revenue']} />
          <Line type="monotone" dataKey="netRevenue" stroke={COLORS[0]} strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function PlanDistributionChart({ data }: { data: RevenueData[] }) {
  const latestMonth = data[data.length - 1]
  if (!latestMonth) return null

  const pieData = [
    { name: 'Starter', value: latestMonth.starter, color: COLORS[0] },
    { name: 'Pro', value: latestMonth.pro, color: COLORS[1] },
    { name: 'Enterprise', value: latestMonth.enterprise, color: COLORS[2] },
  ]

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Month Plan Distribution</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RevenueContent() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRevenueData()
        setRevenueData(data)
      } catch (error) {
        console.error('Failed to fetch revenue data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 h-32 rounded-2xl"></div>
        <div className="animate-pulse bg-gray-200 h-80 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RevenueMetrics data={revenueData} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <RevenueTrendChart data={revenueData} />
      </div>
      <PlanDistributionChart data={revenueData} />
    </div>
  )
}

export default function RevenuePage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading revenue analytics...</div>}>
      <RevenueContent />
    </Suspense>
  )
}