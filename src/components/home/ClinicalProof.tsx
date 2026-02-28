import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Leaf, Heart, Award, FlaskConical } from "lucide-react";

const certifications = [
  { icon: ShieldCheck, label: "JFDA Certified", detail: "Jordan Food & Drug Administration" },
  { icon: Leaf, label: "Cruelty-Free", detail: "No animal testing — ever" },
  { icon: Heart, label: "Dermatologist Tested", detail: "Clinically validated formulas" },
  { icon: Award, label: "Authenticity Guaranteed", detail: "Direct from authorized distributors" },
  { icon: FlaskConical, label: "Cold-Chain Verified", detail: "Temperature-controlled logistics" },
];

const ClinicalProof = () => {
  return (
    <section className="py-16 sm:py-20 border-y border-accent/15 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5">
            CLINICAL PROOF & CERTIFICATION
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Trusted by <span className="text-primary">Science</span>, Verified by <span className="text-accent">Standards</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto font-body">
            Every product in our pharmacy meets the highest clinical and ethical standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="group flex flex-col items-center text-center max-w-[140px]"
            >
              <div className="w-16 h-16 rounded-full border-2 border-accent/20 bg-card flex items-center justify-center mb-3 group-hover:border-accent/50 group-hover:shadow-emerald-glow transition-all duration-400">
                <cert.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-400" />
              </div>
              <span className="font-heading text-sm font-semibold text-foreground mb-0.5">{cert.label}</span>
              <span className="text-[11px] text-muted-foreground font-body leading-snug">{cert.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicalProof;
