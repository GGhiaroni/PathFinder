"use client";

import { usuarioStore } from "@/store/usuarioStore";
import { Calendar, MapPin, Pencil } from "lucide-react";
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
  const [isEditing, setIsEditing] = useState(false);

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
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeInScale">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gray-800 text-white p-6 sm:p-8 flex justify-between items-center rounded-t-2xl">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-1">
              {roteiro.titulo.replace("Roteiro em ", "")}
            </h1>
            <p className="text-gray-300 text-sm">
              {roteiro.dados_roteiro?.dates || "Datas não disponíveis"} &bull;{" "}
              {roteiro.dados_roteiro?.duration || "Duração não disponível"}
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-lg flex items-center">
            <Pencil size={16} className="mr-2" />
            Editar Roteiro
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {roteiro.dados_roteiro?.days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative mb-8">
              {dayIndex < roteiro.dados_roteiro.days.length - 1 && (
                <div className="absolute top-12 left-4 w-px h-full bg-gray-300 animate-expand"></div>
              )}

              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-800 border-2 border-white z-10">
                  <Calendar size={18} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 ml-4 -mt-1">
                  {day.title}
                  <p className="text-sm font-normal text-gray-500">
                    {day.subtitle}
                  </p>
                </h3>
              </div>

              <ul className="pl-12 space-y-6">
                {day.activities.map((activity, activityIndex) => (
                  <li key={activityIndex} className="relative">
                    <div className="absolute left-[-2.25rem] top-2 w-3 h-3 bg-gray-800 rounded-full z-10 animate-scaleIn"></div>

                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {activity.time}
                      </p>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {activity.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">
                        {activity.description}
                      </p>

                      <div className="flex items-center flex-wrap gap-2 mt-2 text-sm text-gray-600">
                        {activity.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />{" "}
                            {activity.location}
                          </span>
                        )}

                        {activity.category && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${
                              activity.category === "Gastronomia"
                                ? "bg-orange-100 text-orange-600"
                                : activity.category === "Cultura"
                                ? "bg-blue-100 text-blue-600"
                                : activity.category === "Natureza"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {activity.category}
                          </span>
                        )}

                        {activity.rating && (
                          <span className="flex items-center gap-1">
                            {Array(Math.floor(activity.rating))
                              .fill()
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-3 h-3 text-yellow-400 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27l-5.18 3.52 1.9-6.09L2.56 10h6.44L12 3.53l3 6.47h6.44l-5.18 3.52 1.9 6.09z" />
                                </svg>
                              ))}
                            {activity.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default RoteiroSalvo;
