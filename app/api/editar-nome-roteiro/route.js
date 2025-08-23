import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const { usuarioId, roteiroId, novoTitulo } = await request.json();

    if (!usuarioId || !roteiroId || !novoTitulo) {
      return NextResponse.json(
        {
          error:
            "Id de usuário e/ou título do roteiro não fornecidos corretamente para atualização do título.",
        },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const query = `
        UPDATE roteiros_salvos
        SET titulo = $1
        WHERE usuario_id = $2
        AND id = $3
    `;

    const values = [novoTitulo, usuarioId, roteiroId];

    const result = await client.query(query, values);

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          error:
            "Roteiro não encontrado ou usuário não autorizado para a edição.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Título do roteiro atualizado com sucesso: ",
        titulo: novoTitulo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar o título do roteiro ", error);
    return NextResponse.json(
      { error: "Ocorreu algum erro ao tentar atualizar o título do roteiro." },
      { status: 500 }
    );
  }
}
