import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

// Perhatikan ada prop baru: 'dragConstraints'
const Window = ({ id, title, children, onClose, onMinimize, onFocus, zIndex = 1, dragConstraints }) => {
  const windowRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  
  // HAPUS function getDragConstraints() yang lama, kita ganti pakai prop dari Desktop

  return (
    <motion.div
      ref={windowRef}
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints} // <--- INI KUNCINYA (Pakai ref dari Desktop)
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true)
        onFocus()
      }}
      onDragEnd={() => setIsDragging(false)}
      onMouseDown={() => onFocus()}
      // Posisi awal window kita atur biar numpuknya rapi (cascade)
      initial={{ scale: 0, opacity: 0, y: 0, x: 0 }} 
      animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ 
        position: 'absolute',
        top: 50 + (id * 20),  // Posisi awal agak turun dikit tiap window baru
        left: 50 + (id * 20),
        zIndex: zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      className="w-[500px] max-w-[90vw] select-none pointer-events-auto" // pointer-events-auto penting!
    >
      <motion.div 
        className="glass-morphism rounded-xl shadow-2xl overflow-hidden border border-white/20"
        animate={{ 
          boxShadow: isDragging 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Window Header / Title Bar */}
        <div className="bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between cursor-move">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <h3 className="text-white font-semibold font-body">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Tombol Minimize */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onMinimize()
              }}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>
            
            {/* Tombol Close */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.8)' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-red-500 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Window Content Area */}
        <div className="bg-gray-900/90 backdrop-blur-sm max-h-[60vh] overflow-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Window