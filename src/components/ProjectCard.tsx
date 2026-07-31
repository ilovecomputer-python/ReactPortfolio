export interface Project {
  title: string
  description: string
  stack: string[]
  link: string
  category: string
  image: string
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-media">
        <img src={project.image || "/placeholder.svg"} alt={project.title} loading="lazy" />
        <span className="project-category">{project.category}</span>
        <div className="project-overlay">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tag-list">
            {project.stack.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
          <a
            className="action-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
