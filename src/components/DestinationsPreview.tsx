import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

const DestinationsPreview = () => {
  return (
    <section className="py-24 temporal-bg">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 stagger-children">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">
            Destinations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6">
            Voyagez à Travers les Âges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Trois époques extraordinaires vous attendent. Choisissez votre aventure 
            et préparez-vous à vivre l'impossible.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <DestinationCard
                id={destination.id}
                title={destination.title}
                era={destination.era}
                description={destination.description}
                image={destination.image}
                duration={destination.duration}
                highlights={destination.highlights}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="glass" size="lg" asChild className="group">
            <Link to="/destinations">
              Voir Toutes les Destinations
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsPreview;
