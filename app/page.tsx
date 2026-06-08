import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import QuickFacts from "@/components/sections/QuickFacts";
import About from "@/components/sections/About";
import Impact from "@/components/sections/Impact";
import Achievements from "@/components/sections/Achievements";
import Skills from "@/components/sections/Skills";
import HowIBuild from "@/components/sections/HowIBuild";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <QuickFacts />
      <Impact />
      <Projects />
      <Resume />
      <About />
      <Achievements />
      <Skills />
      <HowIBuild />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}

