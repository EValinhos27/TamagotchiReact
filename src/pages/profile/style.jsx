import styled from 'styled-components';



export const MainContainer = styled.main`

  background-color: #f5efe6;

  min-height: 100vh;

  width: 100vw;

  margin: 0;

  padding: 0;

  font-family: 'Poppins', sans-serif;

  display: flex;

  flex-direction: column;

  align-items: center;

`;



export const ContentWrapper = styled.div`

  width: 100%;

  max-width: 1200px;

  padding: 1rem;

  flex: 1;

`;



export const HeaderContainer = styled.div`

  display: flex;

  margin-top: 1rem;

  gap: 2%;

  margin-bottom: 2rem;



  @media (min-width: 900px) {

    margin-bottom: 1rem;

  }

`;



export const ProfileImg = styled.img`

  margin: 0;

  padding: 0;

  display: block;

  width: 20%;

  border-radius: 50%;

  background-color: #ffffff;



  @media (min-width: 700px) { width: 15%; }

  @media (min-width: 800px) { width: 13%; }

  @media (min-width: 1000px) { width: 10%; }

`;



export const UserInfoContainer = styled.div`

  display: flex;

  flex-direction: column;

  justify-content: center;

`;



export const TextName = styled.p`

  font-size: 0.8rem;

  margin: 0;

  font-weight: 600;

  @media (min-width: 700px) { font-size: 0.9rem; }

  @media (min-width: 1000px) { font-size: 1rem; }

  @media (min-width: 1500px) { font-size: 1.2rem; }

`;



export const TextEmail = styled.p`

  font-size: 0.8rem;

  margin: 0;

  color: #4a4a4a;

  @media (min-width: 700px) { font-size: 0.9rem; }

  @media (min-width: 1000px) { font-size: 1rem; }

  @media (min-width: 1500px) { font-size: 1.2rem; }

`;



export const ButtonGroup = styled.div`

  margin-top: 10px;

  display: flex;

  flex-direction: column;

  gap: 5px;

`;



export const Button = styled.button`

  color: white;

  background-color: #3f76c2;

  font-size: 0.9rem;

  transition: 300ms;

  border-radius: 20px;

  border: none;

  padding: 8px 16px;

  width: 100%;



  @media (min-width: 700px) { font-size: 1rem; }

  @media (min-width: 1000px) { font-size: 1.2rem; }

  @media (min-width: 1500px) { font-size: 1.3rem; }



  &:hover {

    cursor: pointer;

    background-color: #3562a1;

  }

`;



export const CardsGrid = styled.div`

  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  justify-content: center;

  align-items: center;



  @media (min-width: 1000px) {

    display: flex;

  }

`;



export const Card = styled.div`

  background-color: #ffffff;

  padding: 1rem;

  border: 1px solid #ffffff;

  border-radius: 14px;

  cursor: pointer;

  width: 100%;

  max-width: 300px;

  text-align: center;

  transition: 0.2s;



  &:hover {

    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);

  }

`;



export const CardTitle = styled.p`

  margin-top: 1rem;

  font-weight: 600;

  font-size: 0.9rem;

  @media (min-width: 1000px) { font-size: 1.1rem; }

`;



export const CardSubtitle = styled.p`

  color: #4a4a4a;

  font-size: 0.8rem;

  @media (min-width: 1000px) { font-size: 0.9rem; }

`;



export const ActionContainer = styled.div`

  display: flex;

  flex-direction: column;

  align-items: center;

  margin-top: 2rem;

`;



export const ActionBox = styled.div`

  background-color: #ffffff;

  display: flex;

  flex-direction: column;

  align-items: center;

  width: 100%;

  max-width: 60%;

  padding: 2.3rem;

  border-radius: 20px;

`;

export const InputGroup = styled.div`

  display: flex;

  flex-direction: column;

  width: 100%;

  margin-bottom: 15px;

`;



export const Label = styled.label`

  margin-top: 10px;

  margin-bottom: 2px;

  font-size: 1.1rem;

  font-weight: 500;



  @media (min-width: 500px) { font-size: 1.2rem; }

  @media (min-width: 1000px) { font-size: 1.4rem; }

`;



export const Input = styled.input`

  border-radius: 15px;

  height: 1.4rem;

  padding: 8px;

  border: 1px solid #ccc;

  outline: none;



  @media (min-width: 1000px) { height: 1.6rem; }

  @media (min-width: 1500px) { height: 1.8rem; }

`;



export const FooterContainer = styled.footer`

  background-color: #f5efe6;

  margin-top: 40px;

  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 20px 0;

  border-top: 1px solid #e0d8cc;



  .menu-footer, .footer-sociais, .footer-dev {

    display: flex;

    gap: 15px;

    margin: 10px 0;

    flex-wrap: wrap;

    justify-content: center;

  }

  

  a {

    text-decoration: none;

    color: black;

    font-size: 0.9rem;

  }

`;