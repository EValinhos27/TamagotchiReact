// =============================================================================
// LoginForm/style.jsx — Estilos do formulário de login
// =============================================================================
 
import { styled } from "styled-components";
 
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 20px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  padding: 15px 24px;
  gap: 5px;
  width: 95%;
  box-sizing: border-box;
  margin: 1rem;
  z-index: 2;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  opacity: ${({ $saindo }) => ($saindo ? 0 : 1)};
  transform: ${({ $saindo }) => ($saindo ? "translateY(-10rem)" : "translateY(0)")};
  transition: opacity 0.3s ease, transform 0.3s ease;
 
  /* Dark mode — card escuro */
  [data-theme="dark"] & {
    background-color: #2b3035;
    border-color: #495057;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.4);
    color: #f8f9fa;
  }
 
  @media (min-width: 500px) {
    padding-bottom: 10px;
    padding-top: 10px;
  }
 
  @media (min-width: 1000px) {
    max-width: 60%;
    padding-bottom: 32px;
    padding-top: 32px;
  }
 
  @media (min-width: 1200px) {
    max-width: 50%;
  }
 
  @media (min-width: 1500px) {
    max-width: 60%;
  }
`;
 
export const Title = styled.h1`
  font-size: 2.6rem;
  text-align: center;
  margin: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  @media (min-width: 520px) {
    font-size: 4rem;
  }
`;
 
export const Subtitle = styled.p`
  font-size: 0.7rem;
  color: #8b5e00;
  text-align: center;
  margin: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  /* Dark mode — subtítulo mais claro para contraste */
  [data-theme="dark"] & {
    color: #adb5bd;
  }
 
  @media (min-width: 520px) {
    font-size: 0.9rem;
  }
`;
 
export const Label = styled.label`
  font-size: 1.3rem;
  margin-top: 15px;
  margin-bottom: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;
 
// Borda estilo "baixo-relevo": topo/esquerda escuros, direita/baixo claros
export const Input = styled.input`
  border-radius: 15px;
  width: 100%;
  height: 40px;
  background-color: #f5efe6;
  text-indent: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  outline: none;
  color: inherit;
 
  border-top: 1.5px solid #b8a898;
  border-left: 1.5px solid #b8a898;
  border-right: 1.5px solid #e8ddd3;
  border-bottom: 1.5px solid #e8ddd3;
 
  &:focus {
    border: 1.5px solid #3f76c2;
  }
 
  /* Dark mode — input escuro com borda sutil */
  [data-theme="dark"] & {
    background-color: #343a40;
    color: #ffffff;
    border-top: 1.5px solid #212529;
    border-left: 1.5px solid #212529;
    border-right: 1.5px solid #495057;
    border-bottom: 1.5px solid #495057;
 
    &::placeholder {
      color: #6c757d;
    }
 
    &:focus {
      border: 1.5px solid #3f76c2;
    }
  }
`;
 
export const ForgotLink = styled.a`
  width: 55%;
  align-self: flex-end;
  text-align: center;
  font-size: 0.8rem;
  padding: 5px;
  color: black;
  text-decoration: none;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  &:hover {
    text-decoration: underline;
  }
 
  /* Dark mode */
  [data-theme="dark"] & {
    color: #adb5bd;
  }
 
  @media (min-width: 400px) { width: 40%; }
  @media (min-width: 520px) { font-size: 0.9rem; width: 35%; }
  @media (min-width: 740px) { width: 40%; }
  @media (min-width: 1000px) { width: 30%; }
  @media (min-width: 1500px) { width: 17%; }
`;
 
// Borda estilo "alto-relevo": topo/esquerda claros, direita/baixo escuros
export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  color: white;
  background-color: #3f76c2;
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color 300ms;
 
  border-top: 2px solid #6a9fd4;
  border-left: 2px solid #6a9fd4;
  border-right: 2px solid #1a3a5c;
  border-bottom: 2px solid #1a3a5c;
 
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
 
  &:hover:not(:disabled) {
    background-color: #3562a1;
  }
 
  &:active:not(:disabled) {
    border-top: 2px solid #1a3a5c;
    border-left: 2px solid #1a3a5c;
    border-right: 2px solid #6a9fd4;
    border-bottom: 2px solid #6a9fd4;
    transform: translateY(1px);
  }
`;
 
export const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;
 
export const FooterLink = styled.span`
  color: #3f76c2;
  cursor: pointer;
  text-decoration: underline;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  &:hover { color: #3562a1; }
`;
 
export const ErrorMessage = styled.p`
  font-size: 0.85rem;
  color: #c0392b;
  text-align: center;
  margin: 4px 0 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;