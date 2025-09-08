import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { FormChallengeApp } from "./FormChallengeApp.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./FormChallengeApp.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FormChallengeApp />
    </ThemeProvider>
  </StrictMode>
);
