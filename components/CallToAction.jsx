"use client";

import Link from "next/link";

const CallToAction = ({
  href,
  titulo,
  estiloTitulo,
  estiloTexto,
  texto,
  estiloBotao,
  estiloTextoBotao,
  textoBotao,
}) => {
  return (
    <section className="bg-corAzulClaro flex justify-center px-4 pb-12">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white text-center px-6 py-9 max-w-4xl w-full shadow-lg relative overflow-hidden">
        <h2 className={`${estiloTitulo} pb-4`}>{titulo}</h2>
        <span className={`${estiloTexto}`}>{texto}</span>
        <Link
          href={href}
          className={`${estiloBotao} mt-6 bg-white rounded-xl flex items-center justify-center gap-2 px-12`}
        >
          <span
            className={`${estiloTextoBotao} text-[#851F92] font-bold text-2xl py-2 block`}
          >
            {textoBotao}
          </span>
          <span className="text-[#851F92]">➜</span>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
