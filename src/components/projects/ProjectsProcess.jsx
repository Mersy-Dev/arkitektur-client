import { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    number: "01",
    icon: "fas fa-comments",
    title: "Consultation",
    description: "We listen to your vision, needs, site and budget.",
  },
  {
    number: "02",
    icon: "fas fa-drafting-compass",
    title: "Concept & Design",
    description: "Sketches, 3D visuals and layouts shaped around your brief.",
  },
  {
    number: "03",
    icon: "fas fa-ruler-combined",
    title: "Development",
    description: "Detailed drawings, approvals and material selection.",
  },
  {
    number: "04",
    icon: "fas fa-hard-hat",
    title: "Delivery",
    description: "Supervision on site until the project is handed over.",
  },
];

function ProjectsProcess() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIsVisible(true);
      return undefined;
    }

    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="projects-process">
      <div className="projects-process__container">
        <div className="projects-process__heading">
          <div className="projects-process__label">Our Process</div>
          <h2>How We Bring Your Project To Life</h2>
          <p>From the first conversation to the final handover, we guide every stage with clarity and care.</p>
        </div>

        <div className={`projects-process__steps${isVisible ? " is-visible" : ""}`}>
          {processSteps.map((step, index) => (
            <article
              className="projects-process__step"
              style={{ "--process-delay": `${index * 100}ms` }}
              key={step.number}
            >
              <div className="projects-process__badge">
                <i className={step.icon} aria-hidden="true" />
                <span className="projects-process__number">{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsProcess;
