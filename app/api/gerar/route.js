import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY não está nas variáveis de ambiente.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    const prompt = `
  Gere um roteiro de viagem em formato JSON.

  Dados:
  - Nome: ${nome}
  - Idade: ${idade}
  - Interesses: ${interesses.join(", ")}
  - Orçamento: ${orcamento}
  - Destino: ${destino}
  - Duração: ${totalDias} dias

  A resposta deve ser **somente a string JSON**, sem aspas extras, blocos de código ou comentários. O objeto deve seguir o padrão:
  {
    "title": "Um título para o roteiro",
    "intro": "Uma breve introdução",
    "days": [
      {
        "title": "Dia 1: Exemplo de Título",
        "activities": [
          {
            "time": "09:00",
            "title": "Exemplo de Atividade",
            "description": "Uma descrição detalhada.",
            "category": "Cultura",
            "rating": 4.5,
            "address": "Endereço da atividade"
          },
          ...
        ]
      },
      ...
    ],
    "tips": ["Dica 1", "Dica 2"]
  }
    ATENÇÃO: O campo "rating" JAMAIS deve ser null ou 0.
  Se não for possível gerar o roteiro, retorne: {"error": "Desculpe, não foi possível gerar um roteiro com esses dados."}.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    const jsonMatch = textResponse.match(/```json\n([\s\S]*)\n```/);
    let jsonString = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();

    let roteiroObjeto;
    try {
      roteiroObjeto = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erro ao analisar JSON da resposta do Gemini:", parseError);
      return NextResponse.json(
        { error: "Resposta inválida do serviço de IA." },
        { status: 500 }
      );
    }

    if (roteiroObjeto.error) {
      return NextResponse.json({ error: roteiroObjeto.error }, { status: 500 });
    }

    console.log(roteiroObjeto.days[0].activities);
    return NextResponse.json({ roteiro: roteiroObjeto });
  } catch (error) {
    console.error("Erro ao gerar roteiro com Gemini:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar roteiro" },
      { status: 500 }
    );
  }
}
