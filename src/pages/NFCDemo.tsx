import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Wifi, CheckCircle, AlertCircle, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cards } from "@/data/cards";
import { storySeries } from "@/data/storySeries";
import type { Card as CardType } from "@/types/card";

const NFCDemo = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    cardName?: string;
    cardId?: string;
  } | null>(null);
  const [scannedCard, setScannedCard] = useState<CardType | null>(null);

  // Get related series and cards for the scanned card
  const relatedInfo = useMemo(() => {
    if (!scannedCard?.seriesId) return null;
    
    const series = storySeries.find(s => s.id === scannedCard.seriesId);
    if (!series) return null;
    
    const relatedCards = cards.filter(c => 
      series.cards.includes(c.id) && c.id !== scannedCard.id
    );
    
    return { series, relatedCards };
  }, [scannedCard]);

  const handleScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    setScannedCard(null);

    // Simulate NFC scan
    setTimeout(() => {
      // Get a random card from the cards data
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      
      setScanResult({
        success: true,
        cardName: randomCard.name,
        cardId: randomCard.id,
      });
      setScannedCard(randomCard);
      setIsScanning(false);
      
      toast({
        title: "Card Scanned!",
        description: `Successfully scanned ${randomCard.name}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              NFC Scanner Demo
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Test the NFC scanning functionality with demo cards
            </p>
          </div>

          <Card className="card-glass p-6 md:p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 mb-4">
                <Wifi className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-serif font-bold">
                Scan Your Card
              </h2>
              
              <p className="text-muted-foreground max-w-md mx-auto">
                This is a demonstration of NFC card scanning. In production, this would connect to actual NFC hardware.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  How to use:
                </h3>
                <ol className="text-sm text-muted-foreground space-y-1 ml-7 list-decimal">
                  <li>Enable NFC on your device</li>
                  <li>Hold your card near the back of your phone</li>
                  <li>Wait for the scan to complete</li>
                </ol>
              </div>

              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                {isScanning ? "Scanning..." : "Start NFC Scan"}
              </Button>

              {scanResult && (
                <div
                  className={`rounded-lg p-4 space-y-2 ${
                    scanResult.success
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-destructive/10 border border-destructive/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {scanResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                    <h3 className="font-semibold">
                      {scanResult.success ? "Scan Successful!" : "Scan Failed"}
                    </h3>
                  </div>
                  
                  {scanResult.success && (
                    <div className="space-y-1 text-sm ml-7">
                      <p>
                        <strong>Card:</strong> {scanResult.cardName}
                      </p>
                      <p>
                        <strong>ID:</strong> <Badge variant="outline">{scanResult.cardId}</Badge>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <p className="text-sm text-muted-foreground text-center">
                Note: This is a demo feature separate from the marketplace cards. 
                Purchase cards from the marketplace to collect the full collection.
              </p>
            </div>
          </Card>
        </div>

        {/* Scanned Card Display - Inline */}
        {scannedCard && (
          <div className="max-w-7xl mx-auto mt-8">
            <Card className="card-glass p-0 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Fixed Card Image (No Scroll) */}
                <div className="relative bg-muted/30 flex items-center justify-center p-6 md:p-8">
                  <div className="w-full max-w-sm">
                    <img
                      src={scannedCard.image}
                      alt={scannedCard.name}
                      className="w-full rounded-lg shadow-2xl object-cover"
                    />
                  </div>
                </div>

                {/* Right Side - Scrollable Content */}
                <div className="flex flex-col max-h-[600px]">
                  <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold">
                      {scannedCard.name}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {/* General Info Section */}
                    <div className="space-y-3">
                      <p className="text-lg text-muted-foreground">{scannedCard.mythology}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge>{scannedCard.rarity}</Badge>
                        {scannedCard.nfcEnabled && (
                          <Badge variant="outline">NFC Enabled</Badge>
                        )}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Card Details</h4>
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-bold text-primary">${scannedCard.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ID:</span>
                          <span className="font-mono">{scannedCard.id}</span>
                        </div>
                        {scannedCard.stock && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stock:</span>
                            <span>{scannedCard.stock} remaining</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Story */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Card Story</h4>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {scannedCard.story.full}
                        </p>
                      </div>
                    </div>

                    {/* Related Stories Section */}
                    {relatedInfo && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-lg">Related Story Series</h4>
                        </div>
                        
                        <div className="bg-primary/10 rounded-lg p-4 space-y-3 border border-primary/20">
                          <div>
                            <h5 className="font-semibold text-primary">{relatedInfo.series.name}</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {relatedInfo.series.description}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Cards in this series ({relatedInfo.series.totalCards} total):
                            </p>
                            <div className="space-y-2">
                              {relatedInfo.relatedCards.map((card) => (
                                <div 
                                  key={card.id}
                                  className="flex items-center gap-3 bg-background/50 rounded-lg p-2"
                                >
                                  <img 
                                    src={card.image} 
                                    alt={card.name}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{card.name}</p>
                                    <div className="flex gap-1 mt-1">
                                      <Badge variant="outline" className="text-xs px-1 py-0">
                                        {card.rarity}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {relatedInfo.series.rewards && (
                            <div className="pt-3 border-t border-primary/20">
                              <p className="text-xs font-semibold text-primary">
                                Complete the series to unlock:
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {relatedInfo.series.rewards.badge} {relatedInfo.series.rewards.title}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};

export default NFCDemo;
