"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Ranking from "@/components/Ranking";
import { RankingEntry } from "@/utils/rankingStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WelcomeScreenProps {
  onStartGame: (playerName: string, difficulty: "super-easy" | "easy" | "hard", theme: "kitchen" | "home" | "work" | "random") => void;
  ranking: RankingEntry[];
  onClearRanking: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, ranking, onClearRanking }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"super-easy" | "easy" | "hard">("easy");
  const [theme, setTheme] = useState<"kitchen" | "home" | "work" | "random">("random"); // Default to random

  const handleStartGame = () => {
    if (playerName.trim()) {
      showSuccess(`Bem-vindo, ${playerName}!`);
      onStartGame(playerName.trim(), difficulty, theme);
    } else {
      showSuccess("Por favor, digite seu nome para começar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Caça-Palavras</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Prepare-se para encontrar as palavras escondidas!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
              Digite seu nome:
            </Label>
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
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">
              Selecione a dificuldade:
            </Label>
            <RadioGroup
              defaultValue="easy"
              onValueChange={(value: "super-easy" | "easy" | "hard") => setDifficulty(value)}
              className="flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="super-easy" id="difficulty-super-easy" />
                <Label htmlFor="difficulty-super-easy">Super Fácil (5 palavras)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="difficulty-easy" />
                <Label htmlFor="difficulty-easy">Fácil (10 palavras)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="difficulty-hard" />
                <Label htmlFor="difficulty-hard">Difícil (25 palavras)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme-select" className="block text-sm font-medium text-gray-700">
              Selecione o tema:
            </Label>
            <Select onValueChange={(value: "kitchen" | "home" | "work" | "random") => setTheme(value)} defaultValue="random">
              <SelectTrigger id="theme-select" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Selecione um tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen">Cozinha</SelectItem>
                <SelectItem value="home">Casa</SelectItem>
                <SelectItem value="work">Trabalho</SelectItem>
                <SelectItem value="random">Aleatório</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleStartGame}
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-colors duration-200"
          >
            Iniciar Jogo
          </Button>
        </CardContent>
      </Card>
      <Ranking ranking={ranking} />
      <Button
        onClick={onClearRanking}
        className="mt-4 py-2 px-6 text-md bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition-colors duration-200"
      >
        Resetar Ranking
      </Button>
    </div>
  );
};

export default WelcomeScreen;