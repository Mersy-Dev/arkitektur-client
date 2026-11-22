import { introHighlights } from "../../data/services";

function ServicesIntro() {
  return (
    <section className="services-intro">
      <div className="services-intro__container">
        <div className="services-intro__content">
          <div className="services-intro__label">What We Do</div>
          <h2>Complete Architecture And Design Services Under One Roof</h2>
          <p>From early ideas and planning to detailed documentation and site support, Tedex Design Consults brings each stage together with clarity, care and a strong understanding of Ghana's built environment.</p>
          <div className="services-intro__highlights">
            {introHighlights.map((item) => (
              <div className="services-intro__highlight" key={item.title}>
                <span className="services-intro__highlight-icon"><i className={item.icon} aria-hidden="true" /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="services-intro__visual">
          <div className="services-intro__frame"><img src="/img/about-1.jpg" alt="Tedex architecture and design team at work" /></div>
        </div>
      </div>
    </section>
  );
}

export default ServicesIntro;
