"use client";

import perfilStore from "@/store/perfilStore";
import { selecionarBandeiraPais } from "@/utils/bandeirasEImagens";
import { AlarmClock, Calendar, Info, PlusCircle, Save } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Roteiro = observer(() => {
  const router = useRouter();

  const {
    roteiro,
    nome,
    destinoEscolhido,
    paisDestinoEscolhido,
    addSalvarRoteiro,
  } = perfilStore;

  const [parsedRoteiro, setParsedRoteiro] = useState(null);
  const [roteiroJaSalvo, setRoteiroJaSalvo] = useState(false);

  const parseRoteiroContent = useCallback((markdownText) => {
    if (!markdownText) return null;

    const sections = markdownText.split("\n\n");
    let parsed = {
      mainTitle: "",
      introDescription: "",
      days: [],
      tips: [],
    };

    let currentDay = null;
    let inTipsSection = false;

    for (const section of sections) {
      const trimmedSection = section.trim();

      if (trimmedSection.startsWith("## ")) {
        parsed.mainTitle = trimmedSection.replace("## ", "").trim();
        inTipsSection = false;
      } else if (trimmedSection.startsWith("**Este roteiro foca")) {
        parsed.introDescription = trimmedSection.replace(/\*\*/g, "").trim();
        inTipsSection = false;
      } else if (trimmedSection.startsWith("**Dia ")) {
        if (currentDay) {
          parsed.days.push(currentDay);
        }
        currentDay = {
          title: trimmedSection.replace(/\*\*/g, "").trim(),
          activities: [],
        };
        inTipsSection = false;
      } else if (trimmedSection.startsWith("**Dicas Adicionais:**")) {
        if (currentDay) {
          parsed.days.push(currentDay);
          currentDay = null;
        }
        inTipsSection = true;
      } else if (trimmedSection.startsWith("* ")) {
        if (inTipsSection) {
          parsed.tips.push(trimmedSection.replace("* ", "").trim());
        } else if (currentDay) {
          const activityLine = trimmedSection.replace("* ", "");
          const match = activityLine.match(/\*\*(.*?)\*\*:\s*(.*)/);
          if (match && match[1] && match[2]) {
            currentDay.activities.push({
              time: match[1].trim(),
              description: match[2].trim(),
            });
          } else {
            currentDay.activities.push({
              time: "Atividade",
              description: activityLine.trim(),
            });
          }
        }
      }
    }
    if (currentDay) {
      parsed.days.push(currentDay);
    }
    return parsed;
  }, []);

  useEffect(() => {
    if (!roteiro || !nome || !destinoEscolhido) {
      router.push("/perfil");
      return;
    }
    setParsedRoteiro(parseRoteiroContent(roteiro));
  }, [roteiro, nome, router, destinoEscolhido, parseRoteiroContent]);

  const handleSalvarRoteiro = () => {
    const salvar = addSalvarRoteiro({
      roteiroText: roteiro,
      destino: {
        nomeCidade: destinoEscolhido,
        nomePais: paisDestinoEscolhido,
      },
      nomePerfil: nome,
    });

    if (salvar) {
      toast.success("Roteiro salvo com sucesso!");
      setRoteiroJaSalvo(true);
    } else {
      toast.info("Este roteiro já está salvo.");
    }
  };

  if (!parsedRoteiro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-fuchsia-100">
        <p className="text-xl text-gray-600">
          Preparando seu roteiro de viagem...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-100 py-10 px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-[#851F92] mb-6 text-center flex items-center justify-center">
          Seu Roteiro Personalizado para {destinoEscolhido}!
          {paisDestinoEscolhido && (
            <span className="ml-4 text-5xl">
              {selecionarBandeiraPais(paisDestinoEscolhido)}
            </span>
          )}
        </h1>

        {parsedRoteiro.mainTitle && (
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {parsedRoteiro.mainTitle}
          </h2>
        )}

        {parsedRoteiro.introDescription && (
          <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
            {parsedRoteiro.introDescription}
          </p>
        )}

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={handleSalvarRoteiro}
            disabled={roteiroJaSalvo}
            className={`flex items-center px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300
                       ${
                         roteiroJaSalvo
                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                           : "bg-[#851F92] text-white hover:bg-[#6a1977]"
                       }`}
          >
            <Save size={20} className="mr-2" />
            {roteiroJaSalvo ? "Roteiro Salvo!" : "Salvar Roteiro"}
          </button>
          <button
            onClick={() => router.push("/perfil")}
            className="flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all shadow-md"
          >
            <PlusCircle size={20} className="mr-2" />
            Criar Novo Roteiro
          </button>
        </div>

        <div className="space-y-8">
          {parsedRoteiro.days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-[#851F92] mb-4 flex items-center">
                <Calendar size={24} className="mr-3 text-purple-700" />
                {day.title}
              </h3>
              <ul className="space-y-3">
                {day.activities.map((activity, activityIndex) => (
                  <li
                    key={activityIndex}
                    className="flex items-start text-gray-700"
                  >
                    <AlarmClock
                      size={18}
                      className="flex-shrink-0 mr-3 mt-1 text-gray-500"
                    />
                    <div>
                      <strong className="text-gray-800">
                        {activity.time}:
                      </strong>{" "}
                      {activity.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {parsedRoteiro.tips.length > 0 && (
          <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
              <Info size={24} className="mr-3 text-blue-800" />
              Dicas Adicionais
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {parsedRoteiro.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
});

export default Roteiro;
