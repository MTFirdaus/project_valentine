import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const BootScreen = () => {
  const [lines, setLines] = useState([])
  
  const bootMessages = [
    'ZasOS v1.4.02 - Love Edition',
    'Initializing romantic protocols...',
    'Loading Love Modules... [OK]',
    'Initializing Heartbeat... [OK]',
    'Detecting cuteness levels... [MAXIMUM]',
    'Calibrating smile detector... [OK]',
    'Loading memories database... [OK]',
    'Activating happiness engine... [OK]',
    'Synchronizing heartbeats... [OK]',
    'Loading girlfriend appreciation module... [OK]',
    'Checking love levels... [INFINITE]',
    'System ready. Starting ZasOS...',
  ]

  useEffect(() => {
    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLines(prev => [...prev, bootMessages[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="w-full h-full bg-black flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="terminal-text text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-5xl">❤</span>
            <span>ZasOS</span>
          </div>
          <div className="terminal-text text-sm opacity-70">
            Love Operating System - Built with 💕 for my Valentine
          </div>
        </motion.div>

        <div className="space-y-2 font-mono text-sm">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="terminal-text"
            >
              <span className="text-gray-500 mr-2">[{String(index).padStart(2, '0')}]</span>
              {line}
            </motion.div>
          ))}
          {lines.length > 0 && (
            <motion.div 
              className="terminal-text cursor-blink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: lines.length >= bootMessages.length ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="terminal-text flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>System initialization complete</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BootScreen