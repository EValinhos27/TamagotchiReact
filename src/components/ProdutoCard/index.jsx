import { useState } from "react";
import { useApp } from "../../contexts/AppContext";
import {
  AddToCart,
  Card,
  CardDescription,
  CardHeader,
  CardImg,
  CardInfo,
  CardInfoColecao,
  CardPrice,
  ContainerBtn,
  HeartBtn,
  QuantBtn,
} from "./style";
 
// ── SVGs ──────────────────────────────────────────────────────
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
  </svg>
);
 
const HeartFillIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="red"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
    />
  </svg>
);
 
// =============================================================================
// ProdutoCard — Card de produto (loja) ou card de coleção (perfil)
// =============================================================================
// PROPS:
//   produto       {object}  — Dados do produto/tamagotchi a exibir
//   isRaro        {boolean} — (opcional) Aplica destaque visual de item raro
//   modoColecao   {boolean} — (opcional, padrão false) Quando true, esconde o
//                              preço e o botão "comprar", exibindo o card em
//                              modo somente leitura. Usado na tela de perfil
//                              para mostrar os tamagotchis que o usuário já
//                              possui (não é uma vitrine de venda).
//
// EXEMPLO DE USO NA HOME (loja, comportamento padrão):
//   <ProdutoCard produto={produto} />
//
// EXEMPLO DE USO NO PERFIL (coleção do usuário, somente leitura):
//   <ProdutoCard produto={tamagotchi} modoColecao />
// =============================================================================
export default function ProdutoCard({ produto, isRaro = false, modoColecao = false }) {
  const { adicionarAoCarrinho, toggleFavorito, isFavorito } = useApp();
  const [favorito, setFavorito] = useState(isFavorito(produto.id));
  const [quantidade, setQuantidade] = useState(1);
 
  function handleFavorito() {
    const novoEstado = toggleFavorito(produto);
    setFavorito(novoEstado);
  }
 
  function handleComprar() {
    adicionarAoCarrinho(produto, quantidade);
  }
 
  return (
    <Card $raro={isRaro}>
      <CardHeader $color={produto.color}>
        {produto.name}
        {/* O coração de favoritar não faz sentido em modoColecao: o usuário
            já possui o item, então o botão é omitido nesse caso */}
        {!modoColecao && (
          <HeartBtn onClick={handleFavorito}>
            {favorito ? <HeartFillIcon /> : <HeartIcon />}
          </HeartBtn>
        )}
      </CardHeader>
 
      <CardImg src={produto.image_url} alt={produto.name} />
 
      {(() => {
        const InfoWrapper = modoColecao ? CardInfoColecao : CardInfo;
        return (
          <InfoWrapper>
            <CardDescription className="card-desc">
              {produto.description}
            </CardDescription>
 
            {/* Em modoColecao, preço e botão de comprar somem — o card vira
                apenas uma exibição do item que o usuário já tem */}
            {!modoColecao && (
              <>
                <CardPrice className="card-price">
                  <span>R$ {(produto.price * 2).toFixed(2)}</span>
                  R$ {Number(produto.price).toFixed(2)}
                </CardPrice>
                <ContainerBtn>
                  <QuantBtn>
                    <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>
                      -
                    </button>
                    <input readOnly value={quantidade} />
                    <button onClick={() => setQuantidade((q) => q + 1)}>+</button>
                  </QuantBtn>
                  <AddToCart $color={produto.color} onClick={handleComprar}>
                    comprar
                  </AddToCart>
                </ContainerBtn>
              </>
            )}
          </InfoWrapper>
        );
      })()}
    </Card>
  );
}