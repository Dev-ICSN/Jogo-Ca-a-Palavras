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

function getRandomSubset<T>(array: T[], size: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
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
    const maxAttempts = rows * cols * directions.length * 5; // Increased attempts from 2 to 5

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

// Predefined word lists for difficulty levels (now representing number of words)
export const superEasyWordsCount = 5;
export const easyWordsCount = 10;
export const hardWordsCount = 25;

// Predefined word lists for themes
export const kitchenWords: string[] = [
  "FOGAO", "GELADEIRA", "FORNO", "MICROONDAS", "LIQUIDIFICADOR",
  "BATEDEIRA", "TORRADEIRA", "CAFETEIRA", "PANELA", "FRIGIDEIRA",
  "PRATO", "COPO", "TALHER", "FACA", "GARFO", "COLHER", "TABUA",
  "ESPATULA", "CONCHA", "ABRIDOR", "LIXEIRA", "PIA", "ARMARIO",
  "DESPENSA", "TEMPERO", "AZEITE", "SAL", "ACUCAR", "FARINHA",
  "ARROZ", "FEIJAO", "MACARRAO", "CEBOLA", "ALHO", "TOMATE",
  "CENOURA", "BATATA", "FRUTA", "VERDURA", "CARNE", "FRANGO",
  "PEIXE", "LEITE", "QUEIJO", "OVOS", "POTE", "TIGELA", "ESCORREDOR",
  "COADOR", "ROLO", "ASSADEIRA", "FORMA", "LUVA", "AVENTAL",
  "TOALHA", "ESPONJA", "DETERGENTE", "LOUCA", "COZINHAR", "ASSAR",
  "FRITAR", "FERVER", "CORTAR", "PICAR", "MEXER", "PROVAR",
  "RECEITA", "INGREDIENTE", "ALIMENTO", "REFEICAO", "JANTAR",
  "ALMOCO", "CAFE", "LANCHE", "SOBREMESA", "DOCE", "SALGADO",
  "TEMPERAR", "PREPARAR", "SERVI", "LAVAR", "GUARDAR", "ORGANIZAR"
];

export const homeWords: string[] = [
  "SALA", "QUARTO", "BANHEIRO", "COZINHA", "CORREDOR",
  "JARDIM", "GARAGEM", "VARANDA", "PORTA", "JANELA",
  "PAREDE", "TETO", "CHAO", "TELHADO", "ESCADA",
  "SOFA", "CADEIRA", "MESA", "CAMA", "GUARDAROUPA",
  "ARMARIO", "ESTANTE", "ESPELHO", "QUADRO", "TAPETE",
  "CORTINA", "ALMOFADA", "COBERTOR", "LENCOL", "TRAVESSEIRO",
  "TOALHA", "SABONETE", "SHAMPOO", "ESCOVA", "PASTADENTE",
  "VASO", "CHUVEIRO", "TORNEIRA", "ESPELHO", "LAVABO",
  "GABINETE", "LIXEIRA", "LAMPADA", "TOMADA", "INTERRUPTOR",
  "TELEVISAO", "COMPUTADOR", "CELULAR", "ROUPA", "SAPATO",
  "LIVRO", "BRINQUEDO", "FLOR", "PLANTA", "VASO",
  "REGADOR", "TESOURA", "MARTELO", "CHAVE", "PARAFUSO",
  "PREGO", "TINTA", "PINCEL", "LIMPAR", "ARRUMAR",
  "DECORAR", "CONSERTAR", "CONSTRUIR", "MORAR", "VIVER",
  "FAMILIA", "AMIGO", "VIZINHO", "CONFORTO", "SEGURANCA",
  "PAZ", "SILENCIO", "ALEGRIA", "DESCANSO", "LAZER",
  "CUIDAR", "PROTEGER", "ABRIGO", "LAR", "RESIDENCIA"
];

export const workWords: string[] = [
  "ESCRITORIO", "COMPUTADOR", "TECLADO", "MOUSE", "MONITOR",
  "IMPRESSORA", "TELEFONE", "CELULAR", "INTERNET", "EMAIL",
  "REUNIAO", "PROJETO", "TAREFA", "PRAZO", "RELATORIO",
  "APRESENTACAO", "DOCUMENTO", "PLANILHA", "DADOS", "ANALISE",
  "ESTRATEGIA", "PLANEJAMENTO", "OBJETIVO", "META", "RESULTADO",
  "CLIENTE", "FORNECEDOR", "PARCEIRO", "EQUIPE", "COLEGA",
  "CHEFE", "GERENTE", "DIRETOR", "FUNCIONARIO", "CARGO",
  "SALARIO", "BENEFICIO", "CONTRATO", "EMPRESA", "INDUSTRIA",
  "MERCADO", "CONCORRENCIA", "INOVACAO", "TECNOLOGIA", "DESENVOLVIMENTO",
  "PRODUCAO", "QUALIDADE", "SERVICO", "VENDAS", "MARKETING",
  "FINANCAS", "CONTABILIDADE", "RECURSOSHUMANOS", "LOGISTICA", "OPERACAO",
  "COMUNICACAO", "COLABORACAO", "LIDERANCA", "MOTIVACAO", "PRODUTIVIDADE",
  "EFICIENCIA", "ORGANIZACAO", "DISCIPLINA", "RESPONSABILIDADE", "ETICA",
  "DESAFIO", "OPORTUNIDADE", "CRESCIMENTO", "CARREIRA", "APRENDIZADO",
  "TREINAMENTO", "CAPACITACAO", "NEGOCIACAO", "SOLUCAO", "PROBLEMA",
  "DECISAO", "RISCO", "SUCESSO", "FRACASSO", "TRABALHAR",
  "CRIAR", "EXECUTAR", "GERENCIAR", "LIDERAR", "APRENDER",
  "ENSINAR", "AJUDAR", "COLABORAR", "COMUNICAR", "ANALISAR",
  "PESQUISAR", "DESENVOLVER", "IMPLEMENTAR", "OTIMIZAR", "INFORMAR"
];

export const allWords: string[] = [
  ...kitchenWords,
  ...homeWords,
  ...workWords,
];

export { getRandomSubset };