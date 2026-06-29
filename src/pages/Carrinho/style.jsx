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
    color: #3f76c2;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  background-color: rgba(253, 241, 230, 0.7);
  padding: 1.25rem;
  border-radius: 0.625rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: rgba(253, 242, 230, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
`;

export const CardProduto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;

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
  background-color: ${({ $variant }) =>
    $variant === "danger"
      ? "#dc3545"
      : $variant === "success"
        ? "#28a745"
        : $variant === "warning"
          ? "#ffc107"
          : "#6c757d"};
  color: ${({ $variant }) => ($variant === "warning" ? "#000" : "#fff")};
  &:hover {
    opacity: 0.85;
  }
`;

export const Total = styled.h5`
  text-align: right;
  margin: 1rem 0;
  font-size: 1.1rem;
`;

export const CupomArea = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;

  input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    flex: 1;
    min-width: 150px;
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
  background: rgba(253, 242, 230, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: ${subir} 0.3s ease;
`;

export const BtnMetodo = styled.button`
  padding: 10px 20px;
  border: ${({ $ativo }) => ($ativo ? "2px solid #28a745" : "2px solid #ccc")};
  border-radius: 10px;
  background: ${({ $ativo }) => ($ativo ? "#d4edda" : "#fff")};
  color: ${({ $ativo }) => ($ativo ? "#155724" : "#333")};
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
