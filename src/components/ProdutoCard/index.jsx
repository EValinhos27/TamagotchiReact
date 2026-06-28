import { useState } from "react";
import { useApp } from "../../contexts/AppContext";
import {
  AddToCart,
  Card,
  CardDescription,
  CardHeader,
  CardImg,
  CardInfo,
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

export default function ProdutoCard({ produto, isRaro = false }) {
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
        <HeartBtn onClick={handleFavorito}>
          {favorito ? <HeartFillIcon /> : <HeartIcon />}
        </HeartBtn>
      </CardHeader>

      <CardImg src={produto.image} alt={produto.name} />

      <CardInfo>
        <CardDescription className="card-desc">
          {produto.description}
        </CardDescription>
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
      </CardInfo>
    </Card>
  );
}
