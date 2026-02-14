import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Window from './Window'
import OurMemories from './OurMemories'
import Terminal from './Terminal'
import MusicPlayer from './MusicPlayer'
import ValorantLogs from './ValorantLogs'
import StartMenu from './StartMenu'
import AboutThoriq from './AboutThoriq'
import SystemInfo from './SystemInfo'
import Notification from './Notification'

const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [windows, setWindows] = useState([])
  const [nextId, setNextId] = useState(1)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showTimeTooltip, setShowTimeTooltip] = useState(false)
  
  const constraintsRef = useRef(null)
  const anniversaryDate = new Date('2024-02-14') // Sesuaikan tanggal jadian

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true)
    }, 5000)
    return () => clearTimeout(notificationTimer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', minute: '2-digit', hour12: true 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  const getTimeTogether = () => {
    const now = new Date()
    const diff = now - anniversaryDate
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return `${days} days, ${hours} hours`
  }

  // --- WINDOW MANAGEMENT (Logic Diperbaiki) ---

  const openWindow = (title, content) => {
    setWindows(prev => {
      // Cek apakah window dengan judul sama sudah ada? Kalau ada, fokus aja.
      const existing = prev.find(w => w.title === title)
      if (existing) {
        // Kalau terminimize, buka dulu
        if (existing.isMinimized) {
           return prev.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextId } : w)
        }
        return prev
      }

      // Kalau belum ada, buat baru
      const newWindow = {
        id: nextId,
        title,
        content,
        isMinimized: false,
        zIndex: nextId
      }
      setNextId(n => n + 1)
      return [...prev, newWindow]
    })
  }

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
  }

  const focusWindow = (id) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0)
      return prev.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      )
    })
  }

  // Logic Pintar Taskbar Click
  const handleTaskbarClick = (id) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id)
      if (!win) return prev

      // KASUS 1: Window sedang diminimize -> Buka (Restore) & Fokus
      if (win.isMinimized) {
        const maxZ = Math.max(...prev.map(w => w.zIndex), 0)
        return prev.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
        )
      }
      
      // KASUS 2: Window sedang terbuka -> Minimize (Tutup Sementara)
      return prev.map(w => 
        w.id === id ? { ...w, isMinimized: true } : w
      )
    })
  }

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            {['❤', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* DESKTOP ICONS */}
      <div className="absolute top-8 left-8 space-y-4 z-10">
        <DesktopIcon icon="📁" label="Our Memories" onClick={() => openWindow('Our Memories', <OurMemories />)} />
        <DesktopIcon icon="⌨️" label="Terminal" onClick={() => openWindow('Terminal', <Terminal />)} />
        <DesktopIcon icon="🎵" label="Music Player" onClick={() => openWindow('Music Player', <MusicPlayer />)} />
        <DesktopIcon icon="🎮" label="Love Logs" onClick={() => openWindow('Love Match History', <ValorantLogs />)} />
        <DesktopIcon icon="💌" label="Love Letters" onClick={() => openWindow('Love Letters', 
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">My Dearest,</h2>
            <p className="leading-relaxed">Setiap momen bersamamu terasa seperti mimpi yang menjadi kenyataan. Kamu membuat duniaku lebih cerah dan hatiku lebih penuh. Selamat Hari Valentine Saskia Sayang!</p>
          </div>
        )} />
      </div>

      {/* WINDOW AREA */}
      <div ref={constraintsRef} className="absolute inset-0 bottom-14 pointer-events-none z-20">
        <AnimatePresence mode="popLayout">
          {windows.map(window => (
            !window.isMinimized && (
              <div key={window.id} className="pointer-events-auto">
                <Window
                  id={window.id}
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => minimizeWindow(window.id)}
                  onFocus={() => focusWindow(window.id)}
                  zIndex={window.zIndex}
                  dragConstraints={constraintsRef}
                >
                  {window.content}
                </Window>
              </div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* TASKBAR */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-14 glass-morphism border-t border-white/20 flex items-center justify-between px-4 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <span className="text-xl">💝</span>
          <span className="font-display">ZasOS</span>
        </motion.button>

        <div className="flex gap-2">
          {windows.map(window => (
            <motion.button
              key={window.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTaskbarClick(window.id)} // <--- PAKE FUNGSI BARU DISINI
              className={`px-4 py-2 rounded-lg ${
                window.isMinimized ? 'bg-white/10 opacity-70' : 'bg-white/20 border-b-2 border-pink-400'
              } text-white text-sm font-body border border-white/20 hover:bg-white/30 transition-all`}
            >
              {window.title}
            </motion.button>
          ))}
        </div>

        <div 
          className="text-white text-right relative"
          onMouseEnter={() => setShowTimeTooltip(true)}
          onMouseLeave={() => setShowTimeTooltip(false)}
        >
          <div className="text-sm font-semibold font-display">{formatTime(time)}</div>
          <div className="text-xs opacity-80 font-body">{formatDate(time)}</div>
          
          {showTimeTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 rounded-lg shadow-xl border border-white/20 whitespace-nowrap"
            >
              <div className="text-xs text-white/80 font-body mb-1">Together for:</div>
              <div className="text-sm font-semibold text-pink-300 font-display">
                ❤️ {getTimeTogether()}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* MUSIC PLAYER WIDGET */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="absolute bottom-20 right-6 z-40"
      >
        <MusicPlayer isWidget={true} />
      </motion.div>

      {/* START MENU & NOTIF */}
      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)}
        onOpenAbout={() => openWindow('About Thoriq', <AboutThoriq />)}
        onOpenSystemInfo={() => openWindow('System Information', <SystemInfo />)}
      />

      <Notification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        title="New Message from Thoriq"
        message="Selamat Hari Valentine, Zass! langsung ajaa tes OS  spesial yang kubuat buat kamuu. Setiap fiturnya udah aku isi yang pernah kita jalanin hehe meskipun ga semua yaa!!!"
        icon="💝"
      />
    </motion.div>
  )
}

const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all group"
    >
      <div className="text-5xl drop-shadow-lg">{icon}</div>
      <div className="text-white text-sm font-body font-semibold drop-shadow-md group-hover:text-pink-200 transition-colors">
        {label}
      </div>
    </motion.button>
  )
}

export default Desktop