"use client";

import { Eye, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
const PaginaDeCadastro = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 opacity-20 z-0" />

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg z-10 border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <UserRound size={48} className="text-purple-700 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
          <p className="text-gray-600 mb-8">
            Junte-se ao TravelGuide e descubra roteiros únicos
          </p>
        </div>

        <form className="space-y-6">
          <div className="opacity-0 animate-slide-in-right-1">
            <div className="relative">
              <UserRound
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Seu nome completo"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-2">
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-3">
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <Eye
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-4">
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                placeholder="Digite a senha novamente"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 transition-all duration-300 shadow-lg opacity-0 animate-slide-in-down"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaginaDeCadastro;
