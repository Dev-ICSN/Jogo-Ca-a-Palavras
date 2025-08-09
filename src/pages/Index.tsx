"use client";

import React, { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WelcomeScreen from "@/components/WelcomeScreen";
import WordSearchGame from "@/components/WordSearchGame";
import { getRanking, addRankingEntry, clearRanking, RankingEntry } from "@/utils/rankingStorage";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState<"super-easy" | "easy" | "hard">("easy");
  const [theme, setTheme] = useState<"kitchen" | "home" | "work" | "random">("random"); // New state for theme
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    setRanking(getRanking());
  }, []);

  const handleStartGame = (
    name: string,
    selectedDifficulty: "super-easy" | "easy" | "hard",
    selectedTheme: "kitchen" | "home" | "work" | "random" // New parameter
  ) => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setTheme(selectedTheme); // Set the selected theme
    setGameStarted(true);
    console.log(`Jogo iniciado para: ${name} no nível ${selectedDifficulty} com tema ${selectedTheme}`);
  };

  const handleGameEnd = (timeInSeconds: number) => {
    const newEntry: RankingEntry = {
      playerName,
      difficulty,
      timeInSeconds,
      date: new Date().toISOString().split('T')[0],
    };
    addRankingEntry(newEntry);
    setRanking(getRanking());
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setPlayerName("");
    setDifficulty("easy");
    setTheme("random"); // Reset theme to default
    setRanking(getRanking());
  };

  const handleClearRanking = () => {
    clearRanking();
    setRanking(getRanking());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!gameStarted ? (
        <WelcomeScreen
          onStartGame={handleStartGame}
          ranking={ranking}
          onClearRanking={handleClearRanking}
        />
      ) : (
        <WordSearchGame
          playerName={playerName}
          difficulty={difficulty}
          theme={theme} // Pass the theme prop
          onRestartGame={handleRestartGame}
          onGameEnd={handleGameEnd}
        />
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;