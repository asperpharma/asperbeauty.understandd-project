import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { toast } from "sonner";

interface NPSSurveyProps {
  className?: string;
  onSubmit?: (score: number) => void;
}

export const NPSSurvey = ({ className, onSubmit }: NPSSurveyProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleScoreClick = (score: number) => {
    setSelectedScore(score);
    setHasSubmitted(true);

    // Show thank you message
    toast.success(
      isArabic ? "شكراً لتقييمك!" : "Thank you for your feedback!",
      {
        description: isArabic
          ? "رأيك يساعدنا على تحسين خدماتنا"
          : "Your feedback helps us improve our service",
        position: "top-center",
      }
    );

    // Call optional callback
    if (onSubmit) {
      onSubmit(score);
    }
  };

  if (hasSubmitted) {
    return (
      <section className={cn("py-12 bg-gradient-to-r from-asper-stone via-asper-stone-light to-asper-stone", className)}>
        <div className="luxury-container">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-polished-gold/10 border border-polished-gold/30">
              <svg className="w-5 h-5 text-polished-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-body text-sm text-asper-ink font-medium">
                {isArabic ? "شكراً لتقييمك!" : "Thanks for your feedback!"}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-12 md:py-16 bg-gradient-to-r from-asper-stone via-asper-stone-light to-asper-stone", className)}>
      <div className="luxury-container">
        <AnimatedSection animation="fade-up">
          <div className="max-w-4xl mx-auto">
            {/* Question */}
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl md:text-3xl text-asper-ink font-bold mb-3">
                {isArabic
                  ? "ما مدى إعجابك بتشكيلتنا؟"
                  : "How much do you like our assortment?"}
              </h3>
              <p className="font-body text-sm text-asper-ink-muted">
                {isArabic
                  ? "قيّم تجربتك من 0 (غير راضٍ) إلى 10 (ممتاز)"
                  : "Rate your experience from 0 (not satisfied) to 10 (excellent)"}
              </p>
            </div>

            {/* Score Buttons */}
            <div className="relative">
              {/* Scale Labels */}
              <div className="flex justify-between mb-2 px-1">
                <span className="font-body text-xs text-asper-ink-muted">
                  {isArabic ? "غير راضٍ" : "Not satisfied"}
                </span>
                <span className="font-body text-xs text-asper-ink-muted">
                  {isArabic ? "ممتاز" : "Excellent"}
                </span>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-11 gap-2 md:gap-3">
                {Array.from({ length: 11 }, (_, i) => i).map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreClick(score)}
                    className={cn(
                      "relative aspect-square rounded-lg font-body font-bold text-sm md:text-base",
                      "border-2 transition-all duration-300",
                      "hover:scale-110 hover:shadow-lg active:scale-95",
                      selectedScore === score
                        ? "bg-burgundy border-polished-gold text-asper-stone-light shadow-gold-lg scale-110"
                        : score <= 6
                        ? "bg-asper-stone border-rose-clay/30 text-rose-clay hover:border-rose-clay hover:bg-rose-clay/10"
                        : score <= 8
                        ? "bg-asper-stone border-polished-gold/30 text-asper-ink hover:border-polished-gold hover:bg-polished-gold/10"
                        : "bg-asper-stone border-polished-gold/50 text-burgundy hover:border-polished-gold hover:bg-polished-gold/20"
                    )}
                    aria-label={`Score ${score}`}
                  >
                    {score}
                    
                    {/* Hover effect ring */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg border-2 border-polished-gold/0 transition-all duration-300 pointer-events-none",
                        selectedScore === score && "border-polished-gold/50 scale-125"
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* Color gradient indicator */}
              <div className="mt-4 h-2 rounded-full overflow-hidden bg-gradient-to-r from-rose-clay/30 via-polished-gold/30 to-burgundy/50" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
