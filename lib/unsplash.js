const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.error("UNSPLASH_ACCESS_KEY não está nas variáveis de ambiente!");
}

export async function fetchUnsplashImage(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn(
      "UNSPLASH_ACCESS_KEY não configurada. Retornando placeholder."
    );
    return "/placeholder-city.jpg";
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      const erro = await response.json();
      console.error(
        `Erro na API do Unsplash: ${response.status} ${response.statusText}`,
        erro
      );
      return "/placeholder-city.jpg";
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }
  } catch (error) {
    console.error(`Erro ao buscar imagem no Unsplash:`, error);
  }

  return "/placeholder-city.jpg";
}
