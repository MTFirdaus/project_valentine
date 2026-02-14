import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'ZasOS Terminal v1.4.02 - Love Edition' },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'system', text: '' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const historyEndRef = useRef(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands:' },
      { type: 'output', text: '  help      - Show this help message' },
      { type: 'output', text: '  date      - Show our anniversary date' },
      { type: 'output', text: '  love      - Display a romantic message' },
      { type: 'output', text: '  clear     - Clear the terminal screen' },
      { type: 'output', text: '  about     - About ZasOS' },
      { type: 'output', text: '  heart     - Draw an ASCII heart' },
      { type: 'output', text: '  reasons   - Why I love you' },
      { type: 'output', text: '' },
    ],
    date: () => [
      { type: 'output', text: '💕 Our Special Date: Desember 31, 2023' },
      { type: 'output', text: '   Days together: ' + Math.floor((new Date() - new Date('2024-02-14')) / (1000 * 60 * 60 * 24)) + ' days' },
      { type: 'output', text: '   Status: Forever and counting... ∞' },
      { type: 'output', text: '' },
    ],
    love: () => [
      { type: 'output', text: '❤️  I love you more than words can express!' },
      { type: 'output', text: '💕 You make every day brighter and more beautiful.' },
      { type: 'output', text: '💖 Thank you for being my everything.' },
      { type: 'output', text: '' },
    ],
    clear: () => {
      return 'CLEAR'
    },
    about: () => [
      { type: 'output', text: '╔════════════════════════════════════════╗' },
      { type: 'output', text: '║         ZasOS - Love Edition          ║' },
      { type: 'output', text: '║                                        ║' },
      { type: 'output', text: '║  Built with ❤️  for my Valentine      ║' },
      { type: 'output', text: '║  Version: 1.4.02                      ║' },
      { type: 'output', text: '║  Powered by: Pure Love Energy         ║' },
      { type: 'output', text: '╚════════════════════════════════════════╝' },
      { type: 'output', text: '' },
    ],
    heart: () => [
      { type: 'output', text: '     ❤❤❤       ❤❤❤     ' },
      { type: 'output', text: '   ❤❤❤❤❤❤   ❤❤❤❤❤❤   ' },
      { type: 'output', text: '  ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤  ' },
      { type: 'output', text: '  ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤  ' },
      { type: 'output', text: '   ❤❤❤❤❤❤❤❤❤❤❤❤❤❤   ' },
      { type: 'output', text: '     ❤❤❤❤❤❤❤❤❤❤❤     ' },
      { type: 'output', text: '       ❤❤❤❤❤❤❤❤       ' },
      { type: 'output', text: '         ❤❤❤❤❤         ' },
      { type: 'output', text: '           ❤❤           ' },
      { type: 'output', text: '' },
    ],
    reasons: () => [
      { type: 'output', text: '💝 Reasons Why I Love You:' },
      { type: 'output', text: '   1. Kamu cantiikk' },
      { type: 'output', text: '   2. Lucuu' },
      { type: 'output', text: '   3. Kadang nekatt' },
      { type: 'output', text: '   4. Gatau yaa gaada alasan aku sayang kamu, yaa sayang aja tuu' },
      { type: 'output', text: '   5. Simply being you ❤️' },
      { type: 'output', text: '' },
    ],
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    const newHistory = [
      ...history,
      { type: 'command', text: `> ${cmd}` },
    ]

    if (!trimmedCmd) {
      setHistory([...newHistory, { type: 'output', text: '' }])
      return
    }

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]()
      
      if (result === 'CLEAR') {
        setHistory([
          { type: 'system', text: 'ZasOS Terminal v1.4.02 - Love Edition' },
          { type: 'system', text: '' },
        ])
      } else {
        setHistory([...newHistory, ...result])
      }
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not found: ${trimmedCmd}` },
        { type: 'error', text: 'Type "help" for available commands.' },
        { type: 'output', text: '' },
      ])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  const getTextColor = (type) => {
    switch (type) {
      case 'system':
        return 'text-blue-400'
      case 'command':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      case 'output':
        return 'text-gray-300'
      default:
        return 'text-white'
    }
  }

  return (
    <div className="bg-gray-950 text-white font-mono h-[500px] flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm text-gray-400 ml-2">terminal@zasos:~</span>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-1">
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${getTextColor(line.type)} text-sm leading-relaxed`}
          >
            {line.text}
          </motion.div>
        ))}
        <div ref={historyEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="flex items-center gap-2">
          <span className="text-green-400">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
            spellCheck="false"
          />
        </div>
      </form>
    </div>
  )
}

export default Terminal