import { Link } from "react-router-dom";

function AboutStory({ story }) {
  return (
    <section className="about-story">
      <div className="about-story__container">
        <div className="about-story__collage" aria-label="Tedex Design Consults work">
          <div className="about-story__frame" />
          <div className="about-story__image about-story__image--back">
            <img src="/img/about-1.jpg" alt="Modern architecture designed by Tedex Design Consults" />
          </div>
          <div className="about-story__image about-story__image--front">
            <img src="/img/about-2.jpg" alt="Interior space designed by Tedex Design Consults" />
          </div>
        </div>

        <div className="about-story__content">
          <h2 className="about-story__label"><span>{story.label}</span></h2>
          <h3 className="about-story__heading">{story.heading}</h3>
          {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote className="about-story__tagline">{story.tagline}</blockquote>
          <Link className="about-story__cta" to="/appointment">
            Book A Consultation <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
