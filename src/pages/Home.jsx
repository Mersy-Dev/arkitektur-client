import Hero from "../components/home/Hero";
import Facts from "../components/home/Facts";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import ProjectsShowcase from "../components/ProjectsShowcase";
import { useLegacyPlugins } from "../hooks/useLegacyPlugins";

function Home() {
  useLegacyPlugins();

  return (
    <>
      <Hero />
      <Facts />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsShowcase />
    </>
  );
}

export default Home;