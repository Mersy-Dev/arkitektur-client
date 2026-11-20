import { Link } from "react-router-dom";

const services = [
  {
    icon: "fas fa-drafting-compass",
    title: "Architecture",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-1.jpg",
    delay: "0.1s",
    number: "01",
  },
  {
    icon: "fas fa-cube",
    title: "3D Animation",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-2.jpg",
    delay: "0.3s",
    number: "02",
  },
  {
    icon: "fas fa-ruler-combined",
    title: "House Planning",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-3.jpg",
    delay: "0.5s",
    number: "03",
  },
  {
    icon: "fas fa-couch",
    title: "Interior Design",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-4.jpg",
    delay: "0.1s",
    number: "04",
  },
  {
    icon: "fas fa-hammer",
    title: "Renovation",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-5.jpg",
    delay: "0.3s",
    number: "05",
  },
  {
    icon: "fas fa-hard-hat",
    title: "Construction",
    text: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.",
    image: "/img/service-6.jpg",
    delay: "0.5s",
    number: "06",
  },
];

function ServicesSection() {
  return (
    <div className="container-xxl py-5 services-section">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp services-heading" data-wow-delay="0.1s">
          <h4 className="section-title">Our Services</h4>
          <h1 className="display-5 mb-4">We Focused On Modern Architecture And Interior Design</h1>
        </div>

        <div className="row g-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={service.delay}
            >
              <div className="service-item d-flex position-relative text-center h-100">
                <img className="bg-img" src={service.image} alt={`${service.title} service`} />
                <div className="service-text p-5">
                  <span className="service-number" aria-hidden="true">{service.number}</span>
                  <i className={`${service.icon} mb-4 service-icon`} aria-hidden="true" />
                  <h3 className="mb-3">{service.title}</h3>
                  <p className="mb-4">{service.text}</p>
                  <Link to="/services" className="btn service-read-more">
                    <i className="fa fa-plus service-plus" aria-hidden="true" />
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
