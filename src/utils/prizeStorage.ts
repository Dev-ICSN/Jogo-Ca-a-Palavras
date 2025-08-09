const PRIZES_KEY = "wordSearchPrizes";
const MAX_PRIZES = 5;

// Os prêmios são armazenados como um array de strings.
// Índice 0 = 1º lugar, Índice 1 = 2º lugar, etc.
export function getPrizes(): string[] {
  try {
    const storedPrizes = localStorage.getItem(PRIZES_KEY);
    if (storedPrizes) {
      const parsedPrizes = JSON.parse(storedPrizes);
      // Garante que é um array com o comprimento correto
      if (Array.isArray(parsedPrizes) && parsedPrizes.length === MAX_PRIZES) {
        return parsedPrizes;
      }
    }
  } catch (error) {
    console.error("Falha ao carregar prêmios do localStorage:", error);
  }
  // Retorna um array vazio padrão se nada for encontrado ou houver um erro
  return Array(MAX_PRIZES).fill("");
}

export function savePrizes(prizes: string[]): void {
  if (prizes.length !== MAX_PRIZES) {
    console.error(`Tentativa de salvar um número incorreto de prêmios. Esperado ${MAX_PRIZES}, recebido ${prizes.length}.`);
    return;
  }
  try {
    localStorage.setItem(PRIZES_KEY, JSON.stringify(prizes));
  } catch (error) {
    console.error("Falha ao salvar prêmios no localStorage:", error);
  }
}