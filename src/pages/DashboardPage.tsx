import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Painel de Controle</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Selecione uma opção na barra lateral para começar a gerenciar.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;