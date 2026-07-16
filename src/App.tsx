import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import menuIcon from '../menu.png'
import instagramIcon from '../instagram.png'
import linkedinIcon from '../linkedin.png'
import whatsappIcon from '../whatsapp.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [, setLastVisited] = useLocalStorage<string>('last-visited-page', '/')
  const location = useLocation()

  const pageTitle = useMemo(() => {
    if (location.pathname === '/projects') return 'Projek'
    if (location.pathname === '/about') return 'Tentang'
    return 'Beranda'
  }, [location.pathname])

  useEffect(() => {
    setLastVisited(location.pathname)
  }, [location.pathname, setLastVisited])

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Beranda | Portfolio Maximillian Jose Andreas Aditjandra',
      '/projects': 'Projek | Portfolio Maximillian Jose Andreas Aditjandra',
      '/about': 'Tentang | Portfolio Maximillian Jose Andreas Aditjandra',
    }

    document.title = titles[location.pathname] || 'Portfolio Maximillian Jose Andreas Aditjandra'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        location.pathname === '/projects'
          ? 'Lihat daftar proyek yang pernah dikerjakan, termasuk portfolio dan Kotak Nusantara.'
          : location.pathname === '/about'
            ? 'Kenali profil saya, minat belajar, dan perjalanan dalam mengembangkan kemampuan digital.'
            : 'Portofolio Maximillian Jose Andreas Aditjandra — berisi profil, proyek, dan informasi tentang pengembangan web.'
      )
    }
  }, [location.pathname])

  return (
    <div className="page-shell">
      <div className="page-layout">
        <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`} aria-label="Navigasi halaman">
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Buka menu navigasi"
            aria-expanded={isMenuOpen}
          >
            <img src={menuIcon} alt="Menu" className="menu-icon" />
          </button>

          <div className="brand">MJAA</div>
          <nav className="sidebar-nav">
            <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
              Beranda
            </NavLink>
            <NavLink to="/projects" onClick={() => setIsMenuOpen(false)}>
              Projek
            </NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              Tentang
            </NavLink>
          </nav>
        </aside>

        <div className="content-area">
          <header className="top-bar">
            <span className="top-bar-title">{pageTitle}</span>
          </header>

          <main className="card-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>

          <footer className="page-footer">
            <p className="footer-title">Hubungi Saya</p>
            <div className="footer-links">
              <a className="contact-card" href="https://instagram.com/jose_aditjandra" target="_blank" rel="noopener noreferrer" aria-label="Instagram jose_aditjandra">
                <img src={instagramIcon} alt="" className="contact-icon" />
              </a>
              <a className="contact-card" href="https://www.linkedin.com/in/maximillianjoseandreas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Maximillian Jose Andreas Aditjandra">
                <img src={linkedinIcon} alt="" className="contact-icon" />
              </a>
              <a className="contact-card" href="https://wa.me/6281807819999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp 081807819999">
                <img src={whatsappIcon} alt="" className="contact-icon" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
