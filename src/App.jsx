import { ThemeProvider } from "styled-components";
import { AppProvider } from "./contexts/AppContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Routers from "./routers/Routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <Routers />
      </AppProvider>
    </ThemeProvider>
  );
}
