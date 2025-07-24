"use client";

import perfilStore from "@/store/perfilStore";
import { Calendar, Home, MapPin, PlusCircle, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MeusRoteiros = observer(() => {
  const router = useRouter();
  const { roteirosSalvos } = perfilStore;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleRemoverRoteiro = (id) => {
    toast.info("Funcionalidade de remover roteiro não implementada ainda.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 text-gray-700 p-6">
        <div className="animate-spin-slow text-[#851F92] mb-4">
          <MapPin size={48} />
        </div>
        <p className="text-2xl font-semibold mb-2">
          Carregando seus roteiros...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeInScale">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-purple-100">
        <div className="text-center mb-10 pb-6 border-b border-purple-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#851F92] leading-tight mb-4">
            Meus Roteiros Salvos
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Aqui você encontra todos os roteiros de viagem que você salvou.
          </p>
        </div>

        {roteirosSalvos.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500 mb-6">
              Você ainda não salvou nenhum roteiro.
            </p>
            <button
              onClick={() => router.push("/perfil")}
              className="flex items-center justify-center mx-auto bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-fuchsia-700 transition-colors shadow-lg btn-hover-scale"
            >
              <PlusCircle size={22} className="mr-2" />
              Criar Meu Primeiro Roteiro
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roteirosSalvos.map((roteiroItem) => (
              <div
                key={roteiroItem.id}
                className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-100 flex flex-col justify-between animate-slideInUp"
              >
                <div>
                  <h2 className="text-xl font-bold text-[#851F92] mb-2 flex items-center">
                    <MapPin size={24} className="mr-2 text-purple-700" />
                    {roteiroItem.destino.nomeCidade}
                    {/* Opcional: mostrar a bandeira se tiver a lógica aqui também */}
                    {/* {selecionarBandeiraPais(roteiroItem.destino.nomePais)} */}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Salvo em: {roteiroItem.salvoEm}
                  </p>
                  <p className="text-gray-800 line-clamp-3 mb-4">
                    {/* Exibe uma prévia do roteiro. Limita a 3 linhas. */}
                    {roteiroItem.roteiroText.substring(0, 150)}...
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => {
                      toast.info(
                        "Funcionalidade de visualizar roteiro completo não implementada ainda."
                      );
                    }}
                    className="flex items-center text-purple-600 hover:text-purple-800 font-semibold"
                  >
                    <Calendar size={18} className="mr-1" /> Ver Roteiro
                  </button>
                  <button
                    onClick={() => handleRemoverRoteiro(roteiroItem.id)}
                    className="text-red-500 hover:text-red-700 ml-4 flex items-center"
                  >
                    <Trash2 size={18} className="mr-1" /> Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão para Voltar para a Home no final da página de roteiros salvos */}
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center mx-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors shadow-lg btn-hover-scale"
          >
            <Home size={22} className="mr-2" />
            Voltar para a Home
          </button>
        </div>
      </div>
    </section>
  );
});

export default MeusRoteiros;
