import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="footer mt-auto">
        <div className="container footer-main">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="footer-logo-badge">
                <img src="/img/logo.jpeg" alt="Tedex Design Consults" />
              </div>
              <p className="footer-description">
                Tedex Design Consults delivers thoughtful architecture and design
                consultation.
              </p>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4 className="footer-heading">Quick Links</h4>
              <nav className="footer-links" aria-label="Footer navigation">
                <Link className="btn btn-link" to="/">
                  Home
                </Link>
                <Link className="btn btn-link" to="/about">
                  About
                </Link>
                <Link className="btn btn-link" to="/services">
                  Services
                </Link>
                <Link className="btn btn-link" to="/projects">
                  Projects
                </Link>
                <Link className="btn btn-link" to="/contact">
                  Contact
                </Link>
              </nav>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4 className="footer-heading">Contact</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <i className="fas fa-map-marker-alt" aria-hidden="true" />
                  <span>
                    Placeholder address — replace with your office address
                  </span>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-phone-alt" aria-hidden="true" />
                  <span>+00 000 000 0000 — placeholder phone</span>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-envelope" aria-hidden="true" />
                  <span>info@tedexconsults.com — placeholder email</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="footer-social" aria-label="Social media links">
                <a
                  className="footer-social-link"
                  href="#"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="footer-social-link"
                  href="#"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  className="footer-social-link"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="footer-social-link" href="#" aria-label="X">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container">
            &copy; {new Date().getFullYear()} Tedex Design Consults. All Rights
            Reserved.
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          className="back-to-top footer-back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>
      )}
    </>
  );
}

export default Footer;
