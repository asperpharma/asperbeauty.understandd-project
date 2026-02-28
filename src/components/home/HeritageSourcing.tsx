import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Mountain, Sparkles, Gem } from "lucide-react";

const minerals = [
  { icon: Droplets, name: "Magnesium", benefit: "Deep hydration & barrier repair", concentration: "40.65%" },
  { icon: Gem, name: "Calcium", benefit: "Cell renewal & skin firmness", concentration: "17.2%" },
  { icon: Sparkles, name: "Potassium", benefit: "Moisture balance & radiance", concentration: "7.26%" },
  { icon: Mountain, name: "Bromide", benefit: "Soothing & anti-inflammatory", concentration: "5.12%" },
];

const HeritageSourcing = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                          radial-gradient(circle at 80% 50%, hsl(var(--accent)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5">
            HERITAGE & SOURCING
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            From the <span className="text-primary">Dead Sea</span> to Your Shelf
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Jordan's ancient mineral treasury — clinically validated, ethically sourced, and pharmacist-approved for modern skincare rituals.
          </p>
        </div>

        {/* Mineral Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16">
          {minerals.map((mineral) => (
            <Card
              key={mineral.name}
              className="group border-border/50 hover:border-accent/50 transition-all duration-400 shadow-emerald-glow hover:shadow-emerald-deep text-center"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:border-accent/40 transition-colors duration-400">
                  <mineral.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-400" />
                </div>
                <span className="block font-heading text-2xl font-bold text-accent mb-1">{mineral.concentration}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{mineral.name}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{mineral.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Heritage Story */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <Mountain className="h-4 w-4 text-accent" />
            <span className="font-body text-sm font-medium text-foreground">
              430 meters below sea level — the lowest point on Earth
            </span>
          </div>
          <p className="text-muted-foreground font-body leading-relaxed text-base">
            For millennia, the Dead Sea has been a sanctuary of healing. Our partnerships with local Jordanian harvesters ensure every mineral compound 
            is sustainably extracted and cold-processed — preserving the bioactive integrity that makes these ingredients irreplaceable in clinical skincare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeritageSourcing;
