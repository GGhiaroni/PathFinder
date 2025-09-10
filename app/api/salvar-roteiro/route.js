import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      usuarioId,
      titulo,
      dadosRoteiro,
      paisDestino,
      dataInicio,
      dataFim,
    } = await request.json();

    if (
      !usuarioId ||
      !titulo ||
      !dadosRoteiro ||
      !paisDestino ||
      !dataInicio ||
      !dataFim
    ) {
      return NextResponse.json(
        { error: "Dados fornecidos para salvar o roteiro incompletos." },
        { status: 400 }
      );
    }

    const dataInicioObjeto = new Date(dataInicio);
    const dataFimObjeto = new Date(dataFim);
    const diferencaEmTempo =
      dataFimObjeto.getTime() - dataInicioObjeto.getTime();
    const totalDias = Math.ceil(diferencaEmTempo / (1000 * 60 * 60 * 24));

    if (totalDias < 1) {
      return NextResponse.json(
        { error: "A data de término deve ser posterior à data de início." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `INSERT INTO roteiros_salvos (usuario_id, titulo, dados_roteiro, pais_destino, data_criacao, data_inicio, data_fim, total_dias) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7) RETURNING id;`;

    const values = [
      usuarioId,
      titulo,
      dadosRoteiro,
      paisDestino,
      dataInicioObjeto,
      dataFimObjeto,
      totalDias,
    ];

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
