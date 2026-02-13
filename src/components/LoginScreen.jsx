import { motion } from 'framer-motion'
import { useState } from 'react'

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password === '1402') {
      onLogin(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setError(false)
      }, 600)
      setPassword('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden animated-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: -100,
              rotate: Math.random() * 360 + 360
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      {/* Login card */}
      <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className={shake ? 'shake' : ''}
        >
          <div className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full">
            {/* Logo/Avatar */}
            <motion.div 
              className="flex justify-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 p-1">
                <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-6xl">💝</span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                ZasOS
              </h1>
              <p className="text-white/80 font-body text-lg">
                Welcome to Love OS
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 font-body mb-2 text-sm">
                  Enter Password
                </label>
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••"
                  animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border ${
                    error ? 'border-red-400' : 'border-white/20'
                  } text-white placeholder-white/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all font-body`}
                  autoFocus
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 text-sm mt-2 font-body"
                  >
                    ❌ Incorrect password. Try again!
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-body font-semibold text-lg shadow-lg hover:shadow-xl transition-all pulse-glow"
              >
                Login to ZasOS
              </motion.button>
            </form>

            {/* Hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-white/60 text-xs font-body">
                💡 Hint: Our special date (DDMM)
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </motion.div>
  )
}

export default LoginScreen