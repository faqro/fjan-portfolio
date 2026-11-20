import { useState } from "react";
import { MotionConfig } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import HobbiesSection from "@/components/HobbiesSection";
import PhotoCarousel from "@/components/PhotoCarousel";
import ContactSection from "@/components/ContactSection";
import CustomContextMenu from "@/components/CustomContextMenu";

const App = () => {
  const [isPlayingGlimmerdeep, setIsPlayingGlimmerdeep] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative text-slate-800 overflow-x-clip">
        <AmbientBackground />
        <Navbar />
        <CustomContextMenu
          onPlayGlimmerdeep={() => setIsPlayingGlimmerdeep(true)}
        />
        <main>
          <HeroSection
            isPlayingGlimmerdeep={isPlayingGlimmerdeep}
            onExitGlimmerdeep={() => setIsPlayingGlimmerdeep(false)}
          />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <HobbiesSection />
          <PhotoCarousel />
          <ContactSection />
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
