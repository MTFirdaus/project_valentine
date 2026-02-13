import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const Notification = ({ isVisible, onClose, title, message, icon = '💝' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -100, x: 100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 right-6 z-[60] w-96 max-w-[calc(100vw-3rem)]"
        >
          <div className="glass-morphism rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <span className="text-white font-semibold font-body text-sm">ZasOS</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="p-4 bg-gray-900/90 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-2 font-display">{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-body">{message}</p>
            </div>

            <motion.div
              className="h-1 bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification