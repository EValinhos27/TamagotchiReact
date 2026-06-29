import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routers/ProtectedRoute'; // Ajuste o caminho se necessário
import AuthPage from './pages/AuthPage';
import Home from './pages/Teste';

// Importe também suas outras páginas conforme precisar delas:
// import ProfilePage from './pages/ProfilePage';
// import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Routes>
      {/* Rota pública: Login / Cadastro */}
      <Route path="/login" element={<AuthPage />} />

      {/* Rotas protegidas — Só acessa quem estiver logado */}
      <Route element={<ProtectedRoute />}>
        <Route path="/teste" element={<Home />} />
        {/* Exemplo de rota protegida (adicione as suas aqui) */}
        {/* <Route path="/perfil" element={<ProfilePage />} /> */}
        {/* <Route path="/pedidos" element={<OrdersPage />} /> */}
      </Route>

      {/* Rota de captura (Opcional): Redireciona qualquer rota desconhecida para o login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
