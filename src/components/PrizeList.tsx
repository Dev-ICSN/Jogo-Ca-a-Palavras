"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface PrizeListProps {
  prizes: string[];
}

const PrizeList: React.FC<PrizeListProps> = ({ prizes }) => {
  const hasPrizes = prizes.some(prize => prize.trim() !== "");

  return (
    <Card className="w-full h-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Gift className="text-yellow-500" /> Prêmios
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasPrizes ? (
          <ul className="space-y-2 text-left">
            {prizes.map((prize, index) =>
              prize.trim() ? (
                <li key={index} className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-700">{index + 1}º:</span>
                  <span className="text-gray-600">{prize}</span>
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Nenhum prêmio cadastrado ainda.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PrizeList;