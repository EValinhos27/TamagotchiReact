// =============================================================================
// RegisterForm/index.jsx — Formulário de cadastro
// =============================================================================
// Coleta os dados do novo usuário (username, email, senha) e chama o
// `signUp` do AuthContext, que cria o registro em auth.users e na
// tabela profiles em sequência.
//
// OBSERVAÇÃO SOBRE OS CAMPOS:
//   O formulário original tinha "Nome Completo" e "Endereço", mas esses campos
//   não existem na tabela `profiles` (que tem apenas username e avatar_url).
//   Por isso, o formulário foi ajustado para os campos que o banco suporta:
//   username, email e senha. Se precisar de campos extras no futuro,
//   adicione-os à tabela profiles e ao profileService.
//
// PROPS:
//   onSwitchToLogin {function} — Alterna de volta para o LoginForm.
//   onRegisterSuccess {function} — Chamada após cadastro bem-sucedido.
//   saindo {boolean} — Quando true, aplica animação de saída.
// =============================================================================
 
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Form,
  Title,
  InnerGrid,
  FieldGroup,
  Label,
  Input,
  Button,
  FooterText,
  FooterLink,
  ErrorMessage,
  SuccessMessage,
} from "./style";
 
export function RegisterForm({ onSwitchToLogin, onRegisterSuccess, saindo }) {
  // Estado local dos campos
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  // Feedback para o usuário
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  // Consome a função de cadastro do AuthContext
  const { signUp } = useAuth();
 
  // =============================================================================
  // handleSubmit — Processa o envio do formulário de cadastro
  // =============================================================================
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
 
    // Validações no cliente antes de qualquer chamada à API
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Preencha todas as informações para continuar.");
      return;
    }
 
    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }
 
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
 
    setIsLoading(true);
 
    try {
      await signUp(email, password, username.trim());
      // Notifica a AuthPage do sucesso para ela poder redirecionar ou
      // exibir uma mensagem de confirmação de email, se aplicável
      onRegisterSuccess?.();
    } catch (err) {
      // Alguns erros são informativos (ex: "verifique seu email"),
      // não necessariamente falhas — exibimos como sucesso nesses casos
      if (err.message.toLowerCase().includes("verifique seu email")) {
        setSuccessMsg(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
 
  return (
    <Form onSubmit={handleSubmit} $saindo={saindo}>
      <InnerGrid>
        <Title>Cadastre-se</Title>
 
        {/* Coluna esquerda: username e email */}
        <FieldGroup>
          <Label htmlFor="reg-username">Nome(Completo):</Label>
          <Input
            id="reg-username"
            type="text"
            placeholder="😄 Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
 
          <Label htmlFor="reg-email">Email:</Label>
          <Input
            id="reg-email"
            type="email"
            placeholder="📩 seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </FieldGroup>
 
        {/* Coluna direita: senha e confirmação */}
        <FieldGroup>
          <Label htmlFor="reg-password">Senha:</Label>
          <Input
            id="reg-password"
            type="password"
            placeholder="🔑 sua_senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
 
          <Label htmlFor="reg-confirm-password">Confirme a Senha:</Label>
          <Input
            id="reg-confirm-password"
            type="password"
            placeholder="🔑 repita sua_senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </FieldGroup>
 
        {/* Mensagens de feedback (erro ou sucesso) */}
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage role="status">{successMsg}</SuccessMessage>}
 
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Finalizar Cadastro"}
        </Button>
 
        <FooterText>
          Já possui conta?{" "}
          <FooterLink onClick={onSwitchToLogin}>
            Clique aqui ☝️
          </FooterLink>
        </FooterText>
      </InnerGrid>
    </Form>
  );
}