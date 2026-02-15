import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const concerns = [
  { label: "Acne & Breakouts", slug: "Concern_Acne" },
  { label: "Hydration & Dryness", slug: "Concern_Hydration" },
  { label: "Anti-Aging", slug: "Concern_Aging" },
  { label: "Sensitivity", slug: "Concern_Sensitivity" },
  { label: "Pigmentation", slug: "Concern_Pigmentation" },
  { label: "Redness", slug: "Concern_Redness" },
  { label: "Oiliness", slug: "Concern_Oiliness" },
];

const categories = [
  { label: "Cleansers", slug: "cleanser" },
  { label: "Serums & Treatments", slug: "serum" },
  { label: "Moisturizers", slug: "moisturizer" },
  { label: "Sunscreen & SPF", slug: "sunscreen" },
  { label: "Supplements", slug: "supplement" },
  { label: "Hair Care", slug: "hair" },
];

interface Props {
  label: string;
}

export default function MegaMenu({ label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-card border border-border rounded-lg shadow-xl z-50 p-6"
          >
            <div className="grid grid-cols-3 gap-8">
              {/* Guide Column */}
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-primary mb-4">
                  What's your concern?
                </p>
                <div className="space-y-1">
                  {concerns.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/products?concern=${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary transition-colors text-sm font-body text-foreground/80"
                    >
                      <span className="w-0.5 h-4 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Column */}
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-primary mb-4">
                  Categories
                </p>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/products?category=${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary transition-colors text-sm font-body text-foreground/80"
                    >
                      <span className="w-0.5 h-4 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Column */}
              <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
                <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                  ✨ Ms. Zain's Pick
                </p>
                <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                  "This month I'm obsessed with hydrating serums that layer beautifully under SPF."
                </p>
                <Link
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center text-xs font-body font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Browse All Products →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
