import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './pages/profile/'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Profile />} />
        
        {/* Login, Home, etc.) */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
