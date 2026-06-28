// =============================================================================
// AuthContext.jsx — Contexto global de autenticação
// =============================================================================
// Este arquivo gerencia o estado de autenticação em toda a aplicação.
// Ele combina dois mundos:
//   - auth.users (Supabase Auth): guarda email, senha e sessão do usuário
//   - profiles (nossa tabela): guarda username e avatar_url
//
// O contexto disponibiliza para qualquer componente da árvore React:
//   - `user`      → dados do auth.users (email, id, etc.)
//   - `profile`   → dados da tabela profiles (username, avatar_url)
//   - `loading`   → true enquanto verifica se há sessão ativa
//   - `signUp`    → função para cadastrar novo usuário
//   - `signIn`    → função para fazer login
//   - `signOut`   → função para fazer logout
//   - `updateUserProfile` → função para atualizar dados do perfil
//
// COMO USAR EM COMPONENTES:
//   import { useAuth } from '../hooks/useAuth';
//   const { user, profile, signIn, signOut } = useAuth();
//
// CONFIGURAÇÃO NECESSÁRIA:
//   Envolva o <App /> (ou o componente raiz) com <AuthProvider> no main.jsx:
//   <AuthProvider> <App /> </AuthProvider>
// =============================================================================
 
import { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/api';
import { getProfileById, createProfile, updateProfile } from '../services/profileService';
 
// Cria o contexto — o valor padrão (null) é usado apenas se alguém
// tentar consumir o contexto fora do AuthProvider (o hook useAuth previne isso)
export const AuthContext = createContext(null);
 
// =============================================================================
// AuthProvider — Componente que envolve a aplicação e fornece o contexto
// =============================================================================
// Coloque-o no main.jsx, ao redor do <App />, para que todos os componentes
// tenham acesso aos dados de autenticação.
//
// @param {ReactNode} children — Toda a árvore de componentes da aplicação
// =============================================================================
export function AuthProvider({ children }) {
  // `user` contém os dados do Supabase Auth (id, email, created_at, etc.)
  // É null quando nenhum usuário está logado
  const [user, setUser] = useState(null);
 
  // `profile` contém os dados da nossa tabela `profiles` (username, avatar_url)
  // É null quando não há usuário logado ou o perfil ainda não foi carregado
  const [profile, setProfile] = useState(null);
 
  // `loading` é true durante a verificação inicial de sessão ao carregar a página
  // Use-o para mostrar uma tela de loading antes de renderizar rotas protegidas
  const [loading, setLoading] = useState(true);
 
  // =============================================================================
  // loadProfile — Busca o perfil no banco a partir do usuário autenticado
  // =============================================================================
  // Separado em função própria para ser reutilizado após login e após update.
  // useCallback evita recriar a função a cada re-render desnecessariamente.
  //
  // @param {object} authUser — Objeto do Supabase Auth (precisa do .id)
  // =============================================================================
  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }
 
    try {
      const profileData = await getProfileById(authUser.id);
      setProfile(profileData);
    } catch (error) {
      // Se o perfil não existir ainda (ex: logo após o signUp antes do insert),
      // apenas define como null sem travar a aplicação
      console.warn('[AuthContext] Perfil não encontrado para o usuário:', authUser.id);
      setProfile(null);
    }
  }, []);
 
  // =============================================================================
  // useEffect — Inicialização: verifica sessão ativa ao carregar a página
  // =============================================================================
  // Quando o usuário recarrega a página, o Supabase restaura a sessão
  // automaticamente (via cookie/localStorage). Este effect detecta isso.
  //
  // onAuthStateChange dispara sempre que o estado de auth muda:
  //   - SIGNED_IN: usuário fez login ou sessão foi restaurada
  //   - SIGNED_OUT: usuário fez logout ou sessão expirou
  //   - TOKEN_REFRESHED: token renovado automaticamente (transparente)
  // =============================================================================
  useEffect(() => {
    // Passo 1: Verifica se já existe uma sessão ativa no momento do carregamento
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const authUser = session?.user ?? null;
      setUser(authUser);
      await loadProfile(authUser);
      setLoading(false); // Só marca como "pronto" depois de buscar tudo
    });
 
    // Passo 2: Escuta mudanças futuras de estado (login, logout, expiração)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const authUser = session?.user ?? null;
        setUser(authUser);
        await loadProfile(authUser);
        // Não altera `loading` aqui: ele só é relevante na carga inicial
      }
    );
 
    // Cleanup: cancela o listener quando o componente é desmontado
    // Evita memory leaks e chamadas em componentes já removidos da tela
    return () => subscription.unsubscribe();
  }, [loadProfile]);
 
  // =============================================================================
  // signUp — Registra um novo usuário com email, senha e username
  // =============================================================================
  // O fluxo é:
  //   1. Cria o usuário no Supabase Auth (auth.users) com email e senha
  //   2. Cria o perfil correspondente na tabela `profiles` com o mesmo UUID
  //
  // ATENÇÃO: Se o Supabase estiver configurado com confirmação de email,
  // o usuário só estará "logado" após clicar no link do email.
  // Nesse caso, `authUser` existirá mas `session` será null.
  //
  // @param {string} email    — Email do novo usuário
  // @param {string} password — Senha (mínimo recomendado: 6 caracteres)
  // @param {string} username — Nome de usuário único para a tabela profiles
  // @returns {object} — { authUser, profile }
  // =============================================================================
  async function signUp(email, password, username) {
    // Validações simples no lado do cliente antes de chamar a API
    if (!email || !password || !username) {
      throw new Error('Email, senha e username são obrigatórios para o cadastro.');
    }
 
    // Passo 1: Cria o usuário no sistema de autenticação do Supabase
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
 
    if (authError) throw new Error(authError.message);
 
    const authUser = data.user;
 
    if (!authUser) {
      // Isso pode ocorrer quando a confirmação de email está ativa:
      // o usuário é criado, mas a sessão não é iniciada até a confirmação
      throw new Error(
        'Cadastro realizado! Verifique seu email para confirmar a conta antes de fazer login.'
      );
    }
 
    // Passo 2: Cria o registro na tabela `profiles` com o mesmo UUID do auth.users
    // O `createProfile` já verifica se o username é único
    const newProfile = await createProfile({ id: authUser.id, username });
 
    // Atualiza o estado local imediatamente (sem precisar recarregar)
    setUser(authUser);
    setProfile(newProfile);
 
    return { authUser, profile: newProfile };
  }
 
  // =============================================================================
  // signIn — Autentica um usuário com email e senha
  // =============================================================================
  // O Supabase valida as credenciais e retorna uma sessão com token JWT.
  // O onAuthStateChange detecta o login e carrega o perfil automaticamente.
  //
  // @param {string} email    — Email cadastrado
  // @param {string} password — Senha do usuário
  // @returns {object} — { authUser, profile }
  // =============================================================================
  async function signIn(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios para fazer login.');
    }
 
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 
    if (error) {
      // Traduz a mensagem de erro mais comum para português
      if (error.message === 'Invalid login credentials') {
        throw new Error('Email ou senha incorretos. Verifique suas credenciais.');
      }
      throw new Error(error.message);
    }
 
    // O onAuthStateChange já vai atualizar user e profile,
    // mas retornamos os dados aqui também para uso imediato se necessário
    return { authUser: data.user, profile };
  }
 
  // =============================================================================
  // signOut — Encerra a sessão do usuário atual
  // =============================================================================
  // Limpa o token JWT e atualiza o estado local.
  // Após o logout, `user` e `profile` serão null.
  // =============================================================================
  async function signOut() {
    const { error } = await supabase.auth.signOut();
 
    if (error) throw new Error(error.message);
 
    // Limpa o estado local imediatamente (o onAuthStateChange também fará isso,
    // mas adiantamos para a UI responder mais rápido)
    setUser(null);
    setProfile(null);
  }
 
  // =============================================================================
  // updateUserProfile — Atualiza os dados do perfil do usuário logado
  // =============================================================================
  // Após a atualização no banco, recarrega o perfil no estado do contexto
  // para que todos os componentes vejam os dados atualizados sem recarregar.
  //
  // @param {object} updatedData — Campos a atualizar: { username?, avatar_url? }
  // @returns {object} — Perfil atualizado
  // =============================================================================
  async function updateUserProfile(updatedData) {
    if (!user) {
      throw new Error('Nenhum usuário logado. Faça login antes de atualizar o perfil.');
    }
 
    // Delega a lógica de validação e update ao profileService
    const updatedProfile = await updateProfile(user.id, updatedData);
 
    // Atualiza o estado do contexto para refletir as mudanças imediatamente
    setProfile(updatedProfile);
 
    return updatedProfile;
  }
 
  // =============================================================================
  // Valor do contexto — tudo que os componentes filhos podem acessar
  // =============================================================================
  // Adicione aqui qualquer nova função ou estado que precise ser global.
  // Mantenha apenas o que realmente precisa ser compartilhado globalmente;
  // dados locais de componentes devem ficar no próprio componente.
  // =============================================================================
  const contextValue = {
    user,           // Dados do Supabase Auth (email, id, etc.) — null se deslogado
    profile,        // Dados da tabela profiles (username, avatar_url) — null se deslogado
    loading,        // true durante verificação inicial de sessão
    signUp,         // Função para cadastrar novo usuário
    signIn,         // Função para fazer login
    signOut,        // Função para fazer logout
    updateUserProfile, // Função para atualizar perfil do usuário logado
    isAuthenticated: !!user, // Atalho booleano: true se houver usuário logado
  };
 
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}