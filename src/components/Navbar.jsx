import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const moreRoutes = ["/features", "/team", "/testimonials", "/appointment"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const collapseRef = useRef(null);
  const moreDropdownActive = moreRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dropdownRef.current && window.bootstrap?.Dropdown) {
      window.bootstrap.Dropdown.getInstance(dropdownRef.current)?.hide();
    }

    if (collapseRef.current) {
      collapseRef.current.classList.remove("show");
      const toggle = document.querySelector('[data-bs-target="#navbarCollapse"]')
      toggle?.setAttribute("aria-expanded", "false");
    }
  }, [location.pathname]);

  const closeMenus = () => {
    if (dropdownRef.current && window.bootstrap?.Dropdown) {
      window.bootstrap.Dropdown.getInstance(dropdownRef.current)?.hide();
    }
    if (collapseRef.current) {
      collapseRef.current.classList.remove("show");
      const toggle = document.querySelector('[data-bs-target="#navbarCollapse"]');
      toggle?.setAttribute("aria-expanded", "false");
    }
  };

  const openDropdown = () => {
    if (window.innerWidth >= 992 && dropdownRef.current && window.bootstrap?.Dropdown) {
      window.bootstrap.Dropdown.getOrCreateInstance(dropdownRef.current).show();
    }
  };

  const closeDropdown = () => {
    if (window.innerWidth >= 992 && dropdownRef.current && window.bootstrap?.Dropdown) {
      window.bootstrap.Dropdown.getInstance(dropdownRef.current)?.hide();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5${scrolled ? " navbar-scrolled" : ""}`}>
      <NavLink to="/" className="navbar-brand d-flex align-items-center" aria-label="Tedex Design Consults home" onClick={closeMenus}>
        <img src="/img/logo2.jpeg" alt="Tedex Design Consults" />
      </NavLink>

      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse" ref={collapseRef}>
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <NavLink to="/" end className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`} onClick={closeMenus}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`} onClick={closeMenus}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`} onClick={closeMenus}>Services</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`} onClick={closeMenus}>Projects</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`} onClick={closeMenus}>Contact</NavLink>

          <div className="nav-item dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <button
              type="button"
              ref={dropdownRef}
              className={`nav-link dropdown-toggle more-toggle${moreDropdownActive ? " active" : ""}`}
              id="moreDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              More
            </button>
            <div className="dropdown-menu" aria-labelledby="moreDropdown">
              <NavLink to="/features" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={closeMenus}>Features</NavLink>
              <NavLink to="/team" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={closeMenus}>Team</NavLink>
              <NavLink to="/testimonials" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={closeMenus}>Testimonials</NavLink>
              <NavLink to="/appointment" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={closeMenus}>Appointment</NavLink>
            </div>
          </div>
        </div>

        <NavLink to="/appointment" className="btn btn-primary navbar-appointment py-2 px-4" onClick={closeMenus}>
          Book Appointment
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
