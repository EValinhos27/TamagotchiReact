import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.footerBg};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.name === 'dark' ? '0px 2px 50px rgba(0, 0, 0, 0.5)' : '0px 2px 50px #e6d8e3'};
  margin-top: 20px;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FooterLogo = styled.img`
  height: 100px;
  object-fit: contain;

  @media (min-width: 768px) {
    height: 150px;
  }
`;

export const FooterSection = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 15px;
    text-align: left;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    text-align: center;
    transition: color 0.3s ease;

    @media (min-width: 768px) {
      text-align: left;
    }

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  h4 {
    font-size: 16px;
  }

  p {
    margin: 0;
  }
`;
