import { Link } from "react-router-dom";
import { services } from "../../data/services";

function ServicesOverview() {
  return (
    <section className="services-overview" aria-labelledby="services-overview-heading">
      <div className="services-overview__container">
        <div className="services-overview__heading">
          <div className="services-overview__label">Our Services</div>
          <h2 id="services-overview-heading">Expertise At Every Stage Of Design</h2>
        </div>
        <div className="services-overview__grid">
          {services.map((service, index) => (
            <article className="services-overview__card" key={service.id}>
              <span className="services-overview__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="services-overview__icon"><i className={service.icon} aria-hidden="true" /></span>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <Link className="services-overview__link" to={`/services#${service.slug}`}><i className="fa fa-plus" aria-hidden="true" />Learn more</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesOverview;
