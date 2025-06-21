import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import TabLayout from './components/TabLayout'
import LiveIndicator from './components/LiveIndicator'
import OverviewPage from './pages/OverviewPage'
import RevenuePage from './pages/RevenuePage'
import MarketingPage from './pages/MarketingPage'
import GeographyPage from './pages/GeographyPage'

export type Tab = 'overview' | 'revenue' | 'marketing' | 'geography'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage key="overview" />
      case 'revenue':
        return <RevenuePage key="revenue" />
      case 'marketing':
        return <MarketingPage key="marketing" />
      case 'geography':
        return <GeographyPage key="geography" />
      default:
        return <OverviewPage key="overview" />
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl">
        <div className="mb-6 md:mb-8">
          <TabLayout activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <LiveIndicator />
    </div>
  )
}

export default App