import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import My_Component from './My_Component.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
        </div>
        <My_Component />
      </section>
    </>
  )
}

export default App
