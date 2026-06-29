# Tamagotchi React 🐾

E-commerce temático de Tamagotchi com personagens interativos movidos por IA. Os usuários podem navegar pelo catálogo de produtos, conversar com seu Tamagotchi favorito e acompanhar o nível de satisfação do bichinho em tempo real.

---

## Funcionalidades

- **Chat com IA** — cada Tamagotchi tem personalidade própria e responde via LLM (Llama 3.3 70B via Groq)
- **Nível de satisfação** — decai com o tempo e aumenta conforme as interações (alimentar, brincar, dar carinho etc.)
- **Troca de personagem** — escolha entre os Tamagotchis disponíveis; o estado de cada um é salvo no `localStorage`
- **Catálogo de produtos** — listagem de personagens e acessórios consumida de API
- **Autenticação** — login, cadastro e rotas protegidas via Supabase Auth
- **Carrinho de compras** — página de carrinho com gerenciamento de pedidos
- **Design responsivo** — Styled Components com tema centralizado e animações via Framer Motion

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite |
| Estilização | Styled Components + Framer Motion |
| Roteamento | React Router v7 |
| Backend / Auth | Supabase |
| IA / Chat | Groq SDK (Llama 3.3 70B) |
| API Proxy | Express (Node.js) |
| Ícones | Lucide React |

---

## Estrutura do projeto

```
TamagotchiReact/
├── api/                    # Servidor Express (intermediário para a API da Groq)
│   └── server.js
├── src/
│   ├── assets/             # Imagens, GIFs e logos
│   ├── components/
│   │   ├── ChatComponent/  # Tamagotchi interativo com chat e ações
│   │   ├── Carousel/       # Carrossel da página inicial
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── ProdutoCard/    # Cartão de produto
│   │   └── MessageContainer/
│   ├── contexts/
│   │   ├── AuthContext.jsx # Contexto de autenticação
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   └── useProdutos.js
│   ├── pages/
│   │   ├── Home/
│   │   ├── Collection/     # Listagem de personagens ou acessórios
│   │   ├── Carrinho/
│   │   ├── Sobre/
│   │   └── AuthPage/
│   ├── routers/
│   │   ├── Routes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/           # Camada de acesso ao Supabase
│   │   ├── api.jsx
│   │   ├── Productservice.jsx
│   │   ├── Profileservice.jsx
│   │   ├── Orderservice.jsx
│   │   └── Usertamagotchiservice.jsx
│   └── styles/             # Tema global e estilos globais
├── index.html
├── vite.config.js
└── package.json
```

---

## Rotas

| Caminho | Descrição | Protegida |
|---|---|---|
| `/` | Home com banner e carrossel | Não |
| `/personagens` | Catálogo de Tamagotchis | Não |
| `/acessorios` | Catálogo de acessórios | Não |
| `/carrinho` | Carrinho de compras | Não |
| `/sobre` | Sobre o projeto | Não |
| `/login` | Login / Cadastro | Não |
| `/teste` | Página de perfil do usuário | Sim |

---

## Como rodar localmente

### Pré-requisitos

- Node.js >= 18
- Conta no [Supabase](https://supabase.com) com projeto configurado
- Chave de API da [Groq](https://console.groq.com)

### 1. Clone o repositório

```bash
git clone https://github.com/EValinhos27/TamagotchiReact.git
cd TamagotchiReact
```

### 2. Instale as dependências do frontend

```bash
npm install
```

### 3. Configure as variáveis de ambiente do frontend

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
```

### 4. Configure e rode a API (servidor Express)

```bash
cd api
npm install
```

Crie um arquivo `.env` dentro da pasta `api/`:

```env
GROQ_API_KEY=sua_chave_groq
PORT=3001
```

```bash
node server.js
```

### 5. Rode o frontend

De volta à raiz do projeto:

```bash
npm run dev
```

Acesse em `http://localhost:5173`.

> A API de chat já está disponível em produção em `https://api-tamagochi.onrender.com`, portanto o servidor Express local é opcional.

---

## Variáveis de ambiente

| Variável | Onde | Descrição |
|---|---|---|
| `VITE_SUPABASE_URL` | `.env` (raiz) | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `.env` (raiz) | Chave pública do Supabase |
| `GROQ_API_KEY` | `api/.env` | Chave de API da Groq |
| `PORT` | `api/.env` | Porta do servidor Express (padrão: 3001) |

---

## Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera a versão de produção
npm run preview  # Pré-visualiza a versão de produção
npm run lint     # Executa a verificação de código com ESLint
```

---

## Equipe

Projeto desenvolvido como trabalho final do curso de IA no **Serratec**.
