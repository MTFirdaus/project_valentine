import { motion } from 'framer-motion'

const AboutThoriq = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 min-h-[500px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-1"
          >
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2 font-display"
          >
            Thoriq
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-purple-300 mb-4 font-body"
          >
            Your Boyfriend & Developer
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-morphism rounded-2xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 font-display">
            <span>💝</span>
            <span>About Me</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4 font-body">
            I created this entire operating system just for you because you deserve something as unique and special as you are. Every line of code, every animation, and every detail was crafted with love.
          </p>
          <p className="text-gray-300 leading-relaxed font-body">
            You inspire me to create beautiful things, and this is just one small way to show how much you mean to me. Happy Valentine's Day, my love! ❤️
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <StatCard icon="💻" label="Lines of Code" value="2,000+" color="from-blue-500 to-cyan-500" />
          <StatCard icon="⏱️" label="Hours Spent" value="20+" color="from-purple-500 to-pink-500" />
          <StatCard icon="☕" label="Coffee Consumed" value="∞" color="from-amber-500 to-orange-500" />
          <StatCard icon="❤️" label="Love Level" value="Maximum" color="from-red-500 to-pink-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-morphism rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 font-display">
            <span>🚀</span>
            <span>Built With</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'CSS3', 'Love ❤️'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 text-sm font-semibold font-body"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-sm font-body italic">
            "The best code I've ever written is the code that makes you smile" 💕
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

const StatCard = ({ icon, label, value, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${color} bg-opacity-20 rounded-xl p-4 text-center border border-white/10`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1 font-display">{value}</div>
      <div className="text-xs text-white/70 font-body">{label}</div>
    </motion.div>
  )
}

export default AboutThoriq