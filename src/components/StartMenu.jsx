import { motion, AnimatePresence } from 'framer-motion'

const StartMenu = ({ isOpen, onClose, onOpenAbout, onOpenSystemInfo }) => {
  const handleShutdown = () => {
    const shutdownOverlay = document.createElement('div')
    shutdownOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: black;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00ff41;
      font-family: monospace;
      font-size: 24px;
    `
    shutdownOverlay.innerHTML = '<div>Shutting down ZasOS...<br/>See you soon! ❤️</div>'
    document.body.appendChild(shutdownOverlay)
    
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-16 left-4 z-50 w-80"
          >
            <div className="glass-morphism rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display">ZasOS</h3>
                    <p className="text-white/80 text-sm font-body">Love Edition v1.4.02</p>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                <MenuItem
                  icon="👤"
                  label="About Thoriq"
                  description="The creator of this love"
                  onClick={() => {
                    onOpenAbout()
                    onClose()
                  }}
                />
                <MenuItem
                  icon="ℹ️"
                  label="System Info"
                  description="ZasOS specifications"
                  onClick={() => {
                    onOpenSystemInfo()
                    onClose()
                  }}
                />
                <div className="h-px bg-white/10 my-2" />
                <MenuItem
                  icon="🔌"
                  label="Shutdown"
                  description="Close ZasOS"
                  onClick={handleShutdown}
                  danger
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const MenuItem = ({ icon, label, description, onClick, danger = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-3 rounded-xl text-left transition-colors ${
        danger
          ? 'hover:bg-red-500/20 hover:border-red-500/30'
          : 'hover:bg-white/10'
      } border border-transparent`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <div className={`font-semibold font-body ${danger ? 'text-red-300' : 'text-white'}`}>
            {label}
          </div>
          <div className="text-xs text-white/60 font-body">{description}</div>
        </div>
      </div>
    </motion.button>
  )
}

export default StartMenu