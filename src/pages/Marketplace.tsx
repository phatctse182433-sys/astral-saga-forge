import { useState } from "react";
import Navbar from "@/components/Navbar";
import CardItem from "@/components/CardItem";
import StoryModal from "@/components/StoryModal";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { cards } from "@/data/cards";
import { Card } from "@/types/card";
import { useAuth } from "@/contexts/AuthContext";

const Marketplace = () => {
  const { isAuthenticated } = useAuth();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [filterRarity, setFilterRarity] = useState<string>("All");

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsStoryModalOpen(true);
  };
  const handleLoginRequired = () => {
    setIsAuthModalOpen(true);
  };

  const filteredCards = filterRarity === "All" 
    ? cards 
    : cards.filter(card => card.rarity === filterRarity);

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">Card Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Discover and collect mythological NFC cards
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">Available Cards</h2>
          
          <div className="flex gap-2">
            {['All', 'Common', 'Rare', 'Epic', 'Legendary'].map((rarity) => (
              <Button
                key={rarity}
                variant={filterRarity === rarity ? "default" : "outline"}
                onClick={() => setFilterRarity(rarity)}
                className={filterRarity === rarity ? "bg-primary" : ""}
              >
                {rarity}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </section>

      <StoryModal
        card={selectedCard}
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onLoginRequired={handleLoginRequired}
        isAuthenticated={isAuthenticated}
      />      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Marketplace;
