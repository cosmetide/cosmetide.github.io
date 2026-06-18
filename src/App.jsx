import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [events, setEvents] = useState([])
  const audioRef = useRef(null)
  const navRef = useRef(null)
  const timeoutRef = useRef([])
  const clickTimesRef = useRef([])

  useEffect(() => {
    const handler = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.muted = false
        audioRef.current.play().catch(() => {})
        setIsMuted(false)
        setHasInteracted(true)
      }
    }
    document.addEventListener('click', handler, { once: true })
    return () => document.removeEventListener('click', handler)
  }, [hasInteracted])

  useEffect(() => {
    const handler = (e) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isMenuOpen])

  useEffect(() => {
    const ids = [
      setTimeout(() => setShowLine1(true), 500),
      setTimeout(() => setShowLine1(false), 3000),
      setTimeout(() => setShowLine2(true), 3500),
      setTimeout(() => setShowLine2(false), 6000),
      setTimeout(() => setShowHome(true), 7000),
    ]
    timeoutRef.current = ids
    return () => ids.forEach(clearTimeout)
  }, [])

  const skipIntro = () => {
    timeoutRef.current.forEach(clearTimeout)
    setShowLine1(false)
    setShowLine2(false)
    setShowHome(true)
  }

  const handleIntroClick = () => {
    const now = Date.now()
    const times = clickTimesRef.current
    times.push(now)
    while (times.length > 0 && times[0] < now - 1000) {
      times.shift()
    }
    if (times.length >= 3) {
      skipIntro()
    }
  }

  useEffect(() => {
    if (showHome && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [showHome])

  useEffect(() => {
    if (!showHome) return
    fetch('https://api.github.com/users/cosmetide/events/public')
      .then(res => res.json())
      .then(setEvents)
      .catch(() => setEvents([]))
  }, [showHome])

  const eventIcon = (type) => {
    switch (type) {
      case 'PushEvent': return '+'
      case 'CreateEvent': return '*'
      case 'DeleteEvent': return '-'
      case 'WatchEvent': return '*'
      case 'ForkEvent': return '^'
      case 'IssuesEvent': return '!'
      case 'PullRequestEvent': return '~'
      case 'IssueCommentEvent': return '#'
      case 'ReleaseEvent': return '>'
      default: return '•'
    }
  }

  const eventLabel = (type, payload) => {
    switch (type) {
      case 'PushEvent':
        const n = payload.commits?.length || 0
        return n === 1 ? '1 commit' : `${n} commits`
      case 'CreateEvent': return 'created branch/tag'
      case 'DeleteEvent': return 'deleted branch/tag'
      case 'WatchEvent': return 'starred'
      case 'ForkEvent': return 'forked'
      case 'IssuesEvent':
        return payload.action === 'opened' ? 'opened issue' : `${payload.action} issue`
      case 'PullRequestEvent':
        return payload.action === 'opened' ? 'opened pr' : `${payload.action} pr`
      case 'IssueCommentEvent': return 'commented'
      case 'ReleaseEvent': return 'released'
      default: return type.replace('Event', '').toLowerCase()
    }
  }

  const relativeTime = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.muted) {
        audioRef.current.muted = false
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.muted = true
      }
      setIsMuted(audioRef.current.muted)
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const titles = { hero: 'home', about: 'about', activity: 'activity', projects: 'projects' }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const name = entry.target.getAttribute('data-section')
          document.title = `cosmetide | ${titles[name] || name}`
          break
        }
      }
    }, { threshold: 0.3 })

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [showHome])

  return (
    <div className="app">
      <div className={`intro ${showHome ? 'fade-out' : ''}`} onClick={handleIntroClick}>
        <p className={`line1 ${showLine1 ? 'visible' : ''}`}>
          Well hello there!
        </p>
        <p className={`line2 ${showLine2 ? 'visible' : ''}`}>
          Welcome to my website :D
        </p>
      </div>
      <audio ref={audioRef} loop src="/music/bg.mp3" muted />
      <main className={`homepage ${showHome ? 'visible' : ''}`}>
        <nav className="navbar" ref={navRef}>
          <span className="nav-title">cosmetide</span>
          <button type="button" className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <button type="button" className="nav-btn nav-sound" onClick={toggleMute}>
              music {isMuted ? 'off' : 'on'}
            </button>
            <a href="#about" className="nav-btn" onClick={() => setIsMenuOpen(false)}>about</a>
            <a href="#activity" className="nav-btn" onClick={() => setIsMenuOpen(false)}>activity</a>
            <a href="#projects" className="nav-btn" onClick={() => setIsMenuOpen(false)}>projects</a>
            <a href="https://github.com/cosmetide" className="nav-btn" onClick={() => setIsMenuOpen(false)}>github</a>
          </div>
        </nav>

        <section className="hero" data-section="hero">
          <div className="hero-left">
            <img src="/profile.png" alt="profile" className="profile-pic" />
          </div>
          <div className="hero-right">
            <h1>cosmetide</h1>
            <p className="tagline">
              just some random guy from the internet
            </p>
            <div className="buttons">
              <a href="#projects" className="mc-btn">{'>'} my projects</a>
              <a href="https://github.com/cosmetide" className="mc-btn-outline">github</a>
              <a href="https://discord.com/users/1210499232239456307" className="mc-btn-outline">discord</a>
            </div>
          </div>
        </section>

        <section id="about" className="section" data-section="about">
          <h2 className="section-title">/ about me</h2>
          <div className="section-card">
            <p>
              i'm just interested in old minecraft games like minecraft earth
              and legacy console edition and helping bring them back.
            </p>
          </div>
        </section>

        <section id="activity" className="section" data-section="activity">
          <h2 className="section-title">/ activity</h2>
          <div className="section-card">
            {events.length === 0 ? (
              <p className="activity-loading">loading...</p>
            ) : (
              <div className="activity-list">
                {events.map((e, i) => (
                  <div className="activity-item" key={i}>
                    <span className="activity-icon">{eventIcon(e.type)}</span>
                    <a href={`https://github.com/${e.repo.name}`} className="activity-repo">
                      {e.repo.name}
                    </a>
                    <span className="activity-type">{eventLabel(e.type, e.payload)}</span>
                    <span className="activity-time">{relativeTime(e.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="section" data-section="projects">
          <h2 className="section-title">/ projects</h2>
          <div className="projects-grid">
            <a href="https://github.com/cosmetide/Solace" className="project-card">
              <div className="project-badges">
                <span className="badge badge-fork">fork</span>
                <span className="badge badge-contributor">contributor</span>
              </div>
              <h3>Solace</h3>
              <p className="project-desc">
                replacement server for minecraft earth written in C#.
                aims to let people play the game after official shutdown.
              </p>
              <div className="project-meta">
                <span className="project-lang">C#</span>
                <span className="project-updated">9 contributions</span>
              </div>
            </a>
            <a href="https://github.com/cosmetide/Minecraft_Earth_Patcher" className="project-card">
              <div className="project-badges">
                <span className="badge badge-fork">fork</span>
              </div>
              <h3>MC Earth Patcher</h3>
              <p className="project-desc">
                patches minecraft earth apks to use custom api and login
                servers for private servers.
              </p>
              <div className="project-meta">
                <span className="project-lang">C#</span>
              </div>
            </a>
            <a href="https://github.com/cosmetide/KC-Website" className="project-card">
              <div className="project-badges">
                <span className="badge badge-original">original</span>
              </div>
              <h3>KC-Website</h3>
              <p className="project-desc">
                website for the kowhaifan clubhouse lce server
              </p>
              <div className="project-meta">
                <span className="project-lang">HTML</span>
              </div>
            </a>
            <a className="project-card blocked">
              <div className="project-badges">
                <span className="badge badge-blocked">blocked</span>
              </div>
              <h3>LCE Revelations</h3>
              <p className="project-desc">
                legacy console edition research — repo was blocked by github
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
          <div className="footer-credit">
            'Moonlight' by Scott Buckley — CC-BY 4.0
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
