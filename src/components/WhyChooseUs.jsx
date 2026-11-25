const whyChooseUsContent = {
  label: "Why Choose Us!",
  heading: "Why You Should Trust Us? Learn More About Us!",
  intro:
    "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
};

const features = [
  {
    icon: "fas fa-drafting-compass",
    title: "Design Approach",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Innovative Solutions",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
  },
  {
    icon: "fas fa-tasks",
    title: "Project Management",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
  },
];

function WhyChooseUs({
  label = whyChooseUsContent.label,
  heading = whyChooseUsContent.heading,
  intro = whyChooseUsContent.intro,
}) {
  return (
    <div className="container-xxl py-5 why-choose-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="section-title why-choose-title">{label}</h4>
            <h1 className="display-5 mb-4">{heading}</h1>
            <p className="mb-4 why-choose-intro">{intro}</p>

            <div className="row g-4">
              {features.map((feature) => (
                <div className="col-12" key={feature.title}>
                  <div className="why-feature-row d-flex align-items-start">
                    <div className="why-feature-icon flex-shrink-0">
                      <i className={feature.icon} aria-hidden="true" />
                    </div>
                    <div className="ms-4">
                      <h3>{feature.title}</h3>
                      <p className="mb-0">{feature.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="about-img">
              <img
                className="img-fluid about-img-back"
                src="/img/about-1.jpg"
                alt="Tedex Design Consults architectural project"
              />
              <img
                className="img-fluid about-img-front"
                src="/img/about-2.jpg"
                alt="Tedex Design Consults interior project"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
