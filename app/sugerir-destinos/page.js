"use client";

import perfilStore from "@/store/perfilStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const SugerirDestinos = observer(() => {
  const router = useRouter();
  const { sugestoesDestino, nome, setDestinoEscolhido, roteiro } = perfilStore;

  useEffect(() => {
    if (!nome) {
      router.push("/perfil");
      return;
    }
    if (roteiro) {
      router.push("/roteiro");
      return;
    }
    if (sugestoesDestino.length === 0 && nome) {
      toast.error(
        "Não foi possível gerar sugestões de destino. Tente novamente."
      );
      router.push("/perfil");
    }
  }, [nome, sugestoesDestino, roteiro, router]);

  const handleEscolherDestino = (destino) => {
    perfilStore.setDestinoEscolhido(destino);
    console.log("Destino escolhido: ", destino.nome, "País:", destino.nomePais);
    router.push("/loading");
  };

  if (sugestoesDestino.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-fuchsia-100">
        <p className="text-xl text-gray-600">
          Carregando sugestões de destinos...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-100 py-10 px-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-[2.5rem] text-textoPreto leading-tight font-extrabold text-center">
          Escolha seu Destino
        </h1>
        <h3 className="text-xl font-semibold text-corCinza text-center mt-4 max-w-2xl">
          Com base no seu perfil, sugerimos estes destinos. Clique em um para
          ver o roteiro detalhado!
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sugestoesDestino.map((destino, index) => (
          <button
            key={index}
            onClick={() => handleEscolherDestino(destino)}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                       flex flex-col items-start text-left border-2 border-transparent hover:border-[#851F92]"
          >
            <h2 className="text-2xl font-bold text-[#851F92] mb-2">
              {destino.nome}
            </h2>
            <p className="text-gray-700 text-base flex-grow">
              {destino.motivo}
            </p>
            <span className="mt-4 text-[#851F92] font-semibold text-sm">
              Clique para ver o roteiro
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/perfil")}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all shadow-md"
        >
          Voltar para o Perfil
        </button>
      </div>
    </section>
  );
});

export default SugerirDestinos;
