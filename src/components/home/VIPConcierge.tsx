import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Brain, RefreshCw, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Truck,
    title: "Same-Day Amman Delivery",
    description: "Cold-chain couriers deliver your regimen within hours. Temperature-controlled from warehouse to doorstep.",
    badge: "FREE over 50 JOD",
  },
  {
    icon: Brain,
    title: "Bespoke AI Skin Analysis",
    description: "Upload a photo and receive a pharmacist-grade assessment powered by Gemini Vision — personalized to your skin type and concerns.",
    badge: "AI-POWERED",
  },
  {
    icon: RefreshCw,
    title: "Smart Replenishment",
    description: "Never run out. Our Smart Shelf tracks your usage and sends a gentle reminder 5 days before you're due — via WhatsApp or push.",
    badge: "AUTO-REFILL",
  },
];

const VIPConcierge = () => {
  return (
    <section className="py-24 sm:py-32 lab-zone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5">
            <Crown className="h-3 w-3 me-1.5 inline" />
            VIP CONCIERGE
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Luxury That <span className="text-primary">Comes to You</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Premium services designed for those who expect pharmacy-grade precision with five-star convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {services.map((service, i) => (
            <Card
              key={i}
              className="group relative border-border/50 hover:border-accent/50 transition-all duration-400 shadow-emerald-glow hover:shadow-emerald-deep overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] tracking-wider font-body">
                    {service.badge}
                  </Badge>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/intelligence">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-body tracking-wider group">
              Experience the Concierge
              <ArrowRight className="h-4 w-4 ms-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VIPConcierge;
