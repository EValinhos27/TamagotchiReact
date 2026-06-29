import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Carrinho from "../pages/Carrinho";
import { Layout } from "../Layout";
import Sobre from "../pages/Sobre";
import Collection from "../pages/Collection";
import AuthPage from "../pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import Teste from "../pages/Teste";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<AuthPage />} />

        {/* Rotas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/carrinho" element={<Carrinho />} />

          <Route
            path="/personagens"
            element={<Collection categoria="personagem" />}
          />

          <Route
            path="/acessorios"
            element={<Collection categoria="acessorio" />}
          />
        </Route>

        {/* Somente Perfil/Teste protegido */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/teste" element={<Teste />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
