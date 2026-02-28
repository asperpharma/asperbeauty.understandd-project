import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Bioderma", slug: "bioderma" },
  { name: "Kérastase", slug: "kerastase" },
  { name: "Yves Saint Laurent", slug: "yves-saint-laurent" },
  { name: "Maybelline", slug: "maybelline" },
  { name: "Garnier", slug: "garnier" },
  { name: "Beesline", slug: "beesline" },
  { name: "Bio Balance", slug: "bio-balance" },
  { name: "Seventeen", slug: "seventeen" },
  { name: "Petal Fresh", slug: "petal-fresh" },
  { name: "Asper Beauty", slug: "asper-beauty" },
];

export default function BrandDiscoveryGrid() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 font-body text-xs tracking-wider">
            {isAr ? "العلامات المميزة" : "TRUSTED BY THOUSANDS"}
          </Badge>
          <h2 className={cn(
            "font-heading text-3xl sm:text-4xl font-bold text-primary",
            isAr && "font-arabic"
          )}>
            {isAr ? "أكثر العلامات شراءً" : "Most Popular Brands"}
          </h2>
          <p className={cn(
            "mt-3 text-muted-foreground text-base max-w-xl mx-auto",
            isAr ? "font-arabic" : "font-body"
          )}>
            {isAr
              ? "أكثر من 5,000 منتج من أرقى العلامات العالمية — جميعها أصلية ومعتمدة."
              : "Over 5,000 SKUs from the world's most prestigious brands — all verified authentic."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {brands.map((brand) => (
            <a
              key={brand.slug}
              href={`/products?vendor=${encodeURIComponent(brand.name)}`}
              className="group flex items-center justify-center h-24 sm:h-28 rounded-xl bg-card border border-transparent hover:border-accent/60 shadow-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer"
            >
              <span className={cn(
                "font-heading text-sm sm:text-base font-semibold text-foreground/70 group-hover:text-primary transition-colors duration-300 text-center px-3",
                isAr && "font-arabic"
              )}>
                {brand.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
