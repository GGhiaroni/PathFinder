import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "PathFinder",
  description: "Descubra o seu próximo destino",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
      <Toaster richColors position="top-center" />
    </html>
  );
}
