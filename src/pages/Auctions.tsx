import { useState } from "react";
import Navbar from "@/components/Navbar";
import BidModal from "@/components/BidModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Gavel, TrendingUp } from "lucide-react";
import { cards } from "@/data/cards";
import { useToast } from "@/hooks/use-toast";

const Auctions = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("Active");
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);

  const handlePlaceBid = (auction: any) => {
    setSelectedAuction(auction);
    setIsBidModalOpen(true);
  };

  const handleWatchAuction = (cardName: string) => {
    toast({
      title: "Watching Auction 👁️",
      description: `You'll receive notifications for ${cardName}`,
    });
  };

  // Mock auction data
  const activeAuctions = cards.slice(0, 3).map((card, index) => ({
    ...card,
    currentBid: card.price * (1.5 + index * 0.3),
    startingBid: card.price,
    totalBids: 15 + index * 8,
    timeLeft: `${2 - index}d ${5 + index}h 23m`,
    minIncrement: 5,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">Auction House</h1>
          <p className="text-xl text-muted-foreground">
            Bid on Ultra-Rare Special Edition Cards
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {['Active', 'Ending Soon', 'Past Auctions'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <Input 
            placeholder="Search auctions..." 
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <div key={auction.id} className="card-glass overflow-hidden">
              <div className="relative">
                <img 
                  src={auction.image} 
                  alt={auction.name}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  SPECIAL EDITION
                </Badge>
                <Badge className="absolute top-4 right-4 bg-secondary">
                  LIMITED: 1 of 1
                </Badge>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-serif font-bold">{auction.name}</h3>
                <p className="text-sm text-muted-foreground">{auction.mythology}</p>

                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">Ends in: {auction.timeLeft}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Bid:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${auction.currentBid.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Starting: ${auction.startingBid.toFixed(2)}</span>
                    <span>{auction.totalBids} bids</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handlePlaceBid(auction)}
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Place Bid
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleWatchAuction(auction.name)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Watch Auction
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedAuction && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          cardName={selectedAuction.name}
          cardImage={selectedAuction.image}
          currentBid={selectedAuction.currentBid}
          minIncrement={selectedAuction.minIncrement}
        />
      )}
    </div>
  );
};

export default Auctions;
