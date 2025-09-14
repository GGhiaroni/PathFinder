import { Star } from "lucide-react";

const EstrelaAvaliaçãoAtividade = ({ nota }) => {
  return (
    <div className="flex items-center gap-2">
      <Star size={20} className="text-yellow-400" fill="currentColor" />
      <span>{nota}</span>
    </div>
  );
};

export default EstrelaAvaliaçãoAtividade;
