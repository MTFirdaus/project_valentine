import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const OurMemories = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // --- MASUKKAN FOTO & CERITA UNIK DI SINI ---
  const photos = [
    { 
      id: 1, 
      title: 'FIRST DATE', 
      date: 'Desember 2023', 
      color: 'from-pink-400 to-rose-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEgYSw4zVQupdh1D_EmrcZGT2DuJDU7Kw-W3fbxy4q_DXE2dm-bPLe-cNfMdf4tK2Q_VvqAR6_KLP48PUl-NxPrgP3CGEreHA_nvEmcWD3GIjLCqxhOrb0wWOTdUm2YVIfYhB42L_jujDC_RZ4xsYfs53aBJU4DTfXcMe1MoREnisYycSn4sVdy0Gkii0qqG',
      description: "ini pas kamu ngajak ke nikahan gurumu, tapi malah gajadi karna ujan, akhirnya malah ngedate WKWKWK"
    },
    { 
      id: 2, 
      title: 'PANTAI', 
      date: 'February 2024', 
      color: 'from-blue-400 to-cyan-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEgd8bbwfTu3Bp8XzM0FR9m9wgxFxcrn0C5C_h0l4DI3_DtcYWWhdM-gWx0IaD83oM4wmG6BZ7V28sxHh2S5R4Dizf_13XtPQRP5wiI9fF8D-RL8EiX5a9yUYo5fieKn4KAgvUJ6mk1Dx49-7kB9T50yRj0HPRKGdphKTRrNjX9JItGAMe2Uwtrr347tia85=w320-h304',
      description: "Kita belom ke pantai samsek woii🌊"
    },
    { 
      id: 3, 
      title: 'MOVIE NIGHT', 
      date: 'March 2024', 
      color: 'from-purple-400 to-pink-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEiBDmZzFGrnxpvlfwCbfrXd1IELCMoXiLYlio-IzI01lfXMujE49Z737Xx_LTpn9iE77BV-WFevzC9_kOhYalfxLIjxPFAUNqwtOCQl-WPv6LG0thJEB1yVsDPjsQNLWV1ADG84KeVznI6aQusHec_sAXWlmU-gBsSXr7YWyXVUuujV4czqRYWI7Hl26YWL=w180-h320',
      description: "Nonton film bareng kamu, padahal aslinya aku lebih sering ngelirik ke arah kamu daripada nonton filmnya hehe. Your face is my favorite view. 🎬"
    },
    { 
      id: 4, 
      title: 'BUKBER HAHAHA', 
      date: 'April 2024', 
      color: 'from-green-400 to-emerald-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEiqY7yQYgEUIVYj2vQKE225BfyQk9BBX92usUnNa6fDQiJ32zqQZ6W5zlnFUe-qurtuZIJTnmzEqiyr0rDEaHV33RVk6KY-qLzWw6oI1Ku1EqfR0hhVqA55s5eItavnHN4KQ_OA_v2spl42vhIbAcFxCd2DKnX3Wp19kmzl_bKMqsfh1mt8mCZ0ju0PUWN7',
      description: "Bukber pertama, sih"
    },
    { 
      id: 5, 
      title: 'COFFEE SHOP', 
      date: 'May 2024', 
      color: 'from-amber-400 to-orange-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEgd8bbwfTu3Bp8XzM0FR9m9wgxFxcrn0C5C_h0l4DI3_DtcYWWhdM-gWx0IaD83oM4wmG6BZ7V28sxHh2S5R4Dizf_13XtPQRP5wiI9fF8D-RL8EiX5a9yUYo5fieKn4KAgvUJ6mk1Dx49-7kB9T50yRj0HPRKGdphKTRrNjX9JItGAMe2Uwtrr347tia85=w320-h304',
      description: "Belom ngopi bareng jugaa"
    },
    { 
      id: 6, 
      title: 'SUNSET', 
      date: 'June 2024', 
      color: 'from-orange-400 to-red-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEh9BO_j036ktxVziGiO3wU0yIj3xRmJSD3ni1vk5dAhDeltFTeywtYHf9rbeUYhM0prba0G4ObUUQ1QAK7CM45w31zHgbu1okzUHgQgKzTbH4Ri0XRHD2qjcI827kUBJJGuIHngd7zmPWwWgtxzzaiqcek6CBIq-u5MvFbhvbLn1NWxWDJZuXu3WTL2sbg2',
      description: "Gaada foto yang bagus sih, tapi ntar kuisi kalo kita sunset-an lagi"
    },
    { 
      id: 7, 
      title: 'CANDID SCHOOL', 
      date: 'February 2024', 
      color: 'from-red-400 to-pink-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEhgdCCWSoezCf3dzKi5SsOgEpIpIsj6nEWXu8DWO3NPnuI3utJAbakcw1eeX33WBhrTKXzDdwxekvd1TSPQ7XE90_oDUN8MlSJdJkKyOnmNq0VGrRWupee9ZKlM6pP49_Q9CCquWBYljhSKW9ny9rkLYQFbWgjPWcxCwQjtyY0R7Mtmn5tI4IiDbWRMxIJL',
      description: "Makasi buat yang ngefotoin asli HAAHAHAA"
    },
    { 
      id: 8, 
      title: 'INI FIRST DATE APA BUKAN?', 
      date: 'August 2024', 
      color: 'from-teal-400 to-blue-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEgozhgm-3CXVRh3ivrogeeqmjU6zbnebLa7yXaQXhzQtN6KftaGnIklYM16jB4Otu-PhrB8ga1AKpQEHZo3cWurhfHjfxp1EQ10wO8AIKaga_LZriXiop3N_LocZv7XpZ-guqQkzRE84uJu4bal_aw-pOnxO2KHbBxIBRnN5-uZAgF8ibG46b4VYn2oxT4S',
      description: "Ini pas kamu ultah dan setelah kita jadian, jadi itungannya yang first yang pertama apa ini yaa wkwkkw"
    },
    { 
      id: 9, 
      title: 'BIRTHDAY SURPRISE', 
      date: 'September 2024', 
      color: 'from-violet-400 to-purple-500',
      img: 'https://blogger.googleusercontent.com/img/a/AVvXsEjThEC464jkuM_4VDOM2pd5TSW39avb817aDRwGVujMnXxcbkTcYM8NeEVuzNZfGhw65GwFXr0SCRorHjVOpPThUXcfi89git6hUebnIgEtBTsq4ay7J-ajz6UgC8aYfw2LAO6SDxsET0Vkq7JZch2YC9r3Lg_gm5xEZyhxv-O_y3LM8cPMgUDxX51708lR',
      description: "Surprise!! 🎉 Seneng banget bisa ngerayain ulang tahun bareng. Semoga panjang umur & sehat selalu ya sayang. Love you! 🎂"
    },
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Momen Kitaa 📸</h2>
        <p className="text-gray-400 font-body">Ini tapi cuma sebagian kecil dari memori kitaa</p>
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
            <div className={`aspect-square rounded-xl bg-gradient-to-br ${photo.color} p-1 shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group`}>
              <div className="w-full h-full rounded-lg bg-gray-900 overflow-hidden relative">
                {/* Image Background */}
                <img 
                  src={photo.img} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold font-body drop-shadow-md text-center px-2">{photo.title}</span>
                  <span className="text-xs opacity-90 font-body drop-shadow-md">{photo.date}</span>
                </div>
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-8"
            style={{ margin: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              
              {/* Bagian Kiri: Foto Full */}
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-2 bg-pattern">
                <img 
                  src={selectedPhoto.img} 
                  alt={selectedPhoto.title} 
                  className="w-full h-auto max-h-[50vh] md:max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Bagian Kanan: Detail Text */}
              <div className={`w-full md:w-1/3 bg-gradient-to-br ${selectedPhoto.color} p-1`}>
                <div className="h-full bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-display">{selectedPhoto.title}</h3>
                    <p className="text-pink-400 mb-6 font-body font-semibold flex items-center gap-2">
                      <span>📅</span> {selectedPhoto.date}
                    </p>
                    
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      {/* 👇 INI BAGIAN YANG AKAN BERUBAH SESUAI FOTO */}
                      <p className="text-gray-200 leading-relaxed font-body italic">
                        "{selectedPhoto.description}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPhoto(null)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold font-body border border-white/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Close Memory</span>
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