import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;

    const slug = resolvedParams.slug;

    console.log(`Slug resolvido: "${slug}"`);
    console.log(`Resolved Params:`, resolvedParams);

    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!slug || slug === "undefined" || !usuarioId) {
      console.log("Erro 400: Slug ou usuarioId ausente.");
      console.log(`Slug recebido: "${slug}"`);
      console.log(`UsuarioId recebido: "${usuarioId}"`);

      return NextResponse.json(
        {
          error:
            "O slug do roteiro ou ID do usuário não foi fornecido na requisição.",
        },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `
        SELECT dados_roteiro, titulo, pais_destino, data_inicio, data_fim, total_dias
        FROM roteiros_salvos
        WHERE usuario_id = $1 AND slug = $2;
        `;

    const result = await client.query(query, [usuarioId, slug]);

    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Roteiro não encontrado." },
        { status: 404 }
      );
    }

    const roteiro = result.rows[0];

    return NextResponse.json(roteiro, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar o roteiro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
