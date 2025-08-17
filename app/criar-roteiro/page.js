"use client";

import { interesses, orcamento } from "@/constants";
import perfilStore from "@/store/perfilStore";
import { usuarioStore } from "@/store/usuarioStore";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const Perfil = observer(() => {
  const router = useRouter();

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
      orcamento: "",
      nome: null,
      idade: null,
    },
  });

  useEffect(() => {
    const disposer = autorun(() => {
      if (usuarioStore.isReady && usuarioStore.usuario) {
        setValue("nome", usuarioStore.nomeUsuario);
        setValue("idade", usuarioStore.idadeUsuario);
      }
    });
    return () => disposer();
  }, [setValue]);

  const interessesSelecionados = useWatch({
    control,
    name: "interesses",
    defaultValue: [],
  });

  const orcamentoSelecionado = useWatch({
    control,
    name: "orcamento",
    defaultValue: null,
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

  const toggleOrcamento = (orcamentoTitulo) => {
    const novoValor =
      orcamentoSelecionado === orcamentoTitulo ? "" : orcamentoTitulo;
    setValue("orcamento", novoValor, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    const perfilCompleto = {
      nome: usuarioStore.nomeUsuario,
      idade: usuarioStore.idadeUsuario,
      interesses: data.interesses,
      orcamento: data.orcamento,
    };

    if (!perfilCompleto.nome || !perfilCompleto.idade) {
      toast.error(
        "Erro: informações incompletas. Por favor, faça o login novamente."
      );
      return;
    }

    toast.success("Perfil criado com sucesso!");
    console.log("Dados do perfil: ", perfilCompleto);

    perfilStore.setPerfil(perfilCompleto);

    router.push("/loading");
  };

  const onError = (errors) => {
    if (errors.interesses) {
      toast.error("Selecione pelo menos um interesse.");
      return;
    }

    if (errors.orcamento) {
      toast.error("Selecione uma opção de orçamento.");
      return;
    }
  };

  if (!usuarioStore.isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-fuchsia-100">
      <div className="flex flex-col items-center justify-center py-10 px-8">
        <div className="flex items-center gap-3">
          {usuarioStore.nomeUsuario ? (
            <h1 className="text-3xl text-textoPreto leading-tight font-extrabold">
              Olá,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                {" "}
                {usuarioStore.nomeUsuario}
              </span>
            </h1>
          ) : (
            <h1 className="text-3xl text-textoPreto leading-tight font-extrabold">
              Carregando...
            </h1>
          )}
        </div>
        <h3 className="text-lg font-semibold text-corCinza text-center mt-4">
          Conte-nos sobre suas preferências para criarmos seu roteiro perfeito
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-white mx-4 flex flex-col items-start justify-start rounded-lg py-6 px-6 gap-6"
      >
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

        <div className="w-full">
          <h3 className="text-2xl font-bold mb-4 mt-4">
            Orçamento <span className="text-red-700">*</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {orcamento.map((opcao) => {
              const isSelected = orcamentoSelecionado === opcao.titulo;
              return (
                <button
                  type="button"
                  key={opcao.titulo}
                  onClick={() => toggleOrcamento(opcao.titulo)}
                  className={`flex flex-col items-start gap-1 rounded-md px-4 py-3 text-left transition-all
            ${
              isSelected
                ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-xl">{opcao.icone}</span>
                    <span className="font-semibold text-base">
                      {opcao.titulo}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      isSelected
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {opcao.descricao}
                  </span>
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
});

export default Perfil;
