import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import WhyChooseUs from "../components/WhyChooseUs";
import ProjectsCta from "../components/projects/ProjectsCta";
import AboutStory from "../components/about/AboutStory";
import AboutPillars from "../components/about/AboutPillars";
import AboutStats from "../components/about/AboutStats";
import AboutJourney from "../components/about/AboutJourney";
import TeamSection from "../components/team/TeamSection";
import {
  aboutStory,
  aboutPillars,
  aboutValues,
  aboutStats,
  aboutMilestones,
  teamMembers,
} from "../data/about";

function About() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "About Us | Tedex Design Consults";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".about-page [data-about-reveal]");
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
    <div className="about-page">
      <PageHeader
        title="About Us"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />
      <div data-about-reveal>
        <AboutStory story={aboutStory} />
      </div>
      <div data-about-reveal>
        <AboutPillars pillars={aboutPillars} values={aboutValues} />
      </div>
      <AboutStats stats={aboutStats} />
      <AboutJourney milestones={aboutMilestones} />
      <TeamSection
        members={teamMembers}
        label="OUR TEAM"
        heading="Meet The People Behind Every Design"
        intro="A multidisciplinary team united by thoughtful architecture and close collaboration."
      />
      <WhyChooseUs
        label="WHY TEDEX"
        heading="A Trusted Process From Vision To Reality"
        intro="We combine design imagination with disciplined delivery, so every decision remains clear and every outcome is connected to the brief."
      />
      <ProjectsCta
        heading="Start Your Next Project With Us"
        intro="Tell us what you are imagining. Together, we can shape a space that is distinctive, useful, and built to endure."
        primaryLabel="Book A Consultation"
        secondaryLabel="Contact Tedex"
      />
    </div>
  );
}

export default About;
