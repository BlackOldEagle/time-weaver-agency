import { Link } from "react-router-dom";
import { Clock, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-gold" />
              <span className="font-serif text-2xl font-semibold">
                TimeTravel<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pionniers du voyage temporel depuis 2089. 
              Nous rendons l'histoire accessible à tous.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {["Accueil", "Destinations", "Réserver", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Accueil" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Destinations</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/destinations#paris-1889" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Paris 1889
                </Link>
              </li>
              <li>
                <Link to="/destinations#cretaceous" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Crétacé (-68 Ma)
                </Link>
              </li>
              <li>
                <Link to="/destinations#florence-1504" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Florence 1504
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-gold" />
                contact@timetravel.agency
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>42 Avenue du Temps<br />75008 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2089 TimeTravel Agency. Tous droits réservés à travers le temps.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Mentions légales
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Conditions temporelles
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
