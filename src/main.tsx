import React from "react";

import ReactDOM from "react-dom/client";
import App from "./app/Index.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/global-styles.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SocketContextProvider } from "./contexts/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
