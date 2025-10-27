import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Package, History, Settings } from "lucide-react";
import { cards } from "@/data/cards";

const Profile = () => {
  const [username, setUsername] = useState("MysticSeeker");
  const [email, setEmail] = useState("user@example.com");

  // Mock user inventory
  const userCards = cards.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-8">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCards.map((card) => (
                    <div key={card.id} className="card-glass overflow-hidden">
                      <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-serif font-bold mb-2">{card.name}</h3>
                        <Badge variant={card.rarity === "Legendary" ? "default" : "secondary"}>
                          {card.rarity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Purchase History</h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Order #ORD-A1B2C3</h3>
                        <p className="text-sm text-muted-foreground">October 27, 2025</p>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                    <p className="text-muted-foreground">Total: $45.99</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="destructive">Logout</Button>
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
