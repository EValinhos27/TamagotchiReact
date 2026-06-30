// =============================================================================
// ProfilePage/style.jsx — Styled-components da página de perfil
// =============================================================================
// Mantém a mesma identidade visual do projeto (paleta #f5efe6, #3f76c2, Poppins)
// e preserva a estrutura de layout criada pelo colega.
// =============================================================================
 
import { styled } from 'styled-components';
 
// Wrapper externo: ocupa a tela inteira e empilha conteúdo + footer
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5efe6;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;
 
// Área central que cresce para empurrar o footer para baixo
export const ContentWrapper = styled.main`
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;
 
// -----------------------------------------------------------------------
// Cabeçalho: foto de perfil + nome/email + botões
// -----------------------------------------------------------------------
 
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.07);
  margin-bottom: 1.5rem;
 
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
 
export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3f76c2;
  flex-shrink: 0;
`;
 
export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 1rem;
 
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
 
export const TextName = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 2px;
  color: #1a1a1a;
`;
 
export const TextEmail = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;
 
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 100px;
`;
 
// -----------------------------------------------------------------------
// Botão padrão da página — reutilizado em vários contextos
// -----------------------------------------------------------------------
 
export const Button = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 20px;
  color: white;
  background-color: #3f76c2;
  font-size: 0.9rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  border: none;
  cursor: pointer;
  transition: background-color 300ms, opacity 300ms;
  margin-top: 0;
 
  /* Bordas alto-relevo (padrão do projeto) */
  border-top: 2px solid #6a9fd4;
  border-left: 2px solid #6a9fd4;
  border-right: 2px solid #1a3a5c;
  border-bottom: 2px solid #1a3a5c;
 
  &:hover:not(:disabled) {
    background-color: #3562a1;
  }
 
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
 
  &:active:not(:disabled) {
    transform: translateY(1px);
    border-top: 2px solid #1a3a5c;
    border-left: 2px solid #1a3a5c;
    border-right: 2px solid #6a9fd4;
    border-bottom: 2px solid #6a9fd4;
  }
`;
 
// -----------------------------------------------------------------------
// Grid de cards de navegação
// -----------------------------------------------------------------------
 
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
 
  /* Em telas maiores, 3 colunas */
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
 
  /* Mobile: coluna única */
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;
 
export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 1.2rem 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  transition: transform 200ms, box-shadow 200ms;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 2rem; /* Tamanho do emoji */
 
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12);
  }
 
  &:active {
    transform: translateY(0);
  }
`;
 
export const CardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;
 
export const CardSubtitle = styled.p`
  font-size: 0.78rem;
  color: #888;
  margin: 0;
`;
 
// -----------------------------------------------------------------------
// Sub-telas (info, atualizar, deletar)
// -----------------------------------------------------------------------
 
// Container geral das sub-telas
export const ActionContainer = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }
`;
 
// Card branco que envolve o conteúdo da sub-tela
export const ActionBox = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 4px;
 
  p {
    font-size: 0.95rem;
    color: #333;
    margin: 4px 0;
  }
`;
 
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`;
 
export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;
 
// Input — mesmo estilo baixo-relevo dos outros formulários do projeto
export const Input = styled.input`
  height: 38px;
  border-radius: 12px;
  width: 100%;
  background-color: #f5efe6;
  text-indent: 10px;
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  color: #1a1a1a;
  outline: none;
 
  /* Bordas baixo-relevo (padrão do projeto) */
  border-top: 1.5px solid #b8a898;
  border-left: 1.5px solid #b8a898;
  border-right: 1.5px solid #e8ddd3;
  border-bottom: 1.5px solid #e8ddd3;
 
  &:focus {
    border: 1.5px solid #3f76c2;
  }
 
  &::placeholder {
    color: #aaa;
  }
`;
 
// -----------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------
 
export const FooterContainer = styled.footer`
  background-color: #1a1a2e;
  color: #f0f0f0;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
 
  .menu-footer {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
 
    a {
      color: #adb5bd;
      text-decoration: none;
      transition: color 200ms;
 
      &:hover {
        color: #ffffff;
      }
    }
  }
 
  .footer-sociais {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
 
    a {
      color: #6c9fd4;
      text-decoration: none;
 
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
 
export const ColecaoSection = styled.section`
  margin-top: 2rem;
  width: 100%;
`;
 
export const ColecaoTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
 
  @media (min-width: 700px) { font-size: 1.3rem; }
  @media (min-width: 1000px) { font-size: 1.5rem; }
`;