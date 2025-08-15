import pool from "@/lib/db";
import { loginSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
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

    const jwt_secret = process.env.JWT_SECRET;
    const refresh_secret = process.env.REFRESH_SECRET;

    if (!jwt_secret || !refresh_secret) {
      throw new Error("Variáveis de ambiente de segredo JWT não definidas.");
    }

    const accessToken = sign(payload, jwt_secret, { expiresIn: "15m" });

    const refreshToken = sign({ id: usuario.id }, refresh_secret, {
      expiresIn: "7d",
    });

    const serializedCookie = serialize("auth_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const { senha_hash, ...dadosUsuario } = usuario;

    return new NextResponse(
      JSON.stringify({
        message: "Login realizado com sucesso.",
        token: accessToken,
        user: dadosUsuario,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": serializedCookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor.", error: error.message },
      { status: 500 }
    );
  }
}
