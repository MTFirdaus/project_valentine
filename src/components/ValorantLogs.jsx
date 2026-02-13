import { motion } from 'framer-motion'

const ValorantLogs = () => {
  const matchHistory = [
    {
      id: 1,
      map: 'First Date Cafe',
      date: 'Jan 14, 2024',
      result: 'Victory',
      love: 95,
      hugs: 12,
      kisses: 8,
      mvp: true,
    },
    {
      id: 2,
      map: 'Beach Sunset',
      date: 'Feb 10, 2024',
      result: 'Victory',
      love: 100,
      hugs: 15,
      kisses: 20,
      mvp: true,
    },
    {
      id: 3,
      map: 'Movie Theater',
      date: 'Feb 14, 2024',
      result: 'Victory',
      love: 100,
      hugs: 18,
      kisses: 25,
      mvp: true,
    },
    {
      id: 4,
      map: 'Picnic Park',
      date: 'Mar 05, 2024',
      result: 'Victory',
      love: 98,
      hugs: 20,
      kisses: 15,
      mvp: true,
    },
    {
      id: 5,
      map: 'Coffee Shop Corner',
      date: 'Mar 20, 2024',
      result: 'Victory',
      love: 100,
      hugs: 10,
      kisses: 12,
      mvp: true,
    },
  ]

  const totalStats = {
    matches: matchHistory.length,
    wins: matchHistory.filter(m => m.result === 'Victory').length,
    totalLove: matchHistory.reduce((acc, m) => acc + m.love, 0),
    totalHugs: matchHistory.reduce((acc, m) => acc + m.hugs, 0),
    totalKisses: matchHistory.reduce((acc, m) => acc + m.kisses, 0),
  }

  return (
    <div className="bg-gradient-to-br from-gray-950 via-red-950/20 to-gray-950 p-6 min-h-[500px]">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🎮</span>
          <div>
            <h2 className="text-3xl font-display font-bold text-white">Love Match History</h2>
            <p className="text-gray-400 font-body">Every moment with you is a victory</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-4 text-center"
          >
            <div className="text-green-400 text-3xl font-bold">{totalStats.wins}</div>
            <div className="text-green-300/60 text-sm font-body">Dates Won</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 rounded-lg p-4 text-center"
          >
            <div className="text-pink-400 text-3xl font-bold">{totalStats.totalLove}</div>
            <div className="text-pink-300/60 text-sm font-body">Total Love</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-4 text-center"
          >
            <div className="text-purple-400 text-3xl font-bold">{totalStats.totalHugs}</div>
            <div className="text-purple-300/60 text-sm font-body">Total Hugs</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-lg p-4 text-center"
          >
            <div className="text-red-400 text-3xl font-bold">{totalStats.totalKisses}</div>
            <div className="text-red-300/60 text-sm font-body">Total Kisses</div>
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-semibold text-gray-400 uppercase font-body">
          <div className="col-span-4">Location</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Result</div>
          <div className="col-span-1 text-center">Love</div>
          <div className="col-span-2 text-center">Hugs</div>
          <div className="col-span-2 text-center">Kisses</div>
        </div>

        {matchHistory.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className={`grid grid-cols-12 gap-2 px-4 py-3 rounded-lg transition-colors ${
              match.mvp
                ? 'bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20'
                : 'bg-white/5'
            }`}
          >
            <div className="col-span-4 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-white font-semibold text-sm font-body">{match.map}</div>
                {match.mvp && (
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <span>⭐</span>
                    <span>MVP Date</span>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <span className="text-gray-400 text-sm font-body">{match.date}</span>
            </div>

            <div className="col-span-1 flex items-center justify-center">
              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                {match.result}
              </span>
            </div>

            <div className="col-span-1 flex items-center justify-center">
              <div className="text-pink-400 font-bold text-lg">{match.love}</div>
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center gap-1">
                <span className="text-purple-400 font-semibold text-lg">{match.hugs}</span>
                <span className="text-purple-400/60">🤗</span>
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center gap-1">
                <span className="text-red-400 font-semibold text-lg">{match.kisses}</span>
                <span className="text-red-400/60">💋</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg"
      >
        <div className="text-center">
          <p className="text-white font-semibold mb-2 font-body">🏆 Perfect Record!</p>
          <p className="text-gray-400 text-sm font-body">
            Win Rate: 100% • Average Love Score: {(totalStats.totalLove / totalStats.matches).toFixed(1)}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ValorantLogs