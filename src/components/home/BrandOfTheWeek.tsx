import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

interface BrandOfTheWeekProps {
  brandName: string;
  brandNameAr?: string;
  tagline: string;
  taglineAr?: string;
  description: string;
  descriptionAr?: string;
  images: string[];
  ctaText?: string;
  ctaTextAr?: string;
  ctaLink?: string;
  className?: string;
}

export const BrandOfTheWeek = ({
  brandName,
  brandNameAr,
  tagline,
  taglineAr,
  description,
  descriptionAr,
  images,
  ctaText = "Explore Collection",
  ctaTextAr = "استكشف المجموعة",
  ctaLink = "/brands",
  className,
}: BrandOfTheWeekProps) => {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className={cn("py-16 md:py-24 bg-burgundy relative overflow-hidden", className)}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-polished-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-polished-gold rounded-full blur-3xl" />
      </div>

      <div className="luxury-container relative z-10">
        <AnimatedSection animation="fade-up">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-polished-gold/20 border border-polished-gold text-polished-gold font-medium text-xs md:text-sm uppercase tracking-[0.3em]">
              {isArabic ? "علامة الأسبوع" : "Brand of the Week"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="text-asper-stone-light space-y-6">
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold">
                {isArabic ? brandNameAr || brandName : brandName}
              </h2>

              {/* Decorative line */}
              <div className="w-20 h-px bg-gradient-to-r from-polished-gold to-transparent" />

              <p className="font-script text-2xl md:text-3xl text-polished-gold italic">
                {isArabic ? taglineAr || tagline : tagline}
              </p>

              <p className="font-body text-base md:text-lg text-asper-stone-light/80 leading-relaxed max-w-xl">
                {isArabic ? descriptionAr || description : description}
              </p>

              {/* CTA */}
              {ctaLink && (
                <Link to={ctaLink}>
                  <Button
                    size="lg"
                    className="mt-6 bg-polished-gold text-burgundy hover:bg-polished-gold-light border-2 border-polished-gold hover:border-polished-gold-light hover:shadow-2xl text-sm uppercase tracking-widest px-8 h-12 font-semibold transition-all duration-400"
                  >
                    {isArabic ? ctaTextAr : ctaText}
                  </Button>
                </Link>
              )}
            </div>

            {/* Image Slider Section */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={`${brandName} ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                />
                {/* Gold border overlay */}
                <div className="absolute inset-0 border-4 border-polished-gold/30 rounded-2xl" />

                {/* Navigation Arrows (only show if multiple images) */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevSlide}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full",
                        "bg-asper-stone-light/80 backdrop-blur-sm hover:bg-asper-stone-light",
                        "transition-all duration-300",
                        dir === "rtl" ? "right-4" : "left-4"
                      )}
                      aria-label="Previous image"
                    >
                      {dir === "rtl" ? (
                        <ChevronRight className="h-5 w-5 text-burgundy" />
                      ) : (
                        <ChevronLeft className="h-5 w-5 text-burgundy" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextSlide}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full",
                        "bg-asper-stone-light/80 backdrop-blur-sm hover:bg-asper-stone-light",
                        "transition-all duration-300",
                        dir === "rtl" ? "left-4" : "right-4"
                      )}
                      aria-label="Next image"
                    >
                      {dir === "rtl" ? (
                        <ChevronLeft className="h-5 w-5 text-burgundy" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-burgundy" />
                      )}
                    </Button>
                  </>
                )}
              </div>

              {/* Dot indicators (only show if multiple images) */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        currentImageIndex === index
                          ? "w-8 bg-polished-gold"
                          : "bg-polished-gold/30 hover:bg-polished-gold/50"
                      )}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
