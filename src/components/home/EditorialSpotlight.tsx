import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

interface EditorialSpotlightProps {
  badge?: string;
  badgeAr?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  imageUrl: string;
  ctaText: string;
  ctaTextAr?: string;
  ctaLink: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export const EditorialSpotlight = ({
  badge,
  badgeAr,
  title,
  titleAr,
  description,
  descriptionAr,
  imageUrl,
  ctaText,
  ctaTextAr,
  ctaLink,
  imagePosition = "left",
  className,
}: EditorialSpotlightProps) => {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className={cn("py-16 md:py-24 bg-gradient-to-b from-asper-stone to-asper-stone-light", className)}>
      <div className="luxury-container">
        <AnimatedSection animation="fade-up">
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
              imagePosition === "right" && "lg:grid-flow-dense"
            )}
          >
            {/* Image Section */}
            <div
              className={cn(
                "relative group overflow-hidden rounded-2xl",
                imagePosition === "right" && "lg:col-start-2"
              )}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={imageUrl}
                  alt={isArabic ? titleAr || title : title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-asper-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Gold border accent */}
              <div className="absolute inset-0 border-2 border-polished-gold/0 group-hover:border-polished-gold/40 rounded-2xl transition-all duration-500" />
            </div>

            {/* Content Section */}
            <div className={cn("space-y-6", imagePosition === "right" && "lg:col-start-1")}>
              {/* Badge */}
              {badge && (
                <div className="inline-block">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-burgundy/10 border border-burgundy/30 text-burgundy font-medium text-sm uppercase tracking-wider">
                    {isArabic ? badgeAr || badge : badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-asper-ink font-bold leading-tight">
                {isArabic ? titleAr || title : title}
              </h2>

              {/* Decorative line */}
              <div className="w-16 h-px bg-gradient-to-r from-polished-gold to-transparent" />

              {/* Description */}
              <p className="font-body text-base md:text-lg text-asper-ink-muted leading-relaxed max-w-xl">
                {isArabic ? descriptionAr || description : description}
              </p>

              {/* CTA Button */}
              <Link to={ctaLink}>
                <Button
                  size="lg"
                  className={cn(
                    "group mt-4 bg-burgundy text-asper-stone-light hover:bg-burgundy-light",
                    "border border-transparent hover:border-polished-gold",
                    "hover:shadow-lg hover:shadow-polished-gold/20",
                    "text-sm uppercase tracking-widest px-8 h-12 font-semibold",
                    "transition-all duration-400"
                  )}
                >
                  {isArabic ? ctaTextAr || ctaText : ctaText}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                      dir === "rtl" ? "mr-2 rotate-180 group-hover:-translate-x-1" : "ml-2"
                    )}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
