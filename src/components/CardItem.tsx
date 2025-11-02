import { Card } from "@/types/card";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
=======
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
>>>>>>> feature/nfc-demo

interface CardItemProps {
  card: Card;
  onClick: () => void;
<<<<<<< HEAD
=======
  onLoginRequired?: () => void;
>>>>>>> feature/nfc-demo
}

const rarityColors = {
  Common: "bg-gray-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-primary"
};

<<<<<<< HEAD
const CardItem = ({ card, onClick }: CardItemProps) => {
=======
const CardItem = ({ card, onClick, onLoginRequired }: CardItemProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onLoginRequired?.();
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      return;
    }
    addToCart(card, 1);
    toast({
      title: "Added to Cart! 🛒",
      description: `${card.name} added to your cart`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onLoginRequired?.();
      toast({
        title: "Login Required",
        description: "Please login to purchase cards",
        variant: "destructive",
      });
      return;
    }
    addToCart(card, 1);
    toast({
      title: "Added to Cart! 🛒",
      description: `${card.name} added to cart. Redirecting to checkout...`,
    });
    navigate("/checkout");
  };

>>>>>>> feature/nfc-demo
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl overflow-hidden card-glow bg-card border border-border"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className={`absolute top-3 right-3 ${rarityColors[card.rarity]}`}>
          {card.rarity}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <span className="text-primary font-semibold">Read Story</span>
          </div>
        </div>
      </div>
      
<<<<<<< HEAD
      <div className="p-4 space-y-2">
=======
      <div className="p-4 space-y-3">
>>>>>>> feature/nfc-demo
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {card.name}
        </h3>
        <p className="text-sm text-muted-foreground">{card.mythology}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${card.price}</span>
          {card.stock && card.stock < 10 && (
            <span className="text-xs text-destructive">Only {card.stock} left!</span>
          )}
        </div>
<<<<<<< HEAD
=======
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleBuyNow}
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Buy Now
          </Button>
        </div>
>>>>>>> feature/nfc-demo
      </div>
    </div>
  );
};

export default CardItem;
