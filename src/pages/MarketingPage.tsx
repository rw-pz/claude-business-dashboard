import { useEffect, useState, Suspense } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { fetchMarketingData, fetchHeatmapData } from '../services/mockData'
import { MarketingData, HeatmapData } from '../types'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

function MarketingMetrics({ data }: { data: MarketingData[] }) {
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0)
  const totalTrials = data.reduce((sum, item) => sum + item.trials, 0)
  const totalPaid = data.reduce((sum, item) => sum + item.paid, 0)
  const avgConversionRate = (data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length).toFixed(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Visitors</h3>
        <p className="text-3xl font-bold text-gray-900">{totalVisitors.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Trial Signups</h3>
        <p className="text-3xl font-bold text-blue-600">{totalTrials.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Paid Conversions</h3>
        <p className="text-3xl font-bold text-green-600">{totalPaid.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Conversion Rate</h3>
        <p className="text-3xl font-bold text-purple-600">{avgConversionRate}%</p>
      </div>
    </div>
  )
}

function ChannelPerformanceChart({ data }: { data: MarketingData[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Channel Performance</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'conversionRate') return [`${value}%`, 'Conversion Rate']
              return [Number(value).toLocaleString(), name]
            }}
          />
          <Bar dataKey="visitors" fill={COLORS[0]} name="Visitors" />
          <Bar dataKey="trials" fill={COLORS[1]} name="Trials" />
          <Bar dataKey="paid" fill={COLORS[2]} name="Paid" />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ConversionFunnelChart({ data }: { data: MarketingData[] }) {
  const funnelData = data.map(item => ({
    source: item.source,
    visitors: item.visitors,
    trials: item.trials,
    paid: item.paid,
    conversionRate: item.conversionRate
  }))

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Rates by Source</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={funnelData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
          <Bar dataKey="conversionRate" fill={COLORS[3]} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TrafficSourceChart({ data }: { data: MarketingData[] }) {
  const pieData = data.map((item, index) => ({
    name: item.source,
    value: item.visitors,
    color: COLORS[index % COLORS.length]
  }))

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Traffic Sources</h3>
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
          <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Visitors']} />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function MobileHeatmapSummary({ data }: { data: HeatmapData[] }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Calculate best performing times
  const bestHours = data
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 3)
    .map(item => ({ 
      day: days[item.day], 
      hour: item.hour, 
      rate: item.conversionRate 
    }))
  
  // Calculate day averages
  const dayAverages = days.map((day, dayIndex) => {
    const dayData = data.filter(item => item.day === dayIndex)
    const avg = dayData.reduce((sum, item) => sum + item.conversionRate, 0) / dayData.length
    return { day, average: avg || 0 }
  }).sort((a, b) => b.average - a.average)

  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Conversion Insights</h3>
      
      <div className="space-y-6">
        {/* Best Times */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">🔥 Peak Performance Times</h4>
          <div className="space-y-2">
            {bestHours.map((time, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  {time.day} at {time.hour}:00
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {time.rate.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Day Performance */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">📊 Average by Day</h4>
          <div className="grid grid-cols-2 gap-2">
            {dayAverages.map((day, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{day.day}</span>
                <span className="text-sm font-medium text-gray-900">
                  {day.average.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DesktopHeatmap({ data }: { data: HeatmapData[] }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  
  // Create a matrix for the heatmap
  const heatmapMatrix = Array(7).fill(null).map(() => Array(24).fill(0))
  
  // Fill matrix with data
  data.forEach(item => {
    if (item.day >= 0 && item.day < 7 && item.hour >= 0 && item.hour < 24) {
      heatmapMatrix[item.day][item.hour] = item.conversionRate
    }
  })

  // Get min and max values for color scale
  const allValues = data.map(item => item.conversionRate)
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)

  const getColor = (value: number) => {
    if (value === 0) return '#f8f9fa'
    const intensity = (value - minValue) / (maxValue - minValue)
    return `rgb(${Math.round(224 - intensity * 140)}, ${Math.round(242 - intensity * 90)}, 254)`
  }

  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Conversion Rate Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Hours header */}
          <div className="flex mb-1">
            <div className="w-12 md:w-16"></div>
            {hours.map(hour => (
              <div key={hour} className="w-6 md:w-8 text-xs text-center text-gray-600">
                {hour % 4 === 0 ? hour : ''}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 md:w-16 text-xs text-gray-600 pr-2">{day}</div>
              {hours.map(hour => {
                const value = heatmapMatrix[dayIndex][hour]
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="w-6 h-6 md:w-8 md:h-8 border border-gray-200 flex items-center justify-center text-xs font-medium cursor-pointer hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: getColor(value) }}
                    title={`${day} ${hour}:00 - ${value}% conversion rate`}
                  >
                    {value > 0 && window.innerWidth >= 768 ? value.toFixed(1) : ''}
                  </div>
                )
              })}
            </div>
          ))}
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-2 md:space-x-4">
            <span className="text-xs text-gray-600">Low</span>
            <div className="flex">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 md:w-4 md:h-4 border border-gray-200"
                  style={{ backgroundColor: getColor(minValue + (i / 7) * (maxValue - minValue)) }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">High</span>
            <span className="text-xs text-gray-500 ml-2 md:ml-4">({minValue.toFixed(1)}% - {maxValue.toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConversionHeatmap({ data }: { data: HeatmapData[] }) {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileHeatmapSummary data={data} />
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopHeatmap data={data} />
      </div>
    </>
  )
}

function MarketingContent() {
  const [marketingData, setMarketingData] = useState<MarketingData[]>([])
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [marketing, heatmap] = await Promise.all([
          fetchMarketingData(),
          fetchHeatmapData()
        ])
        setMarketingData(marketing)
        setHeatmapData(heatmap)
      } catch (error) {
        console.error('Failed to fetch marketing data:', error)
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
      <MarketingMetrics data={marketingData} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChannelPerformanceChart data={marketingData} />
        <ConversionFunnelChart data={marketingData} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TrafficSourceChart data={marketingData} />
        <div className="xl:col-span-1">
          <ConversionHeatmap data={heatmapData} />
        </div>
      </div>
    </div>
  )
}

export default function MarketingPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading marketing analytics...</div>}>
      <MarketingContent />
    </Suspense>
  )
}