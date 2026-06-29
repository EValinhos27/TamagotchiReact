// =============================================================================
// AuthPage/index.jsx — Página de login e cadastro
// =============================================================================
// Orquestra: formulários, animações, imagem do personagem, cursor seguidor,
// ícone fugitivo, breadcrumb de navegação e troca de tema claro/escuro.
//
// IMAGENS: ajuste os caminhos em IMAGENS conforme sua pasta assets.
// ROTA_POS_AUTH: rota para onde o usuário vai após autenticar.
// =============================================================================
 
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginForm } from "../../components/LoginForm";
import { RegisterForm } from "../../components/RegisterForm";
import {
  PageWrapper,
  MainContainer,
  CharacterImage,
  CursorFollower,
  RunawayIcon,
  TopBar,
  Breadcrumb,
  BreadcrumbItem,
  ThemeList,
  ThemeButton,
} from "./style";
import mouseImagem from '../../assets/imagemMouse.png';
import personagem1 from '../../assets/personagem1.png';
import personagem2 from '../../assets/personagem2.png';
 
// Rota de destino pós-autenticação — ajuste conforme sua aplicação
const ROTA_POS_AUTH = "/teste";
 
// Caminhos das imagens — ajuste conforme sua pasta src/assets/
const IMAGENS = {
  personagemLogin: personagem1,
  personagemCadastro: personagem2,
  cursor: mouseImagem,
};
 
export default function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
 
  // Qual formulário está ativo
  const [formAtivo, setFormAtivo] = useState("login");
 
  // Controla animação de saída dos forms e da imagem
  const [animandoSaida, setAnimandoSaida] = useState(false);
  const [imagemPersonagem, setImagemPersonagem] = useState(IMAGENS.personagemLogin);
  const [imagemSaindo, setImagemSaindo] = useState(false);
 
  // Visibilidade do ícone fugitivo (só no form de login)
  const [iconeVisivel, setIconeVisivel] = useState(true);
 
  // Tema da página: "light" ou "dark"
  // O tema é aplicado via atributo data-theme no <html>, afetando toda a página
  const [tema, setTema] = useState("light");
 
  // Refs para o cursor seguidor
  const seguidorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);
 
  // =============================================================================
  // Redireciona se já autenticado
  // =============================================================================
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROTA_POS_AUTH, { replace: true });
    }
  }, [isAuthenticated, navigate]);
 
  // =============================================================================
  // Aplica o tema no <html> ao mudar — afeta todo o CSS que usa [data-theme]
  // =============================================================================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    // Compatibilidade com Bootstrap (usado no projeto original)
    document.documentElement.setAttribute("data-bs-theme", tema);
  }, [tema]);
 
  // =============================================================================
  // Cursor seguidor — loop de animação com interpolação suave
  // =============================================================================
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
 
    window.addEventListener("mousemove", handleMouseMove);
 
    function animar() {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.05;
 
      if (seguidorRef.current) {
        seguidorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
 
      animFrameId.current = requestAnimationFrame(animar);
    }
 
    animFrameId.current = requestAnimationFrame(animar);
 
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);
 
  // =============================================================================
  // Ícone 🧸 que foge do cursor
  // =============================================================================
  function handleRunawayIconHover() {
    const icone = document.getElementById("icone-fugitivo");
    if (!icone) return;
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    icone.style.left = `${x}px`;
    icone.style.top = `${y}px`;
  }
 
  // =============================================================================
  // Troca de formulário com animação
  // =============================================================================
  function handleSwitchForm(proximo) {
    setAnimandoSaida(true);
    setImagemSaindo(true);
 
    setTimeout(() => {
      setFormAtivo(proximo);
      setImagemPersonagem(
        proximo === "register" ? IMAGENS.personagemCadastro : IMAGENS.personagemLogin
      );
      setIconeVisivel(proximo === "login");
      setAnimandoSaida(false);
      setImagemSaindo(false);
    }, 300);
  }
 
  // =============================================================================
  // Pós-autenticação
  // =============================================================================
  function handleAuthSuccess() {
    navigate(ROTA_POS_AUTH, { replace: true });
  }
 
  return (
    <PageWrapper>
      {/* ------------------------------------------------------------------ */}
      {/* Barra de topo: breadcrumb + seletor de tema                         */}
      {/* ------------------------------------------------------------------ */}
      <TopBar aria-label="Navegação e tema">
        {/* Breadcrumb: Home / Login */}
        <Breadcrumb>
          <BreadcrumbItem>
            {/* Use <Link to="/"> se a home for uma rota React Router */}
            <a href="/">Home/</a>
          </BreadcrumbItem>
          <BreadcrumbItem $active>
            <span>{formAtivo === "login" ? "Login" : "Cadastro"}</span>
          </BreadcrumbItem>
        </Breadcrumb>
 
        {/* Botões de tema — alternam entre claro e escuro */}
        <ThemeList>
          <li>
            <ThemeButton
              type="button"
              onClick={() => setTema("light")}
              aria-pressed={tema === "light"}
            >
              ☀️ LightMode
            </ThemeButton>
          </li>
          <li>
            <ThemeButton
              type="button"
              onClick={() => setTema("dark")}
              aria-pressed={tema === "dark"}
            >
              🌙 DarkMode
            </ThemeButton>
          </li>
        </ThemeList>
      </TopBar>
 
      {/* Cursor seguidor */}
      <CursorFollower
        ref={seguidorRef}
        src={IMAGENS.cursor}
        alt="Tamagotchi seguindo o cursor"
      />
 
      <MainContainer>
        <CharacterImage
          src={imagemPersonagem}
          alt="Personagem Tamagotchi"
          $saindo={imagemSaindo}
        />
 
        {formAtivo === "login" ? (
          <LoginForm
            saindo={animandoSaida}
            onSwitchToRegister={() => handleSwitchForm("register")}
            onLoginSuccess={handleAuthSuccess}
          />
        ) : (
          <RegisterForm
            saindo={animandoSaida}
            onSwitchToLogin={() => handleSwitchForm("login")}
            onRegisterSuccess={handleAuthSuccess}
          />
        )}
      </MainContainer>
 
      {/* Ícone 🧸 fugitivo — só aparece no form de login e em desktop */}
      <RunawayIcon
        id="icone-fugitivo"
        $visible={iconeVisivel}
        onMouseOver={handleRunawayIconHover}
      >
        🧸
      </RunawayIcon>
    </PageWrapper>
  );
}