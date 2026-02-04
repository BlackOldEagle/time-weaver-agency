import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, MapPin, AlertTriangle, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { destinations } from "@/data/destinations";

const Destinations = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 temporal-bg">
          <div className="container mx-auto px-6 text-center">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Explorez
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mt-4 mb-6">
              Nos Destinations
              <span className="text-gold">.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Trois époques extraordinaires, trois aventures uniques. 
              Découvrez en détail chaque destination temporelle.
            </p>
          </div>
        </section>

        {/* Destinations */}
        {destinations.map((destination, index) => (
          <section
            key={destination.id}
            id={destination.id}
            className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="container mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                    
                    {/* Era badge */}
                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="font-medium text-gold">{destination.era}</span>
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-serif text-xl font-semibold text-gold">
                        {destination.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-serif text-gold/30 font-bold">
                      {destination.year}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                    {destination.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {destination.longDescription}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-muted-foreground">Durée: {destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="text-muted-foreground">{destination.highlights.slice(0, 2).join(", ")}</span>
                    </div>
                  </div>

                  {/* Experiences */}
                  <div className="mb-8">
                    <h3 className="font-serif text-xl font-semibold mb-4">Expériences Incluses</h3>
                    <ul className="space-y-3">
                      {destination.experiences.map((exp) => (
                        <li key={exp} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-destructive">À noter</span>
                    </div>
                    <ul className="space-y-2">
                      {destination.warnings.map((warning) => (
                        <li key={warning} className="text-sm text-muted-foreground">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button variant="hero" size="lg" asChild className="group">
                    <Link to={`/booking?destination=${destination.id}`}>
                      Réserver ce Voyage
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Destinations;
