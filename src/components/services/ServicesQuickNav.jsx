import { useEffect, useState } from "react";
import { services } from "../../data/services";

function ServicesQuickNav({ onNavigate }) {
  const [active, setActive] = useState(services[0].slug);

  useEffect(() => {
    const ids = [...services.map((service) => service.slug), "process", "faq"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-110px 0px -55% 0px", threshold: [0.08, 0.25, 0.5] });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navigate = (event, id) => {
    event.preventDefault();
    setActive(id);
    onNavigate(id);
  };

  return (
    <nav className="services-quicknav" aria-label="Services quick navigation">
      <div className="services-quicknav__inner">
        {services.map((service) => (
          <a className={`services-quicknav__pill${active === service.slug ? " active" : ""}`} href={`#${service.slug}`} onClick={(event) => navigate(event, service.slug)} key={service.slug}>{service.title}</a>
        ))}
        <a className={`services-quicknav__pill${active === "process" ? " active" : ""}`} href="#process" onClick={(event) => navigate(event, "process")}>Process</a>
        <a className={`services-quicknav__pill${active === "faq" ? " active" : ""}`} href="#faq" onClick={(event) => navigate(event, "faq")}>FAQ</a>
      </div>
    </nav>
  );
}

export default ServicesQuickNav;
