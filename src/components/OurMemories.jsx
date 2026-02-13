import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const OurMemories = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const photos = [
    { id: 1, title: 'First Date', date: 'January 2024', color: 'from-pink-400 to-rose-500' },
    { id: 2, title: 'Beach Day', date: 'February 2024', color: 'from-blue-400 to-cyan-500' },
    { id: 3, title: 'Movie Night', date: 'March 2024', color: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Picnic Date', date: 'April 2024', color: 'from-green-400 to-emerald-500' },
    { id: 5, title: 'Coffee Shop', date: 'May 2024', color: 'from-amber-400 to-orange-500' },
    { id: 6, title: 'Sunset Walk', date: 'June 2024', color: 'from-orange-400 to-red-500' },
    { id: 7, title: 'Restaurant Date', date: 'July 2024', color: 'from-red-400 to-pink-500' },
    { id: 8, title: 'Park Adventure', date: 'August 2024', color: 'from-teal-400 to-blue-500' },
    { id: 9, title: 'Birthday Surprise', date: 'September 2024', color: 'from-violet-400 to-purple-500' },
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Our Memories 📸</h2>
        <p className="text-gray-400 font-body">Every moment with you is worth remembering</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer"
          >
            <div className={`aspect-square rounded-xl bg-gradient-to-br ${photo.color} p-1 shadow-lg hover:shadow-2xl transition-shadow`}>
              <div className="w-full h-full rounded-lg bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <span className="text-4xl mb-2">💕</span>
                <span className="text-sm font-semibold font-body">{photo.title}</span>
                <span className="text-xs opacity-70 font-body">{photo.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            style={{ margin: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${selectedPhoto.color} p-2 shadow-2xl`}>
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-8xl mb-4 block">💝</span>
                      <p className="text-white/60 text-sm font-body">Photo placeholder</p>
                      <p className="text-white/40 text-xs font-body mt-2">Replace with actual image URL</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 font-display">{selectedPhoto.title}</h3>
                    <p className="text-gray-400 mb-4 font-body">{selectedPhoto.date}</p>
                    <p className="text-gray-300 leading-relaxed font-body">
                      This was such a beautiful day! Every moment with you creates memories I'll treasure forever. 💕
                    </p>
                  </div>

                  <div className="px-6 pb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPhoto(null)}
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold font-body"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OurMemories