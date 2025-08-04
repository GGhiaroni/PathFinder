"use client";

import Link from "next/link";

const BotaoEstilizado = ({
  titulo,
  tipoBotao,
  estiloBotao,
  handleClick,
  estiloTexto,
  href,
}) => {
  if (href) {
    return (
      <Link href={href}>
        <button
          tipoBotao={tipoBotao || "button"}
          className={`custom-btn ${estiloBotao}`}
          onClick={handleClick}
        >
          <span className={`flex-1 ${estiloTexto}`}>{titulo}</span>
        </button>
      </Link>
    );
  }
  return (
    <>
      <button
        tipoBotao={tipoBotao || "button"}
        className={`custom-btn ${estiloBotao}`}
        onClick={handleClick}
      >
        {" "}
        <span className={`flex-1 ${estiloTexto}`}>{titulo}</span>
      </button>
    </>
  );
};

export default BotaoEstilizado;
