import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SubjectsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Gerenciamento de Matérias</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Matérias</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A funcionalidade para listar e gerenciar matérias será implementada aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectsPage;