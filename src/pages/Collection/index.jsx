import { useProdutos } from "../../hooks/useProdutos";
import ProdutoCard from "../../components/ProdutoCard";
import MessageContainer from "../../components/MessageContainer";

import { PageWrapper, BannerImg, Grid, BannerFooter } from "./style";

import colecaoPersonagens from "../../assets/collection/Colecao Personagens.png";
import colecaoAcessorios from "../../assets/collection/Colecao Acessorios.png";
import bannerfooter from "../../assets/collection/bannerfooter.png";
import Navbar from "../../components/Navbar/index.jsx";

export default function Collection({ categoria }) {
  const { produtos, loading } = useProdutos();

  const bannerSrc =
  categoria === "personagem" ? colecaoPersonagens : colecaoAcessorios;

  const bannerAlt =
  categoria === "tamagotchi"
    ? "Coleção Tamagotchis"
    : "Coleção Acessórios";

  const filtrados = produtos.filter((p) => p.type === categoria);

  return (
    <PageWrapper>
      <Navbar/>

      <section style={{ padding: "20px" }}>
        <BannerImg src={bannerSrc} alt={bannerAlt} />

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px" }}>Carregando...</p>
        ) : (
          <Grid>
            {filtrados.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </Grid>
        )}
      </section>

      <BannerFooter src={bannerfooter} alt="Personagens brincando" />

      <MessageContainer />
    </PageWrapper>
  );
}
