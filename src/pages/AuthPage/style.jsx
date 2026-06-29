// =============================================================================
// AuthPage/style.jsx — Estilos do layout da página de autenticação
// =============================================================================
// Controla o posicionamento da imagem do personagem, do container principal
// e da imagem seguidora do cursor — elementos de layout da página inteira.
// Os estilos dos formulários estão em seus próprios style.jsx.
// =============================================================================
 
import { styled } from "styled-components";
 
export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5efe6;
  overflow: hidden;
  position: relative;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
 
  /* Dark mode — fundo escuro igual à imagem de referência */
  [data-theme="dark"] & {
    background-color: #212529;
    color: #f8f9fa;
  }
`;
 
export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
 
  @media (min-width: 680px) {
    flex-direction: row;
  }
`;
 
export const CharacterImage = styled.img`
  height: 70%;
  width: 60%;
  transition: all 0.5s ease-in-out;
  z-index: 2;
  transform: ${({ $saindo }) => ($saindo ? "translateX(-100vw)" : "translateX(0)")};
 
  @media (min-width: 360px) { height: 0%; width: 40%; }
  @media (min-width: 500px) { width: 30%; }
  @media (min-width: 740px) { width: 40%; }
  @media (min-width: 1000px) { width: 35%; }
  @media (min-width: 1500px) { max-width: 45%; }
`;
 
export const CursorFollower = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  pointer-events: none;
  z-index: 1;
  will-change: transform;
`;
 
export const RunawayIcon = styled.div`
  display: none;
 
  @media (min-width: 1024px) {
    display: ${({ $visible }) => ($visible ? "block" : "none")};
    width: 4%;
    font-size: 30px;
    position: absolute;
    top: 1%;
    right: 1%;
    cursor: pointer;
    transition: all 0.1s ease;
    z-index: 3;
    user-select: none;
  }
`;
 
// =============================================================================
// Barra de topo: breadcrumb + seletor de tema
// =============================================================================
 
export const TopBar = styled.nav`
  position: absolute;
  top: 16px;
  left: 20px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
 
export const Breadcrumb = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2px;
  font-size: 0.85rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;
 
export const BreadcrumbItem = styled.li`
  a, span {
    font-family: "Poppins", Arial, Helvetica, sans-serif;
    text-decoration: ${({ $active }) => ($active ? "underline" : "underline")};
    color: #333333;
 
    /* Dark mode — texto claro */
    [data-theme="dark"] & {
      color: #adb5bd;
    }
  }
 
  a:hover {
    color: #3f76c2;
  }
`;
 
export const ThemeList = styled.ul`
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
 
export const ThemeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
  border-radius: 0;
  font-size: 0.85rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  color: #333333;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 200ms;
 
  /* Dark mode — texto claro nos botões de tema */
  [data-theme="dark"] & {
    color: #adb5bd;
  }
 
  &:hover {
    color: #3f76c2;
    background: none;
  }
`;