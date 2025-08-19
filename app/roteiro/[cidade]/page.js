"use client";

import { usuarioStore } from "@/store/usuarioStore";
import { selecionarBandeiraPais } from "@/utils/bandeirasEImagens";
import { AlarmClock, Calendar, Home, Info, MapPin } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const RoteiroSalvo = observer(() => {
  const router = useRouter();
  const params = useParams();
  const { cidade } = params;

  const [roteiro, setRoteiro] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoteiro = useCallback(async () => {
    if (!usuarioStore.usuario?.id) {
      toast.error("Você precisa estar logado para ver este roteiro.");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(
        `/api/roteiro/${cidade}?usuarioId=${usuarioStore.usuario.id}`
      );

      if (response.ok) {
        const data = await response.json();
        setRoteiro(data);
      } else {
        toast.error("Roteiro não encontrado.");
        router.push("/meus-roteiros");
      }
    } catch (error) {
      console.error("Erro ao buscar o roteiro:", error);
      toast.error("Ocorreu um erro ao carregar o roteiro.");
    } finally {
      setLoading(false);
    }
  }, [cidade, router]);

  useEffect(() => {
    fetchRoteiro();
  }, [fetchRoteiro]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 text-gray-700 p-6">
        <div className="animate-spin-slow text-[#851F92] mb-4">
          <MapPin size={48} />
        </div>
        <p className="text-2xl font-semibold mb-2">Carregando seu roteiro...</p>
      </div>
    );
  }

  if (!roteiro) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeInScale">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-purple-100">
        <div className="text-center mb-10 pb-6 border-b border-purple-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#851F92] leading-tight mb-4 flex flex-col sm:flex-row items-center justify-center">
            <span>Seu Roteiro Salvo para</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 ml-0 sm:ml-3 mt-2 sm:mt-0">
              {roteiro.titulo.replace("Roteiro em ", "")}!
            </span>
            {roteiro.pais_destino && (
              <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-5xl sm:text-6xl animate-pulse-slow">
                {selecionarBandeiraPais(roteiro.pais_destino)}
              </span>
            )}
          </h1>
          {roteiro.dados_roteiro?.mainTitle && (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
              {roteiro.dados_roteiro.mainTitle}
            </h2>
          )}
          {roteiro.dados_roteiro?.introDescription && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {roteiro.dados_roteiro.introDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {roteiro.dados_roteiro?.days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-100 flex flex-col animate-slideInUp"
              style={{ animationDelay: `${dayIndex * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold text-[#851F92] mb-1 flex justify-center items-start">
                <Calendar
                  size={40}
                  className="mr-3 text-purple-700 flex-shrink-0"
                />
                <span className="leading-tight flex flex-col">
                  {day.title.split(":").map((part, idx, arr) => (
                    <span
                      key={idx}
                      className={
                        idx === 0
                          ? "text-3xl font-extrabold"
                          : "text-lg font-semibold -mt-1"
                      }
                    >
                      {part.trim()}
                    </span>
                  ))}
                </span>
              </h3>
              <ul className="space-y-4 flex-grow mt-4">
                {day.activities.map((activity, activityIndex) => (
                  <li
                    key={activityIndex}
                    className="text-gray-700 p-3 rounded-lg list-item-hover-bg"
                  >
                    <strong className="text-gray-900 text-lg flex items-center mb-1">
                      <AlarmClock size={18} className="mr-2 text-gray-500" />
                      {activity.time}
                    </strong>
                    <p className="text-base leading-relaxed pl-7">
                      {activity.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {roteiro.dados_roteiro?.tips.length > 0 && (
          <div className="mt-12 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-100 animate-slideInUp">
            <h3 className="text-2xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-200 flex items-center">
              <Info size={28} className="mr-3 text-blue-800" />
              Dicas Adicionais
            </h3>
            <ul className="list-none pl-0 space-y-3 text-gray-700">
              {roteiro.dados_roteiro.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl leading-none">
                    &bull;
                  </span>
                  <p className="text-base leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/meus-roteiros")}
            className="flex items-center justify-center bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors shadow-lg btn-hover-scale"
          >
            <Home size={22} className="mr-2" />
            Voltar para Meus Roteiros
          </button>
        </div>
      </div>
    </section>
  );
});

export default RoteiroSalvo;
