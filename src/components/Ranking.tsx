"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RankingEntry } from "@/utils/rankingStorage";

interface RankingProps {
  ranking: RankingEntry[];
}

const Ranking: React.FC<RankingProps> = ({ ranking }) => {
  const getDifficultyText = (difficulty: "super-easy" | "easy" | "hard") => {
    switch (difficulty) {
      case "super-easy":
        return "Super Fácil";
      case "easy":
        return "Fácil";
      case "hard":
        return "Difícil";
      default:
        return difficulty;
    }
  };

  return (
    <Card className="w-full h-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Melhores Tempos</CardTitle>
      </CardHeader>
      <CardContent>
        {ranking.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum jogo registrado ainda. Seja o primeiro!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Pos.</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead className="text-right">Tempo (s)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.map((entry, index) => (
                <TableRow key={`${entry.playerName}-${entry.difficulty}-${index}`}>
                  <TableCell className="font-medium">{index + 1}º</TableCell>
                  <TableCell>{entry.playerName}</TableCell>
                  <TableCell>{getDifficultyText(entry.difficulty)}</TableCell>
                  <TableCell className="text-right">{entry.timeInSeconds.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Ranking;