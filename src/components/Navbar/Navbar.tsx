import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  const location = useLocation()

  const { pathname } = location

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="brand" to="/">Failurebase</Link>
        <div className="tabs">
          <Link to="/events" className={pathname === '/events' || pathname === '/' ? 'active' : ''}>Events</Link>
          <Link to="/tests" className={pathname === '/tests' ? 'active' : ''}>Tests</Link >
        </div>
      </div>
      <div className="nav-right">
        <div>
          <Link to="/"><i>Let&apos;s track tests failures!</i></Link>  {/* TODO: chnage link */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
