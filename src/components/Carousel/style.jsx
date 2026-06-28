import styled from "styled-components";

export const Wrapper = styled.div`
  width: 95%;
  max-width: 500px;
  margin: 10px auto;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    width: 50%;
    margin: 20px auto 20px 0;
  }
`;

export const Track = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $index }) => `translateX(${-100 * $index}%)`};
`;

export const Slide = styled.div`
  min-width: 100%;

  img {
    width: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }
`;

export const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "prev" ? "left: 10px;" : "right: 10px;")}
  background: rgba(255,255,255,0.7);
  border: none;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 2;
`;
