console.log(process.env.OPEN_API_KEY);

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const roteiro = completion.choices[0]?.message?.content;

    return NextResponse.json({ roteiro });
  } catch (error) {
    console.error("Erro ao gerar roteiro:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar roteiro" },
      { status: 500 }
    );
  }
}
