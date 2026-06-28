// =============================================================================
// useAuth.jsx — Hook para consumir o AuthContext
// =============================================================================
// Este hook é a forma correta de acessar os dados de autenticação em qualquer
// componente da aplicação. Ele substitui o uso direto de `useContext(AuthContext)`.
//
// VANTAGEM: Se alguém tentar usar fora do AuthProvider, receberá um erro claro
// em vez de um bug silencioso com dados undefined.
//
// COMO USAR:
//   import { useAuth } from '../hooks/useAuth';
//
//   function MeuComponente() {
//     const { user, profile, signOut, isAuthenticated } = useAuth();
//     ...
//   }
//
// DADOS DISPONÍVEIS (vindos do AuthContext):
//   user             → objeto do Supabase Auth (id, email, created_at, etc.)
//   profile          → objeto da tabela profiles (username, avatar_url)
//   loading          → boolean — true durante a verificação inicial de sessão
//   isAuthenticated  → boolean — atalho para !!user
//   signUp(email, password, username) → cadastra novo usuário
//   signIn(email, password)           → faz login
//   signOut()                         → faz logout
//   updateUserProfile(updatedData)    → atualiza username ou avatar_url
// =============================================================================
 
import { useContext } from 'react';
import { AuthContext } from '../contexts/Authcontext';
 
export function useAuth() {
  const context = useContext(AuthContext);
 
  // Proteção: garante que o hook só seja usado dentro do AuthProvider
  // Sem isso, `context` seria null e causaria erros confusos nos componentes
  if (context === null) {
    throw new Error(
      '[useAuth] Este hook deve ser usado dentro de um <AuthProvider>.\n' +
      'Verifique se o <AuthProvider> envolve o <App /> no arquivo main.jsx.'
    );
  }
 
  return context;
}