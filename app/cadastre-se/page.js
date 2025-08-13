"use client";

import { cadastroSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { toast } from "sonner";

const PaginaDeCadastro = () => {
  const router = useRouter();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataDeNascimentoValor, setDataDeNascimentoValor] = useState("");

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nomeCompleto: "",
      dataDeNascimento: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCompleto: data.nomeCompleto,
          dataDeNascimento: data.dataDeNascimento,
          email: data.email,
          senha: data.senha,
          confirmarSenha: data.confirmarSenha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        reset();
        router.push("/login");
      } else {
        toast.error("Erro ao cadastrar usuário.");
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
          <UserRound size={48} className="text-purple-700 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
          <p className="text-gray-600 mb-8">
            Junte-se ao PathFinder e descubra roteiros únicos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          method="POST"
          action="/api/auth/register"
        >
          <div className="opacity-0 animate-slide-in-right-1">
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <UserRound
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                    errors.nomeCompleto ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("nomeCompleto")}
                />
              </div>
              <div className="h-2.25">
                {errors.nomeCompleto && (
                  <p className="text-red-500 text-sm">
                    {errors.nomeCompleto.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-2">
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <CalendarDays
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Controller
                  name="dataDeNascimento"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="00/00/0000"
                      placeholder="Sua data de nascimento"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        errors.dataDeNascimento
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="h-2.25.25">
                {errors.dataDeNascimento && (
                  <p className="text-red-500 text-sm">
                    {errors.dataDeNascimento.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-3">
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email")}
                />
              </div>
              <div className="h-2.25">
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-4">
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Sua senha"
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                    errors.senha ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("senha")}
                />
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
              <div className="h-2.25">
                {errors.senha && (
                  <p className="text-red-500 text-sm">{errors.senha.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-slide-in-right-5">
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                    errors.confirmarSenha ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("confirmarSenha")}
                />
              </div>
              <div className="h-2.25">
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmarSenha.message}
                  </p>
                )}
              </div>
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
