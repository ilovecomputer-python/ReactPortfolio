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
  },
  {
    title: 'Kotak Nusantara',
    description:
      'Game visual novel untuk mata kuliah kewarganegaraan yang dikembangkan dengan RenPy dan mengangkat tema kebangsaan.',
    stack: ['RenPy', 'Visual Novel', 'Python', 'Kewarganegaraan'],
    link: 'https://github.com/vescentongit/Kotak-Nusantara.git',
    category: 'Game',
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
        <div className="project-carousel">
          <button
            type="button"
            className="carousel-arrow"
            onClick={goPrev}
            aria-label="Projek sebelumnya"
            disabled={total < 2}
          >
            &#8249;
          </button>

          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {filteredProjects.map((project) => (
                <div className="carousel-slide" key={project.title}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-arrow"
            onClick={goNext}
            aria-label="Projek berikutnya"
            disabled={total < 2}
          >
            &#8250;
          </button>
        </div>
      )}

      {total > 1 && (
        <div className="carousel-dots" role="tablist" aria-label="Navigasi projek">
          {filteredProjects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Tampilkan ${project.title}`}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectsPage
