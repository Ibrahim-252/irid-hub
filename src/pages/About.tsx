import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { VisionMission } from "@/components/about/VisionMission";
import { Objectives } from "@/components/about/Objectives";
import { Leadership } from "@/components/about/Leadership";
import { CTASection } from "@/components/home/CTASection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <WhoWeAre />
        <VisionMission />
        <Objectives />
        <Leadership />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
