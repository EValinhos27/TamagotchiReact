import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppProvider } from "./contexts/AppContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
