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
  return (
    <Card className="w-full max-w-md shadow-lg mt-6">
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
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}º</TableCell>
                  <TableCell>{entry.playerName}</TableCell>
                  <TableCell>{entry.difficulty === "easy" ? "Fácil" : "Difícil"}</TableCell>
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