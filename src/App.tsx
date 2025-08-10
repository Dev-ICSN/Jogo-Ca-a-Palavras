import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import ClassesPage from "./pages/ClassesPage";
import SubjectsPage from "./pages/SubjectsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import FinancesPage from "./pages/FinancesPage";
import AttendancePage from "./pages/AttendancePage";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/alunos" element={<StudentsPage />} />
          <Route path="/turmas" element={<ClassesPage />} />
          <Route path="/materias" element={<SubjectsPage />} />
          <Route path="/atividades" element={<ActivitiesPage />} />
          <Route path="/financas" element={<FinancesPage />} />
          <Route path="/presenca" element={<AttendancePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;