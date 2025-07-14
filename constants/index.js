import { MapPin, Sparkles, User } from "lucide-react";

export const gradientes = {
  pinkPurple: "from-pink-500 to-purple-500",
  cyanBlue: "from-cyan-500 to-blue-500",
  orangeYellow: "from-orange-500 to-yellow-400",
};

export const features = [
  {
    titulo: "Perfil Personalizado",
    descricao:
      "Conte-nos seus interesses e preferências de viagem para roteiros únicos.",
    icone: <User className="w-6 h-6 text-white" />,
    gradiente: "pinkPurple",
  },
  {
    titulo: "Roteiros Inteligentes",
    descricao:
      "Algoritmos avançados criam itinerários perfeitos baseados no seu perfil.",
    icone: <MapPin className="w-6 h-6 text-white" />,
    gradiente: "cyanBlue",
  },
  {
    titulo: "Experiências Únicas",
    descricao:
      "Descubra lugares e atividades que combinam perfeitamente com você.",
    icone: <Sparkles className="w-6 h-6 text-white" />,
    gradiente: "orangeYellow",
  },
];

export const interesses = [
  "Praias",
  "Montanhas",
  "Cidades Históricas",
  "Museus",
  "Vida Noturna",
  "Gastronomia",
  "Aventura",
  "Cultura",
  "Natureza",
  "Arquitetura",
  "Arte",
  "Compras",
  "Esportes",
  "Relaxamento",
  "Fotografia",
  "Luxo",
];
