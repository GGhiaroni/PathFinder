"use client";

import { ArrowDown } from "lucide-react";
import BotaoEstilizado from "./BotaoEstilizado";
import Logomarca from "./Logomarca";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 px-4">
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-500 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-[200px] h-[200px] bg-purple-500 rounded-full opacity-20 blur-2xl pointer-events-none transform -translate-x-1/2" />

      <div className="z-10">
        <Logomarca />
        <p className="mt-4 text-lg text-white/80">
          Descubra roteiros personalizados baseados nos seus interesses.
          <br />
          Sua próxima aventura começa aqui.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <BotaoEstilizado
            titulo="Criar perfil"
            estiloBotao="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold"
          />
          <BotaoEstilizado
            titulo="Ver roteiros"
            estiloBotao="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold"
          />
        </div>
      </div>
      <ArrowDown className="absolute bottom-32 left-1/2 -translate-x-1/2 transform animate-bounce text-white text-2xl opacity-60" />
    </section>
  );
};

export default Hero;
