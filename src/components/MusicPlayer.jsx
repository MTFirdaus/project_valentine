import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const MusicPlayer = ({ isWidget = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const progressInterval = useRef(null)

  const playlist = [
    { title: 'Perfect', artist: 'Ed Sheeran', duration: 263 },
    { title: 'All of Me', artist: 'John Legend', duration: 269 },
    { title: 'Thinking Out Loud', artist: 'Ed Sheeran', duration: 281 },
    { title: 'A Thousand Years', artist: 'Christina Perri', duration: 285 },
  ]

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= playlist[currentTrack].duration) {
            handleNext()
            return 0
          }
          setProgress((newTime / playlist[currentTrack].duration) * 100)
          return newTime
        })
      }, 1000)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, currentTrack])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setCurrentTime(0)
    setProgress(0)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setCurrentTime(0)
    setProgress(0)
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    const newTime = (percentage / 100) * playlist[currentTrack].duration
    setProgress(percentage)
    setCurrentTime(newTime)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const track = playlist[currentTrack]

  if (isWidget) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-morphism rounded-2xl p-4 w-80 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🎵</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">{track.title}</div>
            <div className="text-white/60 text-xs truncate">{track.artist}</div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        </div>

        <div className="mt-3">
          <div
            onClick={handleProgressClick}
            className="h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/30 to-pink-900/30 p-8 min-h-[500px] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl"
        >
          <span className="text-8xl">🎵</span>
        </motion.div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">{track.title}</h2>
          <p className="text-xl text-gray-300 font-body">{track.artist}</p>
        </div>

        <div className="mb-6">
          <div
            onClick={handleProgressClick}
            className="h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden mb-2"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 18h2V6h-2zm-11 0l8.5-6L5 6z" />
            </svg>
          </motion.button>
        </div>

        <div className="mt-8 space-y-2">
          <h3 className="text-white/60 text-sm font-semibold mb-3 font-body">Up Next</h3>
          {playlist.map((song, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              onClick={() => {
                setCurrentTrack(index)
                setCurrentTime(0)
                setProgress(0)
                setIsPlaying(true)
              }}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                index === currentTrack
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-semibold">{song.title}</div>
                  <div className="text-white/60 text-xs">{song.artist}</div>
                </div>
                <div className="text-white/40 text-xs">{formatTime(song.duration)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default MusicPlayer