import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { usuarioId, titulo, dadosRoteiro, paisDestino } =
      await request.json();

    if (!usuarioId || !titulo || !dadosRoteiro || paisDestino) {
      return NextResponse.json(
        { error: "Dados fornecidos para salvar o roteiro incompletos." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `INSERT INTO roteiros_salvos (usuario_id, titulo, dados_roteiro, pais_destino, data_criacao) VALUES ($1, $2, $3, $4, NOW()) RETURNING id;`;

    const values = [usuarioId, titulo, dadosRoteiro, paisDestino];

    const result = await client.query(query, values);

    client.release();

    const novoRoteiroId = result.rows[0].id;

    return NextResponse.json(
      { message: "Roteiro salvo com sucesso!", id: novoRoteiroId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao salvar o roteiro: ", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
