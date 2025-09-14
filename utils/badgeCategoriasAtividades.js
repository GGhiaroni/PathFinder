export function badgeCategoriasClasses(categoria) {
  switch ((categoria || "").toLowerCase()) {
    case "gastronomia":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "cultura":
      return "bg-sky-50 text-sky-700 border-sky-100";
    case "natureza":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "arte":
      return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100";
    case "esportes":
      return "bg-lime-50 text-lime-700 border-lime-100";
    case "vida noturna":
      return "bg-violet-50 text-violet-700 border-violet-100";
    case "compras":
      return "bg-pink-50 text-pink-700 border-pink-100";
    default:
      return "bg-gray-100 text-gray-700 border-gray-100";
  }
}
