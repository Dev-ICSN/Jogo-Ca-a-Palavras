import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StudentsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Gerenciamento de Alunos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A funcionalidade para listar e gerenciar alunos será implementada aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;