import { CustomThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { GlobalStyles } from "./styles/GlobalStyles"; 
import Routers from "./routers/Routes";
import { ChatComponent } from "./components/ChatComponent/index.jsx";

export default function App() {
  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <AppProvider>
        {/* Mantendo o Chat que a develop adicionou no escopo global */}
        <ChatComponent />
        {/* O componente Routers gerencia todas as páginas */}
        <Routers />
      </AppProvider>
    </CustomThemeProvider>
  );
}