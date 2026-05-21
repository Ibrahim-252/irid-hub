import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/HeroSection";
import { FocusCards } from "@/components/home/FocusCards";
import { AboutPreview } from "@/components/home/AboutPreview";
import { EventsPreview } from "@/components/home/EventsPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>IRID Institute | Evidence for better governance</title>
        <meta name="description" content="IRID Institute is a nonpartisan public policy think tank based in Somalia, dedicated to advancing governance reform and peacebuilding through evidence-based research." />
        <meta property="og:title" content="IRID Institute | Evidence for better governance" />
        <meta property="og:description" content="Think tank dedicated to governance reform and peacebuilding in Somalia." />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <FocusCards />
        <AboutPreview />
        <EventsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
