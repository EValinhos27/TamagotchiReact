// =============================================================================
// RegisterForm/style.jsx — Estilos do formulário de cadastro
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
  width: 90%;
  box-sizing: border-box;
  margin: 1rem;
  z-index: 2;
  color: ${({ theme }) => theme.colors.text};
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  opacity: ${({ $saindo }) => ($saindo ? 0 : 1)};
  transform: ${({ $saindo }) => ($saindo ? "translateY(-10rem)" : "translateY(0)")};
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
 
  @media (min-width: 500px) { padding-bottom: 10px; padding-top: 10px; }
  @media (min-width: 740px) { padding-top: 32px; padding-bottom: 32px; }
  @media (min-width: 1000px) { max-width: 60%; }
  @media (min-width: 1200px) { max-width: 50%; }
  @media (min-width: 1500px) { max-width: 60%; }
`;
 
export const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  @media (min-width: 1000px) { grid-column: 1 / -1; }
  @media (min-width: 740px) { font-size: 2.6rem; }
  @media (min-width: 1500px) { font-size: 3rem; }
`;
 
export const InnerGrid = styled.div`
  display: flex;
  flex-direction: column;
 
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;
 
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 2px;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  @media (min-width: 740px) { font-size: 1.3rem; }
`;
 
export const Input = styled.input`
  height: 25px;
  margin-bottom: 10px;
  border-radius: 15px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.inputBg};
  text-indent: 10px;
  box-sizing: border-box;
  font-size: 0.95rem;
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
 
  @media (min-width: 740px) { height: 30px; }
  @media (min-width: 1500px) { height: 40px; }
`;
 
export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 0.5rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  transition: background-color 300ms, transform 100ms;
 
  border-top: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
  border-left: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
  border-right: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
  border-bottom: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
 
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
 
  &:hover:not(:disabled) { background-color: ${({ theme }) => theme.colors.blueHover}; }
 
  &:active:not(:disabled) {
    border-top: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
    border-left: 2px solid ${({ theme }) => theme.name === 'dark' ? '#212529' : '#1a3a5c'};
    border-right: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
    border-bottom: 2px solid ${({ theme }) => theme.name === 'dark' ? '#495057' : '#6a9fd4'};
    transform: translateY(1px);
  }
 
  @media (min-width: 1000px) { grid-column: 1 / -1; }
`;
 
export const FooterText = styled.p`
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  @media (min-width: 740px) { font-size: 1rem; }
  @media (min-width: 1000px) { grid-column: 1 / -1; }
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
 
  @media (min-width: 1000px) { grid-column: 1 / -1; }
`;
 
export const SuccessMessage = styled.p`
  font-size: 0.85rem;
  color: #27ae60;
  text-align: center;
  margin: 4px 0 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
 
  @media (min-width: 1000px) { grid-column: 1 / -1; }
`;