import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY não está nas variáveis de ambiente.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, idade, interesses, orcamento, destino, dataInicio, dataFim } =
      body;

    if (
      !nome ||
      !idade ||
      !interesses ||
      !orcamento ||
      !destino ||
      !dataInicio ||
      !dataFim
    ) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const dataInicioObjeto = new Date(dataInicio);
    const dataFimObjeto = new Date(dataFim);
    const diferencaEmTempo =
      dataFimObjeto.getTime() - dataInicioObjeto.getTime();

    const totalDias = Math.ceil(diferencaEmTempo / (1000 * 60 * 60 * 24));

    if (totalDias < 1) {
      return NextResponse.json(
        {
          error: "A data de término deve ser posterior à data de início.",
        },
        { status: 400 }
      );
    }

    const prompt = `Crie um roteiro personalizado de viagem com base no seguinte perfil:
      - Nome: ${nome}
      - Idade: ${idade}
      - Interesses: ${interesses.join(", ")}
      - Orçamento: ${orcamento}
      - Destino: ${destino}
      - Total de dias da viagem: ${totalDias}
    
      Dê sugestões de atividades diárias (manhã, tarde e noite), e pontos turísticos
      específicos para **${destino}** com base nos interesses e orçamento. Seja criativo,
      direto e empolgante. Considere um roteiro de ${totalDias} dias e foque em dar uma visão
      geral bem estruturada com dicas diárias.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roteiro = response.text();

    return NextResponse.json({ roteiro });
  } catch (error) {
    console.error("Erro ao gerar roteiro com Gemini:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar roteiro" },
      { status: 500 }
    );
  }
}
