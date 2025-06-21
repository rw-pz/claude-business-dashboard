import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const mockGrowthData = [
  { month: 'Jan', actual: 125000, target: 120000 },
  { month: 'Feb', actual: 132000, target: 130000 },
  { month: 'Mar', actual: 145000, target: 140000 },
  { month: 'Apr', actual: 158000, target: 155000 },
  { month: 'May', actual: 172000, target: 170000 },
  { month: 'Jun', actual: 185000, target: 180000 },
]

export default function GrowthLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card"
    >
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Growth Trajectory</h3>
        <p className="text-sm md:text-base text-gray-500">Monthly recurring revenue vs target</p>
      </div>
      
      <div className="h-64 sm:h-80 xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockGrowthData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`,
                name === 'actual' ? 'Actual' : 'Target'
              ]}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 6, fill: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary"></div>
          <span className="text-sm text-gray-600">Actual Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-400 border-dashed"></div>
          <span className="text-sm text-gray-600">Target Revenue</span>
        </div>
      </div>
    </motion.div>
  )
}