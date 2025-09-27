import { fetchUnsplashImage } from "@/lib/unsplash";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY não está nas variáveis de ambiente!");
}

if (!UNSPLASH_ACCESS_KEY) {
  console.error("UNSPLASH_ACCESS_KEY não está nas variáveis de ambiente!");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, idade, interesses, orcamento } = body;

    if (!nome || !idade || !interesses || !orcamento) {
      return NextResponse.json(
        { error: "Dados incompletos", error },
        { status: 400 }
      );
    }

    const prompt = `Com base no seguinte perfil, sugira 6 destinos de viagem. Para cada destino, dê um breve motivo pelo qual ele seria interessante para o perfil, em UMA frase. Liste os destinos numerados e formatados como:
          "1. [Nome da Cidade], [País] - [Breve motivo]."

          IMPORTANTE: O '[Nome da Cidade]' deve conter APENAS o nome principal da cidade, sem detalhes adicionais, qualificadores ou informações entre parênteses sobre regiões específicas (ex: não inclua "especialmente Ha Long Bay e Sapa"). O '[País]' deve ser apenas o nome do país.

          Perfil:
          - Nome: ${nome}
          - Idade: ${idade}
          - Interesses: ${interesses.join(", ")}
          - Orçamento: ${orcamento}

          Exemplo de saída esperada:
          1. Paris, França - Ideal para quem ama arte e cultura com um toque romântico.
          2. Tóquio, Japão - Perfeita para explorar tecnologia, culinária única e tradições milenares.
          3. Trilha Inca, Peru - Aventura e história em paisagens montanhosas deslumbrantes.
          4. Bali, Indonésia - Praias paradisíacas e rica cultura espiritual.
          5. Queenstown, Nova Zelândia - A capital mundial da aventura ao ar livre.
          6. Berlim, Alemanha - História vibrante, arte urbana e vida noturna animada.
          `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sugestoesTexto = response.text();

    const sugestoesArray = sugestoesTexto
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\.\s/))
      .map((line) => {
        const parts = line.replace(/^\d+\.\s/, "").split(" - ");
        const cidadeEPais = parts[0] ? parts[0].trim() : "";

        const separacaoCidadeEPais = cidadeEPais.split(", ");
        const cidade = separacaoCidadeEPais[0]
          ? separacaoCidadeEPais[0].trim()
          : "";
        const pais = separacaoCidadeEPais[1]
          ? separacaoCidadeEPais[1].trim()
          : "";

        return {
          nomeCidade: cidade,
          nomePais: pais,
          motivo: parts[1] ? parts[1].trim() : "",
        };
      });

    const sugestoesComImagensPromises = sugestoesArray.map(async (sugestao) => {
      const query = `${sugestao.nomeCidade}, ${sugestao.nomePais}`;
      const urlImagem = await fetchUnsplashImage(query);
      return { ...sugestao, imagemUrl: urlImagem };
    });

    const sugestoesComImagens = await Promise.all(sugestoesComImagensPromises);

    return NextResponse.json({ sugestoes: sugestoesComImagens });
  } catch (error) {
    console.error("Erro ao sugerir destinos com Gemini ou Unsplash:", error);
    return NextResponse.json(
      { error: "Erro interno ao sugerir destinos" },
      { status: 500 }
    );
  }
}
