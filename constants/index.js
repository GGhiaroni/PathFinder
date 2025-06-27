import { MapPin, Sparkles, User } from "lucide-react";

export const features = [
  {
    title: "Perfil Personalizado",
    description:
      "Conte-nos seus interesses e preferências de viagem para roteiros únicos.",
    icon: <User className="w-6 h-6 text-white" />,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Roteiros Inteligentes",
    description:
      "Algoritmos avançados criam itinerários perfeitos baseados no seu perfil.",
    icon: <MapPin className="w-6 h-6 text-white" />,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Roteiros Inteligentes",
    description:
      "Algoritmos avançados criam itinerários perfeitos baseados no seu perfil.",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    gradient: "from-orange-500 to-yellow-400",
  },
];
