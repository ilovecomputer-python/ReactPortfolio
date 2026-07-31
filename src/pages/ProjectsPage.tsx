import { useEffect, useMemo, useState } from 'react'
import ProjectCard, { type Project } from '../components/ProjectCard'

const projects: Project[] = [
  {
    title: 'Portfolio Landing Page',
    description:
      'Portfolio landing page pribadi yang dibuat dengan HTML, CSS, dan JavaScript untuk menampilkan identitas, pengalaman, dan proyek secara sederhana namun menarik.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/ilovecomputer-python/PortfolioJose.git',
    category: 'Web',
    image: '/projects/portfolio-landing.png',
  },
  {
    title: 'Kotak Nusantara',
    description:
      'Game visual novel untuk mata kuliah kewarganegaraan yang dikembangkan dengan RenPy dan mengangkat tema kebangsaan.',
    stack: ['RenPy', 'Visual Novel', 'Python', 'Kewarganegaraan'],
    link: 'https://github.com/vescentongit/Kotak-Nusantara.git',
    category: 'Game',
    image: '/projects/kotak-nusantara.png',
  },
]

const ALL = 'Semua'

function ProjectsPage() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)))
    return [ALL, ...unique]
  }, [])

  const [activeCategory, setActiveCategory] = useState(ALL)
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredProjects = useMemo(
    () =>
      activeCategory === ALL
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  )

  // Keep the carousel index valid whenever the filter changes.
  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  const total = filteredProjects.length
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  return (
    <section className="page-section">
      <div className="section-card">
        <h2>Projek yang Saya Bangun</h2>
        <p className="section-intro">
          Koleksi proyek kecil yang menjadi fondasi belajar frontend dan desain antarmuka.
        </p>
      </div>

      <div className="project-filters" role="group" aria-label="Filter kategori projek">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {total === 0 ? (
        <div className="section-card">
          <p className="section-intro">Belum ada projek pada kategori ini.</p>
        </div>
      ) : (
        <div className="coverflow-wrapper">
          <div className="coverflow-header">
            <span className="coverflow-label">{activeCategory}</span>
            <span className="coverflow-counter">
              <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
              {'/' + String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="coverflow-stage">
            <button
              type="button"
              className="carousel-arrow prev"
              onClick={goPrev}
              aria-label="Projek sebelumnya"
              disabled={total < 2}
            >
              &#8249;
            </button>

            {filteredProjects.map((project, index) => {
              // Shortest signed distance from the active slide (with wrap-around).
              let offset = index - activeIndex
              if (offset > total / 2) offset -= total
              if (offset < -total / 2) offset += total

              const isActive = offset === 0
              const isVisible = Math.abs(offset) <= 1

              return (
                <div
                  key={project.title}
                  className={`coverflow-slide ${isActive ? 'active' : ''} ${
                    isVisible ? '' : 'hidden'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${offset * 78}%) scale(${
                      isActive ? 1 : 0.78
                    })`,
                    zIndex: isActive ? 3 : 2 - Math.abs(offset),
                  }}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && setActiveIndex(index)}
                >
                  <ProjectCard project={project} />
                </div>
              )
            })}

            <button
              type="button"
              className="carousel-arrow next"
              onClick={goNext}
              aria-label="Projek berikutnya"
              disabled={total < 2}
            >
              &#8250;
            </button>
          </div>

          {total > 1 && (
            <div className="carousel-dashes" role="tablist" aria-label="Navigasi projek">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Tampilkan ${project.title}`}
                  className={`carousel-dash ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default ProjectsPage
