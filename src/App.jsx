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
            <a href="#about" className="nav-btn">about</a>
            <a href="#projects" className="nav-btn">projects</a>
            <a href="https://github.com/cosmetide" className="nav-btn">github</a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-left">
            <img src="/profile.png" alt="profile" className="profile-pic" />
          </div>
          <div className="hero-right">
            <h1>cosmetide</h1>
            <p className="tagline">
              just some random guy from the internet
            </p>
            <div className="buttons">
              <a href="#projects" className="mc-btn">my projects</a>
              <a href="https://github.com/cosmetide" className="mc-btn-outline">github</a>
              <a href="https://discord.com/users/1210499232239456307" className="mc-btn-outline">discord</a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="section-title">/ about me</h2>
          <div className="section-card">
            <p>
              i'm a hobbyist developer focused on minecraft preservation and modding.
              i work on reviving old versions of the game like minecraft earth and
              legacy console edition, and building tools for the community.
            </p>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title">/ projects</h2>
          <div className="projects-grid">
            <a href="https://github.com/cosmetide/Solace" className="project-card">
              <h3>Solace</h3>
              <p className="project-desc">
                replacement server for minecraft earth written in C#.
                aims to let people play the game after official shutdown.
              </p>
              <div className="project-meta">
                <span className="project-lang">C#</span>
                <span className="project-updated">updated recently</span>
              </div>
            </a>
            <a href="https://github.com/cosmetide/Minecraft_Earth_Patcher" className="project-card">
              <h3>MC Earth Patcher</h3>
              <p className="project-desc">
                patches minecraft earth apks to use custom api and login
                servers for private servers.
              </p>
              <div className="project-meta">
                <span className="project-lang">C#</span>
                <span className="project-updated">1 star</span>
              </div>
            </a>
            <a href="https://github.com/cosmetide/LCE-Revelations" className="project-card">
              <h3>LCE Revelations</h3>
              <p className="project-desc">
                legacy console edition research and modding tools
                for exploring the xbox 360 / ps3 versions of minecraft.
              </p>
              <div className="project-meta">
                <span className="project-lang">C++</span>
              </div>
            </a>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-links">
            <a href="https://github.com/cosmetide">github</a>
            <span className="footer-sep">|</span>
            <a href="https://discord.com/users/1210499232239456307">discord</a>
          </div>
          built with {'</3'} by cosmetide
        </footer>
      </main>
    </div>
  )
}

export default App
