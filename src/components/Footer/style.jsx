import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-around;
  background-color: #fcf2e8;
  padding: 20px;
  box-shadow: 0px 2px 50px #e6d8e3;
  margin-top: 20px;

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
  color: #2f2a2e;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 15px;
    text-align: left;
  }

  a {
    color: #2f2a2e;
    text-decoration: none;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  h4 {
    font-size: 16px;
  }

  p {
    margin: 0;
  }
`;
