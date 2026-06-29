// =============================================================================
// RegisterForm/style.jsx — Estilos do formulário de cadastro
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
  width: 90%;
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
 
// Borda estilo "baixo-relevo"
export const Input = styled.input`
  height: 25px;
  margin-bottom: 10px;
  border-radius: 15px;
  width: 100%;
  background-color: #f5efe6;
  text-indent: 10px;
  box-sizing: border-box;
  font-size: 0.95rem;
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
 
  /* Dark mode */
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
 
  @media (min-width: 740px) { height: 30px; }
  @media (min-width: 1500px) { height: 40px; }
`;
 
// Borda estilo "alto-relevo"
export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 0.5rem;
  color: white;
  background-color: #3f76c2;
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  transition: background-color 300ms;
 
  border-top: 2px solid #6a9fd4;
  border-left: 2px solid #6a9fd4;
  border-right: 2px solid #1a3a5c;
  border-bottom: 2px solid #1a3a5c;
 
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
 
  &:hover:not(:disabled) { background-color: #3562a1; }
 
  &:active:not(:disabled) {
    border-top: 2px solid #1a3a5c;
    border-left: 2px solid #1a3a5c;
    border-right: 2px solid #6a9fd4;
    border-bottom: 2px solid #6a9fd4;
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