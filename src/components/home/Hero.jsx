import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/img/carousel-1.jpg",
    title: "Best Architecture And Interior Design Services",
    text: "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.",
    linkText: "Read More",
  },
  {
    image: "/img/carousel-2.jpg",
    title: "Best Architecture And Interior Design Services",
    text: "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.",
    linkText: "Read More",
  },
  {
    image: "/img/carousel-3.jpg",
    title: "Best Architecture And Interior Design Services",
    text: "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.",
    linkText: "Read More",
  },
];

function Hero() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return undefined;

    const $ = window.jQuery;
    const originalChildren = Array.from(element.children, (child) => child.cloneNode(true));
    let owlInstance = null;

    if ($ && $.fn?.owlCarousel) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      owlInstance = $(element).owlCarousel({
        autoplay: !reduceMotion,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
      });
    }

    return () => {
      if ($ && $.fn?.owlCarousel && owlInstance) {
        $(element).trigger("destroy.owl.carousel");
      }
      element.classList.remove("owl-loaded", "owl-drag");
      element.innerHTML = "";
      originalChildren.forEach((child) => element.appendChild(child));
    };
  }, []);

  return (
    <div className="container-fluid p-0 pb-5 wow fadeIn" data-wow-delay="0.1s">
      <div ref={carouselRef} className="owl-carousel header-carousel position-relative">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className="owl-carousel-item position-relative"
            data-dot={`<img src='${slide.image}'>`}
          >
            <img
              className="img-fluid"
              src={slide.image}
              alt={`Tedex Design Consults architecture project ${index + 1}`}
            />
            <div className="owl-carousel-inner">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-1 text-white animated slideInDown">{slide.title}</h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-3">{slide.text}</p>
                    <Link to="/about" className="btn btn-primary hero-read-more py-3 px-5 animated slideInLeft">
                      {slide.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
