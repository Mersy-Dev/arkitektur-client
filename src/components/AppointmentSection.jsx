import { useMemo, useState } from "react";

const APPOINTMENT_CONTENT = {
  label: "Appointment",
  heading: "Make An Appointment To Start Your Dream Project",
  intro:
    "Tell us about your project and the Tedex Design Consults team will help you take the next step.",
  // PLACEHOLDER — replace with Tedex's real details.
  phone: "+00 000 000 0000",
  // PLACEHOLDER — replace with Tedex's real details.
  email: "info@tedexconsults.com",
};

const SERVICES = [
  "Architecture",
  "3D Animation",
  "House Planning",
  "Interior Design",
  "Renovation",
  "Construction",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  mobile: "",
  service: "",
  date: "",
  time: "",
  message: "",
  website: "",
};

// TODO: Connect this function to a real EmailJS, Formspree or API service later.
async function submitAppointment(data) {
  await new Promise((resolve) => window.setTimeout(resolve, 800));
  if (import.meta.env.DEV) {
    console.log("Appointment submission (simulated):", data);
  }
  return { ok: true };
}

function AppointmentSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const today = useMemo(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.mobile.trim()) nextErrors.mobile = "Please enter your mobile number.";
    if (!form.service) nextErrors.service = "Please choose a service.";
    if (!form.date) {
      nextErrors.date = "Please choose a date.";
    } else if (form.date < today) {
      nextErrors.date = "Please choose today or a future date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (form.website) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitAppointment(form);
      if (!result.ok) throw new Error("Submission failed");

      setStatus({
        type: "success",
        message: "Thank you, we will contact you shortly",
      });
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Sorry, we could not submit your appointment. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-xxl py-5 appointment-section">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="appointment-label">{APPOINTMENT_CONTENT.label}</h4>
            <h1 className="appointment-heading display-5">{APPOINTMENT_CONTENT.heading}</h1>
            <p className="appointment-intro">{APPOINTMENT_CONTENT.intro}</p>

            <div className="row g-4 appointment-contact-list">
              <div className="col-12">
                <a className="appointment-contact-item" href={`tel:${APPOINTMENT_CONTENT.phone.replace(/[^+\d]/g, "")}`}>
                  <span className="appointment-contact-icon" aria-hidden="true">
                    <i className="fa fa-phone-alt" />
                  </span>
                  <span className="appointment-contact-copy">
                    <span className="appointment-contact-label">Call Us Now</span>
                    <strong>{APPOINTMENT_CONTENT.phone}</strong>
                  </span>
                </a>
              </div>

              <div className="col-12">
                <a className="appointment-contact-item" href={`mailto:${APPOINTMENT_CONTENT.email}`}>
                  <span className="appointment-contact-icon" aria-hidden="true">
                    <i className="fa fa-envelope-open" />
                  </span>
                  <span className="appointment-contact-copy">
                    <span className="appointment-contact-label">Mail Us Now</span>
                    <strong>{APPOINTMENT_CONTENT.email}</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <form className="appointment-form" onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-name">Your Name</label>
                  <input
                    id="appointment-name"
                    className={`appointment-field${errors.name ? " is-invalid" : ""}`}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Your Name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "appointment-name-error" : undefined}
                  />
                  {errors.name && <span id="appointment-name-error" className="appointment-field-error">{errors.name}</span>}
                </div>

                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-email">Your Email</label>
                  <input
                    id="appointment-email"
                    className={`appointment-field${errors.email ? " is-invalid" : ""}`}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="Your Email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "appointment-email-error" : undefined}
                  />
                  {errors.email && <span id="appointment-email-error" className="appointment-field-error">{errors.email}</span>}
                </div>

                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-mobile">Your Mobile</label>
                  <input
                    id="appointment-mobile"
                    className={`appointment-field${errors.mobile ? " is-invalid" : ""}`}
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={updateField}
                    placeholder="Your Mobile"
                    required
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={errors.mobile ? "appointment-mobile-error" : undefined}
                  />
                  {errors.mobile && <span id="appointment-mobile-error" className="appointment-field-error">{errors.mobile}</span>}
                </div>

                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-service">Choose Service</label>
                  <select
                    id="appointment-service"
                    className={`appointment-field${errors.service ? " is-invalid" : ""}`}
                    name="service"
                    value={form.service}
                    onChange={updateField}
                    required
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "appointment-service-error" : undefined}
                  >
                    <option value="">Choose Service</option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && <span id="appointment-service-error" className="appointment-field-error">{errors.service}</span>}
                </div>

                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-date">Choose Date</label>
                  <input
                    id="appointment-date"
                    className={`appointment-field${errors.date ? " is-invalid" : ""}`}
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={updateField}
                    min={today}
                    required
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "appointment-date-error" : undefined}
                  />
                  {errors.date && <span id="appointment-date-error" className="appointment-field-error">{errors.date}</span>}
                </div>

                <div className="col-12 col-sm-6">
                  <label className="visually-hidden" htmlFor="appointment-time">Choose Time</label>
                  <input
                    id="appointment-time"
                    className="appointment-field"
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={updateField}
                  />
                </div>

                <div className="col-12">
                  <label className="visually-hidden" htmlFor="appointment-message">Message</label>
                  <textarea
                    id="appointment-message"
                    className="appointment-field appointment-textarea"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    rows="5"
                    placeholder="Message"
                  />
                </div>

                <div className="appointment-honeypot" aria-hidden="true">
                  <label htmlFor="appointment-website">Website</label>
                  <input
                    id="appointment-website"
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={updateField}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {status.message && (
                  <div className="col-12">
                    <div className={`appointment-status appointment-status-${status.type}`} role="status">
                      {status.message}
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <button className="appointment-submit" type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Book Appointment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSection;
