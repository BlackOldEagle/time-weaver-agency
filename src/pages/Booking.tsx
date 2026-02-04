import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Users, Clock, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { destinations } from "@/data/destinations";
import { toast } from "@/hooks/use-toast";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const preselectedDestination = searchParams.get("destination") || "";
  
  const [formData, setFormData] = useState({
    destination: preselectedDestination,
    travelers: "1",
    departureDate: "",
    returnDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Réservation envoyée !",
      description: "Notre équipe vous contactera sous 24h pour finaliser votre voyage temporel.",
    });
  };

  const selectedDestination = destinations.find((d) => d.id === formData.destination);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 min-h-[80vh] flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                Réservation Confirmée<span className="text-gold">!</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre confiance ! Notre équipe de guides temporels vous contactera 
                dans les 24 heures pour finaliser les détails de votre voyage vers{" "}
                <span className="text-gold">{selectedDestination?.title || "votre destination"}</span>.
              </p>
              <p className="text-muted-foreground mb-8">
                Un email de confirmation a été envoyé à <span className="text-foreground">{formData.email}</span>.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 temporal-bg">
          <div className="container mx-auto px-6 text-center">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Réservation
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mt-4 mb-6">
              Planifiez Votre
              <span className="block text-gold">Voyage</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Remplissez le formulaire ci-dessous et notre équipe vous contactera 
              pour finaliser votre aventure temporelle.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Destination Selection */}
                  <div className="p-6 rounded-2xl bg-background border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-gold" />
                      Destination & Dates
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Destination</label>
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        >
                          <option value="">Choisir une destination</option>
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.title} ({d.era})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre de voyageurs</label>
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} voyageur{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Date de départ</label>
                        <input
                          type="date"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Date de retour</label>
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="p-6 rounded-2xl bg-background border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Users className="w-6 h-6 text-gold" />
                      Informations Personnelles
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Prénom</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Votre prénom"
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom"
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+33 6 00 00 00 00"
                          className="w-full h-12 px-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="p-6 rounded-2xl bg-background border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-gold" />
                      Demandes Spéciales
                    </h2>
                    
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Préférences alimentaires, besoins spéciaux, expériences souhaitées..."
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer la Demande de Réservation"
                    )}
                  </Button>
                </form>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 p-6 rounded-2xl bg-background border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-6">Résumé</h3>
                  
                  {selectedDestination ? (
                    <div>
                      <img
                        src={selectedDestination.image}
                        alt={selectedDestination.title}
                        className="w-full aspect-video object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-serif text-2xl font-semibold mb-2">
                        {selectedDestination.title}
                      </h4>
                      <p className="text-gold text-sm mb-4">{selectedDestination.era}</p>
                      <p className="text-muted-foreground text-sm mb-6">
                        {selectedDestination.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Durée</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gold" />
                            {selectedDestination.duration}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Voyageurs</span>
                          <span>{formData.travelers}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">À partir de</span>
                          <span className="font-serif text-2xl text-gold font-semibold">
                            {selectedDestination.price}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Prix indicatif par personne. Le tarif final sera confirmé par notre équipe.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Sélectionnez une destination pour voir les détails
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Booking;
