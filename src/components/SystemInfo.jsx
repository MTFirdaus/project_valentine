import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SystemInfo = () => {
  const [systemStats, setSystemStats] = useState({
    uptime: 0,
    loveLevel: 100,
    heartbeat: 72,
    happiness: 100,
  })

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setSystemStats(prev => ({
        ...prev,
        uptime: elapsed,
        heartbeat: 68 + Math.floor(Math.random() * 8),
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}h ${mins}m ${secs}s`
  }

  const specs = [
    { label: 'Operating System', value: 'ZasOS Love Edition', icon: '💻' },
    { label: 'Version', value: 'v1.4.02', icon: '📦' },
    { label: 'Build Date', value: 'February 14, 2024', icon: '📅' },
    { label: 'Developer', value: 'Thoriq with ❤️', icon: '👨‍💻' },
    { label: 'Framework', value: 'React 18 + Vite', icon: '⚛️' },
    { label: 'UI Library', value: 'Tailwind CSS', icon: '🎨' },
    { label: 'Animation', value: 'Framer Motion', icon: '✨' },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950 min-h-[500px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-display flex items-center gap-3">
            <span className="text-4xl">🖥️</span>
            <span>System Information</span>
          </h1>
          <p className="text-gray-400 font-body">ZasOS Love Operating System</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <LiveStat
            icon="⏱️"
            label="System Uptime"
            value={formatUptime(systemStats.uptime)}
            color="from-blue-500 to-cyan-500"
          />
          <LiveStat
            icon="❤️"
            label="Love Level"
            value={`${systemStats.loveLevel}%`}
            color="from-pink-500 to-rose-500"
            animated
          />
          <LiveStat
            icon="💓"
            label="Heartbeat"
            value={`${systemStats.heartbeat} BPM`}
            color="from-red-500 to-pink-500"
            pulse
          />
          <LiveStat
            icon="😊"
            label="Happiness Index"
            value={`${systemStats.happiness}%`}
            color="from-yellow-500 to-orange-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism rounded-2xl p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 font-display">System Specifications</h2>
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{spec.icon}</span>
                  <span className="text-gray-400 font-body">{spec.label}</span>
                </div>
                <span className="text-white font-semibold font-body">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const LiveStat = ({ icon, label, value, color, animated = false, pulse = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${color} bg-opacity-20 rounded-xl p-4 border border-white/10 ${
        pulse ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-white/80 text-sm font-body">{label}</span>
      </div>
      <motion.div
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-2xl font-bold text-white font-display"
      >
        {value}
      </motion.div>
    </motion.div>
  )
}

export default SystemInfo