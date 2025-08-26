"use client";

import { usuarioStore } from "@/store/usuarioStore";
import { Calendar, MapPin, Pencil, Plus, Save, Trash2, X } from "lucide-react";
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
  const [roteiroEditavel, setRoteiroEditavel] = useState(null);
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
        setRoteiroEditavel(data);
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

  const handleSalvarAlteracoes = async () => {
    console.log("Dados a serem salvos: ", roteiroEditavel);
    toast.success("Roteiro salvo com sucesso!");
    setIsEditing(false);
    setRoteiro(roteiroEditavel);
  };

  const handleAlteracaoTitulo = (e) => {
    setRoteiroEditavel({
      ...roteiroEditavel,
      titulo: e.target.value,
    });
  };

  const handleAlteracaoDiasSubtitulo = (e, indexDia) => {
    const novosDias = [...roteiroEditavel.dados_roteiro.days];
    novosDias[indexDia].title = e.target.value;
    setRoteiroEditavel({
      ...roteiroEditavel,
      dados_roteiro: { ...roteiroEditavel.dados_roteiro, days: novosDias },
    });
  };

  const handleAlteracaoAtividades = (e, indexDia, indexAtividade) => {
    const { name, value } = e.target;
    const novosDias = [...roteiroEditavel.dados_roteiro.days];
    novosDias[indexDia].activities[indexAtividade][name] = value;
    setRoteiroEditavel({
      ...roteiroEditavel,
      dados_roteiro: { ...roteiroEditavel.dados_roteiro, days: novosDias },
    });
  };

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
    <section className="min-h-screen bg-gray-100 sm:px-6 lg:px-8 animate-fadeInScale">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {!isEditing && (
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
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-lg flex items-center"
            >
              <Pencil size={16} className="mr-2" />
              Editar Roteiro
            </button>
          </div>
        )}

        {isEditing && (
          <div className="bg-gray-800 text-white p-6 sm:p-8 flex justify-between items-center rounded-t-2xl">
            <input
              type="text"
              value={roteiroEditavel.titulo}
              onChange={handleAlteracaoTitulo}
              className="bg-gray-700 text-white text-3xl sm:text-4xl font-bold p-2 rounded-lg w-full mr-4 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSalvarAlteracoes}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-lg flex items-center"
              >
                <Save size={16} className="mr-2" />
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-lg flex items-center"
              >
                <X size={16} className="mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {roteiroEditavel?.dados_roteiro?.days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative mb-8">
              {!isEditing &&
                dayIndex < roteiroEditavel.dados_roteiro.days.length - 1 && (
                  <div className="absolute top-12 left-4 w-px h-full bg-gray-300 animate-expand"></div>
                )}

              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-800 border-2 border-white z-10">
                  <Calendar size={18} />
                </div>
                {!isEditing ? (
                  <h3 className="text-xl font-bold text-gray-800 ml-4 -mt-1">
                    {day.title}
                    <p className="text-sm font-normal text-gray-500">
                      {day.subtitle}
                    </p>
                  </h3>
                ) : (
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => handleDayTitleChange(e, dayIndex)}
                    className="text-xl font-bold text-gray-800 ml-4 p-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-purple-500"
                  />
                )}
              </div>

              <ul className="pl-12 space-y-6">
                {day.activities.map((activity, activityIndex) => (
                  <li key={activityIndex} className="relative">
                    {!isEditing && (
                      <div className="absolute left-[-2.25rem] top-2 w-3 h-3 bg-gray-800 rounded-full z-10 animate-scaleIn"></div>
                    )}

                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      {isEditing && (
                        <div className="flex justify-end gap-2 mb-2">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {}}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}

                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="time"
                            value={activity.time}
                            onChange={(e) =>
                              handleActivityChange(e, dayIndex, activityIndex)
                            }
                            className="w-full p-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-sm font-medium text-gray-800"
                          />
                        ) : (
                          activity.time
                        )}
                      </p>

                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {isEditing ? (
                          <input
                            type="text"
                            name="title"
                            value={activity.title}
                            onChange={(e) =>
                              handleAlteracaoAtividades(
                                e,
                                dayIndex,
                                activityIndex
                              )
                            }
                            className="w-full p-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-lg font-semibold"
                          />
                        ) : (
                          activity.title
                        )}
                      </h4>

                      <p className="text-gray-700 text-sm mb-3">
                        {isEditing ? (
                          <textarea
                            name="description"
                            value={activity.description}
                            onChange={(e) =>
                              handleActivityChange(e, dayIndex, activityIndex)
                            }
                            className="w-full p-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-sm text-gray-800"
                            rows="2"
                          />
                        ) : (
                          activity.description
                        )}
                      </p>
                    </div>
                  </li>
                ))}
                {isEditing && (
                  <button
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                    onClick={() => {
                      // TODO: Lógica para adicionar nova atividade
                    }}
                  >
                    <Plus size={18} /> Adicionar Atividade
                  </button>
                )}
              </ul>
            </div>
          ))}
          {isEditing && (
            <button
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold mt-8"
              onClick={() => {
                // TODO: Lógica para adicionar novo dia
              }}
            >
              <Plus size={18} /> Adicionar Dia
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default RoteiroSalvo;
