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
        "slide-in-right-1": "slide-in-right 0.250s ease-out forwards",
        "slide-in-right-2": "slide-in-right 0.250s ease-out 0.2s forwards",
        "slide-in-right-3": "slide-in-right 0.250s ease-out 0.4s forwards",
        "slide-in-right-4": "slide-in-right 0.250s ease-out 0.6s forwards",
        "slide-in-down": "slide-in-down 0.5s ease-out 0.8s forwards",
      },
      keyframes: {
        gradientY: {
          "0%": { backgroundPosition: "top" },
          "50%": { backgroundPosition: "bottom" },
          "100%": { backgroundPosition: "top" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};
