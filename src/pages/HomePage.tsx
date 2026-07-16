import { Link } from 'react-router-dom'
import profileImage from '../../profil.jpeg'

function HomePage() {
  return (
    <section className="page-section">
      <div className="hero-section">
        <div className="hero-copy">
          <p className="hero-eyebrow">Tentang Saya</p>
          <h2>Maximillian Jose Andreas Aditjandra</h2>
          <p className="hero-description">
            Saya sedang bertumbuh di STEI-K &apos;25
          </p>
          <div className="hero-actions">
            <Link className="action-link" to="/projects">
              Lihat Projek
            </Link>
            <Link className="action-link secondary" to="/about">
              Tentang Saya
            </Link>
          </div>
        </div>

        <aside className="photo-section" aria-label="Foto profil Jose">
          <div className="photo-frame">
            <img className="profile-photo" src={profileImage} alt="Foto profil Jose" />
          </div>
        </aside>
      </div>

      <div className="info-section">
        <article className="section-card">
          <h2>Singkat Cerita</h2>
          <p className="deskripsi">
            Orang biasa dengan mimpi luar biasa.
          </p>
        </article>

        <article className="section-card">
          <h2>Pengalaman</h2>
          <ul className="list-pengalaman">
            <li>Staff Dokumentasi BPA STEI-K 2025</li>
            <li>Staff Sponsorship Aku Masuk ITB 2026</li>
            <li>Staff Sponsorship IMPACT 6.O STEI-K ITB</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default HomePage
