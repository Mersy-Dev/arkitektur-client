import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProjectsProcess from "../components/projects/ProjectsProcess";
import ProjectsCta from "../components/projects/ProjectsCta";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesQuickNav from "../components/services/ServicesQuickNav";
import ServicesOverview from "../components/services/ServicesOverview";
import ServiceDetail from "../components/services/ServiceDetail";
import ServicesFaq from "../components/services/ServicesFaq";

function Services() {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Services | Tedex Design Consults";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const id = location.hash ? location.hash.slice(1) : "";
    if (!id) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [location.hash]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.querySelectorAll(".services-intro, .services-overview, .service-detail__section, .services-faq").forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const elements = document.querySelectorAll(".services-intro, .services-overview, .service-detail__section, .services-faq");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `${location.pathname}#${id}`);
  };

  return (
    <div className="services-page">
      <PageHeader title="Our Services" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      <ServicesIntro />
      <ServicesQuickNav onNavigate={scrollToSection} />
      <ServicesOverview />
      <ServiceDetail />
      <div id="process"><ProjectsProcess /></div>
      <ServicesFaq />
      <ProjectsCta />
    </div>
  );
}

export default Services;
