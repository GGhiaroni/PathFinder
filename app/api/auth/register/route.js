export async function POST(request) {
  try {
    const { nomeCompleto, email, senha } = await request.json();
  } catch (error) {}
}
