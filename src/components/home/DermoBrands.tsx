import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DERMO_BRANDS = [
  { name: "Eucerin", slug: "Eucerin", color: "from-[hsl(210,60%,45%)] to-[hsl(210,50%,55%)]" },
  { name: "La Roche-Posay", slug: "La Roche-Posay", color: "from-[hsl(200,40%,40%)] to-[hsl(200,35%,55%)]" },
  { name: "CeraVe", slug: "CeraVe", color: "from-[hsl(195,55%,42%)] to-[hsl(195,45%,58%)]" },
  { name: "Bioderma", slug: "Bioderma", color: "from-[hsl(340,50%,45%)] to-[hsl(340,40%,60%)]" },
  { name: "Vichy", slug: "Vichy", color: "from-[hsl(160,40%,38%)] to-[hsl(160,35%,52%)]" },
  { name: "Sesderma", slug: "Sesderma", color: "from-[hsl(30,55%,45%)] to-[hsl(30,45%,58%)]" },
  { name: "COSRX", slug: "COSRX", color: "from-[hsl(0,0%,25%)] to-[hsl(0,0%,40%)]" },
];

export function DermoBrands() {
  return (
    <section className="py-10 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-lg font-heading font-semibold tracking-wide text-foreground mb-6">
          Dermocosmetic Brands
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {DERMO_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <Link
                to={`/shop?brand=${encodeURIComponent(brand.slug)}`}
                className={`
                  block aspect-square rounded-xl bg-gradient-to-br ${brand.color}
                  flex items-center justify-center
                  shadow-md hover:shadow-lg hover:scale-105
                  transition-all duration-200 group
                `}
              >
                <span className="text-white font-heading font-bold text-xs sm:text-sm text-center leading-tight px-2 drop-shadow-md group-hover:scale-105 transition-transform">
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
