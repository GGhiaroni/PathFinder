import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { nomeCompleto, email, senha, senhaConfirmada } =
      await request.json();

    if (!nomeCompleto || !email || !senha || !senhaConfirmada) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios!" },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter no mínimo 6 caracteres." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Formato de e-mail inválido." },
        { status: 400 }
      );
    }

    if (senha !== senhaConfirmada) {
      return NextResponse.json(
        { message: "As senhas não coincidem." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const emailJaExisteNoBanco = await client.query(
      "SELECT 1 FROM usuarios WHERE email = $1",
      [email]
    );

    if (emailJaExisteNoBanco.rows.length > 0) {
      client.release();
      return NextResponse.json(
        { message: "E-mail já cadastrado!" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await client.query(
      "INSERT INTO usuarios (nome_completo, email, senhaHash) VALUES ($1, $2, $3) RETURNING id, email",
      [nomeCompleto, email, senhaHash]
    );
    client.release();

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso!", user: novoUsuario.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
