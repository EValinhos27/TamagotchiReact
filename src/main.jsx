// =============================================================================
// main.jsx — Ponto de entrada da aplicação React
// =============================================================================
// Aqui configuramos os providers globais que envolvem toda a aplicação.
// A ordem dos providers importa: providers internos podem consumir os externos.
//
// ESTRUTURA DE PROVIDERS:
//   StrictMode         → Ativa avisos extras do React em desenvolvimento
//   └── BrowserRouter  → Habilita o roteamento com React Router
//       └── AuthProvider → Disponibiliza autenticação para toda a aplicação
//           └── App    → Sua aplicação
// =============================================================================
 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Authcontext';
import App from './App.jsx';
import './styles/index.jsx'; // Ajuste o caminho conforme o arquivo de estilos global
import { GlobalStyle } from './styles/index.jsx';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    {/* BrowserRouter deve envolver tudo que usa React Router (Links, Navigate, useNavigate) */}
    <BrowserRouter>
      {/* AuthProvider disponibiliza user, profile e funções de auth para todos os componentes */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);