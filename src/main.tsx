import React from "react";

import ReactDOM from "react-dom/client";
import App from "./app/Index.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/global-styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);