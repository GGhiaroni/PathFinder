import pool from "@/lib/db";
import { loginSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const payload = {
      id: usuario.id,
      email: usuario.email,
    };

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não definido.");
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    const { senha_hash, ...dadosUsuario } = usuario;

    return NextResponse.json(
      {
        message: "Login realizado com sucesso.",
        token,
        user: dadosUsuario,
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
