import { motion } from 'framer-motion'
import { useKpi } from '../hooks/useKpi'
import { TrendingUp, DollarSign, Users, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface KpiCardProps {
  title: string
  value: number
  format: 'currency' | 'percentage' | 'number'
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down'
  color: string
}

function AnimatedCounter({ value, format }: { value: number; format: 'currency' | 'percentage' | 'number' }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(val)
      case 'percentage':
        return `${val.toFixed(1)}%`
      case 'number':
        return new Intl.NumberFormat('en-US').format(val)
      default:
        return val.toString()
    }
  }
  
  return <span>{formatValue(count)}</span>
}

function KpiCard({ title, value, format, icon: Icon, trend, color }: KpiCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="metric-card group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3">{title}</p>
          <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">
            <AnimatedCounter value={value} format={format} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1.5 text-xs md:text-sm font-medium ${
              trend === 'up' ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
              )}
              <span>{trend === 'up' ? '+12.5%' : '-2.1%'}</span>
              <span className="text-gray-400 font-normal hidden sm:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default function KpiCards() {
  const { data: kpi, isLoading, error } = useKpi()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="metric-card animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-lg w-20"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-24"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !kpi) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-600">Failed to load KPI data</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Monthly Recurring Revenue"
        value={kpi.mrr}
        format="currency"
        icon={DollarSign}
        trend="up"
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <KpiCard
        title="Annual Recurring Revenue"
        value={kpi.arr}
        format="currency"
        icon={TrendingUp}
        trend="up"
        color="bg-gradient-to-br from-emerald-500 to-emerald-600"
      />
      <KpiCard
        title="Average Revenue Per User"
        value={kpi.arpu}
        format="currency"
        icon={Users}
        trend="up"
        color="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <KpiCard
        title="Churn Rate"
        value={kpi.churnRate}
        format="percentage"
        icon={TrendingDown}
        trend="down"
        color="bg-gradient-to-br from-orange-500 to-orange-600"
      />
    </div>
  )
}