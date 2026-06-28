import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import Footer from "../../components/Footer";

const CUPONS = { "05/05": 0.1 };

export default function Carrinho() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [metodo, setMetodo] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupomCode, setCupomCode] = useState("");
  const [cupomMsg, setCupomMsg] = useState("");
  const [alerta, setAlerta] = useState("");
  const [alertaVisible, setAlertaVisible] = useState(false);

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
    setModalAberto(true);
  }

  function confirmarPagamento() {
    if (!metodo) {
      mostrarAlerta("Escolha uma forma de pagamento!");
      return;
    }
    const cliente = localStorage.getItem("cliente");
    if (!cliente) {
      alert("Faça o login primeiro!");
      navigate("/login");
      return;
    }
    const total = carrinho.reduce((a, p) => a + p.preco * p.quantidade, 0);
    mostrarAlerta(
      `Pagamento via ${metodo}! Total: R$ ${(total * (1 - desconto)).toFixed(2)}`,
    );
    limpar();
    setModalAberto(false);
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
            <Btn $variant="success" onClick={finalizar}>
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
          >
            Confirmar pagamento
          </Btn>
          <Btn
            $variant="danger"
            style={{ width: "100%", marginTop: "8px" }}
            onClick={() => setModalAberto(false)}
          >
            Cancelar
          </Btn>
        </ModalConteudo>
      </ModalOverlay>

      <Alerta $show={alertaVisible}>{alerta}</Alerta>

      <Footer />
    </PageWrapper>
  );
}
