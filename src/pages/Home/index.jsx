import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel";
import MessageContainer from "../../components/MessageContainer";
import logoImg from "../../assets/home/Logo.jpeg";
import deviceImg from "../../assets/home/device.png";
import { useProdutos } from "../../hooks/produtoAPI";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionBtn,
  Cumpom,
  DeviceImg,
  HomeHeader,
  LogoWrapper,
  Nav,
  NavItem,
  NavLink,
  NavList,
  PageWrapper,
  Prateleira,
  PrateleiraGrid,
  PrateleiraTitle,
  UserActions,
  VejaMais,
} from "./style";
import ProdutoCard from "../../components/ProdutoCard";

export default function Home() {
  const { produtos, loading } = useProdutos();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // const cliente = JSON.parse(localStorage.getItem("cliente"));

  const personagens = produtos
    .filter((p) => p.category === "personagem")
    .slice(0, 4);

  const acessorios = produtos
    .filter((p) => p.category === "acessorio")
    .slice(0, 4);

  const todos = [...produtos].sort(() => Math.random() - 0.5).slice(0, 20);

  return (
    <PageWrapper>
      <Cumpom>
        <h1 style={{ fontSize: "inherit", fontWeight: "normal" }}>
          🔥 QUEIMA DE ESTOQUE: USE O CUPOM 05/05 PARA GANHAR 10% DE DESCONTO 🔥
        </h1>
      </Cumpom>

      <HomeHeader>
        <div style={{ width: "45%" }}>
          <LogoWrapper>
            <img src={logoImg} alt="Logo da loja" />
          </LogoWrapper>
          <Nav>
            <NavList>
              <NavItem>
                <NavLink onClick={() => navigate("/")}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => navigate("/personagens")}>
                  Personagens
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => navigate("/acessorios")}>
                  Acessórios
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    // Se estiver autenticado, vai para o teste/perfil. Se não, vai para o login.
                    navigate(isAuthenticated ? "/teste" : "/login");
                  }}
                >
                  {isAuthenticated ? "Minha conta" : "Login"}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => navigate("/sobre")}>Sobre nós</NavLink>
              </NavItem>
            </NavList>
          </Nav>
        </div>

        <Carousel />
      </HomeHeader>

      <UserActions>
        <ActionBtn title="Favoritos" onClick={() => navigate("/favoritos")}>
          ❤️
        </ActionBtn>
        <ActionBtn title="Carrinho" onClick={() => navigate("/carrinho")}>
          🛒
        </ActionBtn>
      </UserActions>

      {loading ? (
        <p style={{ textAlign: "center", padding: "40px" }}>
          Carregando produtos...
        </p>
      ) : (
        <>
          <Prateleira>
            <PrateleiraTitle>Personagens</PrateleiraTitle>
            <PrateleiraGrid>
              {personagens.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </PrateleiraGrid>
            <VejaMais onClick={() => navigate("/personagens")}>
              ver tudo
            </VejaMais>
          </Prateleira>

          <Prateleira>
            <PrateleiraTitle>Acessórios</PrateleiraTitle>
            <PrateleiraGrid>
              {acessorios.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </PrateleiraGrid>
            <VejaMais onClick={() => navigate("/acessorios")}>
              ver tudo
            </VejaMais>
          </Prateleira>

          <DeviceImg src={deviceImg} alt="Dispositivo tamagoshi" />

          <Prateleira>
            <PrateleiraTitle>Todos os produtos</PrateleiraTitle>
            <PrateleiraGrid>
              {todos.map((p) => (
                <ProdutoCard
                  key={p.id}
                  produto={p}
                  isRaro={p.id === "19" || p.id === "20"}
                />
              ))}
            </PrateleiraGrid>
          </Prateleira>
        </>
      )}

      <MessageContainer />
    </PageWrapper>
  );
}
