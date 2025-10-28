import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Package, History, Settings, FileDown } from "lucide-react";
import { cards } from "@/data/cards";
import { Order } from "@/types/order";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/types/card";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || "MysticSeeker");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [orders, setOrders] = useState<Order[]>([]);
  const [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);

    // Get unique cards from all orders
    const purchasedCards: Card[] = [];
    savedOrders.forEach((order: Order) => {
      order.items.forEach((item) => {
        // Check if card already exists
        if (!purchasedCards.find(c => c.id === item.card.id)) {
          purchasedCards.push(item.card);
        }
      });
    });
    setUserCards(purchasedCards);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue={defaultTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="inventory">
                <Package className="w-4 h-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-8">
              <div className="card-glass p-8">
                <div className="flex items-center gap-8 mb-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold">
                    {username.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-serif font-bold mb-2">{username}</h2>
                    <p className="text-muted-foreground">Member since January 2025</p>
                    <Badge className="mt-2">Total Cards: {userCards.length}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Username</label>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">My Card Collection</h2>
                {userCards.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Your collection is empty</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Purchase cards to start your collection!
                    </p>
                    <Button onClick={() => window.location.href = "/marketplace"}>
                      Browse Marketplace
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCards.map((card) => (
                      <div key={card.id} className="card-glass overflow-hidden hover-scale">
                        <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-serif font-bold mb-2">{card.name}</h3>
                          <Badge variant={card.rarity === "Legendary" ? "default" : "secondary"}>
                            {card.rarity}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2">NFC Enabled ✓</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Purchase History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No purchase history yet</p>
                    <Button className="mt-4" onClick={() => window.location.href = "/marketplace"}>
                      Browse Marketplace
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                            {order.status}
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                          <p className="font-semibold">Items:</p>
                          {order.items.map((item) => (
                            <div key={item.card.id} className="flex items-center gap-3">
                              <img 
                                src={item.card.image} 
                                alt={item.card.name} 
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.card.name}</p>
                                <Badge variant="outline" className="text-xs">{item.card.rarity}</Badge>
                              </div>
                              <p className="text-sm">× {item.quantity}</p>
                              <p className="font-semibold">${(item.card.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shipping:</span>
                            <span>{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                            <span>Total:</span>
                            <span className="text-primary">${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileDown className="w-4 h-4 mr-2" />
                            Download Invoice
                          </Button>
                          <Button variant="outline" size="sm">
                            Buy Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Profile;
