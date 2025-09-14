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

    const prompt = `Crie um roteiro personalizado de viagem em formato JSON para um roteiro personalizado.
      O roteiro é para ${nome}, de ${idade} anos, com interesses em ${interesses.join(
      ", "
    )}.
      O orçamento é ${orcamento}. O roteiro deve ser para o destino: ${destino}.
      A viagem será de ${totalDias} dias.

      O formato JSON deve seguir este padrão:
      {
        "title": "...",
        "intro": "...",
        "days": [
          {
            "title": "Dia 1: ...",
            "activities": [
              {
                "time": "HH:mm",
                "title": "...",
                "description": "...",
                "category": "Cultura", // ou Gastronomia, Natureza, Aventura, etc.
                "rating": 4.5,
                "address": "..."
              },
              ...
            ]
          },
          ...
        ],
        "tips": ["...", "..."]
      }

      Não inclua nenhum texto adicional, apenas a string JSON completa. Se o roteiro não puder ser gerado, retorne uma mensagem de erro em formato JSON: {"error": "Mensagem de erro"}.
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

    return NextResponse.json({ roteiro: roteiroObjeto });
  } catch (error) {
    console.error("Erro ao gerar roteiro com Gemini:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar roteiro" },
      { status: 500 }
    );
  }
}
