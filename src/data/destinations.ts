import paris1889 from "@/assets/paris-1889.jpg";
import cretaceous from "@/assets/cretaceous.jpg";
import florence1504 from "@/assets/florence-1504.jpg";

export interface Destination {
  id: string;
  title: string;
  era: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  duration: string;
  price: string;
  highlights: string[];
  experiences: string[];
  warnings: string[];
}

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    era: "Belle Époque",
    year: "1889",
    description: "Vivez l'inauguration de la Tour Eiffel lors de l'Exposition Universelle, au cœur de la Ville Lumière.",
    longDescription: "Plongez dans l'effervescence de la Belle Époque parisienne. Assistez à l'inauguration de la Tour Eiffel, symbole de modernité et prouesse technique. Flânez sur les Champs-Élysées, visitez les cafés littéraires de Montmartre et côtoyez les plus grands artistes de l'époque.",
    image: paris1889,
    duration: "3-7 jours",
    price: "15,000 €",
    highlights: ["Tour Eiffel", "Exposition Universelle", "Montmartre", "Café de la Paix"],
    experiences: [
      "Assister à l'inauguration de la Tour Eiffel",
      "Dîner aux côtés de Gustave Eiffel",
      "Explorer l'Exposition Universelle",
      "Visite guidée de Montmartre avec les impressionnistes",
    ],
    warnings: [
      "Vaccinations XIXe siècle requises",
      "Vêtements d'époque fournis",
      "Pas d'appareils électroniques modernes"
    ],
  },
  {
    id: "cretaceous",
    title: "Crétacé",
    era: "Ère Mésozoïque",
    year: "-68 Ma",
    description: "Explorez un monde préhistorique peuplé de dinosaures majestueux et de paysages primitifs.",
    longDescription: "Embarquez pour l'aventure ultime : le Crétacé supérieur, il y a 68 millions d'années. Observez les Tyrannosaures Rex dans leur habitat naturel, survolez des vallées où évoluent les Ptéranodons, et découvrez une Terre primordiale d'une beauté sauvage inégalée.",
    image: cretaceous,
    duration: "1-3 jours",
    price: "45,000 €",
    highlights: ["T-Rex", "Ptéranodons", "Forêts primitives", "Volcans actifs"],
    experiences: [
      "Safari dinosaures en véhicule blindé",
      "Vol panoramique au-dessus des vallées",
      "Campement sécurisé dans la jungle primitive",
      "Observation nocturne des aurores primordiales",
    ],
    warnings: [
      "Voyage à haut risque - assurance obligatoire",
      "Équipement de survie fourni",
      "Strict protocole de non-interférence avec la faune"
    ],
  },
  {
    id: "florence-1504",
    title: "Florence 1504",
    era: "Renaissance",
    year: "1504",
    description: "Découvrez l'âge d'or de la Renaissance italienne, aux côtés des plus grands génies de l'histoire.",
    longDescription: "Voyagez au cœur de la Renaissance florentine, à l'époque où Léonard de Vinci et Michel-Ange rivalisaient de génie. Assistez au dévoilement du David, visitez les ateliers des plus grands maîtres et plongez dans une époque où l'art et la science redéfinissaient l'humanité.",
    image: florence1504,
    duration: "5-10 jours",
    price: "22,000 €",
    highlights: ["David de Michel-Ange", "Léonard de Vinci", "Médicis", "Duomo"],
    experiences: [
      "Assister au dévoilement du David",
      "Visite privée de l'atelier de Léonard de Vinci",
      "Banquet chez les Médicis",
      "Cours de peinture avec un maître florentin",
    ],
    warnings: [
      "Connaissance de l'italien médiéval recommandée",
      "Vêtements Renaissance fournis",
      "Règles strictes de discrétion temporelle"
    ],
  },
];
