"use client";

import { features, gradientes } from "@/constants";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 160 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const ComoFunciona = () => {
  return (
    <section
      id="como-funciona"
      className="min-h-screen bg-corAzulClaro flex flex-col items-center py-16 px-4"
    >
      <h2 className="text-textoPreto text-4xl sm:text-6xl font-extrabold mb-4">
        Como funciona?
      </h2>
      <h4 className="text-xl font-light text-corCinza mb-12 text-center">
        Três passos simples para uma viagem perfeita
      </h4>

      <motion.div
        className="max-w-4xl md:max-w-6xl mx-auto grid gap-6 md:gap-12 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md
                       hover:scale-150 hover:shadow-xl"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                gradientes[feature.gradiente]
              } flex items-center justify-center`}
            >
              {feature.icone}
            </div>
            <h3 className="text-2xl md:text-2xl font-semibold text-textoPreto">
              {feature.titulo}
            </h3>
            <p className="text-lg text-corCinza">{feature.descricao}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ComoFunciona;
