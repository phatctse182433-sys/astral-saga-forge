import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Package, History, Settings, BookOpen, MessageCircle, Heart, Plus } from "lucide-react";
import { cards } from "@/data/cards";
import { useAuth } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";
import { usePurchaseHistory } from "@/contexts/PurchaseHistoryContext";
import { useCommunity } from "@/contexts/CommunityContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";  const { user, logout } = useAuth();
  const { collection } = useCollection();
  const { orders } = usePurchaseHistory();
  const { posts, getUserPosts } = useCommunity();
  const [username, setUsername] = useState(user?.username || "MysticSeeker");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  
  // Get user cards from collection context instead of localStorage
  const userCards = cards.filter(card => collection.purchasedCards.includes(card.id));
  
  // Get user's posts
  const userPosts = getUserPosts(user?.username || "MysticSeeker");

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">          <Tabs defaultValue={defaultTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="inventory">
                <Package className="w-4 h-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="posts">
                <MessageCircle className="w-4 h-4 mr-2" />
                My Posts
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
                    <p className="text-muted-foreground">Member since January 2025</p>                    <Badge className="mt-2">Total Cards: {userCards.length}</Badge>
                    <div className="mt-4 flex gap-3">
                      <Badge variant="outline">
                        📚 {collection.collectedCards.length} Cards Collected
                      </Badge>
                      <Badge variant="outline">
                        ✅ {collection.completedSeries.length} Stories Completed
                      </Badge>
                    </div>
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
            </TabsContent>            <TabsContent value="inventory" className="space-y-8">
              <div className="card-glass p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-serif font-bold">My Card Collection</h2>
                  <Link to="/collection">
                    <Button className="bg-primary hover:bg-primary/90">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Collection & Stories
                    </Button>
                  </Link>
                </div>
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
                )}              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-8">
              <div className="card-glass p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-serif font-bold">My Stories</h2>
                  <Link to="/create-post">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Share New Story
                    </Button>
                  </Link>
                </div>
                
                {userPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">You haven't shared any stories yet</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share your card collection experiences with the community!
                    </p>
                    <Link to="/create-post">
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Share Your First Story
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <div key={post.id} className="card-glass p-6 space-y-4">
                        <div className="flex items-start gap-4">
                          <img 
                            src={post.cardImage} 
                            alt={post.cardName}
                            className="w-20 h-28 object-cover rounded-lg border-2 border-primary/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold">{post.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline">{post.cardName}</Badge>
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes} likes
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments.length} comments
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.location.href = "/community"}
                              >
                                View in Community
                              </Button>
                            </div>
                          </div>
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
                    <p className="text-sm text-muted-foreground mb-4">
                      Start your journey by purchasing some cards!
                    </p>
                    <Button className="mt-4" onClick={() => window.location.href = "/marketplace"}>
                      Browse Marketplace
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="card-glass p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Items:</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                                <img 
                                  src={item.cardImage} 
                                  alt={item.cardName}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">{item.cardName}</p>
                                  <Badge variant="outline" className="text-xs">{item.rarity}</Badge>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm">× {item.quantity}</p>
                                  <p className="font-medium">${item.price.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Subtotal:</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Shipping:</span>
                            <span>${order.shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                            <span>Total:</span>
                            <span className="text-primary">${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Package className="w-4 h-4 mr-2" />
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
