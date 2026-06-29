import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChatComponent } from "./components/ChatComponent/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatComponent/>
    <App />
  </React.StrictMode>,
);
