import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
`;

export const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Msg = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  animation: ${slideIn} 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  img {
    width: 50px;
    border-radius: 10px 0 0 10px;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 13px;
`;
