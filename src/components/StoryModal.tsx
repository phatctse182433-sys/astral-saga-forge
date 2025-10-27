import { Card } from "@/types/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StoryModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onLoginRequired: () => void;
  isAuthenticated: boolean;
}

const StoryModal = ({ card, isOpen, onClose, onLoginRequired, isAuthenticated }: StoryModalProps) => {
  const navigate = useNavigate();
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  if (!card) return null;

  const handleUnlock = () => {
    setShowUnlockAnimation(true);
    setTimeout(() => {
      setShowUnlockAnimation(false);
    }, 1500);
  };

  const storyContent = isAuthenticated ? card.story.full : card.story.preview;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto constellation-pattern">
        <DialogHeader>
          <div className="relative">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-64 object-cover rounded-lg mb-4 blur-sm opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <DialogTitle className="text-4xl font-serif mb-2 text-shadow-glow">
                  {card.name}
                </DialogTitle>
                <p className="text-lg text-muted-foreground">{card.mythology}</p>
                <Badge className="mt-2">{card.rarity}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="prose prose-invert max-w-none">
          <div className={showUnlockAnimation ? "unlock-animation" : ""}>
            {storyContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="relative mt-8">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-background" />
              
              <div className="mt-16 text-center space-y-4 py-8 border-t border-border">
                <div className="inline-flex items-center gap-2 text-primary animate-pulse-glow">
                  <Lock className="w-8 h-8" />
                  <span className="text-xl font-semibold">Continue this epic tale?</span>
                </div>
                
                <p className="text-muted-foreground">
                  Login required to unlock the full story
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={onLoginRequired}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Login to Unlock Full Story
                  </Button>
                  <Button
                    onClick={onLoginRequired}
                    size="lg"
                    variant="outline"
                    className="border-secondary"
                  >
                    Create Free Account
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-secondary/20 to-primary/20 border border-primary/30">
              <div className="flex items-center gap-6">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-32 h-48 object-cover rounded-lg shadow-xl animate-float"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-serif mb-2">{card.name}</h3>
                  <p className="text-muted-foreground mb-1">Rarity: <Badge>{card.rarity}</Badge></p>
                  <p className="text-3xl font-bold text-primary mb-4">${card.price}</p>
                  {card.stock && card.stock < 10 && (
                    <p className="text-sm text-destructive mb-4 animate-pulse">
                      ⚡ Limited Edition - Only {card.stock} remaining
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 animate-pulse-glow"
                    onClick={() => {
                      onClose();
                      navigate(`/purchase/${card.id}`);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy This Card Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
