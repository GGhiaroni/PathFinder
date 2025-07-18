"use client";

import perfilStore from "@/store/perfilStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Roteiro = observer(() => {
  const router = useRouter();

  const { roteiro, nome } = perfilStore;

  useEffect(() => {
    if (!roteiro || !nome) {
      router.push("/perfil");
    }
  }, [roteiro, nome, router]);

  if (!roteiro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando roteiro ou roteiro não disponível. Redirecionando...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-100 p-6">
      <div className="bg-white mx-auto max-w-4xl rounded-lg py-8 px-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-[#851F92] mb-6 text-center">
          Seu Roteiro Personalizado!
        </h1>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <pre className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
            {roteiro}
          </pre>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              perfilStore.reset();
              router.push("/perfil");
            }}
            className="bg-[#851F92] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6d1a78] transition-all shadow-lg"
          >
            Criar Novo Roteiro
          </button>
        </div>
      </div>
    </section>
  );
});

export default Roteiro;
