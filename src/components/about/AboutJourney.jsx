import { useEffect } from "react";

function AboutJourney({ milestones }) {
  useEffect(() => {
    const cards = document.querySelectorAll(".about-journey__item");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    cards.forEach((card, index) => {
      card.style.setProperty("--journey-delay", `${index * 80}ms`);
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-journey">
      <div className="about-journey__container">
        <div className="about-journey__heading">
          <h2 className="about-journey__label"><span>OUR JOURNEY</span></h2>
          <h3>Milestones That Shape Our Practice</h3>
        </div>
        <div className="about-journey__timeline">
          {milestones.map((milestone) => (
            <article className="about-journey__item" key={milestone.year}>
              <div className="about-journey__year">{milestone.year}</div>
              <div className="about-journey__card">
                <h4>{milestone.title}</h4>
                <p>{milestone.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutJourney;
