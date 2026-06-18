import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showHome, setShowHome] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowLine1(true), 500)
    const t2 = setTimeout(() => setShowLine1(false), 3000)
    const t3 = setTimeout(() => setShowLine2(true), 3500)
    const t4 = setTimeout(() => setShowLine2(false), 6000)
    const t5 = setTimeout(() => setShowHome(true), 7000)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(t4); clearTimeout(t5)
    }
  }, [])

  return (
    <div className="app">
      <div className={`intro ${showHome ? 'fade-out' : ''}`}>
        <p className={`line1 ${showLine1 ? 'visible' : ''}`}>
          Well hello there!
        </p>
        <p className={`line2 ${showLine2 ? 'visible' : ''}`}>
          Welcome to my website :D
        </p>
      </div>
      <main className={`homepage ${showHome ? 'visible' : ''}`}>
        <nav className="navbar">
          <span className="nav-title">cosmetide</span>
          <div className="nav-links">
            <button className="nav-btn">about</button>
            <button className="nav-btn">projects</button>
            <button className="nav-btn">contact</button>
          </div>
        </nav>
        <div className="hero">
          <div className="hero-left">
            <img src="/profile.png" alt="profile" className="profile-pic" />
          </div>
          <div className="hero-right">
            <h1>cosmetide</h1>
            <p className="tagline">welcome to my corner of the web</p>
            <div className="buttons">
              <button className="mc-btn">about me</button>
              <button className="mc-btn">my projects</button>
              <button className="mc-btn">contact</button>
            </div>
          </div>
        </div>
        <footer className="footer">
          built with <span className="footer-heart">{'<'}/3{'>'}</span> by cosmetide
        </footer>
      </main>
    </div>
  )
}

export default App
