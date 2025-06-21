import { useEffect, useState, Suspense } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { fetchGeographyData } from '../services/mockData'
import { GeographyData } from '../types'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

function GeographyMetrics({ data }: { data: GeographyData[] }) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0)
  const avgRevenuePerUser = totalUsers > 0 ? (totalRevenue / totalUsers).toFixed(0) : '0'
  const topCity = data.reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">{totalUsers.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Revenue/User</h3>
        <p className="text-3xl font-bold text-green-600">${avgRevenuePerUser}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Top City</h3>
        <p className="text-2xl font-bold text-purple-600">{topCity.city}</p>
        <p className="text-sm text-gray-500">${topCity.revenue.toLocaleString()}</p>
      </div>
    </div>
  )
}

function RevenueByLocationChart({ data }: { data: GeographyData[] }) {
  const chartData = data.map(item => ({
    ...item,
    label: `${item.city}, ${item.country}`
  }))

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue by Location</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="label" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={10}
          />
          <YAxis />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
          <Bar dataKey="revenue" fill={COLORS[0]} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function UsersByLocationChart({ data }: { data: GeographyData[] }) {
  const chartData = data.map(item => ({
    ...item,
    label: `${item.city}, ${item.country}`
  }))

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Users by Location</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="label" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={10}
          />
          <YAxis />
          <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Users']} />
          <Bar dataKey="users" fill={COLORS[1]} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RevenueVsUsersScatter({ data }: { data: GeographyData[] }) {
  const scatterData = data.map(item => ({
    x: item.users,
    y: item.revenue,
    city: item.city,
    country: item.country
  }))

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue vs Users Correlation</h3>
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={scatterData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="x" 
            name="Users"
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            dataKey="y" 
            name="Revenue"
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Revenue') return [`$${Number(value).toLocaleString()}`, name]
              return [Number(value).toLocaleString(), name]
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                const data = payload[0].payload
                return `${data.city}, ${data.country}`
              }
              return label
            }}
          />
          <Scatter dataKey="y" fill={COLORS[2]} />
        </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function LocationBubbleChart({ data }: { data: GeographyData[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((location, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{location.city}</h4>
                <p className="text-sm text-gray-600">{location.country}</p>
              </div>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ 
                  backgroundColor: COLORS[index % COLORS.length],
                  transform: `scale(${Math.max(0.8, Math.sqrt(location.revenue / 50000))})` 
                }}
              >
                {index + 1}
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">${location.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Users:</span>
                <span className="font-medium">{location.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg/User:</span>
                <span className="font-medium">${Math.round(location.revenue / location.users)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Coordinates:</span>
                <span>{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileLocationCards({ data }: { data: GeographyData[] }) {
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Location Performance</h3>
      <div className="space-y-3">
        {sortedData.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.city}</h4>
                <p className="text-xs text-gray-600">{item.country}</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                #{index + 1}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Revenue</p>
                <p className="font-medium">${(item.revenue / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-gray-500">Users</p>
                <p className="font-medium">{(item.users / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-gray-500">Avg/User</p>
                <p className="font-medium">${Math.round(item.revenue / item.users)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesktopLocationTable({ data }: { data: GeographyData[] }) {
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Location Performance</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3">Location</th>
              <th className="px-4 md:px-6 py-3">Revenue</th>
              <th className="px-4 md:px-6 py-3 hidden sm:table-cell">Users</th>
              <th className="px-4 md:px-6 py-3">Revenue/User</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 font-medium text-gray-900">
                  <div>
                    <div className="font-medium">{item.city}</div>
                    <div className="text-xs text-gray-500">{item.country}</div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="font-medium">${item.revenue.toLocaleString()}</div>
                </td>
                <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                  {item.users.toLocaleString()}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="font-medium">${Math.round(item.revenue / item.users)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LocationTable({ data }: { data: GeographyData[] }) {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileLocationCards data={data} />
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopLocationTable data={data} />
      </div>
    </>
  )
}

function GeographyContent() {
  const [geographyData, setGeographyData] = useState<GeographyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGeographyData()
        setGeographyData(data)
      } catch (error) {
        console.error('Failed to fetch geography data:', error)
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
        <div className="animate-pulse bg-gray-200 h-96 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <GeographyMetrics data={geographyData} />
      <LocationBubbleChart data={geographyData} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueByLocationChart data={geographyData} />
        <UsersByLocationChart data={geographyData} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueVsUsersScatter data={geographyData} />
        <LocationTable data={geographyData} />
      </div>
    </div>
  )
}

export default function GeographyPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading geography analytics...</div>}>
      <GeographyContent />
    </Suspense>
  )
}