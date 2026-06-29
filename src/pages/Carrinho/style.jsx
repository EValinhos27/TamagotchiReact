import styled, { keyframes } from "styled-components";
import fundoBg from "../../assets/home/fundoTama.png";

export const subir = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

export const PageWrapper = styled.div`
  background-image: url(${fundoBg});
  background-repeat: repeat;
  background-size: 200px;
  min-height: 100vh;
`;

export const Breadcrumb = styled.nav`
  padding: 1rem;
  ol {
    display: flex;
    gap: 5px;
    list-style: none;
    padding: 0;
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.colors.blueHover};
    }
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(43, 48, 53, 0.8)' : 'rgba(253, 241, 230, 0.7)'};
  padding: 1.25rem;
  border-radius: 0.625rem;
  max-width: 900px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s, color 0.3s;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(52, 58, 64, 0.8)' : 'rgba(253, 242, 230, 0.6)'};
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'};
  box-shadow: 0 0.5rem 1.2rem ${({ theme }) => theme.name === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, color 0.3s;
`;

export const CardProduto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(33, 37, 41, 0.7)' : 'rgba(255, 255, 255, 0.6)'};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  transition: background 0.3s, color 0.3s;

  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const BtnGrupo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Btn = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  background-color: ${({ theme, $variant }) => theme.buttons[$variant || 'secondary'].background};
  color: ${({ theme, $variant }) => theme.buttons[$variant || 'secondary'].color};
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    background-color: ${({ theme, $variant }) => theme.buttons[$variant || 'secondary'].hover};
    opacity: 0.95;
  }
`;

export const Total = styled.h5`
  text-align: right;
  margin: 1rem 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CupomArea = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;

  input {
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#ccc'};
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.inputColor};
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    flex: 1;
    min-width: 150px;
    outline: none;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $ativo }) => ($ativo ? 1 : 0)};
  pointer-events: ${({ $ativo }) => ($ativo ? "all" : "none")};
  transition: 0.3s;
  z-index: 1000;
`;

export const ModalConteudo = styled.div`
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(43, 48, 53, 0.95)' : 'rgba(253, 242, 230, 0.95)'};
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  animation: ${subir} 0.3s ease;
  transition: background-color 0.3s, color 0.3s;
`;

export const BtnMetodo = styled.button`
  padding: 10px 20px;
  border: ${({ theme, $ativo }) => ($ativo ? `2px solid ${theme.colors.accentGreen}` : `2px solid ${theme.name === 'dark' ? '#495057' : '#ccc'}`)};
  border-radius: 10px;
  background: ${({ theme, $ativo }) => ($ativo ? (theme.name === 'dark' ? 'rgba(159, 227, 176, 0.2)' : '#d4edda') : (theme.name === 'dark' ? '#2b3035' : '#fff'))};
  color: ${({ theme, $ativo }) => ($ativo ? (theme.name === 'dark' ? '#9fe3b0' : '#155724') : theme.colors.text)};
  font-weight: ${({ $ativo }) => ($ativo ? "bold" : "normal")};
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.2s;
`;

export const Alerta = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(-20px)")};
  transition: all 0.3s ease;
  pointer-events: none;
`;
