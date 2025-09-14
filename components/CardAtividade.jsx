import { badgeCategoriasClasses } from "@/utils/badgeCategoriasAtividades";
import { MapPin } from "lucide-react";
import EstrelaAvaliaçãoAtividade from "./EstrelaAvaliaçãoAtividade";

export const CardAtividade = ({ atividade }) => {
  const categorias = (atividade.category || "Geral")
    .split("/")
    .map((c) => c.trim());

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start gap-4">
      <div className="w-24 flex-shrink-0 text-sm text-gray-500">
        <div className="text-lg font-semibold text-gray-700">
          {atividade.time}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {atividade.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {atividade.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              {atividade.address && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{atividade.address}</span>
                </div>
              )}
              <EstrelaAvaliaçãoAtividade value={atividade.rating || 0} />
            </div>
          </div>

          <div className="ml-4 flex flex-wrap gap-2">
            {categorias.map((categoria, index) => (
              <span
                key={index}
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${badgeCategoriasClasses(
                  categoria
                )}`}
              >
                {categoria}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
