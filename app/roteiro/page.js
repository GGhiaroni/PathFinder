"use client";

import perfilStore from "@/store/perfilStore";
import { selecionarBandeiraPais } from "@/utils/bandeirasEImagens";
import {
  AlarmClock,
  Calendar,
  Info,
  MapPin,
  PlusCircle,
  Save,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const Roteiro = observer(() => {
  const router = useRouter();

  const { roteiro, nome, destinoEscolhido, paisDestinoEscolhido } = perfilStore;

  const [parsedRoteiro, setParsedRoteiro] = useState(null);
  const [roteiroJaSalvo, setRoteiroJaSalvo] = useState(false);

  const parseRoteiroContent = useCallback((markdownText) => {
    if (!markdownText) return null;

    const lines = markdownText.split("\n").filter((line) => line.trim() !== "");

    let parsed = {
      mainTitle: "",
      introDescription: "",
      days: [],
      tips: [],
    };

    let currentDay = null;
    let inTipsSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("## ")) {
        parsed.mainTitle = line.replace("## ", "").trim();
        inTipsSection = false;
      } else if (line.startsWith("**Este roteiro foca")) {
        parsed.introDescription = line.replace(/\*\*/g, "").trim();
        inTipsSection = false;
      } else if (line.startsWith("**Dia ")) {
        if (currentDay) {
          parsed.days.push(currentDay);
        }

        let dayTitle = line.replace(/\*\*/g, "").trim();

        currentDay = {
          title: dayTitle,
          activities: [],
        };
        inTipsSection = false;
      } else if (line.startsWith("**Dicas Adicionais:**")) {
        if (currentDay) {
          parsed.days.push(currentDay);
          currentDay = null;
        }
        inTipsSection = true;
      } else if (line.startsWith("* ")) {
        if (inTipsSection) {
          parsed.tips.push(line.replace("* ", "").trim());
        } else if (currentDay) {
          const activityLine = line.replace("* ", "");

          const match = activityLine.match(/\*\*(.*?)\*\*:\s*(.*)/);
          if (match && match[1] && match[2]) {
            currentDay.activities.push({
              time: match[1].trim(),
              description: match[2].replace(/\*\*/g, "").trim(),
            });
          } else {
            const firstColonIndex = activityLine.indexOf(":");
            if (firstColonIndex !== -1) {
              currentDay.activities.push({
                time: activityLine
                  .substring(0, firstColonIndex)
                  .replace(/\*\*/g, "")
                  .trim(),
                description: activityLine
                  .substring(firstColonIndex + 1)
                  .replace(/\*\*/g, "")
                  .trim(),
              });
            } else {
              currentDay.activities.push({
                time: "Atividade",
                description: activityLine.replace(/\*\*/g, "").trim(),
              });
            }
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
    const parsed = parseRoteiroContent(roteiro);
    setParsedRoteiro(parsed);
  }, [roteiro, nome, router, destinoEscolhido, parseRoteiroContent]);

  const handleSalvarRoteiro = () => {
    const salvo = perfilStore.addSalvarRoteiro({
      roteiroText: roteiro,
      destino: {
        nomeCidade: destinoEscolhido,
        nomePais: paisDestinoEscolhido,
      },
      nomePerfil: nome,
    });

    if (salvo) {
      toast.success("Roteiro salvo com sucesso!");
      setRoteiroJaSalvo(true);
    } else {
      toast.info("Este roteiro já está salvo.");
    }
  };

  if (!parsedRoteiro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 text-gray-700 p-6">
        <div className="animate-spin-slow text-[#851F92] mb-4">
          <MapPin size={48} />
        </div>
        <p className="text-2xl font-semibold mb-2">
          Organizando sua aventura...
        </p>
        <p className="text-lg text-center">
          Estamos preparando um roteiro exclusivo para você!
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeInScale">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-purple-100">
        <div className="text-center mb-10 pb-6 border-b border-purple-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#851F92] leading-tight mb-4 flex flex-col sm:flex-row items-center justify-center">
            <span>Seu Roteiro Personalizado para</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 ml-0 sm:ml-3 mt-2 sm:mt-0">
              {destinoEscolhido}!
            </span>
            {paisDestinoEscolhido && (
              <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-5xl sm:text-6xl animate-pulse-slow">
                {selecionarBandeiraPais(paisDestinoEscolhido)}
              </span>
            )}
          </h1>

          {parsedRoteiro.mainTitle && (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
              {parsedRoteiro.mainTitle}
            </h2>
          )}

          {parsedRoteiro.introDescription && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {parsedRoteiro.introDescription}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={handleSalvarRoteiro}
            disabled={roteiroJaSalvo}
            className={`flex items-center justify-center px-8 py-3 rounded-full font-semibold text-lg shadow-lg btn-hover-scale
                       ${
                         roteiroJaSalvo
                           ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                           : "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700"
                       }`}
          >
            <Save size={22} className="mr-2" />
            {roteiroJaSalvo ? "Roteiro Salvo!" : "Salvar Roteiro"}
          </button>
          <button
            onClick={() => router.push("/perfil")}
            className="flex items-center justify-center bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors shadow-lg btn-hover-scale"
          >
            <PlusCircle size={22} className="mr-2" />
            Criar Novo Roteiro
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {parsedRoteiro.days.map((day, dayIndex) => (
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
                      {" "}
                      {part.trim()}{" "}
                    </span>
                  ))}
                </span>
              </h3>

              <ul className="space-y-4 flex-grow mt-4">
                {" "}
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

        {parsedRoteiro.tips.length > 0 && (
          <div
            className="mt-12 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-100 animate-slideInUp"
            style={{
              animationDelay: `${parsedRoteiro.days.length * 0.1 + 0.2}s`,
            }}
          >
            {" "}
            <h3 className="text-2xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-200 flex items-center">
              <Info size={28} className="mr-3 text-blue-800" />
              Dicas Adicionais
            </h3>
            <ul className="list-none pl-0 space-y-3 text-gray-700">
              {parsedRoteiro.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl leading-none">
                    &bull;
                  </span>{" "}
                  <p className="text-base leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
});

export default Roteiro;
