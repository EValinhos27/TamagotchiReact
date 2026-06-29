import { ThemeProvider } from "styled-components";
import { AppProvider } from "./contexts/AppContext";
import { GlobalStyles } from "./styles/GlobalStyles"; 
import { theme } from "./styles/theme";
import Routers from "./routers/Routes";
import { ChatComponent } from "./components/ChatComponent/index.jsx";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        {/* Mantendo o Chat que a develop adicionou no escopo global */}
        <ChatComponent />
        {/* O componente Routers gerencia todas as páginas */}
        <Routers />
      </AppProvider>
    </ThemeProvider>
  );
}