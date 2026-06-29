# React + Vite
# Tamagotchi React 🐾

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
E-commerce temático de Tamagotchi com personagens interativos movidos por IA. Os usuários podem navegar pelo catálogo de produtos, conversar com seu Tamagotchi favorito e acompanhar o nível de satisfação do bichinho em tempo real.

Currently, two official plugins are available:
---

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
## Funcionalidades

## React Compiler
- **Chat com IA** — cada Tamagotchi tem personalidade própria e responde via LLM (Llama 3.3 70B via Groq)
- **Nível de satisfação** — decai com o tempo e aumenta conforme as interações (alimentar, brincar, dar carinho etc.)
- **Troca de personagem** — escolha entre os Tamagotchis disponíveis; o estado de cada um é salvo no `localStorage`
- **Catálogo de produtos** — listagem de personagens e acessórios consumida de API
- **Autenticação** — login, cadastro e rotas protegidas via Supabase Auth
- **Carrinho de compras** — página de carrinho com gerenciamento de pedidos
- **Design responsivo** — Styled Components com tema centralizado e animações via Framer Motion

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
---

## Expanding the ESLint configuration
## Tecnologias

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
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
├── api/                    # Servidor Express (proxy para a Groq API)
│   └── server.js
├── src/
│   ├── assets/             # Imagens, GIFs e logos
│   ├── components/
│   │   ├── ChatComponent/  # Tamagotchi interativo com chat e ações
│   │   ├── Carousel/       # Carrossel da home
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── ProdutoCard/    # Card de produto
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
│   └── styles/             # Tema global e GlobalStyles
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
