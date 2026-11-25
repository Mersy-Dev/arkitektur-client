import siteConfig from "../../data/siteConfig";

function parseTime(text) {
  const match = text?.match(/(\d{1,2})(:\d{2})?\s*(AM|PM)/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = match[2] ? Number(match[2].slice(1)) : 0;
  if (match[3].toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (match[3].toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function getOpenStatus(hours) {
  const now = new Date();
  const today = now.getDay();
  if (today === 0) return null;
  const first = hours.find((entry) => /Monday|Monday – Friday/i.test(entry.days));
  if (!first) return null;
  const parts = first.hours.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM)).*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i);
  if (!parts) return null;
  const start = parseTime(parts[1]);
  const end = parseTime(parts[2]);
  const current = now.getHours() * 60 + now.getMinutes();
  if (start === null || end === null) return null;
  return today >= 1 && today <= 5 && current >= start && current <= end;
}

function ContactHours() {
  const openStatus = getOpenStatus(siteConfig.openingHours);
  const phoneDigits = siteConfig.phone.replace(/[^+\d]/g, "");
  const availableSocials = siteConfig.socials.filter((social) => social.url);
  const whatsappMessage = encodeURIComponent("Hello Tedex Design Consults, I would like to discuss a project.");

  return (
    <aside className="contact-hours">
      <span className="contact-hours__circle" aria-hidden="true" />
      <span className="contact-hours__square" aria-hidden="true" />
      <div className="contact-hours__content">
        <div className="contact-hours__title-row">
          <h3>Opening Hours</h3>
          {openStatus !== null && (
            <span className="contact-hours__status">{openStatus ? "Open now" : "Closed now"}</span>
          )}
        </div>
        <div className="contact-hours__list">
          {siteConfig.openingHours.map((entry) => (
            <div key={entry.days}><span>{entry.days}</span><strong>{entry.hours}</strong></div>
          ))}
        </div>

        {availableSocials.length > 0 && (
          <div className="contact-hours__social-wrap">
            <span>Follow Us</span>
            <div className="contact-hours__social">
              {availableSocials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                  <i className={social.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="contact-hours__talk">
          <span>Prefer to talk?</span>
          {siteConfig.phone && <a href={`tel:${phoneDigits}`}><i className="fas fa-phone-alt" aria-hidden="true" /> {siteConfig.phone}</a>}
          {siteConfig.whatsapp && (
            <a className="contact-hours__whatsapp" href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}

export default ContactHours;
