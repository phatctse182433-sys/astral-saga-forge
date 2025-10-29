import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CollectionProvider } from "@/contexts/CollectionContext";
import { PurchaseHistoryProvider } from "@/contexts/PurchaseHistoryContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Auctions from "./pages/Auctions";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Purchase from "./pages/Purchase";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <CollectionProvider>
          <PurchaseHistoryProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter><Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/purchase/:cardId" element={<Purchase />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />          </Routes>
        </BrowserRouter>
        </TooltipProvider>
          </PurchaseHistoryProvider>
        </CollectionProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
