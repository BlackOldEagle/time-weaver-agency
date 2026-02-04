import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessage: Message = {
  role: "assistant",
  content: "Bienvenue chez TimeTravel Agency ! 🕰️ Je suis votre guide temporel. Comment puis-je vous aider à planifier votre voyage dans le temps ? Posez-moi vos questions sur nos destinations, nos services ou vos préférences de voyage !",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (will be replaced with real AI when Cloud is enabled)
    setTimeout(() => {
      const responses = getSimulatedResponse(input.trim());
      setMessages((prev) => [...prev, { role: "assistant", content: responses }]);
      setIsLoading(false);
    }, 1000);
  };

  const getSimulatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("paris") || lowerQuery.includes("1889") || lowerQuery.includes("tour eiffel")) {
      return "Paris 1889 est notre destination la plus romantique ! 🗼 Vous pourrez assister à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Le voyage dure 3 à 7 jours et coûte 15,000€. C'est l'occasion unique de vivre la Belle Époque avec ses cafés littéraires, ses artistes impressionnistes et son effervescence culturelle. Souhaitez-vous en savoir plus sur les expériences proposées ?";
    }
    
    if (lowerQuery.includes("dinosaure") || lowerQuery.includes("crétacé") || lowerQuery.includes("préhistoire")) {
      return "Le Crétacé est notre aventure la plus extrême ! 🦖 Vous explorerez un monde vieux de 68 millions d'années, avec des T-Rex, des Ptéranodons et des paysages volcaniques. C'est notre voyage le plus onéreux (45,000€) mais aussi le plus inoubliable. Attention : une assurance spéciale est obligatoire et vous devrez suivre un protocole de sécurité strict. Êtes-vous prêt pour l'aventure ultime ?";
    }
    
    if (lowerQuery.includes("florence") || lowerQuery.includes("renaissance") || lowerQuery.includes("1504") || lowerQuery.includes("vinci")) {
      return "Florence 1504, c'est l'apogée de la Renaissance ! 🎨 Rencontrez Léonard de Vinci, assistez au dévoilement du David de Michel-Ange, et participez à un banquet chez les Médicis. Le séjour de 5-10 jours à 22,000€ vous permettra de vivre une époque où l'art et la science redéfinissaient le monde. Une connaissance de l'italien médiéval est recommandée. Quel aspect vous intéresse le plus ?";
    }
    
    if (lowerQuery.includes("prix") || lowerQuery.includes("coût") || lowerQuery.includes("tarif")) {
      return "Nos tarifs varient selon la destination et la durée :\n\n• Paris 1889 : à partir de 15,000€ (3-7 jours)\n• Florence 1504 : à partir de 22,000€ (5-10 jours)\n• Crétacé : à partir de 45,000€ (1-3 jours)\n\nTous nos forfaits incluent l'équipement d'époque, la formation pré-voyage, et l'assurance temporelle de base. Quelle destination vous attire ?";
    }
    
    if (lowerQuery.includes("sécurité") || lowerQuery.includes("danger") || lowerQuery.includes("risque")) {
      return "Votre sécurité est notre priorité absolue ! 🛡️ Nous utilisons la technologie de téléportation temporelle la plus avancée, avec un taux de retour de 100%. Chaque voyageur est équipé d'un dispositif de rappel d'urgence et accompagné de guides experts. Pour le Crétacé, des mesures supplémentaires sont prises (véhicules blindés, protocoles anti-prédateurs). Avez-vous des préoccupations spécifiques ?";
    }
    
    if (lowerQuery.includes("réserver") || lowerQuery.includes("réservation") || lowerQuery.includes("book")) {
      return "Pour réserver votre voyage temporel, rendez-vous sur notre page de réservation ! 📅 Vous pourrez y sélectionner votre destination, choisir vos dates et personnaliser votre expérience. Un conseiller vous contactera ensuite pour finaliser les détails et vous préparer à l'aventure. Puis-je vous aider à choisir la destination idéale pour vous ?";
    }
    
    return "Excellente question ! Chez TimeTravel Agency, nous proposons trois destinations exceptionnelles : Paris 1889 (Belle Époque), le Crétacé (-68 millions d'années) et Florence 1504 (Renaissance). Chaque voyage est une expérience unique, encadrée par des experts et garantie en toute sécurité. Quelle époque vous fascine le plus ? Je peux vous donner tous les détails !";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-gold to-gold-light shadow-lg hover:shadow-[0_0_30px_hsl(43_74%_49%_/_0.4)] transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-midnight" />
        ) : (
          <MessageCircle className="w-6 h-6 text-midnight" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-temporal rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold/20 to-temporal/10 p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif font-semibold">Guide Temporel</h3>
                <p className="text-xs text-muted-foreground">Toujours disponible • À travers le temps</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.role === "user" 
                    ? "bg-temporal/20" 
                    : "bg-gold/20"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-temporal" />
                  ) : (
                    <Bot className="w-4 h-4 text-gold" />
                  )}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-temporal/20 rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <Button
                type="submit"
                variant="hero"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-11 w-11"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
