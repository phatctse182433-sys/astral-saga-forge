import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider>
      <App />
      <Toaster />
    </CartProvider>
  </AuthProvider>
);
