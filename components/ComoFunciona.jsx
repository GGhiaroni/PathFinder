import { features, gradientes } from "@/constants";

const ComoFunciona = () => {
  return (
    <section
      id="como-funciona"
      className="min-h-screen bg-corAzulClaro flex flex-col items-center justify-center"
    >
      <h2 className="text-textoPreto text-[2.5rem] font-extrabold">
        Como funciona?
      </h2>
      <h4 className="text-lg font-light text-corCinza">
        Três passos simples para uma viagem perfeita
      </h4>

      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                gradientes[feature.gradiente]
              } flex items-center justify-center`}
            >
              {feature.icone}
            </div>
            <h3 className="text-lg font-semibold text-textoPreto">
              {feature.titulo}
            </h3>
            <p className="text-sm text-corCinza">{feature.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComoFunciona;
