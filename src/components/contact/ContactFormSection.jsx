import { useState } from "react";
import ContactHours from "./ContactHours";
import { submitContactMessage } from "../../services/forms";

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "", website: "" };
const SUBJECTS = ["General enquiry", "Architecture", "Interior design", "Renovation", "Construction", "Partnership", "Other"];

function ContactFormSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(() => {
    const saved = sessionStorage.getItem("tedex-contact-success") === "true";
    return saved ? { type: "success", message: "Thank you, we will reply within 1 to 2 working days" } : { type: "", message: "" };
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Please enter at least 7 digits.";
    if (!form.subject) nextErrors.subject = "Please choose a subject.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    else if (form.message.trim().length < 10) nextErrors.message = "Please use at least 10 characters.";
    setErrors(nextErrors);

    const first = ["name", "email", "phone", "subject", "message"].find((name) => nextErrors[name]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return !first;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    if (form.website) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitContactMessage(form);
      if (!result.ok) throw new Error("Submission failed");
      setForm(INITIAL_FORM);
      setErrors({});
      setStatus({ type: "success", message: "Thank you, we will reply within 1 to 2 working days" });
      sessionStorage.setItem("tedex-contact-success", "true");
    } catch {
      setStatus({ type: "error", message: "Sorry, we could not send your message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-section__container">
        <form className="contact-form-section__form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-section__label"><span>SEND A MESSAGE</span></div>
          <h2>Let's Talk About Your Project</h2>
          <p className="contact-form-section__intro">Share a little about your idea and the Tedex team will help you find the right next step.</p>

          <div className="contact-form-section__grid">
            <div className="contact-form-section__field">
              <label htmlFor="contact-name">Full Name</label>
              <input id="contact-name" name="name" type="text" value={form.name} onChange={updateField} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className={errors.name ? "is-invalid" : ""} />
              {errors.name && <span id="contact-name-error" className="contact-form-section__error">{errors.name}</span>}
            </div>
            <div className="contact-form-section__field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className={errors.email ? "is-invalid" : ""} />
              {errors.email && <span id="contact-email-error" className="contact-form-section__error">{errors.email}</span>}
            </div>
            <div className="contact-form-section__field">
              <label htmlFor="contact-phone">Phone <span>(optional)</span></label>
              <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={updateField} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} className={errors.phone ? "is-invalid" : ""} />
              {errors.phone && <span id="contact-phone-error" className="contact-form-section__error">{errors.phone}</span>}
            </div>
            <div className="contact-form-section__field">
              <label htmlFor="contact-subject">Subject</label>
              <select id="contact-subject" name="subject" value={form.subject} onChange={updateField} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} className={errors.subject ? "is-invalid" : ""}>
                <option value="">Choose a subject</option>
                {SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
              </select>
              {errors.subject && <span id="contact-subject-error" className="contact-form-section__error">{errors.subject}</span>}
            </div>
            <div className="contact-form-section__field contact-form-section__field--full">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" value={form.message} onChange={updateField} maxLength={1000} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} className={errors.message ? "is-invalid" : ""} />
              <div className="contact-form-section__message-meta">
                {errors.message && <span id="contact-message-error" className="contact-form-section__error">{errors.message}</span>}
                <span aria-live="polite">{form.message.length} / 1000</span>
              </div>
            </div>
          </div>

          <div className="contact-form-section__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" type="text" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
          </div>

          {status.message && (
            <div className={`contact-form-section__status contact-form-section__status--${status.type}`} role={status.type === "error" ? "alert" : "status"}>
              <span>{status.message}</span>
              {status.type === "error" && <button type="button" onClick={() => document.querySelector(".contact-form-section__form")?.requestSubmit()}>Try again</button>}
            </div>
          )}

          <button className="contact-form-section__submit" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</button>
        </form>
        <ContactHours />
      </div>
    </section>
  );
}

export default ContactFormSection;
