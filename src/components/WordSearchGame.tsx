"use client";

import React, { useState, useEffect } from "react";
import {
  generateWordSearch,
  superEasyWordsCount,
  easyWordsCount,
  hardWordsCount,
  kitchenWords,
  homeWords,
  workWords,
  allWords,
  getRandomSubset,
  Grid,
} from "@/utils/wordSearchGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";
import { ThemeToggle } from "@/components/theme-toggle";

interface WordSearchGameProps {
  playerName: string;
  difficulty: "super-easy" | "easy" | "hard";
  theme: "kitchen" | "home" | "work" | "random";
  onRestartGame: () => void;
  onGameEnd: (timeInSeconds: number) => void;
}

const WordSearchGame: React.FC<WordSearchGameProps> = ({
  playerName,
  difficulty,
  theme,
  onRestartGame,
  onGameEnd,
}) => {
  const [grid, setGrid] = useState<Grid>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [endGameHandled, setEndGameHandled] = useState(false);

  const getGridSize = () => {
    switch (difficulty) {
      case "super-easy":
        return { rows: 8, cols: 8 };
      case "easy":
        return { rows: 12, cols: 12 };
      case "hard":
        return { rows: 18, cols: 18 };
      default:
        return { rows: 12, cols: 12 };
    }
  };

  const getWordsForThemeAndDifficulty = () => {
    let baseWords: string[];
    let count: number;
    const MAX_WORD_LENGTH_SUPER_EASY = 7;

    switch (theme) {
      case "kitchen":
        baseWords = kitchenWords;
        break;
      case "home":
        baseWords = homeWords;
        break;
      case "work":
        baseWords = workWords;
        break;
      case "random":
        baseWords = allWords;
        break;
      default:
        baseWords = allWords;
    }

    if (difficulty === "super-easy") {
      baseWords = baseWords.filter(word => word.length <= MAX_WORD_LENGTH_SUPER_EASY);
    }

    switch (difficulty) {
      case "super-easy":
        count = superEasyWordsCount;
        break;
      case "easy":
        count = easyWordsCount;
        break;
      case "hard":
        count = hardWordsCount;
        break;
      default:
        count = easyWordsCount;
    }

    return getRandomSubset(baseWords, count);
  };

  const { rows, cols } = getGridSize();
  const gameCompleted = wordsToFind.length > 0 && foundWords.length === wordsToFind.length;

  const initializeGame = () => {
    const words = getWordsForThemeAndDifficulty();
    const { grid: newGrid, placedWords } = generateWordSearch(
      words,
      rows,
      cols,
    );
    setGrid(newGrid);
    setWordsToFind(placedWords.map((word) => word.toUpperCase()));
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setElapsedTime(0);
    setStartTime(Date.now());
    setEndGameHandled(false);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty, theme]);

  // Effect for managing the timer
  useEffect(() => {
    if (startTime === null || gameCompleted) {
      return; // Don't run timer if game hasn't started or is already over
    }

    const intervalId = window.setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(intervalId);
  }, [startTime, gameCompleted]);

  // Effect for handling the end of the game
  useEffect(() => {
    if (gameCompleted && !endGameHandled && startTime) {
      setEndGameHandled(true); // Mark as handled to prevent multiple calls
      const finalTime = (Date.now() - startTime) / 1000;
      setElapsedTime(finalTime); // Update display with final time
      onGameEnd(finalTime);
    }
  }, [gameCompleted, endGameHandled, startTime, onGameEnd]);


  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setIsSelecting(true);
    setSelectedCells([[rowIndex, colIndex]]);
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isSelecting && selectedCells.length > 0) {
      const [startRow, startCol] = selectedCells[0];
      const endRow = rowIndex;
      const endCol = colIndex;

      const newSelectedCells: [number, number][] = [];
      let isValidPath = true;

      const dr = endRow - startRow;
      const dc = endCol - startCol;

      if (dr === 0 && dc === 0) {
        newSelectedCells.push([startRow, startCol]);
      } else if (dr === 0) { // Horizontal
        const stepCol = Math.sign(dc);
        for (let c = startCol; (stepCol > 0 ? c <= endCol : c >= endCol); c += stepCol) {
          newSelectedCells.push([startRow, c]);
        }
      } else if (dc === 0) { // Vertical
        const stepRow = Math.sign(dr);
        for (let r = startRow; (stepRow > 0 ? r <= endRow : r >= endRow); r += stepRow) {
          newSelectedCells.push([r, startCol]);
        }
      } else if (Math.abs(dr) === Math.abs(dc)) { // Diagonal
        const stepRow = Math.sign(dr);
        const stepCol = Math.sign(dc);
        let r = startRow;
        let c = startCol;
        while (true) {
          newSelectedCells.push([r, c]);
          if (r === endRow && c === endCol) {
            break;
          }
          r += stepRow;
          c += stepCol;
        }
      } else {
        isValidPath = false;
      }

      if (isValidPath) {
        setSelectedCells(newSelectedCells);
      } else {
        setSelectedCells([selectedCells[0]]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (selectedCells.length > 1) {
      checkSelectedWord();
    }
    setSelectedCells([]);
  };

  const checkSelectedWord = () => {
    if (selectedCells.length < 2) {
      showError("Selecione pelo menos duas letras.");
      return;
    }

    let selectedWord = "";
    for (const [r, c] of selectedCells) {
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        selectedWord += grid[r][c];
      } else {
        showError("Erro na seleção: célula fora dos limites.");
        return;
      }
    }

    const normalizedSelectedWord = selectedWord.toUpperCase();
    const reversedSelectedWord = normalizedSelectedWord.split("").reverse().join("");

    const foundIndex = wordsToFind.findIndex(
      (word) =>
        word === normalizedSelectedWord || word === reversedSelectedWord,
    );

    if (foundIndex !== -1) {
      const foundWord = wordsToFind[foundIndex];
      if (!foundWords.includes(foundWord)) {
        setFoundWords((prev) => [...prev, foundWord]);
        showSuccess(`Parabéns! Você encontrou a palavra: ${foundWord}`);
      }
    } else {
      showError("Palavra não encontrada.");
    }
  };

  const isCellSelected = (rowIndex: number, colIndex: number) => {
    return selectedCells.some(
      ([r, c]) => r === rowIndex && c === colIndex,
    );
  };

  const isWordFound = (word: string) => foundWords.includes(word.toUpperCase());

  const getDifficultyText = (diff: "super-easy" | "easy" | "hard") => {
    switch (diff) {
      case "super-easy": return "Super Fácil";
      case "easy": return "Fácil";
      case "hard": return "Difícil";
      default: return "";
    }
  };

  const getThemeText = (t: "kitchen" | "home" | "work" | "random") => {
    switch (t) {
      case "kitchen": return "Cozinha";
      case "home": return "Casa";
      case "work": return "Trabalho";
      case "random": return "Aleatório";
      default: return "";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Caça-Palavras - Nível {getDifficultyText(difficulty)} - Tema: {getThemeText(theme)}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Olá, {playerName}! Encontre as palavras abaixo:
          </p>
          <p className="text-xl font-semibold text-blue-700 mt-2">
            Tempo: {elapsedTime.toFixed(1)}s
          </p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow grid-container overflow-auto p-2 bg-gray-50 dark:bg-slate-800 rounded-md shadow-inner">
            <div
              className="grid border border-gray-300 dark:border-slate-700"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              }}
              onMouseLeave={() => {
                if (isSelecting) {
                  handleMouseUp();
                }
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((char, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-gray-200 dark:border-slate-700 text-lg font-semibold cursor-pointer transition-colors duration-100
                      ${
                        isCellSelected(rowIndex, colIndex)
                          ? "bg-blue-400 dark:bg-blue-600 text-white"
                          : "bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800"
                      }
                    `}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseUp={handleMouseUp}
                  >
                    {char}
                  </div>
                )),
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-4 bg-white dark:bg-card rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Palavras para Encontrar ({foundWords.length}/{wordsToFind.length})
            </h3>
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {wordsToFind.map((word, index) => (
                <Badge
                  key={index}
                  variant={isWordFound(word) ? "default" : "secondary"}
                  className={`px-3 py-1 text-sm transition-all ${
                    isWordFound(word)
                      ? "bg-green-500 text-white line-through"
                      : ""
                  }`}
                >
                  {word}
                </Badge>
              ))}
            </div>
            {gameCompleted && (
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">
                  Parabéns, você encontrou todas as palavras!
                </p>
                <p className="text-xl mb-4">
                  Seu tempo: {elapsedTime.toFixed(2)} segundos
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={onRestartGame}
        className="mt-6 py-2 px-6 text-lg bg-red-500 hover:bg-red-600 text-white"
      >
        {gameCompleted ? "Voltar ao Menu Principal" : "Reiniciar Jogo"}
      </Button>
    </div>
  );
};

export default WordSearchGame;