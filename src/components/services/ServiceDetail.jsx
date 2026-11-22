import { Link } from "react-router-dom";
import { services } from "../../data/services";

function ServiceDetail() {
  return (
    <div className="service-detail">
      {services.map((service, index) => (
        <section id={service.slug} className={`service-detail__section${index % 2 ? " service-detail__section--alt" : ""}`} key={service.id}>
          <div className="service-detail__container">
            <div className={`service-detail__grid${index % 2 ? " service-detail__grid--reverse" : ""}`}>
              <div className="service-detail__visual">
                <div className="service-detail__frame"><div className="service-detail__image"><img src={service.image} alt={`${service.title} service by Tedex Design Consults`} /></div></div>
              </div>
              <div className="service-detail__content">
                <div className="service-detail__number">0{index + 1}</div>
                <h2>{service.title}</h2>
                {service.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <h3>What's Included</h3>
                <ul className="service-detail__features">
                  {service.features.map((feature) => <li key={feature}><i className="fas fa-check-circle" aria-hidden="true" /><span>{feature}</span></li>)}
                </ul>
                <div className="service-detail__deliverables" aria-label="Deliverables">
                  {service.deliverables.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="service-detail__info">
                  <div><i className="fas fa-clock" aria-hidden="true" /><span><small>Typical timeline</small><strong>{service.timeline}</strong></span></div>
                  <div><i className="fas fa-user-friends" aria-hidden="true" /><span><small>Best for</small><strong>{service.bestFor}</strong></span></div>
                </div>
                <div className="service-detail__actions">
                  <Link className="service-detail__primary" to="/appointment">Book A Consultation</Link>
                  <Link className="service-detail__outline" to="/projects">See Related Projects</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ServiceDetail;
