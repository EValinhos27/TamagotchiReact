import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [mensagens, setMensagens] = useState([]);

  // ── Mensagens toast ──────────────────────────────────────────
  const adicionarMensagem = useCallback((produto, texto) => {
    const id = Date.now();
    setMensagens((prev) => [...prev, { id, produto, texto }]);
    setTimeout(() => {
      setMensagens((prev) => prev.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  // ── Carrinho ─────────────────────────────────────────────────
  const adicionarAoCarrinho = useCallback(
    (produto, quantidade) => {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const existente = carrinho.find((p) => p.id === produto.id);
      if (existente) {
        existente.quantidade += quantidade;
      } else {
        carrinho.push({
          id: produto.id,
          nome: produto.name,
          preco: produto.price,
          imagem: produto.image_url,
          quantidade,
        });
      }
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      adicionarMensagem(produto, "Adicionado ao carrinho");
    },
    [adicionarMensagem],
  );

  // ── Favoritos ─────────────────────────────────────────────────
  const toggleFavorito = useCallback(
    (produto) => {
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const existe = favoritos.find((item) => item.id === produto.id);
      let texto;
      if (existe) {
        favoritos = favoritos.filter((item) => item.id !== produto.id);
        texto = "Removido da Lista de Desejos";
      } else {
        favoritos.push({
          id: produto.id,
          nome: produto.name,
          preco: produto.price,
          imagem: produto.image_url,
          descricao: produto.description,
        });
        texto = "Adicionado à Lista de Desejos";
      }
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      adicionarMensagem(produto, texto);
      return !existe;
    },
    [adicionarMensagem],
  );

  const isFavorito = useCallback((produtoId) => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    return favoritos.some((item) => item.id === produtoId);
  }, []);

  return (
    <AppContext.Provider
      value={{
        mensagens,
        adicionarAoCarrinho,
        toggleFavorito,
        isFavorito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
