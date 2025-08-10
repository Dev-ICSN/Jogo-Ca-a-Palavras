import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FinancesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Gerenciamento Financeiro</h1>
      <Card>
        <CardHeader>
          <CardTitle>Painel Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A funcionalidade para gerenciar finanças será implementada aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancesPage;