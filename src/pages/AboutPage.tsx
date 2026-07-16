function AboutPage() {
  return (
    <section className="page-section">
      <article className="section-card">
        <h2>Data Pribadi</h2>
        <dl className="data-grid">
          <div>
            <dt>Motto</dt>
            <dd className="text-green">Terbentur, terbentur, terbentuk</dd>
          </div>
          <div>
            <dt>Asal Daerah</dt>
            <dd>Semarang, Jawa Tengah</dd>
          </div>
          <div>
            <dt>Cita-Cita</dt>
            <dd>Membanggakan orang tua</dd>
          </div>
        </dl>
      </article>

      <article className="section-card">
        <h2>Teknologi yang Ingin Dipelajari</h2>
        <ul className="skills-list">
          <li>HTML5 &amp; CSS3</li>
          <li>JavaScript Modern</li>
          <li>React / Next.js</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </ul>
      </article>
    </section>
  )
}

export default AboutPage
