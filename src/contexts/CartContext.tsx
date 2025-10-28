import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Card, CartItem } from "@/types/card";

interface CartContextType {
  cart: CartItem[];
  addToCart: (card: Card, quantity?: number) => void;
  removeFromCart: (cardId: string) => void;
  updateQuantity: (cardId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (card: Card, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.card.id === card.id);
      if (existing) {
        return prev.map((item) =>
          item.card.id === card.id
            ? { ...item, quantity: Math.min(5, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { card, quantity }];
    });
  };

  const removeFromCart = (cardId: string) => {
    setCart((prev) => prev.filter((item) => item.card.id !== cardId));
  };

  const updateQuantity = (cardId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cardId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.card.id === cardId ? { ...item, quantity: Math.min(5, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.card.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
