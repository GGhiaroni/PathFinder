"use client";

import { interesses } from "@/constants";
import { UserRound } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Perfil = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      interesses: [],
    },
  });

  const interessesSelecionados = watch("interesses") || [];

  const toggleInteresse = (interesse) => {
    const arrayAtualDeInteresses = getValues("interesses") || [];
    const jaSelecionado = arrayAtualDeInteresses.includes(interesse);

    const novoArray = jaSelecionado
      ? arrayAtualDeInteresses.filter((i) => i !== interesse)
      : [arrayAtualDeInteresses, interesse];

    setValue("interesses", novoArray, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    console.log("Dados do Perfil: ", data);
  };

  useEffect(() => {
    register("interesses", {
      required: "Escolha pelo menos um interesse",
    });
  }, [register]);

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

        <div className="flex flex-col gap-2 justify-start">
          <label htmlFor="idade" className="font-medium text-textoPreto">
            Idade <span className="text-red-700">*</span>
          </label>
          <input
            id="idade"
            placeholder="Seu nome"
            className="border border-gray-300 rounded-md px-4 py-2"
            type="number"
            {...register("idade", { required: "Idade é obrigatória" })}
          />
          {errors.idade && (
            <span className="text-red-500 text-sm">{errors.idade.message}</span>
          )}
        </div>

        <div className="w-full">
          <h3 className="text-2xl font-bold mb-4">
            Seus Interesses <span className="text-red-700">*</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interesses.map((interesse) => {
              const isSelected = interessesSelecionados.includes(interesse);
              return (
                <button
                  type="button"
                  key={interesse}
                  onClick={() => toggleInteresse(interesse)}
                  className={`rounded-md px-4 py-2 text-center font-medium transition-all
            ${
              isSelected
                ? "bg-[#851F92] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
                >
                  {interesse}
                </button>
              );
            })}
          </div>
          {errors.interesses && (
            <p className="text-red-500 text-sm mt-2">
              {errors.interesses.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#851F92] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6d1a78] transition"
        >
          Criar perfil
        </button>
      </form>
    </section>
  );
};

export default Perfil;
