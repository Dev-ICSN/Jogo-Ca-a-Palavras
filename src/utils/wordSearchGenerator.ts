export type Grid = string[][];

export type Direction =
  | "horizontal"
  | "horizontal-reverse"
  | "vertical"
  | "vertical-reverse"
  | "diagonal-down-right"
  | "diagonal-down-left"
  | "diagonal-up-right"
  | "diagonal-up-left";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomLetter(): string {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function canPlaceWord(
  grid: Grid,
  word: string,
  row: number,
  col: number,
  direction: Direction,
): boolean {
  const len = word.length;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < len; i++) {
    let r = row;
    let c = col;

    switch (direction) {
      case "horizontal":
        c += i;
        break;
      case "horizontal-reverse":
        c -= i;
        break;
      case "vertical":
        r += i;
        break;
      case "vertical-reverse":
        r -= i;
        break;
      case "diagonal-down-right":
        r += i;
        c += i;
        break;
      case "diagonal-down-left":
        r += i;
        c -= i;
        break;
      case "diagonal-up-right":
        r -= i;
        c += i;
        break;
      case "diagonal-up-left":
        r -= i;
        c -= i;
        break;
    }

    // Check bounds
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return false;
    }

    // Check for conflicts (only allow same letter or empty)
    if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
      return false;
    }
  }
  return true;
}

function placeWord(
  grid: Grid,
  word: string,
  row: number,
  col: number,
  direction: Direction,
): void {
  const len = word.length;
  for (let i = 0; i < len; i++) {
    let r = row;
    let c = col;

    switch (direction) {
      case "horizontal":
        c += i;
        break;
      case "horizontal-reverse":
        c -= i;
        break;
      case "vertical":
        r += i;
        break;
      case "vertical-reverse":
        r -= i;
        break;
      case "diagonal-down-right":
        r += i;
        c += i;
        break;
      case "diagonal-down-left":
        r += i;
        c -= i;
        break;
      case "diagonal-up-right":
        r -= i;
        c += i;
        break;
      case "diagonal-up-left":
        r -= i;
        c -= i;
        break;
    }
    grid[r][c] = word[i];
  }
}

export function generateWordSearch(
  words: string[],
  rows: number,
  cols: number,
): { grid: Grid; placedWords: string[] } {
  let grid: Grid = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(""));

  const directions: Direction[] = [
    "horizontal",
    "horizontal-reverse",
    "vertical",
    "vertical-reverse",
    "diagonal-down-right",
    "diagonal-down-left",
    "diagonal-up-right",
    "diagonal-up-left",
  ];

  // Sort words by length descending to place longer words first
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  const placedWords: string[] = [];

  for (const word of sortedWords) {
    const upperWord = word.toUpperCase();
    let placed = false;
    let attempts = 0;
    const maxAttempts = rows * cols * directions.length * 2; // Increased attempts

    while (!placed && attempts < maxAttempts) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];

      if (
        canPlaceWord(grid, upperWord, randomRow, randomCol, randomDirection)
      ) {
        placeWord(grid, upperWord, randomRow, randomCol, randomDirection);
        placedWords.push(word); // Store original word
        placed = true;
      }
      attempts++;
    }
  }

  // Fill remaining empty cells with random letters
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = getRandomLetter();
      }
    }
  }

  return { grid, placedWords };
}

// Predefined word lists for difficulty levels
export const easyWords: string[] = [
  "SOL",
  "MAR",
  "CASA",
  "GATO",
  "LUA",
  "PAO",
  "FLOR",
  "LIVRO",
  "ARTE",
  "AMOR",
];

export const hardWords: string[] = [
  "COMPUTADOR",
  "PROGRAMACAO",
  "DESENVOLVIMENTO",
  "ALGORITMO",
  "INTELIGENCIA",
  "ARTIFICIAL",
  "APRENDIZAGEM",
  "MAQUINA",
  "DADOS",
  "ESTRUTURA",
  "COMPLEXIDADE",
  "OTIMIZACAO",
  "SEGURANCA",
  "CRIPTOGRAFIA",
  "REDE",
  "SERVIDOR",
  "CLIENTE",
  "BANCODEDADOS",
  "INTERFACE",
  "USUARIO",
  "EXPERIENCIA",
  "DESIGN",
  "FRONTEND",
  "BACKEND",
  "NUVEM",
];