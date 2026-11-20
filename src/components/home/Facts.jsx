const facts = [
  {
    icon: "fas fa-drafting-compass",
    title: "Design Approach",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    delay: "0.1s",
    number: "01",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Innovative Solutions",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    delay: "0.3s",
    number: "02",
  },
  {
    icon: "fas fa-tasks",
    title: "Project Management",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    delay: "0.5s",
    number: "03",
  },
];

function Facts() {
  return (
    <div className="container-xxl py-5 facts-section">
      <div className="container pt-5">
        <div className="row g-4">
          {facts.map((fact) => (
            <div
              key={fact.title}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={fact.delay}
            >
              <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                <div className="fact-icon">
                  <i className={fact.icon} aria-hidden="true" />
                </div>
                <h3 className="mb-3">{fact.title}</h3>
                <p className="mb-0">{fact.text}</p>
                <span className="fact-number" aria-hidden="true">{fact.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facts;
