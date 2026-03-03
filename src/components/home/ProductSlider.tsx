import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuxuryProductCard } from "@/components/LuxuryProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  brand?: string;
  category?: string;
  price: number;
  original_price?: number | null;
  discount_percent?: number | null;
  image_url: string;
  description?: string;
  volume_ml?: number;
  is_new?: boolean;
  is_on_sale?: boolean;
  tags?: string[];
}

interface ProductSliderProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  products: Product[];
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export const ProductSlider = ({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  products,
  ctaText,
  ctaLink,
  className,
}: ProductSliderProps) => {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const targetScroll =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className={cn("py-16 md:py-20 bg-asper-stone overflow-hidden", className)}>
      <div className="luxury-container">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          {subtitle && (
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-polished-gold mb-3">
              {isArabic ? subtitleAr || subtitle : subtitle}
            </p>
          )}
          <h2 className="font-heading text-3xl md:text-5xl text-asper-ink font-bold">
            {isArabic ? titleAr || title : title}
          </h2>
          {/* Decorative line */}
          <div className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-polished-gold to-transparent mt-6" />
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full",
              "bg-asper-stone/90 border-2 border-polished-gold/30 backdrop-blur-sm",
              "hover:bg-burgundy hover:border-polished-gold hover:shadow-gold-lg",
              "disabled:opacity-0 disabled:pointer-events-none",
              "transition-all duration-300 opacity-0 group-hover:opacity-100",
              dir === "rtl" ? "right-4 md:-right-6" : "left-4 md:-left-6"
            )}
            aria-label="Previous"
          >
            {dir === "rtl" ? (
              <ChevronRight className="h-6 w-6 text-polished-gold" />
            ) : (
              <ChevronLeft className="h-6 w-6 text-polished-gold" />
            )}
          </Button>

          {/* Scrollable Products Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] scroll-snap-align-start"
              >
                <LuxuryProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full",
              "bg-asper-stone/90 border-2 border-polished-gold/30 backdrop-blur-sm",
              "hover:bg-burgundy hover:border-polished-gold hover:shadow-gold-lg",
              "disabled:opacity-0 disabled:pointer-events-none",
              "transition-all duration-300 opacity-0 group-hover:opacity-100",
              dir === "rtl" ? "left-4 md:-left-6" : "right-4 md:-right-6"
            )}
            aria-label="Next"
          >
            {dir === "rtl" ? (
              <ChevronLeft className="h-6 w-6 text-polished-gold" />
            ) : (
              <ChevronRight className="h-6 w-6 text-polished-gold" />
            )}
          </Button>
        </div>

        {/* Optional CTA */}
        {ctaText && ctaLink && (
          <div className="mt-8 text-center">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-burgundy hover:text-polished-gold transition-colors duration-300"
            >
              {ctaText}
              <ChevronRight className={cn("h-4 w-4", dir === "rtl" && "rotate-180")} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
