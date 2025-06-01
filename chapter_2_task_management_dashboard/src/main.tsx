import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>
);
