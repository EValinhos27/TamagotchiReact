import styled from 'styled-components';
import fundoTamagotchi from '../../assets/favoritos/FundoTamagotchi.png';

export const MainContainer = styled.main`
  background-image: url(${fundoTamagotchi});
  background-repeat: repeat;
  background-size: 12.5rem;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  
  /* Variáveis de cor do seu CSS original */
  --color-bg-card: rgba(253, 242, 230, 0.6);
  --color-bg-container: rgba(253, 241, 230, 0.7);
  --color-border: rgba(255, 255, 255, 0.4);
  --color-shadow: rgba(0, 0, 0, 0.1);

  font-size: 16px;
  @media (min-width: 768px) { font-size: 1.125rem; }
  @media (min-width: 1024px) { font-size: 1.25rem; }
`;

export const BreadcrumbNav = styled.nav`
  padding: 1rem;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.5); 
  
  ol {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 10px;
  }

  a {
    text-decoration: none;
    color: #3f76c2;
    font-weight: 500;
  }

  .active {
    color: #6c757d;
  }
`;

export const ContentContainer = styled.div`
  background-color: var(--color-bg-container);
  padding: 1.25rem;
  border-radius: 0.625rem;
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem; /* Substitui o mb-4 */
  font-weight: 600;
`;

export const GlassCard = styled.div`
  background: var(--color-bg-card);
  backdrop-filter: blur(0.5rem);
  -webkit-backdrop-filter: blur(0.5rem);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 0.5rem 1.2rem var(--color-shadow);

  @media (min-width: 500px) { padding: 2rem; }
  @media (min-width: 768px) { padding: 2.5rem; border-radius: 1.2rem; }
`;

export const ListaFavoritos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1rem;
`;

export const CardProduto = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.625rem;
  padding: 0.938rem;
  text-align: left;

  .info-produto {
    flex: 1; /* Faz a div de texto ocupar o espaço restante */
    margin-left: 10px;
  }
`;

export const ProdutoImg = styled.img`
  width: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ButtonDanger = styled.button`
  margin: 0.313rem;
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: #ff4d6d;
  color: white;
  cursor: pointer;
  border-radius: 0.625rem;
  transition: 0.3s;
  font-size: 0.9rem;

  &:hover {
    background-color: #c9184a;
  }
`;
