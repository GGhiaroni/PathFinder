import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!usuarioId) {
      return NextResponse.json(
        {
          error: "ID do usuário não fornecido.",
        },
        {
          status: 400,
        }
      );
    }

    const client = await pool.connect();

    const query = `
      SELECT id, titulo, dados_roteiro, data_criacao, pais_destino
      FROM roteiros_salvos
      WHERE usuario_id = $1
      ORDER BY data_criacao DESC;
      `;

    const values = [usuarioId];

    const result = await client.query(query, values);
    client.release();

    const roteiros = result.rows;

    return NextResponse.json(roteiros, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar roteiros: ", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID do roteiro não fornecido." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `DELETE FROM roteiros_salvos WHERE id = $1`;
    const values = [id];

    await client.query(query, values);
    client.release();

    return NextResponse.json(
      {
        message: "Roteiro removido com sucesso.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao remover roteiro: ", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
