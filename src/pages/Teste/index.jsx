import { useAuth } from '../../hooks/useAuth'; // Ajuste os caminhos relativos (../) conforme sua estrutura

export default function Teste() {
  // Puxa os dados do perfil e a função de logout do contexto
  const { profile, signOut } = useAuth();

  async function handleLogout() {
    try {
      await signOut();
      // O ProtectedRoute perceberá a mudança de estado e redirecionará para o login sozinho!
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
      alert("Não foi possível deslogar. Tente novamente.");
    }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#e0f7fa', height: '100vh' }}>
      <h2> Página Teste (Home)</h2>
      
      {/* Exibe uma mensagem de boas-vindas usando o username do banco */}
      <p>
        Olá, <strong>{profile?.username || 'Usuário'}</strong>! 
        Você está na Home do seu teste de navegação.
      </p>

      {/* Botão de Logout */}
      <button 
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        🚪 Sair da Conta
      </button>
    </div>
  );
}