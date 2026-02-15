import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, Award, Shield } from "lucide-react";

interface PharmacistPick {
  id: string;
  handle: string;
  title: string;
  brand: string | null;
  clinical_badge: string | null;
  gold_stitch_tier: boolean;
  image_url: string | null;
  price: number | null;
  product_highlights: string[] | null;
  pharmacist_note: string | null;
}

export default function PharmacistPicks() {
  const { data: picks } = useQuery({
    queryKey: ["pharmacist-picks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, handle, title, brand, clinical_badge, gold_stitch_tier, image_url, price, product_highlights, pharmacist_note")
        .eq("is_hero", true)
        .order("bestseller_rank", { ascending: true })
        .limit(6);
      if (error) {
        console.warn("Pharmacist picks fetch failed:", error.message);
        return [];
      }
      return data as PharmacistPick[];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (!picks || picks.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary font-body text-xs tracking-[0.2em] px-4 py-1.5"
          >
            <Award className="h-3 w-3 mr-2" />
            PHARMACIST'S CHOICE
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Top <span className="text-primary">Picks</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Hand-selected by our pharmacists for efficacy, safety, and clinical results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {picks.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link to={`/product/${product.handle}`}>
                <div
                  className={`group relative rounded-lg border bg-card overflow-hidden transition-all duration-500 shadow-maroon-glow hover:shadow-maroon-deep ${
                    product.gold_stitch_tier
                      ? "border-transparent hover:border-accent hover:shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.25)]"
                      : "border-border/50 hover:border-accent/30"
                  }`}
                >
                  {/* Gold stitch animated border */}
                  {product.gold_stitch_tier && (
                    <div className="absolute inset-0 rounded-lg border-2 border-accent/0 group-hover:border-accent/60 transition-all duration-700 pointer-events-none z-10">
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-accent/40" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-accent/40" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-accent/40" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-accent/40" />
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square bg-background overflow-hidden flex items-center justify-center p-6">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground font-heading text-3xl">
                        {product.title.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    {product.brand && (
                      <p className="text-xs font-body uppercase tracking-[0.15em] text-accent font-medium">
                        {product.brand}
                      </p>
                    )}
                    <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>

                    {product.clinical_badge && (
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3 w-3 text-primary" />
                        <span className="text-xs font-body text-primary font-medium">
                          {product.clinical_badge}
                        </span>
                      </div>
                    )}

                    {product.product_highlights && product.product_highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.product_highlights.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="text-[10px] font-body text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {product.pharmacist_note && (
                      <p className="text-xs font-body italic text-muted-foreground leading-relaxed border-l-2 border-accent/30 pl-2.5">
                        "Dr. Sami says: {product.pharmacist_note}"
                      </p>
                    )}

                    {product.price && (
                      <p className="font-body text-lg font-semibold text-primary pt-1">
                        <span className="text-[10px] align-top mr-0.5 font-normal text-muted-foreground">JOD</span>
                        {Math.floor(product.price)}
                        <span className="text-xs font-normal text-muted-foreground">.{(product.price % 1).toFixed(2).slice(2)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 uppercase tracking-widest text-sm px-8 h-11 group"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
