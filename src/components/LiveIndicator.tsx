import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Wifi, WifiOff } from 'lucide-react'

export default function LiveIndicator() {
  const { isFetching, isError } = useQuery({
    queryKey: ['live-status'],
    queryFn: () => Promise.resolve({ status: 'ok' }),
    refetchInterval: 30_000,
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className={`
        flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium backdrop-blur-md
        ${isError 
          ? 'bg-red-50/80 text-red-700 border border-red-200/50 shadow-lg' 
          : 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/50 shadow-lg'
        }
      `}>
        {isError ? (
          <WifiOff className="w-4 h-4" />
        ) : (
          <motion.div
            animate={{ rotate: isFetching ? 360 : 0 }}
            transition={{ duration: 1, repeat: isFetching ? Infinity : 0 }}
          >
            <Wifi className="w-4 h-4" />
          </motion.div>
        )}
        <span>{isError ? 'Offline' : 'Live'}</span>
      </div>
    </motion.div>
  )
}