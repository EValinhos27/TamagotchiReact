import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import fotoPerfil from '../../assets/perfilPlaceholder.png'
import logoTamagotchi from '../../assets/logoTamagochi.png'
import * as S from "./style"

/*
    Adiantei o procedimento de checar usuário, mas precisa ter uma conta no supabase para testar. Por enquanto, 
    deixei comentado e usei um usuário mockado.
*/

const usuarioMock = {
  id: 1,
  name: "Usuário de Teste Visual",
  email: "teste@visual.com",
  endereco: "Cidade Modelo, 123",
  password: "123"
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL.replace('/rest/v1/', '');
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Profile = () => {
  const navigate = useNavigate(); 
  
  const [user, setUser] = useState(usuarioMock);
  const [view, setView] = useState('principal');

  const [nomeUpdate, setNomeUpdate] = useState('');
  const [enderecoUpdate, setEnderecoUpdate] = useState('');
  const [senhaUpdate, setSenhaUpdate] = useState('');
  const [senhaDelete, setSenhaDelete] = useState('');

/*
  // useEffect roda apenas uma vez quando a página carrega
  useEffect(() => {
    const fetchUserFromDB = async () => {
      const clienteLogado = JSON.parse(localStorage.getItem('cliente'));
      
      if (!clienteLogado) {
        navigate('/login');
        return;
      }

      // Busca os dados mais recentes do Supabase usando o ID do localStorage
      const { data, error } = await supabase
        .from('usuarios') // a verificar o nome da tabela
        .select('*')
        .eq('id', clienteLogado.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados atualizados:", error);
        setUser(clienteLogado); // Usa os dados do localStorage
      } else {
        setUser(data);
        localStorage.setItem('cliente', JSON.stringify(data)); // Mantém cache atualizado
      }
    };

    fetchUserFromDB();
  }, [navigate]);
  */

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    navigate('/login');
  };

  const handleAtualizar = async () => {
    if (!user) return; 

    // Cria o objeto apenas com os campos preenchidos
    const userAtualizado = {
      name: nomeUpdate || user.name,
      endereco: enderecoUpdate || user.endereco,
      password: senhaUpdate || user.password
    };

    try {
      // Faz o UPDATE na tabela do Supabase
      const { data, error } = await supabase
        .from('usuarios')
        .update(userAtualizado)
        .eq('id', user.id)
        .select() // Pede para o Supabase retornar a linha atualizada
        .single();

      if (error) throw error;
      
      // Atualiza o localStorage e a tela com os novos dados retornados pelo Supabase
      localStorage.setItem('cliente', JSON.stringify(data));
      setUser(data);
      alert('Usuário atualizado com sucesso!');
      
      // Limpa os inputs e volta à tela principal
      setNomeUpdate('');
      setEnderecoUpdate('');
      setSenhaUpdate('');
      setView('principal');

    } catch (error) {
      console.error("Erro ao atualizar:", error.message);
      alert("Houve um erro ao atualizar os dados.");
    }
  };

  const handleDeletar = async () => {
    if (!user) return;

    if (user.password !== senhaDelete) {
      alert('Senha incorreta!');
      return;
    }

    try {
      // Faz o DELETE na tabela do Supabase
      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      alert('Conta deletada com sucesso!');
      localStorage.removeItem('cliente');
      navigate('/login');

    } catch (error) {
      console.error("Erro ao deletar:", error.message);
      alert("Houve um erro ao tentar deletar a conta.");
    }
  };

  // if (!user) return <div>Carregando...</div>;

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        
        {view === 'principal' && (
          <>
            <S.HeaderContainer>
              <S.ProfileImg src={ fotoPerfil } alt="foto de perfil Tamagotchi" />
              <S.UserInfoContainer>
                <div>
                  <S.TextName>{user.name}</S.TextName>
                  <S.TextEmail>{user.email}</S.TextEmail>
                </div>
                <S.ButtonGroup>
                  <S.Button onClick={() => navigate('/home')}>Home</S.Button>
                  <S.Button onClick={handleLogout} style={{ marginTop: '5px' }}>Log out</S.Button>
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
                🔐​
                <S.CardTitle>Segurança</S.CardTitle>
                <S.CardSubtitle>Meus dados seguros ativos</S.CardSubtitle>
              </S.Card>
              <S.Card>
                🏚️​
                <S.CardTitle>Endereços</S.CardTitle>
                <S.CardSubtitle>Endereços salvos na conta</S.CardSubtitle>
              </S.Card>
              <S.Card onClick={() => setView('atualizar')}>
                ​🛠️​
                <S.CardTitle>Atualizar meu perfil</S.CardTitle>
                <S.CardSubtitle>Meus dados sensíveis ativos</S.CardSubtitle>
              </S.Card>
              <S.Card onClick={() => setView('deletar')}>
                ❌​
                <S.CardTitle>Delete sua conta</S.CardTitle>
                <S.CardSubtitle>Dados poderão ser perdidos</S.CardSubtitle>
              </S.Card>
            </S.CardsGrid>
          </>
        )}

        {/* === TELA DE INFORMAÇÕES === */}
        {view === 'info' && (
          <S.ActionContainer>
            <h1>🤭​ Meus dados: </h1>
            <S.ActionBox>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Endereço:</strong> {user.endereco || 'Não cadastrado'}</p>
            </S.ActionBox>
            <S.Button onClick={() => setView('principal')} style={{ maxWidth: '200px', marginTop: '20px' }}>Voltar</S.Button>
          </S.ActionContainer>
        )}

        {/* === TELA DE ATUALIZAÇÃO === */}
        {view === 'atualizar' && (
          <S.ActionContainer>
            <S.ActionBox>
              <S.InputGroup>
                <S.Label htmlFor="nomeInput">Nome (completo): </S.Label>
                <S.Input type="text" id="nomeInput" placeholder="😄 Nome" value={nomeUpdate} onChange={(e) => setNomeUpdate(e.target.value)} />
              </S.InputGroup>
              
              <S.InputGroup>
                <S.Label htmlFor="enderecoInput">Endereço (Cidade): </S.Label>
                <S.Input type="text" id="enderecoInput" placeholder="🏡 Endereço" value={enderecoUpdate} onChange={(e) => setEnderecoUpdate(e.target.value)} />
              </S.InputGroup>
              
              <S.InputGroup>
                <S.Label htmlFor="senhaInput">Nova Senha: </S.Label>
                <S.Input type="password" id="senhaInput" placeholder="🔑​ Senha" value={senhaUpdate} onChange={(e) => setSenhaUpdate(e.target.value)} />
              </S.InputGroup>
              
              <S.Button onClick={handleAtualizar} style={{ marginTop: '10px' }}>Confirmar</S.Button>
              <S.Button onClick={() => setView('principal')} style={{ marginTop: '10px' }}>Voltar</S.Button>
            </S.ActionBox>
          </S.ActionContainer>
        )}

        {/* === TELA DE DELETAR === */}
        {view === 'deletar' && (
          <S.ActionContainer>
            <S.ActionBox>
              <S.InputGroup>
                <S.Label htmlFor="senhaDeleteInput">Senha para confirmar: </S.Label>
                <S.Input type="password" id="senhaDeleteInput" placeholder="🔑​ Senha" value={senhaDelete} onChange={(e) => setSenhaDelete(e.target.value)} />
              </S.InputGroup>
              
              <S.Button onClick={handleDeletar} style={{ marginTop: '10px' }}>Confirmar</S.Button>
              <S.Button onClick={() => setView('principal')} style={{ marginTop: '10px' }}>Voltar</S.Button>
            </S.ActionBox>
          </S.ActionContainer>
        )}
      </S.ContentWrapper>

      {/* === FOOTER === */}
      <S.FooterContainer>
        <img src={logoTamagotchi} alt="Logo tamagoshi" width="150" />
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

export default Profile;