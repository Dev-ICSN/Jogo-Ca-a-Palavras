"use client";

import React, { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WelcomeScreen from "@/components/WelcomeScreen";
import WordSearchGame from "@/components/WordSearchGame";
import { getRanking, addRankingEntry, clearRanking, RankingEntry } from "@/utils/rankingStorage"; // Import clearRanking

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState<"super-easy" | "easy" | "hard">("easy");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    // Load ranking from localStorage when component mounts
    setRanking(getRanking());
  }, []);

  const handleStartGame = (name: string, selectedDifficulty: "super-easy" | "easy" | "hard") => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    console.log(`Jogo iniciado para: ${name} no nível ${selectedDifficulty}`);
  };

  const handleGameEnd = (timeInSeconds: number) => {
    const newEntry: RankingEntry = {
      playerName,
      difficulty,
      timeInSeconds,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    addRankingEntry(newEntry);
    setRanking(getRanking()); // Refresh ranking state
    // Optionally, you could transition back to WelcomeScreen here
    // setGameStarted(false);
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setPlayerName("");
    setDifficulty("easy"); // Reset difficulty to default
    setRanking(getRanking()); // Ensure ranking is up-to-date when returning to welcome screen
  };

  const handleClearRanking = () => {
    clearRanking();
    setRanking(getRanking()); // Update state to reflect cleared ranking
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} ranking={ranking} onClearRanking={handleClearRanking} />
      ) : (
        <WordSearchGame
          playerName={playerName}
          difficulty={difficulty}
          onRestartGame={handleRestartGame}
          onGameEnd={handleGameEnd} // Pass the new handler
        />
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;