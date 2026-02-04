import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import AgencySection from "@/components/AgencySection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DestinationsPreview />
        <AgencySection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
