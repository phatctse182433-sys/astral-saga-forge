import Navbar from "@/components/Navbar";
import { Sparkles, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="starfield" />
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-6">About Pandoora</h1>
          <p className="text-xl text-muted-foreground">
            Where Norse Mythology Meets Modern Technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card-glass p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-serif font-bold mb-4">Mystical Cards</h3>
            <p className="text-muted-foreground">
              Each card tells a unique story from Norse mythology, beautifully illustrated and embedded with NFC technology.
            </p>
          </div>

          <div className="card-glass p-8 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-serif font-bold mb-4">NFC Technology</h3>
            <p className="text-muted-foreground">
              Tap your card with any NFC-enabled device to unlock exclusive digital content and verify authenticity.
            </p>
          </div>

          <div className="card-glass p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-serif font-bold mb-4">Collectible Value</h3>
            <p className="text-muted-foreground">
              Limited edition cards with varying rarities. Trade, collect, and auction your cards with other enthusiasts.
            </p>
          </div>
        </div>

        <div className="card-glass p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Pandoora was born from a passion for Norse mythology and cutting-edge technology. 
              We believe that ancient stories deserve to be preserved and shared in innovative ways.
            </p>
            <p>
              Each card in our collection is carefully crafted with stunning artwork that brings 
              the gods and legends of Norse mythology to life. From Odin's wisdom to Thor's might, 
              every card tells a captivating story.
            </p>
            <p>
              Our NFC-enabled cards bridge the physical and digital worlds, allowing you to 
              experience these timeless tales in a whole new way. Build your collection, 
              participate in auctions, and connect with a community of fellow mythology enthusiasts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
