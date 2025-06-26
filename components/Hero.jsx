"use client";

import Logomarca from "./Logomarca";

const Hero = () => {
  return (
    <section className="bg-black flex flex-col">
      <Logomarca />
      <h3 className="font-extrabold text-white font-poppins">
        Monte seus roteiros personalizados com base em seus interesses e
        orçamento.
      </h3>
      <h4 className="font-light text-white font-poppins">
        Sua próxima aventura começa aqui!
      </h4>
    </section>
  );
};

export default Hero;
