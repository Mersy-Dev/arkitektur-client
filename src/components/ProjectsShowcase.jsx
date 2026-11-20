import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLegacyPlugins } from "../hooks/useLegacyPlugins";

const projects = [
  {
    id: "project-1",
    name: "Modern Complex",
    location: "Accra, Ghana",
    image: "/img/project-1.jpg",
    description: "A contemporary mixed-use complex shaped around daylight, circulation and adaptable spaces.",
    size: "450 m²",
    year: "2022",
    client: "Private",
  },
  {
    id: "project-2",
    name: "Royal Hotel",
    location: "Kumasi, Ghana",
    image: "/img/project-2.jpg",
    description: "A refined hospitality destination that combines welcoming interiors with a strong architectural identity.",
    size: "1,800 m²",
    year: "2023",
    client: "Hospitality",
  },
  {
    id: "project-3",
    name: "Mexwel Building",
    location: "Tema, Ghana",
    image: "/img/project-3.jpg",
    description: "A balanced commercial building designed for efficient workspaces and lasting urban presence.",
    size: "920 m²",
    year: "2024",
    client: "Commercial",
  },
  {
    id: "project-4",
    name: "Shopping Complex",
    location: "Takoradi, Ghana",
    image: "/img/project-4.jpg",
    description: "A vibrant retail environment planned for clear circulation, natural light and flexible tenancy.",
    size: "2,400 m²",
    year: "2025",
    client: "Retail",
  },
];

function ProjectsShowcase() {
  useLegacyPlugins();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const tabRefs = useRef([]);
  const markerRef = useRef(null);

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && markerRef.current) {
      const rail = activeTab.closest(".projects-rail");
      if (rail) {
        markerRef.current.style.transform = `translateY(${activeTab.offsetTop - rail.offsetTop + 12}px)`;
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || paused || autoplayStopped) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused, autoplayStopped]);

  const stopAutoplay = () => setAutoplayStopped(true);

  const selectProject = (index) => {
    stopAutoplay();
    setActiveIndex(index);
  };

  const handleKeyDown = (event, index) => {
    let nextIndex = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % projects.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + projects.length) % projects.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projects.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      stopAutoplay();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <div
      className="container-xxl py-5 projects-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp projects-showcase-heading" data-wow-delay="0.1s">
          <h4 className="section-title">Our Projects</h4>
          <h1 className="display-5 mb-0">Selected Projects</h1>
        </div>

        <div className="row g-4 align-items-center wow fadeInUp" data-wow-delay="0.3s">
          <div className="col-lg-4">
            <div
              className="projects-rail"
              role="tablist"
              aria-label="Selected projects"
              aria-orientation="vertical"
            >
              <span ref={markerRef} className="projects-active-marker" aria-hidden="true" />
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls="project-stage"
                  id={`${project.id}-tab`}
                  tabIndex={activeIndex === index ? 0 : -1}
                  className={`project-rail-item${activeIndex === index ? " active" : ""}`}
                  onClick={() => selectProject(index)}
                  onMouseEnter={(event) => {
                    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) selectProject(index);
                  }}
                  onFocus={() => selectProject(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="project-rail-name">{project.name}</span>
                  <span className="project-rail-location">{project.location}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="projects-stage-frame">
              <div
                className="projects-stage"
                id="project-stage"
                role="tabpanel"
                aria-labelledby={`${activeProject.id}-tab`}
              >
                {projects.map((project, index) => (
                  <img
                    key={project.id}
                    className={`projects-stage-image${activeIndex === index ? " active" : ""}`}
                    src={project.image}
                    alt={`${project.name} project`}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                ))}

                <div className="projects-stage-shade" aria-hidden="true" />

                <div key={`${activeProject.id}-info`} className="projects-info-card">
                  <h2>{activeProject.name}</h2>
                  <p>{activeProject.description}</p>
                  <Link to="/projects" className="projects-read-more">
                    READ MORE <i className="fas fa-arrow-right" aria-hidden="true" />
                  </Link>
                </div>

                <div key={`${activeProject.id}-stats`} className="projects-stats-bar">
                  <div className="projects-stat">
                    <span>Size</span>
                    <strong>{activeProject.size}</strong>
                  </div>
                  <div className="projects-stat">
                    <span>Completion year</span>
                    <strong className="projects-year">{activeProject.year}</strong>
                  </div>
                  <div className="projects-stat">
                    <span>Client</span>
                    <strong>{activeProject.client}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsShowcase;
