// =============================================================================
// ProtectedRoute.jsx — Guarda de rota para páginas autenticadas
// =============================================================================
// Use este componente no roteador para proteger páginas que exigem login.
// Se o usuário não estiver autenticado, ele é redirecionado para o login.
// Se a sessão ainda está sendo verificada, exibe um loading para evitar
// redirecionamentos errados enquanto o Supabase restaura a sessão salva.
//
// COMO USAR NO ROTEADOR (src/routers/):
//
//   import { ProtectedRoute } from './ProtectedRoute';
//
//   <Routes>
//     <Route path="/login" element={<LoginPage />} />
//
//     {/* Rotas protegidas — exigem login */}
//     <Route element={<ProtectedRoute />}>
//       <Route path="/perfil" element={<ProfilePage />} />
//       <Route path="/pedidos" element={<OrdersPage />} />
//     </Route>
//   </Routes>
//
// COMO USAR COM REDIRECIONAMENTO CUSTOMIZADO:
//   <Route element={<ProtectedRoute redirectTo="/entrar" />}>
//     ...
//   </Route>
//
// @param {string} redirectTo — (opcional) Rota para redirecionar se não logado
//                              Padrão: "/login"
// =============================================================================
 
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
 
export function ProtectedRoute({ redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth();
 
  // Enquanto o Supabase verifica a sessão salva, não redireciona ainda.
  // Sem isso, usuários logados seriam jogados para o login ao recarregar a página.
  if (loading) {
    // Substitua por um componente de spinner/loading da sua aplicação se preferir
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <p>Carregando...</p>
      </div>
    );
  }
 
  // Se o usuário não está autenticado, redireciona para a página de login.
  // `replace` substitui a entrada no histórico do navegador (sem criar um
  // "voltar" que leva de volta à página protegida)
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
 
  // Usuário autenticado: renderiza a rota filha normalmente
  // <Outlet /> é o placeholder do React Router para rotas aninhadas
  return <Outlet />;
}