"use client";

import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PaginaDeLogin = () => {
  const router = useRouter();

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          senha: data.senha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login realizado com sucesso!");
        reset();
        router.push("/perfil");
      } else {
        toast.error("Erro no login.");
        console.error(result.message);
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor. Tente novamente.");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 opacity-20 z-0" />

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg z-10 border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <Mail size={48} className="text-purple-700 mb-4" />{" "}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h1>
          <p className="text-gray-600 mb-8">
            Bem-vindo de volta! Faça login para continuar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          method="POST"
          action="/api/auth/login"
        >
          <div className="opacity-0 animate-slide-in-right-1">
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-2">
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                {...register("senha")}
              />

              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senha.message}
                </p>
              )}

              {mostrarSenha ? (
                <EyeOff
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={toggleMostrarSenha}
                />
              ) : (
                <Eye
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={toggleMostrarSenha}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 transition-all duration-300 shadow-lg opacity-0 animate-slide-in-down"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Não tem uma conta?{" "}
          <Link
            href="/cadastre-se"
            className="text-purple-600 hover:underline font-semibold"
          >
            Crie uma agora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaginaDeLogin;
