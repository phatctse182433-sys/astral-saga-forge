import { useState } from "react";
import Navbar from "@/components/Navbar";
import CardItem from "@/components/CardItem";
import StoryModal from "@/components/StoryModal";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { cards } from "@/data/cards";
import { Card } from "@/types/card";
import heroBg from "@/assets/hero-bg.jpg";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
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
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-secondary text-sm md:text-lg mb-4 animate-float">Ultimate Guide To Astrology</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-shadow-glow">
            Your Star Determines<br className="hidden sm:block" />Your Life's Journey
          </h1>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-6 md:px-8 py-4 md:py-6 btn-glow"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Explore Cards
          </Button>
        </div>
      </section>

      {/* Card Gallery */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-4xl font-serif font-bold">Card Collection</h2>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Common', 'Rare', 'Epic', 'Legendary'].map((rarity) => (
              <Button
                key={rarity}
                size="sm"
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
        isAuthenticated={isAuthenticated}      />      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
