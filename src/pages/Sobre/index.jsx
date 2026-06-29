import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import imagemLogo from "../../assets/home/Logo.jpeg";
import {
  Breadcrumb,
  CardGrid,
  CharCounter,
  CommentForm,
  Header,
  InfoCard,
  Main,
  PageWrapper,
  Section,
} from "./style";

export default function Sobre() {
  const [comments, setComments] = useState([]);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const MAX = 100;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    saved.sort((a, b) => b.timestamp - a.timestamp);
    setComments(saved);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim() || !texto.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    const novo = {
      name: nome.trim(),
      text: texto.trim(),
      timestamp: Date.now(),
    };
    const todos = [novo, ...comments];
    setComments(todos);
    localStorage.setItem("comments", JSON.stringify(todos));
    setNome("");
    setTexto("");
  }

  return (
    <PageWrapper>
      <Breadcrumb>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span>/ Sobre</span>
          </li>
        </ol>
      </Breadcrumb>

      <Header>
        <img src={imagemLogo} alt="Logo empresa" />
        <h1>Sobre Nós</h1>
        <p>A alegria de ter um pet, na palma da sua mão.</p>
      </Header>

      <Main>
        <Section>
          <h2>Nossa Jornada</h2>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Sabemos que a rotina urbana e os custos tornaram o sonho de ter um
            pet real um desafio. Nosso site nasceu para preencher esse vazio,
            unindo o cuidado diário à diversão tecnológica.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Inspirados pelo fenômeno dos Tamagotchis, criamos um refúgio para
            quem busca companhia e um toque de estilo para seus pets virtuais.
          </p>
        </Section>

        <Section>
          <h2>Propósito e Futuro</h2>
          <CardGrid>
            <InfoCard>
              <h3>Nossa Missão</h3>
              <p>
                Proporcionar uma alternativa viável e encantadora para o cuidado
                de pets através da tecnologia, inspirados no clássico conceito
                dos tamagotchis.
              </p>
            </InfoCard>
            <InfoCard>
              <h3>Nossa Visão</h3>
              <p>
                Nascemos para conectar apaixonados por pets em todo o Brasil.
                Nossa meta é escalar para todo o território nacional em até dois
                anos.
              </p>
            </InfoCard>
          </CardGrid>
        </Section>

        <Section>
          <h2>O que dizem sobre nós</h2>
          {comments.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontStyle: "italic",
                color: "#6c757d",
              }}
            >
              Ainda não há avaliações. Seja o primeiro a contribuir!
            </p>
          ) : (
            comments.map((c, i) => (
              <CommentItem key={i}>
                <p className="author">{c.name}</p>
                <p className="text">{c.text}</p>
                <time className="date">
                  Postado em:{" "}
                  {new Date(c.timestamp).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </CommentItem>
            ))
          )}
        </Section>

        <Section>
          <h2>Deixe sua Avaliação</h2>
          <CommentForm onSubmit={handleSubmit}>
            <label htmlFor="comment-name">Seu Nome:</label>
            <input
              id="comment-name"
              type="text"
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label htmlFor="comment-text">Seu Comentário:</label>
            <textarea
              id="comment-text"
              rows={3}
              maxLength={MAX}
              placeholder="Conte-nos sua experiência..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required
            />
            <CharCounter $over={texto.length >= MAX}>
              {texto.length}/{MAX}
            </CharCounter>

            <button type="submit">Enviar Avaliação</button>
          </CommentForm>
        </Section>
      </Main>
    </PageWrapper>
  );
}
