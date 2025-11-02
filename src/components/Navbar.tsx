import { Moon, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-6">
            <span>📍 Tukad Balian No.19 Denpasar, Bali</span>
            <span>✉️ pandoora@domain.com</span>
            <span>📞 +62-311-89-90-19</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Moon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <span className="text-xl md:text-2xl font-serif font-bold text-gradient-gold">PixelMage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">Cards</Link>
            <Link to="/nfc-demo" className="text-foreground hover:text-primary transition-colors">NFC Demo</Link>
            <Link to="/collection" className="text-foreground hover:text-primary transition-colors">Collection</Link>
            <Link to="/community" className="text-foreground hover:text-primary transition-colors">Community</Link>
            <Link to="/auctions" className="text-foreground hover:text-primary transition-colors">Auctions</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate("/checkout")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {!isMobile && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <Button variant="ghost" size="icon" title={user?.username}>
                        <User className="w-5 h-5" />
                      </Button>
                    </Link>
                    <span className="hidden xl:block text-sm text-muted-foreground">Hi, {user?.username}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                      className="hidden xl:flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      <User className="w-5 h-5" />
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      Login
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/marketplace" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cards
              </Link>
              <Link 
                to="/nfc-demo" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NFC Demo
              </Link>
              <Link 
                to="/collection" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collection
              </Link>
              <Link 
                to="/community" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/auctions" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Auctions
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="border-t border-border pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full" variant="outline">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground text-center">Hi, {user?.username}</p>
                    <Button 
                      className="w-full" 
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
