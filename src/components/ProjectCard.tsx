export interface Project {
  title: string
  description: string
  stack: string[]
  link: string
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-list">
        {project.stack.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
      <a className="action-link secondary" href={project.link} target="_blank" rel="noreferrer">
        Lihat Detail
      </a>
    </article>
  )
}

export default ProjectCard
