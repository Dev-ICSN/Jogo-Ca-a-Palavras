"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  generateWordSearch,
  easyWords,
  hardWords,
  Grid,
} from "@/utils/wordSearchGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";

interface WordSearchGameProps {
  playerName: string;
  difficulty: "easy" | "hard";
  onRestartGame: () => void;
  onGameEnd: (timeInSeconds: number) => void; // New prop for game end
}

const WordSearchGame: React.FC<WordSearchGameProps> = ({
  playerName,
  difficulty,
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
  const timerRef = useRef<number | null>(null);

  const rows = difficulty === "easy" ? 12 : 18;
  const cols = difficulty === "easy" ? 12 : 18;
  const initialWords = difficulty === "easy" ? easyWords : hardWords;

  useEffect(() => {
    initializeGame();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [difficulty]);

  useEffect(() => {
    if (foundWords.length > 0 && foundWords.length === initialWords.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (startTime !== null) {
        const finalTime = (Date.now() - startTime) / 1000;
        setElapsedTime(finalTime);
        onGameEnd(finalTime); // Notify parent about game end and time
      }
    } else if (startTime !== null && foundWords.length < initialWords.length) {
      // Start or continue timer if game is in progress
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setElapsedTime((Date.now() - startTime) / 1000);
        }, 100);
      }
    }
  }, [foundWords, initialWords.length, startTime, onGameEnd]);

  const initializeGame = () => {
    const { grid: newGrid, placedWords } = generateWordSearch(
      initialWords,
      rows,
      cols,
    );
    setGrid(newGrid);
    setWordsToFind(placedWords.map((word) => word.toUpperCase()));
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setStartTime(Date.now()); // Start timer
    setElapsedTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setElapsedTime((Date.now() - (startTime || Date.now())) / 1000);
    }, 100);
  };

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
      setFoundWords((prev) => [...prev, foundWord]);
      showSuccess(`Parabéns! Você encontrou a palavra: ${foundWord}`);
      setWordsToFind((prev) => prev.filter((w) => w !== foundWord));
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Caça-Palavras - Nível {difficulty === "easy" ? "Fácil" : "Difícil"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Olá, {playerName}! Encontre as palavras abaixo:
          </p>
          <p className="text-xl font-semibold text-blue-700 mt-2">
            Tempo: {elapsedTime.toFixed(1)}s
          </p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow grid-container overflow-auto p-2 bg-gray-50 rounded-md shadow-inner">
            <div
              className="grid border border-gray-300"
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
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-gray-200 text-lg font-semibold cursor-pointer transition-colors duration-100
                      ${
                        isCellSelected(rowIndex, colIndex)
                          ? "bg-blue-300 text-white"
                          : "bg-white hover:bg-gray-100"
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
          <div className="w-full lg:w-1/3 p-4 bg-white rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Palavras para Encontrar ({foundWords.length}/{initialWords.length})
            </h3>
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {initialWords.map((word, index) => (
                <Badge
                  key={index}
                  variant={isWordFound(word) ? "default" : "secondary"}
                  className={`px-3 py-1 text-sm ${
                    isWordFound(word)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {word}
                </Badge>
              ))}
            </div>
            {foundWords.length === initialWords.length && (
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">
                  Parabéns, você encontrou todas as palavras!
                </p>
                <p className="text-xl text-gray-700 mb-4">
                  Seu tempo: {elapsedTime.toFixed(2)} segundos
                </p>
                <Button onClick={onRestartGame} className="py-2 px-6 text-lg">
                  Jogar Novamente
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {foundWords.length < initialWords.length && (
        <Button onClick={onRestartGame} className="mt-6 py-2 px-6 text-lg bg-red-500 hover:bg-red-600 text-white">
          Reiniciar Jogo
        </Button>
      )}
    </div>
  );
};

export default WordSearchGame;