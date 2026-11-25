import { useEffect, useRef, useState } from "react";

function AboutStats({ stats }) {
  const bandRef = useRef(null);
  const frameRef = useRef(null);
  const startedRef = useRef(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(stats.map((stat) => stat.value));
      return undefined;
    }

    const startCounting = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startedAt = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / 1400, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts(stats.map((stat) => Math.round(stat.value * eased)));
        if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounting();
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    observer.observe(band);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [stats]);

  return (
    <section className="about-stats" ref={bandRef} aria-label="Company highlights">
      <span className="about-stats__circle" aria-hidden="true" />
      <span className="about-stats__square" aria-hidden="true" />
      <div className="about-stats__container">
        {stats.map((stat, index) => (
          <div className="about-stats__item" key={stat.label}>
            <strong>{counts[index]}{stat.suffix}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutStats;
