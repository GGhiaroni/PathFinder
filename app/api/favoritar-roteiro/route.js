import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, usuarioId } = await request.json();

    if (!id || !usuarioId) {
      return NextResponse.json(
        { error: "ID do roteiro ou ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `
        UPDATE roteiros_salvos
        SET is_favorito = NOT is_favorito
        WHERE id = $1 AND usuario_id = $2
        RETURNING is_favorito;
        `;

    const result = await client.query(query, [id, usuarioId]);

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Roteiro não encontrado ou usuário não autorizado." },
        { status: 404 }
      );
    }

    const novoStatusFavorito = result.rows[0].is_favorito;

    return NextResponse.json(
      { success: true, is_favorito: novoStatusFavorito },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao favoritar/desfavoritar roteiro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
