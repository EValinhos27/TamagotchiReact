import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Carrinho from "../pages/Carrinho";
import { Layout } from "../Layout";
import Sobre from "../pages/Sobre";
import Collection from "../pages/Collection";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/personagens"
            element={<Collection categoria="personagem" />}
          />
          <Route
            path="/acessorios"
            element={<Collection categoria="acessorio" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
