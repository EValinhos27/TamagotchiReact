import styled from "styled-components";

export const PageWrapper = styled.div`
  background: linear-gradient(
    rgba(245, 239, 230, 0.7),
    rgba(245, 239, 230, 0.7)
  );
  min-height: 100vh;
`;

export const BannerImg = styled.img`
  width: 80%;
  margin: 20px auto 0;
  display: block;
`;

export const Grid = styled.div`
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

export const BannerFooter = styled.img`
  width: 100%;
  display: block;
  margin: 40px auto 0;
`;