import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const aboutContent = {
  label: "About Us",
  heading: "A Creative Architecture Agency For Your Dream Home",
  paragraphOne:
    "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
  paragraphTwo:
    "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.",
  yearsNumber: 25,
  yearsText: ["Years", "Working", "Experience"],
  buttonText: "Read More",
};

function AboutSection() {
  const counterRef = useRef(null);
  const startedRef = useRef(false);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setYears(aboutContent.yearsNumber);
      return undefined;
    }

    let frameId = null;
    const startCount = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const duration = 1500;
      const startedAt = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setYears(Math.round(aboutContent.yearsNumber * eased));

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCount();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(counter);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="container-xxl py-5 about-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="about-img">
              <img
                className="img-fluid about-img-back"
                src="/img/about-1.jpg"
                alt="Tedex Design Consults architectural design project"
              />
              <img
                className="img-fluid about-img-front"
                src="/img/about-2.jpg"
                alt="Tedex Design Consults interior design project"
              />
            </div>
          </div>

          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h4 className="section-title about-section-title">{aboutContent.label}</h4>
            <h1 className="display-5 mb-4 about-heading">{aboutContent.heading}</h1>
            <p>{aboutContent.paragraphOne}</p>
            <p className="mb-4">{aboutContent.paragraphTwo}</p>

            <div className="d-flex align-items-center mb-5 about-experience">
              <div
                ref={counterRef}
                className="about-experience-box d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                data-toggle="counter-up"
              >
                <h1 className="display-1 mb-n2">{years}</h1>
              </div>
              <div className="ps-4 about-experience-text">
                {aboutContent.yearsText.map((text) => (
                  <h3 key={text} className={text === "Experience" ? "mb-0" : ""}>{text}</h3>
                ))}
              </div>
            </div>

            <Link to="/about" className="btn btn-primary py-3 px-5 about-read-more">
              {aboutContent.buttonText}
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
