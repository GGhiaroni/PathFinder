import pool from "@/lib/db";
import { loginSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, senha } = loginSchema.parse(body);

    const usuarioEncontrado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioEncontrado.rows.length === 0) {
      return NextResponse.json(
        {
          message: "E-mail ou senha incorretos.",
        },
        { status: 401 }
      );
    }

    const usuario = usuarioEncontrado.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return NextResponse.json(
        {
          message: "E-mail ou senha incorretos.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login realizado com sucesso.",
        user: { id: usuario.id, email: usuario.email },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor.", error: error.message },
      { status: 500 }
    );
  }
}
