import { Link } from "react-router-dom";

function ProjectCard({ project, index }) {
  const staggerDelay = Math.min(index * 60, 300);

  return (
    <article
      className="project-card"
      style={{ "--card-delay": `${staggerDelay}ms` }}
    >
      <div className="project-card__image-wrap">
        <img
          className="project-card__image"
          src={project.coverImage}
          alt={`${project.title} project in ${project.location}`}
          loading="lazy"
        />
        <span className="project-card__category">{project.category}</span>
        <div className="project-card__overlay" aria-hidden="true" />
        <span className="project-card__arrow" aria-hidden="true">
          <i className="fas fa-arrow-right" />
        </span>
      </div>

      <div className="project-card__body">
        <h2 className="project-card__title">{project.title}</h2>
        <p className="project-card__location">
          <i className="fas fa-map-marker-alt" aria-hidden="true" />
          <span>{project.location}</span>
        </p>
        <div className="project-card__meta">
          <span>{project.year}</span>
          <span aria-hidden="true">•</span>
          <span>{project.size}</span>
        </div>
      </div>

      <Link
        className="project-card__stretched-link"
        to={`/projects/${project.slug}`}
        aria-label={`View project: ${project.title}`}
      />
    </article>
  );
}

export default ProjectCard;
