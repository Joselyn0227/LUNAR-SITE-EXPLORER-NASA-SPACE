import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { Home } from "./pages/Home";
import { Challenge } from "./pages/Challenge";
import { Solution } from "./pages/Solution";
import { About } from "./pages/About";
import { Demo } from "./pages/Demo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="reto" element={<Challenge />} />
        <Route path="solucion" element={<Solution />} />
        <Route path="acerca-de" element={<About />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}