"use client";

import { UserRound } from "lucide-react";

const Perfil = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-50">
      <div className="flex flex-col items-center justify-center py-10 px-8">
        <div className="flex items-center gap-3">
          <UserRound color="#851F92" size={30} className="shrink-0" />
          <h1 className="text-[2.5rem] text-textoPreto leading-tight font-extrabold">
            Crie seu perfil
          </h1>
        </div>
        <h3 className="text-xl font-semibold text-corCinza text-center mt-4">
          Conte-nos sobre suas preferências para criarmos seu roteiro perfeito
        </h3>
      </div>
      <div className="bg-white mx-4 flex flex-col items-center justify-center rounded-lg py-6">
        <h3 className="text-3xl font-bold ">Informações básicas</h3>
      </div>
    </section>
  );
};

export default Perfil;
