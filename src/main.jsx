import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CVApp } from "./App.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CVApp />
  </StrictMode>
);
