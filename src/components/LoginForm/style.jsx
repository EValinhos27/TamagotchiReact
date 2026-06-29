// =============================================================================
// LoginForm/style.jsx — Estilos do formulário de login
// =============================================================================
 
import { styled } from "styled-components";
 
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  padding: 15px 24px;
  gap: 5px;
  width: 95%;
  box-sizing: border-box;
  margin: 1rem;
  z-index: 2;
  color: ${({ theme }) => theme.colors.text};
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  opacity: ${({ $saindo }) => ($saindo ? 0 : 1)};
  transform: ${({ $saindo }) => ($saindo ? "translateY(-10rem)" : "translateY(0)")};
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
 
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
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  transition: color 0.3s ease;
 
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
 
export const Input = styled.input`
  border-radius: 15px;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  text-indent: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  outline: none;
  color: ${({ theme }) => theme.colors.inputColor};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
 
  border-top: 1.5px solid ${({ theme }) => theme.colors.inputBorderTop};
  border-left: 1.5px solid ${({ theme }) => theme.colors.inputBorderLeft};
  border-right: 1.5px solid ${({ theme }) => theme.colors.inputBorderRight};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.inputBorderBottom};
 
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
 
  &:focus {
    border: 1.5px solid ${({ theme }) => theme.colors.blue};
  }
`;
 
export const ForgotLink = styled.a`
  width: 55%;
  align-self: flex-end;
  text-align: center;
  font-size: 0.8rem;
  padding: 5px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  transition: color 0.3s ease;
 
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.blue};
  }
 
  @media (min-width: 400px) { width: 40%; }
  @media (min-width: 520px) { font-size: 0.9rem; width: 35%; }
  @media (min-width: 740px) { width: 40%; }
  @media (min-width: 1000px) { width: 30%; }
  @media (min-width: 1500px) { width: 17%; }
`;
 
export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  color: white;
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color 300ms, transform 100ms;
 
  border-top: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
  border-left: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
  border-right: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
  border-bottom: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
 
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
 
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
 
  &:active:not(:disabled) {
    border-top: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
    border-left: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
    border-right: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
    border-bottom: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
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
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  text-decoration: underline;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  &:hover { color: ${({ theme }) => theme.colors.blueHover}; }
`;
 
export const ErrorMessage = styled.p`
  font-size: 0.85rem;
  color: #c0392b;
  text-align: center;
  margin: 4px 0 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
`;