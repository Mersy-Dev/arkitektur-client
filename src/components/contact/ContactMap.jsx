import { useEffect, useRef, useState } from "react";
import siteConfig from "../../data/siteConfig";

function ContactMap() {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: "250px 0px", threshold: 0.05 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const mapQuery = encodeURIComponent(siteConfig.mapQuery);
  const destination = encodeURIComponent(siteConfig.address.join(", "));

  return (
    // The map will only be accurate once siteConfig.mapQuery is replaced with the real location.
    <section className="contact-map" ref={sectionRef}>
      <div className="contact-map__container">
        <div className="contact-map__card">
          {!loaded ? (
            <div className="contact-map__placeholder">
              <i className="fas fa-map-marked-alt" aria-hidden="true" />
              <span>Map preview</span>
              <button type="button" onClick={() => setLoaded(true)}>Load map</button>
            </div>
          ) : (
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title={`Map showing ${siteConfig.address.join(", ")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              width="100%"
              height="420"
              border="0"
            />
          )}
          <div className="contact-map__overlay">
            <span>Our location</span>
            <strong>{siteConfig.address.map((line) => <span key={line}>{line}</span>)}</strong>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${destination}`} target="_blank" rel="noopener noreferrer">Get Directions <i className="fas fa-arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
