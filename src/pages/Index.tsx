"use client";

import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
    // Aqui você pode adicionar a lógica para navegar para a tela do jogo
    // ou renderizar o componente do jogo diretamente.
    console.log(`Jogo iniciado para: ${name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} />
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Olá, {playerName}! O jogo começará em breve...
          </h1>
        </div>
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;