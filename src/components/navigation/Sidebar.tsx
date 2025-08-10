import React from "react";
import {
  Home,
  Users,
  Book,
  ClipboardList,
  FileText,
  DollarSign,
  CheckSquare,
  GraduationCap,
} from "lucide-react";
import NavLink from "./NavLink";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="flex items-center mb-8">
        <GraduationCap className="w-8 h-8 mr-3 text-blue-400" />
        <h1 className="text-xl font-bold">Gestão Escolar</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/" icon={Home}>
          Início
        </NavLink>
        <NavLink to="/alunos" icon={Users}>
          Alunos
        </NavLink>
        <NavLink to="/turmas" icon={Book}>
          Turmas
        </NavLink>
        <NavLink to="/materias" icon={ClipboardList}>
          Matérias
        </NavLink>
        <NavLink to="/atividades" icon={FileText}>
          Atividades
        </NavLink>
        <NavLink to="/financas" icon={DollarSign}>
          Finanças
        </NavLink>
        <NavLink to="/presenca" icon={CheckSquare}>
          Presença
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;