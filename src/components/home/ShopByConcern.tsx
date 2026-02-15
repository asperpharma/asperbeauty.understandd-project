import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Droplets,
  Sun,
  Sparkles,
  Leaf,
  Palette,
  Flame,
  CircleDot,
} from "lucide-react";

const concerns = [
  { label: "Acne", icon: Flame, query: "acne", color: "text-primary" },
  { label: "Hydration", icon: Droplets, query: "hydration", color: "text-blue-500" },
  { label: "Anti-Aging", icon: Sparkles, query: "aging", color: "text-accent" },
  { label: "Sensitivity", icon: Leaf, query: "sensitivity", color: "text-green-600" },
  { label: "Pigmentation", icon: Palette, query: "pigmentation", color: "text-purple-500" },
  { label: "Redness", icon: CircleDot, query: "redness", color: "text-rose-500" },
  { label: "Sun Protection", icon: Sun, query: "SPF sunscreen", color: "text-amber-500" },
];

export default function ShopByConcern() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5"
          >
            GUIDED DISCOVERY
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Shop by <span className="text-primary">Concern</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Tell us what bothers you — we'll show you what works.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {concerns.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={`/products?q=${encodeURIComponent(c.query)}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <c.icon className={`h-6 w-6 ${c.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="font-body text-sm font-medium text-foreground text-center">
                  {c.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
