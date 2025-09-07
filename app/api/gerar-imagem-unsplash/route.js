import { fetchUnsplashImage } from "@/lib/unsplash";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query de imagem não fornecida." },
      { status: 400 }
    );
  }

  try {
    const imageUrl = await fetchUnsplashImage(query);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Erro ao buscar imagem via API:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar a imagem." },
      { status: 500 }
    );
  }
}
