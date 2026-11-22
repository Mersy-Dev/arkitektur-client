import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// PLACEHOLDER figures, replace with real Tedex numbers
const trustFigures = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "+", label: "Years Of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function ProjectsCta() {
  const bandRef = useRef(null);
  const frameRef = useRef(null);
  const [counts, setCounts] = useState(trustFigures.map(() => 0));

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCounts(trustFigures.map((figure) => figure.value));
      return undefined;
    }

    let started = false;
    const startCounting = () => {
      if (started) return;
      started = true;
      const duration = 1400;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts(trustFigures.map((figure) => Math.round(figure.value * eased)));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(band);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className="projects-cta">
      <div className="projects-cta__container">
        <div className="projects-cta__band" ref={bandRef}>
          <span className="projects-cta__circle" aria-hidden="true" />
          <span className="projects-cta__square" aria-hidden="true" />

          <div className="projects-cta__content">
            <h2>Have A Project In Mind?</h2>
            <p>Let's turn your idea into a space that breathes life. Book a consultation and we will take it from there.</p>
            <div className="projects-cta__actions">
              <Link className="projects-cta__primary" to="/appointment">Book Appointment</Link>
              <Link className="projects-cta__outline" to="/contact">Contact Us</Link>
            </div>
          </div>

          <div className="projects-cta__figures" aria-label="Tedex project highlights">
            {trustFigures.map((figure, index) => (
              <div className="projects-cta__figure" key={figure.label}>
                <strong>{counts[index]}{figure.suffix}</strong>
                <span>{figure.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsCta;
