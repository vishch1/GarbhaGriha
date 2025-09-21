import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PrivacyProvider } from "./context/PrivacyContext";

createRoot(document.getElementById("root")!).render(
  <PrivacyProvider>
    <App />
  </PrivacyProvider>
);
