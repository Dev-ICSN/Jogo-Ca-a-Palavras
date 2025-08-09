"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getPrizes, savePrizes } from "@/utils/prizeStorage";
import { showSuccess } from "@/utils/toast";
import { ArrowLeft } from "lucide-react";

const Prizes = () => {
  const [prizes, setPrizes] = useState<string[]>(Array(5).fill(""));

  useEffect(() => {
    setPrizes(getPrizes());
  }, []);

  const handlePrizeChange = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index] = value;
    setPrizes(newPrizes);
  };

  const handleSaveChanges = () => {
    savePrizes(prizes);
    showSuccess("Prêmios salvos com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Cadastrar Prêmios</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Defina os prêmios para os 5 primeiros colocados no ranking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {prizes.map((prize, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`prize-${index}`} className="block text-sm font-medium text-gray-700">
                {index + 1}º Lugar
              </Label>
              <Input
                id={`prize-${index}`}
                type="text"
                placeholder={`Prêmio para o ${index + 1}º lugar`}
                value={prize}
                onChange={(e) => handlePrizeChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          ))}
          <Button
            onClick={handleSaveChanges}
            className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-colors duration-200"
          >
            Salvar Prêmios
          </Button>
        </CardContent>
      </Card>
      <Link to="/" className="mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Voltar ao Início
        </Button>
      </Link>
    </div>
  );
};

export default Prizes;