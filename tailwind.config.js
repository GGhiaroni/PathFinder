module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "from-pink-500",
    "to-purple-500",
    "from-cyan-500",
    "to-blue-500",
    "from-orange-500",
    "to-yellow-400",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        textoPreto: "hsl(var(--texto-preto))",
        corAzulClaro: "var(--cor-azul-claro)",
        corCinza: "var(--cor-cinza)",
      },
      animation: {
        "gradient-y": "gradientY 5s ease infinite",
      },
      keyframes: {
        gradientY: {
          "0%, 100%": { backgroundPosition: "top" },
          "50%": { backgroundPosition: "bottom" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};
