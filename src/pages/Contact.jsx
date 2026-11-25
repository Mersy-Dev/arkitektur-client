import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import ContactFormSection from "../components/contact/ContactFormSection";
import ContactMap from "../components/contact/ContactMap";
import ServicesFaq from "../components/services/ServicesFaq";
import ProjectsCta from "../components/projects/ProjectsCta";

const CONTACT_FAQS = [
  { question: "How quickly will Tedex reply?", answer: "PLACEHOLDER: We aim to respond within one to two working days of receiving your enquiry." },
  { question: "Is the first consultation free?", answer: "PLACEHOLDER: Initial project discussions are usually complimentary; final scope and fees can be confirmed before any appointment." },
  { question: "What should I prepare before a consultation?", answer: "PLACEHOLDER: Bring your ideas, preferred location, approximate budget, timeline, sketches, and any site or property documents you have." },
  { question: "Do you work outside Accra?", answer: "PLACEHOLDER: Yes, project enquiries outside Accra can be considered depending on scope, travel, and site requirements." },
];

function Contact() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Contact Us | Tedex Design Consults";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-page [data-contact-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page">
      <PageHeader title="Contact Us" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <div data-contact-reveal><ContactInfoCards /></div>
      <div data-contact-reveal><ContactFormSection /></div>
      <div data-contact-reveal><ContactMap /></div>
      <ServicesFaq
        label="QUICK ANSWERS"
        heading="Before You Reach Out"
        intro="A few practical answers to help you start a conversation with our team."
        items={CONTACT_FAQS}
        contactTitle="Need project-specific advice?"
        contactText="Send your brief and we will point you toward the right next step."
      />
      <ProjectsCta
        heading="Let's Create Something Meaningful"
        intro="Tell us about the space you have in mind and begin a conversation with Tedex Design Consults."
        primaryLabel="Book A Consultation"
        showSecondary={false}
      />
    </div>
  );
}

export default Contact;
