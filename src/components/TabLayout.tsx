import { Tab } from '../App'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Globe 
} from 'lucide-react'

interface TabLayoutProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },  
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'geography', label: 'Geography', icon: Globe },
] as const

export default function TabLayout({ activeTab, onTabChange }: TabLayoutProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-1 md:p-1.5 border border-gray-200/30 overflow-x-auto">
      <div className="flex gap-1 min-w-max md:min-w-0">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as Tab)}
              className={`
                relative flex items-center gap-2 md:gap-3 px-3 md:px-6 py-3 md:py-3.5 rounded-xl font-medium transition-all duration-300 min-w-0 flex-1 min-h-[44px] whitespace-nowrap
                ${isActive 
                  ? 'text-blue-700 bg-white shadow-sm ring-1 ring-blue-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }
              `}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
              <span className="text-xs md:text-sm font-medium truncate">{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm ring-1 ring-blue-100"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}