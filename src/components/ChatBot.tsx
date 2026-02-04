import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch greeting from Mistral when chatbot opens for the first time
  useEffect(() => {
    const fetchGreeting = async () => {
      if (isOpen && !hasGreeted && messages.length === 0) {
        setIsLoading(true);
        setHasGreeted(true);
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Présente-toi brièvement en tant que Chronos, le guide temporel de TimeTravel Agency." }),
          });
          const data = await response.json();
          if (response.ok) {
            setMessages([{ role: "assistant", content: data.content }]);
          }
        } catch (error) {
          console.error(error);
          setMessages([{ role: "assistant", content: "Bienvenue ! Je suis Chronos, votre guide temporel. Comment puis-je vous aider ?" }]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchGreeting();
  }, [isOpen, hasGreeted, messages.length]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Erreur API");
    }

    return data.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await generateResponse(currentInput);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Oups, faille temporelle... Veuillez réessayer." 
      }]);
    } finally {
      setIsLoading(false);
    }
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
