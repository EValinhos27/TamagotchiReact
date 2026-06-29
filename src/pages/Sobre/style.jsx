import styled from "styled-components";
export const PageWrapper = styled.div`
  background-color: #f5efe6;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;

  img {
    max-width: 100px;
    height: auto;
  }
  h1 {
    margin-top: 0.5rem;
  }
  p {
    color: #495057;
    font-weight: 300;
    max-width: 700px;
    margin: 0 auto;
  }
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

export const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Section = styled.section`
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: #0d6efd;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.8;
  }
`;

export const CommentItem = styled.div`
  background: #fff;
  border-left: 5px solid #0d6efd;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .author {
    font-weight: 700;
    font-size: 0.9rem;
    color: #495057;
    margin-bottom: 4px;
  }
  .text {
    line-height: 1.5;
  }
  .date {
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 6px;
    display: block;
  }
`;

export const CommentForm = styled.form`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    margin-bottom: 1rem;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
  }

  button {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    width: 100%;

    &:hover {
      background: #0b5ed7;
    }
  }
`;

export const CharCounter = styled.div`
  text-align: right;
  font-size: 0.85rem;
  color: ${({ $over }) => ($over ? "red" : "#6c757d")};
  font-weight: 600;
  margin-top: -12px;
  margin-bottom: 8px;
`;
