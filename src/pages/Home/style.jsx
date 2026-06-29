import styled from "styled-components";
import fundoTama from "../../assets/home//fundoTama.png";

export const PageWrapper = styled.div`
  background:
    linear-gradient(rgba(245, 239, 230, 0.7), rgba(245, 239, 230, 0.7)),
    url(${fundoTama});
  background-repeat: repeat;
  min-height: 100vh;
`;

export const Cumpom = styled.div`
  font-family: "Poppins", sans-serif;
  color: #ff6fa5;
  background-color: #9fe3b0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 10px;
  text-align: center;

  @media (min-width: 768px) {
    height: 80px;
    font-size: 15px;
    padding: 0 10%;
  }
`;

export const HomeHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 10px;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  img {
    width: 200px;
    margin: 0 auto;

    @media (min-width: 768px) {
      width: 300px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 10px;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: column;
    width: auto;
    gap: 20px;
  }
`;

export const NavItem = styled.li`
  width: 100%;
  list-style: none;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: white;
  background-color: #ffb86b;
  padding: 12px 15px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  font-size: 12px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  z-index: 9999;

  &:hover {
    background-color: #c8a2ff;
    color: #4a4a4a;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    font-size: 16px;
    padding: 15px 20px;
  }
`;

export const UserActions = styled.div`
  position: fixed;
  left: 15px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;

  @media (min-width: 768px) {
    top: 50%;
    bottom: auto;
    right: 20px;
    transform: translateY(-50%);
  }
`;

export const ActionBtn = styled.button`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background-color: #c8a2ff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s,
    background-color 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const Prateleira = styled.section`
  padding: 20px;
`;

export const PrateleiraTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const PrateleiraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1200px;
  gap: 20px;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 20px;
  }
`;

export const VejaMais = styled.a`
  font-size: 12px;
  display: block;
  margin: 10px auto 0;
  padding: 4px;
  width: 100px;
  color: #2f2a2e;
  background: transparent;
  text-align: center;
  text-decoration: none;
  border: none;
  box-shadow: 0px 0px 8px #7f737d;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(5px);

  @media (min-width: 768px) {
    font-size: 15px;
    padding: 8px;
  }
`;

export const DeviceImg = styled.img`
  width: 100%;
  max-width: 1200px;
  display: block;
  margin: auto;
`;
