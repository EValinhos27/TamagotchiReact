import styled from "styled-components";

export const Card = styled.div`
  border-radius: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.card};
  border: ${({ theme, $raro }) => ($raro ? "2px solid #d4af37" : `1px solid ${theme.colors.text}`)};
  box-shadow: ${({ $raro }) =>
    $raro
      ? "0 0 10px rgba(212,175,55,0.7), 0 0 20px rgba(212,175,55,0.5)"
      : "none"};
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  &:hover .card-price {
    display: none;
  }
  &:hover .card-desc {
    display: block;
  }
`;

export const CardHeader = styled.h3`
  position: absolute;
  width: 100%;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
  padding: 2px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 12px 12px 0 0;
  background: ${({ theme, $color }) => $color || theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  z-index: 1;
  transition: background-color 0.3s, border-bottom 0.3s, color 0.3s;

  @media (min-width: 768px) {
    font-size: 16px;
    padding: 5px 0;
  }
`;

export const HeartBtn = styled.span`
  position: absolute;
  right: 12px;
  top: 160%;
  transform: translateY(-50%);
  cursor: pointer;
  line-height: 0;

  @media (min-width: 500px) {
    top: 50%;
  }
`;

export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 990px) {
    padding: 0 20px;
  }
`;

export const CardDescription = styled.p`
  font-size: 10px;
  text-align: center;
  padding: 5px;
  display: none;
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: rotate(180deg);
    border-width: 8px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.cardBg} transparent transparent transparent;
  }

  @media (min-width: 450px) {
    padding: 10px;
  }
  @media (min-width: 600px) {
    font-size: 12px;
  }
`;

export const CardPrice = styled.p`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  margin: 0;

  span {
    font-size: 8px;
    text-decoration: line-through;
    @media (min-width: 768px) {
      font-size: 10px;
    }
    @media (min-width: 990px) {
      font-size: 12px;
    }
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 990px) {
    font-size: 16px;
  }
`;

export const ContainerBtn = styled.div`
  display: flex;
  gap: 5px;
  height: 30px;
  margin: 10px 0;

  @media (min-width: 425px) {
    gap: 15px;
  }
`;

export const QuantBtn = styled.div`
  display: flex;
  box-shadow: 1px 1px 5px ${({ theme }) => theme.name === 'dark' ? 'rgba(0,0,0,0.5)' : '#2f2a2e'};
  border-radius: 8px;
  height: 30px;
  backdrop-filter: blur(5px);
  padding: 0 5px;

  button,
  input {
    border: none;
    background: transparent;
    text-align: center;
    width: 10px;
    cursor: pointer;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.text};

    @media (min-width: 425px) {
      width: 15px;
      font-size: 12px;
    }
  }
`;

export const AddToCart = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 5px ${({ theme }) => theme.name === 'dark' ? 'rgba(0,0,0,0.5)' : '#2f2a2e'};
  font-size: 12px;
  cursor: pointer;
  background: ${({ theme, $color }) => $color || theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  transition: transform 0.1s, background-color 0.3s;

  &:hover {
    transform: scale(1.01);
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;
