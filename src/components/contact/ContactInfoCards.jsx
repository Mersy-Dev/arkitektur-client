import siteConfig from "../../data/siteConfig";

function ContactInfoCards() {
  const phoneDigits = siteConfig.phone.replace(/[^+\d]/g, "");
  const whatsappMessage = encodeURIComponent("Hello Tedex Design Consults, I would like to discuss a project.");
  const cards = [
    { label: "Call Us", value: siteConfig.phone, href: `tel:${phoneDigits}`, icon: "fas fa-phone-alt" },
    { label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`, icon: "fab fa-whatsapp", external: true },
    { label: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: "fas fa-envelope" },
    { label: "Visit Us", value: siteConfig.address, icon: "fas fa-map-marker-alt" },
  ].filter((card) => card.value);

  return (
    <section className="contact-info">
      <div className="contact-info__container">
        {cards.map((card) => (
          <article className="contact-info__card" key={card.label}>
            <div className="contact-info__icon"><i className={card.icon} aria-hidden="true" /></div>
            <div className="contact-info__copy">
              <span>{card.label}</span>
              {card.href ? (
                <a href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noopener noreferrer" : undefined}>
                  {Array.isArray(card.value) ? card.value.join(" · ") : card.value}
                </a>
              ) : (
                <strong>{Array.isArray(card.value) ? card.value.map((line) => <span key={line}>{line}</span>) : card.value}</strong>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ContactInfoCards;
