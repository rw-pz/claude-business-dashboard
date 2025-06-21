import { BarChart3 } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 max-w-7xl">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-2xl ring-1 ring-blue-500/20">
            <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gradient">Business Analytics</h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">Real-time insights & metrics</p>
          </div>
        </div>
      </div>
    </nav>
  )
}