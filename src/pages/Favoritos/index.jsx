import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './style'

const Favorites = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);

  // Carrega os favoritos do localStorage assim que a página abre
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(dadosSalvos);
  }, []);

  // Remove um item específico baseado no índice da array
  const removerFavorito = (indexParaRemover) => {
    const novaLista = favoritos.filter((_, index) => index !== indexParaRemover);
    setFavoritos(novaLista);
    localStorage.setItem("favoritos", JSON.stringify(novaLista));
  };

  // Limpa toda a lista de favoritos
  const limparFavoritos = () => {
    setFavoritos([]);
    localStorage.setItem("favoritos", JSON.stringify([]));
  };

  return (
    <S.MainContainer>
      <S.ContentContainer>
        <S.Title>🧸 Favoritos</S.Title>

        <S.GlassCard>
          <h4>Seus produtos favoritos</h4>

          <S.ListaFavoritos>
            {favoritos.length === 0 ? (
              <p style={{ marginTop: '1rem', color: '#666' }}>Você ainda não tem favoritos salvos.</p>
            ) : (
              favoritos.map((produto, index) => (
                <S.CardProduto key={index}>
                  <S.ProdutoImg src={`../home/${produto.imagem}`} alt={produto.nome} />
                  
                  <div className="info-produto">
                    <strong>{produto.nome}</strong><br />
                    <small>R$ {produto.preco}</small>
                  </div>

                  <div>
                    <S.ButtonDanger onClick={() => removerFavorito(index)}>
                      Remover
                    </S.ButtonDanger>
                  </div>
                </S.CardProduto>
              ))
            )}
          </S.ListaFavoritos>

          {favoritos.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
              <S.ButtonDanger onClick={limparFavoritos}>Limpar Todos</S.ButtonDanger>
            </div>
          )}
        </S.GlassCard>
      </S.ContentContainer>
    </S.MainContainer>
  );
};

export default Favorites;