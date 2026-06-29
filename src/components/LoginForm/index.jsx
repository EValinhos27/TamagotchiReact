// =============================================================================
// LoginForm/index.jsx — Formulário de login
// =============================================================================
// Responsável por coletar email e senha do usuário e chamar o `signIn`
// do AuthContext. Não guarda sessão nem faz redirecionamento diretamente:
// isso é responsabilidade da AuthPage que o utiliza.
//
// PROPS:
//   onSwitchToRegister {function} — Chamada quando o usuário clica em
//                                   "Cadastre-se aqui", alternando para o
//                                   RegisterForm dentro da AuthPage.
//   onLoginSuccess     {function} — Chamada após login bem-sucedido,
//                                   permitindo que a AuthPage redirecione.
//   saindo             {boolean}  — Quando true, aplica animação de saída
//                                   antes de exibir o RegisterForm.
// =============================================================================
 
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Form,
  Title,
  Subtitle,
  Label,
  Input,
  ForgotLink,
  Button,
  FooterText,
  FooterLink,
  ErrorMessage,
} from "./style";
 
export function LoginForm({ onSwitchToRegister, onLoginSuccess, saindo }) {
  // Estado local dos campos do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  // Estado de feedback para o usuário
  const [error, setError] = useState("");       // Mensagem de erro visível
  const [isLoading, setIsLoading] = useState(false); // Desabilita botão durante requisição
 
  // Consome a função de login do AuthContext
  const { signIn } = useAuth();
 
  // =============================================================================
  // handleSubmit — Processa o envio do formulário de login
  // =============================================================================
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Limpa erros anteriores a cada nova tentativa
 
    // Validação mínima no cliente para evitar chamada desnecessária à API
    if (!email.trim() || !password.trim()) {
      setError("Preencha o email e a senha para continuar.");
      return;
    }
 
    setIsLoading(true);
 
    try {
      await signIn(email, password);
      // Notifica a AuthPage para redirecionar após login bem-sucedido
      onLoginSuccess?.();
    } catch (err) {
      // Exibe a mensagem traduzida que vem do AuthContext
      setError(err.message);
    } finally {
      // Sempre reativa o botão, mesmo em caso de erro
      setIsLoading(false);
    }
  }
 
  return (
    // `$saindo` é uma prop transitória (prefixo $) — não vaza para o DOM HTML
    <Form onSubmit={handleSubmit} $saindo={saindo}>
      <Title>Login</Title>
 
      <span>
        <Subtitle>seu mundo Tamagotchi está esperando</Subtitle>
      </span>
 
      {/* Campo de Email */}
      <Label htmlFor="login-email">Email</Label>
      <Input
        id="login-email"
        type="email"
        placeholder="📩 seu.email@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
 
      {/* Campo de Senha */}
      <Label htmlFor="login-password">Senha</Label>
      <Input
        id="login-password"
        type="password"
        placeholder="🔒 sua_senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
 
      {/* Link de recuperação de senha */}
      <ForgotLink href="#">Esqueceu a senha?</ForgotLink>
 
      {/* Mensagem de erro (só renderiza se houver erro) */}
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
 
      {/* Botão de submit — desabilitado durante carregamento */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
 
      {/* Link para alternar para o cadastro */}
      <FooterText>
        Ainda não possui conta?{" "}
        <FooterLink onClick={onSwitchToRegister}>
          Cadastre-se aqui 🤦‍♂️
        </FooterLink>
      </FooterText>
    </Form>
  );
}