import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'

function App() {
  const [systemState, setSystemState] = useState('boot') // 'boot', 'login', 'desktop'

  useEffect(() => {
    if (systemState === 'boot') {
      const timer = setTimeout(() => {
        setSystemState('login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [systemState])

  const handleLogin = (success) => {
    if (success) {
      setSystemState('desktop')
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      {systemState === 'boot' && <BootScreen />}
      {systemState === 'login' && <LoginScreen onLogin={handleLogin} />}
      {systemState === 'desktop' && <Desktop />}
    </div>
  )
}

export default App