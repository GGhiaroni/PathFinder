export async function gerarRoteiroClient(data) {
  console.log("Dados gerarRoteiroClient:", data);
  const response = await fetch("/api/gerar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro?.error || "Erro ao gerar roteiro");
  }

  const resultado = await response.json();
  return resultado.roteiro;
}

export async function sugerirDestinosClient(data) {
  const response = await fetch("/api/sugerir-destinos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro?.error || "Erro ao sugerir destinos.");
  }

  const resultado = await response.json();
  return resultado.sugestoes;
}
