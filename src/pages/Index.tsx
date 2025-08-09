"use client";

import React, { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WelcomeScreen from "@/components/WelcomeScreen";
import WordSearchGame from "@/components/WordSearchGame";
import { getRanking, addRankingEntry, clearRanking, RankingEntry } from "@/utils/rankingStorage";
import { getPrizes } from "@/utils/prizeStorage";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState<"super-easy" | "easy" | "hard">("easy");
  const [theme, setTheme] = useState<"kitchen" | "home" | "work" | "random">("random");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [prizes, setPrizes] = useState<string[]>([]);

  useEffect(() => {
    setRanking(getRanking());
    setPrizes(getPrizes());
  }, []);

  const handleStartGame = (
    name: string,
    selectedDifficulty: "super-easy" | "easy" | "hard",
    selectedTheme: "kitchen" | "home" | "work" | "random"
  ) => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setTheme(selectedTheme);
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
    setTheme("random");
    setRanking(getRanking());
    setPrizes(getPrizes());
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
          prizes={prizes}
          onClearRanking={handleClearRanking}
        />
      ) : (
        <WordSearchGame
          playerName={playerName}
          difficulty={difficulty}
          theme={theme}
          onRestartGame={handleRestartGame}
          onGameEnd={handleGameEnd}
        />
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;