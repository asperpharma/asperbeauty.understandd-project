import { Gift, Truck, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

interface USPItem {
  icon: React.ElementType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const uspItems: USPItem[] = [
  {
    icon: Gift,
    title: "2 Free Samples",
    titleAr: "عينتان مجانيتان",
    description: "With every order",
    descriptionAr: "مع كل طلب",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    titleAr: "توصيل سريع",
    description: "3-6 business days",
    descriptionAr: "٣-٦ أيام عمل",
  },
  {
    icon: Sparkles,
    title: "Free Beauty Deals",
    titleAr: "عروض جمال مجانية",
    description: "Exclusive member offers",
    descriptionAr: "عروض حصرية للأعضاء",
  },
];

interface USPBarProps {
  className?: string;
}

export const USPBar = ({ className }: USPBarProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className={cn("py-8 md:py-10 bg-gradient-to-r from-polished-gold via-polished-gold-light to-polished-gold relative overflow-hidden", className)}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-burgundy rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-burgundy rounded-full blur-3xl" />
      </div>

      <div className="luxury-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16">
          {uspItems.map((item, index) => (
            <AnimatedSection
              key={item.title}
              animation={index === 0 ? "fade-right" : index === 2 ? "fade-left" : "fade-up"}
              delay={index * 100}
            >
              <div
                className={cn(
                  "flex items-center gap-4",
                  isArabic && "flex-row-reverse"
                )}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-burgundy/20 border-2 border-burgundy flex items-center justify-center shadow-lg">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-burgundy" strokeWidth={2} />
                  </div>
                </div>

                {/* Text */}
                <div className={cn(isArabic ? "text-right" : "text-left")}>
                  <h3 className="font-display text-base md:text-lg text-burgundy font-bold">
                    {isArabic ? item.titleAr : item.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-burgundy/80">
                    {isArabic ? item.descriptionAr : item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
