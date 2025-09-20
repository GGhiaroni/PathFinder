import { Star } from "lucide-react";

const EstrelaAvaliaçãoAtividade = ({ value }) => {
  return (
    <div className="flex items-center gap-2">
      <Star size={20} className="text-yellow-400" fill="currentColor" />
      <span>{value}</span>
    </div>
  );
};

export default EstrelaAvaliaçãoAtividade;
