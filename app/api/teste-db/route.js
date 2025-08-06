import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await pool.connect();
    // Tenta uma query simples para verificar a conexão
    const result = await client.query("SELECT NOW()");
    client.release();

    return NextResponse.json(
      {
        message: "Conexão com o banco de dados bem-sucedida!",
        time: result.rows[0].now,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Falha na conexão com o banco de dados:", error);
    return NextResponse.json(
      {
        message: "Falha na conexão com o banco de dados.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
