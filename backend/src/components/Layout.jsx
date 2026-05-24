import { NavLink } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="topbar">
        <div className="brand">
          <span>ATOMIC MEDIA</span>
          <span className="brand-dot">.</span>
        </div>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <a href="#stack">Stack</a>
          <a href="#works">Works</a>
          <a href="#process">Process</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <span>Atomic Media</span>
        <span className="muted">Creative. Strategic. Passionate.</span>
      </footer>
    </div>
  )
}
