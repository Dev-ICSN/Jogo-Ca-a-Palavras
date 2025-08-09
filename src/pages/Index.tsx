"use client";

import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WelcomeScreen from "@/components/WelcomeScreen";
import WordSearchGame from "@/components/WordSearchGame"; // Import the new game component

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "hard">("easy"); // State for difficulty

  const handleStartGame = (name: string, selectedDifficulty: "easy" | "hard") => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    console.log(`Jogo iniciado para: ${name} no nível ${selectedDifficulty}`);
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setPlayerName("");
    setDifficulty("easy"); // Reset difficulty to default
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} />
      ) : (
        <WordSearchGame
          playerName={playerName}
          difficulty={difficulty}
          onRestartGame={handleRestartGame}
        />
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;