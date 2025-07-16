import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function gerarRoteiro({ nome, idade, interesses, orcamento }) {
  const prompt = `Crie um roteiro personalizado de viagem com base no seguinte perfil:
    
    - Nome: ${nome}
    - Idade: ${idade}
    - Interesses: ${interesses.join(", ")}
    - Orçamento: ${orcamento}

    Dê sugestões de cidades, atividades diárias (manhã, tarde e noite), e pontos turísticos com base nos interesses e orçamento. Seja criativo, direto e empolgante.
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return (
    completion.choices[0]?.message?.content ||
    "Não foi possível gerar o roteiro."
  );
}
