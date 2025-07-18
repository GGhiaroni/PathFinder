"use client";

import perfilStore from "@/store/perfilStore";
import { gerarRoteiroClient } from "@/utils/gemini";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchRoteiro = async () => {
      if (!perfilStore.nome) {
        router.push("/perfil");
        return;
      }

      try {
        const novoRoteiro = await gerarRoteiroClient({
          nome: perfilStore.nome,
          idade: perfilStore.idade,
          interesses: perfilStore.interesses,
          orcamento: perfilStore.orcamento,
        });

        perfilStore.setRoteiro(novoRoteiro);
        router.push("/roteiro");
      } catch (error) {
        console.error("Erro ao gerar roteiro:", error);
        toast.error("Erro ao gerar o roteiro. Tente novamente.");
        router.push("/perfil");
      }
    };

    if (!perfilStore.roteiro) {
      fetchRoteiro();
    } else {
      router.push("/roteiro");
    }
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-b from-indigo-50 to-fuchsia-100
          animate-gradient-y bg-[length:200%_200%]"
    >
      <h1 className="text-4xl font-bold text-[#851F92]">
        Gerando seu roteiro...
      </h1>
      <p className="text-xl text-gray-600 mt-2">
        Isso pode levar alguns segundos
      </p>
      <div className="mt-8 h-12 w-12 border-t-4 border-[#851F92] border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
