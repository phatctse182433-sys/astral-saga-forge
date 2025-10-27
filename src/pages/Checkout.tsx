import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful! 🎉",
        description: "Your cards are on the way!",
      });
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-center">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="card-glass p-6 h-fit">
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$42.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$3.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">$45.99</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="card-glass p-6">
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Payment Information
              </h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="123 Main St" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input placeholder="Denpasar" required />
                  </div>
                  <div>
                    <Label>Postal Code</Label>
                    <Input placeholder="80000" required />
                  </div>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="+62 311 89 90 19" required />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
