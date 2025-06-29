"use client";

import { UserRound } from "lucide-react";
import { useForm } from "react-hook-form";

const Perfil = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do Perfil: ", data);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-50">
      <div className="flex flex-col items-center justify-center py-10 px-8">
        <div className="flex items-center gap-3">
          <UserRound color="#851F92" size={30} className="shrink-0" />
          <h1 className="text-[2.5rem] text-textoPreto leading-tight font-extrabold">
            Crie seu perfil
          </h1>
        </div>
        <h3 className="text-xl font-semibold text-corCinza text-center mt-4">
          Conte-nos sobre suas preferências para criarmos seu roteiro perfeito
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white mx-4 flex flex-col items-start justify-start rounded-lg py-6 px-6 gap-6"
      >
        <h3 className="text-3xl font-bold ">Informações básicas</h3>

        <div className="flex flex-col gap-2 justify-start">
          <label htmlFor="nome" className="font-medium text-textoPreto">
            Nome <span className="text-red-700">*</span>
          </label>
          <input
            id="nome"
            placeholder="Seu nome"
            className="border border-gray-300 rounded-md px-4 py-2"
            {...register("nome", { required: "Nome é obrigatório" })}
          />
          {errors.nome && (
            <span className="text-red-500 text-sm">{errors.nome.message}</span>
          )}
        </div>
      </form>
    </section>
  );
};

export default Perfil;
