import ProjectCard, { type Project } from '../components/ProjectCard'

const projects: Project[] = [
  {
    title: 'Portfolio Landing Page',
    description:
      'Portfolio landing page pribadi yang dibuat dengan HTML, CSS, dan JavaScript untuk menampilkan identitas, pengalaman, dan proyek secara sederhana namun menarik.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/ilovecomputer-python/PortfolioJose.git',
  },
  {
    title: 'Kotak Nusantara',
    description:
      'Game visual novel untuk mata kuliah kewarganegaraan yang dikembangkan dengan RenPy dan mengangkat tema kebangsaan.',
    stack: ['RenPy', 'Visual Novel', 'Python', 'Kewarganegaraan'],
    link: 'https://github.com/vescentongit/Kotak-Nusantara.git',
  },
]

function ProjectsPage() {
  return (
    <section className="page-section">
      <div className="section-card">
        <h2>Projek yang Saya Bangun</h2>
        <p className="section-intro">
          Koleksi proyek kecil yang menjadi fondasi belajar frontend dan desain antarmuka.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
