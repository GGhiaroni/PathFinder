"use client";

const BotaoEstilizado = ({
  titulo,
  tipoBotao,
  estiloBotao,
  handleClick,
  estiloTexto,
}) => {
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
