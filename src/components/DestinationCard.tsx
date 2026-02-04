import { ArrowUpRight, Clock, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  title: string;
  era: string;
  description: string;
  image: string;
  duration: string;
  highlights: string[];
}

const DestinationCard = ({
  id,
  title,
  era,
  description,
  image,
  duration,
  highlights,
}: DestinationCardProps) => {
  return (
    <Link 
      to={`/destinations#${id}`}
      className="group block relative rounded-2xl overflow-hidden card-hover"
    >
      {/* Background Image */}
      <div className="aspect-[4/5] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
        
        {/* Temporal glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/20 via-transparent to-temporal/10" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        {/* Era badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-4">
          <Calendar className="w-3 h-3 text-gold" />
          <span className="text-xs font-medium text-gold">{era}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {highlights[0]}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-gold font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Découvrir</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>

      {/* Temporal border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/30 transition-colors duration-300" />
    </Link>
  );
};

export default DestinationCard;
