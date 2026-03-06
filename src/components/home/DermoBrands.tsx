import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Stethoscope } from "lucide-react";

/**
 * Priority dermocosmetic brands — each square links to /shop?brand=<name>
 */

const DERMO_BRANDS = [
  {
    name: "Eucerin",
    slug: "Eucerin",
    color: "from-[hsl(210,60%,95%)] to-[hsl(210,50%,88%)]",
    accent: "hsl(210,60%,40%)",
    initials: "Eu",
  },
  {
    name: "La Roche-Posay",
    slug: "La Roche-Posay",
    color: "from-[hsl(200,40%,94%)] to-[hsl(200,35%,86%)]",
    accent: "hsl(200,50%,35%)",
    initials: "LRP",
  },
  {
    name: "CeraVe",
    slug: "CeraVe",
    color: "from-[hsl(195,45%,93%)] to-[hsl(195,40%,85%)]",
    accent: "hsl(195,55%,35%)",
    initials: "CV",
  },
  {
    name: "Bioderma",
    slug: "Bioderma",
    color: "from-[hsl(340,40%,95%)] to-[hsl(340,35%,88%)]",
    accent: "hsl(340,50%,40%)",
    initials: "Bd",
  },
  {
    name: "Vichy",
    slug: "Vichy",
    color: "from-[hsl(160,35%,93%)] to-[hsl(160,30%,85%)]",
    accent: "hsl(160,45%,30%)",
    initials: "Vi",
  },
  {
    name: "Sesderma",
    slug: "Sesderma",
    color: "from-[hsl(35,50%,94%)] to-[hsl(35,45%,86%)]",
    accent: "hsl(35,55%,35%)",
    initials: "Sd",
  },
  {
    name: "COSRX",
    slug: "COSRX",
    color: "from-[hsl(0,0%,95%)] to-[hsl(0,0%,88%)]",
    accent: "hsl(0,0%,25%)",
    initials: "CX",
  },
];

export default function DermoBrands() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5"
          >
            <Stethoscope className="h-3 w-3 mr-2" />
            DERMOCOSMETICS
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Trusted <span className="text-primary">Clinical Brands</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-body">
            Pharmacist-approved dermocosmetic brands — tap to explore.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {DERMO_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={`/shop?brand=${encodeURIComponent(brand.slug)}`}
                className="group flex flex-col items-center gap-3"
              >
                {/* Square icon */}
                <div
                  className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${brand.color} border border-border/60 group-hover:border-accent/50 group-hover:shadow-[0_4px_20px_hsl(var(--accent)/0.15)] transition-all duration-300 flex items-center justify-center overflow-hidden`}
                >
                  {/* Brand initials as elegant monogram */}
                  <span
                    className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight transition-transform duration-300 group-hover:scale-110"
                    style={{ color: brand.accent }}
                  >
                    {brand.initials}
                  </span>

                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Brand name */}
                <span className="text-xs sm:text-sm font-body font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
