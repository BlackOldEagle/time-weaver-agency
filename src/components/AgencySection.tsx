import { Shield, Clock, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sécurité Absolue",
    description: "Notre technologie de pointe garantit votre sécurité à travers toutes les époques.",
  },
  {
    icon: Clock,
    title: "Précision Temporelle",
    description: "Arrivée au jour et à l'heure exacts. Pas de surprise, juste l'histoire.",
  },
  {
    icon: Award,
    title: "Guides Experts",
    description: "Historiens et scientifiques certifiés pour une immersion authentique.",
  },
  {
    icon: Users,
    title: "Expérience Sur-Mesure",
    description: "Chaque voyage est personnalisé selon vos centres d'intérêt.",
  },
];

const AgencySection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Notre Agence
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-4 mb-6">
              Pionniers du Voyage
              <span className="text-gold"> Temporel</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Depuis notre première traversée en 2089, TimeTravel Agency a transporté 
              plus de 50,000 voyageurs à travers les âges. Notre expertise et notre 
              technologie de pointe font de nous le leader incontesté du voyage temporel.
            </p>
            <p className="text-muted-foreground mb-8">
              Notre mission : rendre l'histoire accessible à tous, dans les conditions 
              de sécurité les plus strictes. Chaque voyage est une aventure unique, 
              guidée par nos experts passionnés.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="font-serif text-3xl text-gold font-semibold">50K+</div>
                <div className="text-sm text-muted-foreground">Voyageurs</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-gold font-semibold">100%</div>
                <div className="text-sm text-muted-foreground">Retours sains</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-gold font-semibold">12</div>
                <div className="text-sm text-muted-foreground">Époques</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-background/50 border border-border/50 card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencySection;
