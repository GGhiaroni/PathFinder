"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

const BotaoRedirectMeusRoteiros = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/meus-roteiros")}
      className="flex items-center justify-center bg-purple-100 text-purple-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-200 transition-colors shadow-lg btn-hover-scale"
    >
      <Save size={22} className="mr-2" />
      Ver Meus Roteiros Salvos
    </button>
  );
};

export default BotaoRedirectMeusRoteiros;
