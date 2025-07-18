"use client";

import perfilStore from "@/store/perfilStore";
import { gerarRoteiroClient, sugerirDestinosClient } from "@/utils/gemini";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      if (!perfilStore.nome) {
        router.push("/perfil");
        return;
      }

      if (perfilStore.destinoEscolhido) {
        try {
          const novoRoteiro = await gerarRoteiroClient({
            nome: perfilStore.nome,
            idade: perfilStore.idade,
            interesses: perfilStore.interesses,
            orcamento: perfilStore.orcamento,
            destino: perfilStore.destinoEscolhido,
          });
          perfilStore.setRoteiro(novoRoteiro);
          router.push("/roteiro");
        } catch (error) {
          console.error("Erro ao gerar roteiro específico:", error);
          toast.error("Erro ao gerar o roteiro detalhado. Tente novamente.");
          perfilStore.reset();
          router.push("/perfil");
        }
      } else if (perfilStore.sugestoesDestino.length === 0) {
        try {
          const sugestoes = await sugerirDestinosClient({
            nome: perfilStore.nome,
            idade: perfilStore.idade,
            interesses: perfilStore.interesses,
            orcamento: perfilStore.orcamento,
          });
          perfilStore.setSugestoesDestino(sugestoes);
          router.push("/sugerir-destinos");
        } catch (error) {
          console.error("Erro ao gerar sugestões de destino:", error);
          toast.error("Erro ao sugerir destinos. Tente novamente.");
          perfilStore.reset();
          router.push("/perfil");
        }
      } else {
        router.push("/sugerir-destinos");
      }
    };

    fetchContent();
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-b from-indigo-50 to-fuchsia-100
          animate-gradient-y bg-[length:200%_200%]"
    >
      <h1 className="text-4xl font-bold text-[#851F92]">
        {perfilStore.destinoEscolhido
          ? "Preparando seu roteiro..."
          : "Gerando sugestões..."}
      </h1>
      <p className="text-xl text-gray-600 mt-2">
        Isso pode levar alguns segundos
      </p>
      <div className="mt-8 h-12 w-12 border-t-4 border-[#851F92] border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
