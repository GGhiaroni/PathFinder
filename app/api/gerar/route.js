console.log(process.env.OPEN_API_KEY);

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
    const { nome, idade, interesses, orcamento } = body;

    if (!nome || !idade || !interesses || !orcamento) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const prompt = `Crie um roteiro personalizado de viagem com base no seguinte perfil:
      - Nome: ${nome}
      - Idade: ${idade}
      - Interesses: ${interesses.join(", ")}
      - Orçamento: ${orcamento}
    
      Dê sugestões de cidades, atividades diárias (manhã, tarde e noite), e pontos turísticos com base nos interesses e orçamento. Seja criativo, direto e empolgante.
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
