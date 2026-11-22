import { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../../data/services";

function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="services-faq">
      <div className="services-faq__container">
        <div className="services-faq__aside">
          <div className="services-faq__label">FAQ</div>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common planning questions. Every project is different, so we are happy to discuss the details with you.</p>
          <div className="services-faq__contact-card">
            <i className="fas fa-headset" aria-hidden="true" />
            <h3>Still have questions?</h3>
            <p>Speak with our team for guidance tailored to your project.</p>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="services-faq__accordion">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `services-faq-panel-${index}`;
            const buttonId = `services-faq-button-${index}`;
            return (
              <article className={`services-faq__item${open ? " is-open" : ""}`} key={faq.question}>
                <h3>
                  <button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : index)}>
                    <span>{faq.question}</span><span className="services-faq__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className="services-faq__panel"><div><p>{faq.answer}</p></div></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesFaq;
