import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { createOrderWithItems } from "../../services/Orderservice";
import { addTamagotchiToUser } from "../../services/Usertamagotchiservice";
import { getAllProducts } from "../../services/Productservice";
import {
  Alerta,
  Breadcrumb,
  Btn,
  BtnGrupo,
  BtnMetodo,
  Card,
  CardProduto,
  Container,
  CupomArea,
  ModalConteudo,
  ModalOverlay,
  PageWrapper,
  Total,
} from "./style";

const CUPONS = { "05/05": 0.1 };

export default function Carrinho() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------
  // Autenticação: vem do AuthContext, não mais do localStorage.
  // O carrinho original checava `localStorage.getItem("cliente")`, mas
  // nada no app grava esse item — o login real é feito via Supabase Auth
  // e fica disponível em `user`/`isAuthenticated` no AuthContext.
  // ---------------------------------------------------------------------
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [metodo, setMetodo] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupomCode, setCupomCode] = useState("");
  const [cupomMsg, setCupomMsg] = useState("");
  const [alerta, setAlerta] = useState("");
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Estado de carregamento durante a finalização da compra (chamadas ao Supabase)
  const [finalizando, setFinalizando] = useState(false);

  useEffect(() => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho")) || []);
  }, []);

  function salvar(novo) {
    setCarrinho(novo);
    localStorage.setItem("carrinho", JSON.stringify(novo));
  }

  function remover(index) {
    const novo = [...carrinho];
    novo.splice(index, 1);
    salvar(novo);
  }

  function alterarQtd(index, delta) {
    const novo = [...carrinho];
    novo[index].quantidade += delta;
    if (novo[index].quantidade <= 0) {
      remover(index);
      return;
    }
    salvar(novo);
  }

  function limpar() {
    salvar([]);
  }

  function mostrarAlerta(msg) {
    setAlerta(msg);
    setAlertaVisible(true);
    setTimeout(() => setAlertaVisible(false), 3000);
  }

  function aplicarCupom() {
    const c = cupomCode.trim().toUpperCase();
    if (CUPONS[c]) {
      setDesconto(CUPONS[c]);
      setCupomMsg(`Cupom ${c} aplicado! -${CUPONS[c] * 100}%`);
    } else {
      setDesconto(0);
      setCupomMsg("Cupom inválido!");
    }
  }

  function removerCupom() {
    setDesconto(0);
    setCupomMsg("Cupom removido.");
    setCupomCode("");
  }

  function finalizar() {
    if (carrinho.length === 0) {
      mostrarAlerta("Carrinho vazio!");
      return;
    }

    // Checagem de login agora usa o AuthContext (Supabase Auth real),
    // não mais o localStorage.
    if (!isAuthenticated) {
      mostrarAlerta("Faça o login primeiro!");
      navigate("/login");
      return;
    }

    setModalAberto(true);
  }

  // =============================================================================
  // confirmarPagamento — Grava o pedido no Supabase
  // =============================================================================
  // Fluxo:
  //   1. Cria o pedido (orders) + itens (order_items) via createOrderWithItems
  //   2. Para cada item do carrinho cujo produto é do tipo 'tamagotchi',
  //      adiciona um registro em user_tamagotchis (a "coleção" do usuário)
  //   3. Limpa o carrinho e fecha o modal
  //
  // O carrinho salvo no localStorage não guarda o `type` do produto, então
  // buscamos a lista de produtos no Supabase para descobrir quais itens
  // do carrinho são tamagotchis antes de popular user_tamagotchis.
  // =============================================================================
  async function confirmarPagamento() {
    if (!metodo) {
      mostrarAlerta("Escolha uma forma de pagamento!");
      return;
    }

    // Proteção extra: se a sessão expirou entre abrir o modal e confirmar
    if (!isAuthenticated || !user) {
      mostrarAlerta("Sua sessão expirou. Faça login novamente.");
      setModalAberto(false);
      navigate("/login");
      return;
    }

    const total = carrinho.reduce((a, p) => a + p.preco * p.quantidade, 0);
    const totalComDesconto = total * (1 - desconto);

    setFinalizando(true);

    try {
      // ---------------------------------------------------------------
      // PASSO 1: Monta os itens no formato esperado por createOrderWithItems
      // ---------------------------------------------------------------
      const itemsParaPedido = carrinho.map((produto) => ({
        product_id: produto.id,
        quantity: produto.quantidade,
        price_at_purchase: produto.preco,
      }));

      // Cria o pedido e os order_items em sequência no Supabase
      await createOrderWithItems(user.id, itemsParaPedido, totalComDesconto);

      // ---------------------------------------------------------------
      // PASSO 2: Identifica quais itens comprados são Tamagotchis
      // ---------------------------------------------------------------
      // Busca todos os produtos para saber o `type` de cada item do carrinho
      // (o carrinho local só guarda id, nome, preço, imagem e quantidade)
      const todosProdutos = await getAllProducts();

      const itensTamagotchi = carrinho.filter((itemCarrinho) => {
        const produtoCompleto = todosProdutos.find((p) => p.id === itemCarrinho.id);
        return produtoCompleto?.type === "tamagotchi";
      });

      // ---------------------------------------------------------------
      // PASSO 3: Adiciona cada Tamagotchi comprado à coleção do usuário
      // ---------------------------------------------------------------
      // Se o usuário comprou quantidade > 1 do mesmo Tamagotchi, criamos
      // um registro em user_tamagotchis para cada unidade.
      for (const item of itensTamagotchi) {
        for (let i = 0; i < item.quantidade; i++) {
          await addTamagotchiToUser(user.id, item.id, item.nome);
        }
      }

      mostrarAlerta(
        `Pagamento via ${metodo}! Total: R$ ${totalComDesconto.toFixed(2)}`
      );
      limpar();
      setModalAberto(false);
      setMetodo(null);
    } catch (error) {
      console.error("[Carrinho] Erro ao finalizar compra:", error.message);
      mostrarAlerta(`Erro ao finalizar compra: ${error.message}`);
    } finally {
      setFinalizando(false);
    }
  }

  const total = carrinho.reduce(
    (a, p) => a + (p.preco || 0) * (p.quantidade || 0),
    0,
  );
  const totalComDesconto = total * (1 - desconto);

  return (
    <PageWrapper>
      <Breadcrumb>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span>/ Carrinho</span>
          </li>
        </ol>
      </Breadcrumb>

      <Container>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          🛒 Carrinho de Compras
        </h1>

        <Card>
          <h4>Itens no carrinho</h4>

          {carrinho.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              Seu carrinho está vazio.
            </p>
          )}

          {carrinho.map((produto, i) => (
            <CardProduto key={i}>
              <img src={produto.imagem} alt={produto.nome} />
              <div>
                <strong>{produto.nome}</strong>
                <br />
                <small>R$ {Number(produto.preco).toFixed(2)}</small>
                <br />
                <small>
                  Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
                </small>
              </div>
              <BtnGrupo>
                <Btn onClick={() => alterarQtd(i, -1)}>-</Btn>
                <span>{produto.quantidade}</span>
                <Btn onClick={() => alterarQtd(i, 1)}>+</Btn>
                <Btn $variant="danger" onClick={() => remover(i)}>
                  Remover
                </Btn>
              </BtnGrupo>
            </CardProduto>
          ))}

          {carrinho.length > 0 && (
            <CupomArea>
              <input
                placeholder="Digite seu cupom"
                value={cupomCode}
                onChange={(e) => setCupomCode(e.target.value)}
              />
              <Btn $variant="warning" onClick={aplicarCupom}>
                Aplicar cupom
              </Btn>
              <Btn $variant="danger" onClick={removerCupom}>
                Remover cupom
              </Btn>
              {cupomMsg && (
                <small style={{ color: desconto > 0 ? "green" : "red" }}>
                  {cupomMsg}
                </small>
              )}
            </CupomArea>
          )}

          <Total>
            Total: R$ {total.toFixed(2)}
            {desconto > 0 && (
              <span style={{ color: "green" }}>
                {" "}
                → Com desconto: R$ {totalComDesconto.toFixed(2)}
              </span>
            )}
          </Total>

          <BtnGrupo style={{ justifyContent: "space-between" }}>
            <Btn $variant="danger" onClick={limpar}>
              Limpar
            </Btn>
            {/* Desabilitado enquanto o AuthContext ainda está verificando a sessão,
                evitando um falso "não autenticado" no primeiro render */}
            <Btn $variant="success" onClick={finalizar} disabled={authLoading}>
              Finalizar
            </Btn>
          </BtnGrupo>
        </Card>
      </Container>

      <ModalOverlay $ativo={modalAberto}>
        <ModalConteudo>
          <h3>💳 Forma de pagamento</h3>
          <BtnGrupo style={{ justifyContent: "center", marginTop: "1rem" }}>
            {["credito", "pix", "boleto"].map((m) => (
              <BtnMetodo
                key={m}
                $ativo={metodo === m}
                onClick={() => setMetodo(m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </BtnMetodo>
            ))}
          </BtnGrupo>
          <Btn
            $variant="success"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={confirmarPagamento}
            disabled={finalizando}
          >
            {finalizando ? "Processando..." : "Confirmar pagamento"}
          </Btn>
          <Btn
            $variant="danger"
            style={{ width: "100%", marginTop: "8px" }}
            onClick={() => setModalAberto(false)}
            disabled={finalizando}
          >
            Cancelar
          </Btn>
        </ModalConteudo>
      </ModalOverlay>

      <Alerta $show={alertaVisible}>{alerta}</Alerta>
    </PageWrapper>
  );
}