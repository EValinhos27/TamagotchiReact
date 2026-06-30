import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../services/api';
import { getTamagotchisByUser } from '../../services/userTamagotchiService';
import ProdutoCard from '../../components/ProdutoCard';
import fotoPerfil from '../../assets/perfilPlaceholder.png';
import logoTamagotchi from '../../assets/logoTamagochi.png';
import * as S from './style';
 
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateUserProfile, loading } = useAuth();
 
  const [view, setView] = useState('principal');
  const [usernameUpdate, setUsernameUpdate] = useState('');
  const [avatarUrlUpdate, setAvatarUrlUpdate] = useState('');
  const [senhaUpdate, setSenhaUpdate] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
 
  // ---------------------------------------------------------------------
  // Coleção de Tamagotchis do usuário — exibida abaixo dos cards de navegação
  // ---------------------------------------------------------------------
  const [meusTamagotchis, setMeusTamagotchis] = useState([]);
  const [colecaoLoading, setColecaoLoading] = useState(true);
  const [colecaoError, setColecaoError] = useState('');
 
  // Busca a coleção assim que o usuário estiver disponível
  useEffect(() => {
    if (!user) return;
 
    async function carregarColecao() {
      setColecaoLoading(true);
      setColecaoError('');
      try {
        const dados = await getTamagotchisByUser(user.id);
        setMeusTamagotchis(dados || []);
      } catch (error) {
        setColecaoError('Não foi possível carregar seus Tamagotchis.');
      } finally {
        setColecaoLoading(false);
      }
    }
 
    carregarColecao();
  }, [user]);
 
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      alert('Não foi possível deslogar. Tente novamente.');
    }
  };
 
  const handleAtualizar = async () => {
    setActionError('');
 
    if (!usernameUpdate.trim() && !avatarUrlUpdate.trim() && !senhaUpdate.trim()) {
      setActionError('Preencha ao menos um campo para atualizar.');
      return;
    }
 
    setActionLoading(true);
 
    try {
      const dadosParaAtualizar = {};
      if (usernameUpdate.trim()) dadosParaAtualizar.username = usernameUpdate.trim();
      if (avatarUrlUpdate.trim()) dadosParaAtualizar.avatar_url = avatarUrlUpdate.trim();
 
      if (Object.keys(dadosParaAtualizar).length > 0) {
        await updateUserProfile(dadosParaAtualizar);
      }
 
      if (senhaUpdate.trim()) {
        if (senhaUpdate.length < 6) {
          setActionError('A nova senha deve ter no mínimo 6 caracteres.');
          setActionLoading(false);
          return;
        }
        const { error: senhaError } = await supabase.auth.updateUser({ password: senhaUpdate });
        if (senhaError) throw new Error(senhaError.message);
      }
 
      alert('Perfil atualizado com sucesso!');
      setUsernameUpdate('');
      setAvatarUrlUpdate('');
      setSenhaUpdate('');
      setView('principal');
    } catch (error) {
      setActionError(error.message);
    } finally {
      setActionLoading(false);
    }
  };
 
  const handleDeletar = async () => {
    const confirmou = window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.');
    if (!confirmou) return;
    try {
      await signOut();
      alert('Sua sessão foi encerrada. Para excluir permanentemente sua conta, entre em contato com o suporte.');
    } catch (error) {
      alert('Não foi possível processar a solicitação. Tente novamente.');
    }
  };
 
  if (loading) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando perfil...</p>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }
 
  return (
    <S.MainContainer>
      <S.ContentWrapper>
 
        {view === 'principal' && (
          <>
            <S.HeaderContainer>
              <S.ProfileImg
                src={profile?.avatar_url || fotoPerfil}
                alt="Foto de perfil"
                onError={(e) => { e.target.src = fotoPerfil; }}
              />
              <S.UserInfoContainer>
                <S.TextName>{profile?.username || 'Usuário'}</S.TextName>
                <S.TextEmail>{user?.email}</S.TextEmail>
                <S.ButtonGroup>
                  <S.Button onClick={() => navigate('/home')}>Home</S.Button>
                  <S.Button onClick={handleLogout}>Log out</S.Button>
                </S.ButtonGroup>
              </S.UserInfoContainer>
            </S.HeaderContainer>
 
            <S.CardsGrid>
              <S.Card onClick={() => setView('info')}>
                📃
                <S.CardTitle>Informações do meu perfil</S.CardTitle>
                <S.CardSubtitle>Dados pessoais da conta</S.CardSubtitle>
              </S.Card>
              <S.Card>
                🔐
                <S.CardTitle>Segurança</S.CardTitle>
                <S.CardSubtitle>Meus dados seguros ativos</S.CardSubtitle>
              </S.Card>
              <S.Card>
                🏚️
                <S.CardTitle>Endereços</S.CardTitle>
                <S.CardSubtitle>Endereços salvos na conta</S.CardSubtitle>
              </S.Card>
              <S.Card onClick={() => { setActionError(''); setView('atualizar'); }}>
                🛠️
                <S.CardTitle>Atualizar meu perfil</S.CardTitle>
                <S.CardSubtitle>Alterar username, avatar ou senha</S.CardSubtitle>
              </S.Card>
              <S.Card onClick={() => setView('deletar')}>
                ❌
                <S.CardTitle>Deletar sua conta</S.CardTitle>
                <S.CardSubtitle>Dados poderão ser perdidos</S.CardSubtitle>
              </S.Card>
            </S.CardsGrid>
 
            {/* ============================================================ */}
            {/* COLEÇÃO DE TAMAGOTCHIS — itens que o usuário já comprou       */}
            {/* ============================================================ */}
            {/* Cada registro de user_tamagotchis vem com os dados do produto
                embutidos em `products` (join feito no userTamagotchiService).
                Passamos `produto.products` para o ProdutoCard em modoColecao,
                que esconde preço, favoritar e botão de comprar. */}
            <S.ColecaoSection>
              <S.ColecaoTitle>🐾 Meus Tamagotchis</S.ColecaoTitle>
 
              {colecaoLoading && (
                <p style={{ textAlign: 'center', color: '#666' }}>
                  Carregando sua coleção...
                </p>
              )}
 
              {colecaoError && (
                <p style={{ textAlign: 'center', color: '#c0392b' }}>
                  {colecaoError}
                </p>
              )}
 
              {!colecaoLoading && !colecaoError && meusTamagotchis.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666' }}>
                  Você ainda não possui nenhum Tamagotchi. Que tal dar uma olhada na loja?
                </p>
              )}
 
              {!colecaoLoading && meusTamagotchis.length > 0 && (
                <S.CardsGrid>
                  {meusTamagotchis.map((item) => (
                    <ProdutoCard
                      key={item.id}
                      // `products` traz os dados do catálogo (nome, imagem, descrição);
                      // sobrescrevemos `name` pelo apelido (nickname) dado pelo usuário,
                      // se ele tiver definido um
                      produto={{
                        ...item.products,
                        name: item.nickname || item.products?.name,
                      }}
                      modoColecao
                    />
                  ))}
                </S.CardsGrid>
              )}
            </S.ColecaoSection>
          </>
        )}
 
        {view === 'info' && (
          <S.ActionContainer>
            <h1>🤭 Meus dados:</h1>
            <S.ActionBox>
              <p><strong>Username:</strong> {profile?.username || 'Não definido'}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p>
                <strong>Avatar:</strong>{' '}
                {profile?.avatar_url
                  ? <a href={profile.avatar_url} target="_blank" rel="noreferrer">Ver imagem</a>
                  : 'Não definido'}
              </p>
              <p>
                <strong>Conta criada em:</strong>{' '}
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '—'}
              </p>
            </S.ActionBox>
            <S.Button onClick={() => setView('principal')} style={{ maxWidth: '200px', marginTop: '20px' }}>
              Voltar
            </S.Button>
          </S.ActionContainer>
        )}
 
        {view === 'atualizar' && (
          <S.ActionContainer>
            <h1>🛠️ Atualizar perfil</h1>
            <S.ActionBox>
              <S.InputGroup>
                <S.Label htmlFor="usernameInput">Novo username:</S.Label>
                <S.Input
                  type="text"
                  id="usernameInput"
                  placeholder={`Atual: ${profile?.username || '—'}`}
                  value={usernameUpdate}
                  onChange={(e) => setUsernameUpdate(e.target.value)}
                />
              </S.InputGroup>
              <S.InputGroup>
                <S.Label htmlFor="avatarInput">URL do novo avatar:</S.Label>
                <S.Input
                  type="text"
                  id="avatarInput"
                  placeholder="https://exemplo.com/foto.png"
                  value={avatarUrlUpdate}
                  onChange={(e) => setAvatarUrlUpdate(e.target.value)}
                />
              </S.InputGroup>
              <S.InputGroup>
                <S.Label htmlFor="senhaInput">Nova senha:</S.Label>
                <S.Input
                  type="password"
                  id="senhaInput"
                  placeholder="mínimo 6 caracteres"
                  value={senhaUpdate}
                  onChange={(e) => setSenhaUpdate(e.target.value)}
                />
              </S.InputGroup>
              {actionError && (
                <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: '4px 0' }}>
                  {actionError}
                </p>
              )}
              <S.Button onClick={handleAtualizar} style={{ marginTop: '10px' }} disabled={actionLoading}>
                {actionLoading ? 'Salvando...' : 'Confirmar'}
              </S.Button>
              <S.Button onClick={() => { setActionError(''); setView('principal'); }} style={{ marginTop: '10px' }}>
                Voltar
              </S.Button>
            </S.ActionBox>
          </S.ActionContainer>
        )}
 
        {view === 'deletar' && (
          <S.ActionContainer>
            <h1>❌ Deletar conta</h1>
            <S.ActionBox>
              <p style={{ marginBottom: '1rem', color: '#c0392b' }}>
                <strong>Atenção:</strong> Esta ação encerrará sua sessão imediatamente.
                Para excluir a conta permanentemente, entre em contato com o suporte.
              </p>
              <S.Button onClick={handleDeletar} style={{ marginTop: '10px', backgroundColor: '#c0392b' }}>
                Encerrar sessão e solicitar exclusão
              </S.Button>
              <S.Button onClick={() => setView('principal')} style={{ marginTop: '10px' }}>
                Voltar
              </S.Button>
            </S.ActionBox>
          </S.ActionContainer>
        )}
 
      </S.ContentWrapper>
 
      <S.FooterContainer>
        <img src={logoTamagotchi} alt="Logo Tamagotchi" width="150" />
        <div className="menu-footer">
          <a href="/home">Home</a>
          <a href="/collectionAcessorio">Acessórios</a>
          <a href="/collectionPersonagem">Personagens</a>
          <a href="/about">Quem somos</a>
        </div>
        <div className="footer-sociais">
          <a href="#!">@tamagoshi_virtual</a>
          <a href="mailto:tamagoshi@compre.ja.com">tamagoshi@compre.ja.com</a>
        </div>
      </S.FooterContainer>
    </S.MainContainer>
  );
};
 
export default ProfilePage;