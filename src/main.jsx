// =============================================================================
// main.jsx — Ponto de entrada da aplicação React
// =============================================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/Authcontext';
import App from './App.jsx';
import { GlobalStyle } from './styles/index.jsx'; 
// Nota: Verifique se o estilo global correto é o seu ou o "GlobalStyles" da develop (veja no App.jsx abaixo)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* AuthProvider envolve o App para que todo o sistema, inclusive as rotas, tenham acesso ao user */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);