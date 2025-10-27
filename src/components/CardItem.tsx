import { Card } from "@/types/card";
import { Badge } from "@/components/ui/badge";

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

const rarityColors = {
  Common: "bg-gray-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-primary"
};

const CardItem = ({ card, onClick }: CardItemProps) => {
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
      
      <div className="p-4 space-y-2">
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
      </div>
    </div>
  );
};

export default CardItem;
