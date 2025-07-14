"use client";

import { interesses } from "@/constants";
import { UserRound } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const Perfil = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      interesses: [],
    },
  });

  const interessesSelecionados = useWatch({
    control,
    name: "interesses",
    defaultValue: [],
  });

  const toggleInteresse = (interesse) => {
    const jaSelecionado = interessesSelecionados.includes(interesse);

    if (!jaSelecionado && interessesSelecionados.length >= 3) {
      toast.error("Você só pode selecionar até 3 interesses.");
      return;
    }

    const novoArray = jaSelecionado
      ? interessesSelecionados.filter((i) => i !== interesse)
      : [...interessesSelecionados, interesse];

    setValue("interesses", novoArray, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (!data.nome) {
      toast.error("O campo Nome é obrigatório.");
      return;
    }

    if (!data.idade) {
      toast.error("O campo Idade é obrigatório.");
      return;
    }

    if (!data.interesses || data.interesses.length === 0) {
      toast.error("Escolha pelo menos um interesse");
      return;
    }

    toast.success("Perfil criado com sucesso!");
    console.log("Dados do Perfil: ", data);
  };

  const onError = (errors) => {
    if (errors.nome) {
      toast.error("Nome é um campo obrigatório.");
      return;
    }
    if (errors.idade) {
      toast.error("Idade é um campo obrigatório.");
      return;
    }
    if (errors.interesses) {
      toast.error("Selecione pelo menos um interesse.");
      return;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-100">
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
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-white mx-4 flex flex-col items-start justify-start rounded-lg py-6 px-6 gap-6"
      >
        <h3 className="text-3xl font-bold ">Informações básicas</h3>

        <div className="w-full flex flex-col gap-2 justify-start">
          <label htmlFor="nome" className="font-medium text-textoPreto">
            Nome <span className="text-red-700">*</span>
          </label>
          <input
            id="nome"
            placeholder="Seu nome"
            className="border border-gray-300 rounded-md px-4 py-2"
            {...register("nome", { required: "Nome é obrigatório" })}
          />
        </div>

        <div className="w-full flex flex-col gap-2 justify-start">
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
                  className={`rounded-md px-6 py-2 text-center font-medium transition-all
            ${
              isSelected
                ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
                >
                  {interesse}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="mt-6 bg-[#851F92] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6d1a78] transition"
          >
            Gerar meu roteiro
          </button>
        </div>
      </form>
    </section>
  );
};

export default Perfil;
