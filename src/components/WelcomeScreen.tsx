"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface WelcomeScreenProps {
  onStartGame: (playerName: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState<string>("");

  const handleStartGame = () => {
    if (playerName.trim()) {
      showSuccess(`Bem-vindo, ${playerName}!`);
      onStartGame(playerName.trim());
    } else {
      showSuccess("Por favor, digite seu nome para começar.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Caça-Palavras</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Prepare-se para encontrar as palavras escondidas!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
              Digite seu nome:
            </label>
            <Input
              id="playerName"
              type="text"
              placeholder="Seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStartGame();
                }
              }}
            />
          </div>
          <Button
            onClick={handleStartGame}
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-colors duration-200"
          >
            Iniciar Jogo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;