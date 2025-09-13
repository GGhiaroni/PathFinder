import { House } from "lucide-react";

const BotaoRedirectHome = () => {
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center justify-center bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors shadow-lg btn-hover-scale"
    >
      <House size={22} className="mr-2" />
      Voltar para a Home
    </button>
  );
};

export default BotaoRedirectHome;
