"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Ranking from "@/components/Ranking";
import PrizeList from "@/components/PrizeList";
import { RankingEntry } from "@/utils/rankingStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";

interface WelcomeScreenProps {
  onStartGame: (playerName: string, difficulty: "super-easy" | "easy" | "hard", theme: "kitchen" | "home" | "work" | "random") => void;
  ranking: RankingEntry[];
  prizes: string[];
  onClearRanking: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, ranking, prizes, onClearRanking }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"super-easy" | "easy" | "hard">("easy");
  const [theme, setTheme] = useState<"kitchen" | "home" | "work" | "random">("random");

  const handleStartGame = () => {
    if (playerName.trim()) {
      showSuccess(`Bem-vindo, ${playerName}!`);
      onStartGame(playerName.trim(), difficulty, theme);
    } else {
      showSuccess("Por favor, digite seu nome para começar.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Caça-Palavras</CardTitle>
          <CardDescription className="mt-2">
            Prepare-se para encontrar as palavras escondidas!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="playerName">
              Digite seu nome:
            </Label>
            <Input
              id="playerName"
              type="text"
              placeholder="Seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStartGame();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>
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
            <Label htmlFor="theme-select">
              Selecione o tema:
            </Label>
            <Select onValueChange={(value: "kitchen" | "home" | "work" | "random") => setTheme(value)} defaultValue="random">
              <SelectTrigger id="theme-select">
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
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Iniciar Jogo
          </Button>
        </CardContent>
      </Card>

      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Ranking ranking={ranking} />
        <PrizeList prizes={prizes} />
      </div>

      <div className="flex gap-4 mt-4">
        <Link to="/prizes">
          <Button
            className="py-2 px-6 text-md bg-green-500 hover:bg-green-600 text-white"
          >
            Cadastrar Prêmios
          </Button>
        </Link>
        <Button
          onClick={onClearRanking}
          className="py-2 px-6 text-md bg-red-500 hover:bg-red-600 text-white"
        >
          Resetar Ranking
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;