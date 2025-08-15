import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const jwt_secret = process.env.JWT_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("auth_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token não encontrado." },
        { status: 401 }
      );
    }

    let decodificado;

    try {
      decodificado = verify(refreshToken, refresh_secret);
    } catch (error) {
      return NextResponse.json(
        { message: "Refresh token inválido ou expirado." },
        { status: 401 }
      );
    }

    const newAccessToken = sign({ id: decodificado.id }, jwt_secret, {
      expiresIn: "15m",
    });

    return NextResponse.json(
      {
        message: "Token renovado com sucesso.",
        token: newAccessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor." },
      { status: 500 }
    );
  }
}
