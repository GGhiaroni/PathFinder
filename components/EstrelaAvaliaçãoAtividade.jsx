import { Star } from "lucide-react";

const EstrelaAvaliaçãoAtividade = ({ nota }) => {
  return (
    <div className="flex items-center gap-2">
      <Star className="text-yellow-400" />
      <span>{nota}</span>
    </div>
  );
};

export default EstrelaAvaliaçãoAtividade;
