import { useApp } from "../../contexts/AppContext";
import { Container, Info, Msg } from "./style";

export default function MessageContainer() {
  const { mensagens } = useApp();

  return (
    <Container>
      {mensagens.map((m) => (
        <Msg key={m.id}>
          <img src={m.produto.image} alt={m.produto.name} />
          <Info>
            <strong>{m.produto.name}</strong>
            <span>{m.texto}</span>
          </Info>
        </Msg>
      ))}
    </Container>
  );
}
