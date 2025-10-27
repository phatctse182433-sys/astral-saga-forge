import { Moon, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary/20 border-b border-border">
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
            <Moon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-serif font-bold text-gradient-gold">Pandoora</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">Cards</Link>
            <Link to="/auctions" className="text-foreground hover:text-primary transition-colors">Auctions</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
              Login
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
