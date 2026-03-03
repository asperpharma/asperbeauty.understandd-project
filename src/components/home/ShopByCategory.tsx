import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Sparkles, Droplets, Palette, Flower2, Heart, Shield } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  nameAr?: string;
  icon: React.ElementType;
  link: string;
  color: string;
}

const categories: CategoryItem[] = [
  {
    id: "skincare",
    name: "Skincare",
    nameAr: "العناية بالبشرة",
    icon: Droplets,
    link: "/collections/skincare",
    color: "from-blue-400/20 to-blue-500/20",
  },
  {
    id: "makeup",
    name: "Makeup",
    nameAr: "المكياج",
    icon: Palette,
    link: "/collections/makeup",
    color: "from-pink-400/20 to-pink-500/20",
  },
  {
    id: "fragrance",
    name: "Perfume",
    nameAr: "العطور",
    icon: Flower2,
    link: "/collections/fragrance",
    color: "from-purple-400/20 to-purple-500/20",
  },
  {
    id: "hair",
    name: "Hair Care",
    nameAr: "العناية بالشعر",
    icon: Sparkles,
    link: "/collections/hair",
    color: "from-amber-400/20 to-amber-500/20",
  },
  {
    id: "wellness",
    name: "Wellness",
    nameAr: "الصحة",
    icon: Heart,
    link: "/collections/wellness",
    color: "from-rose-400/20 to-rose-500/20",
  },
  {
    id: "derma",
    name: "Derma Care",
    nameAr: "العناية الطبية",
    icon: Shield,
    link: "/skin-concerns",
    color: "from-green-400/20 to-green-500/20",
  },
];

interface ShopByCategoryProps {
  className?: string;
}

export const ShopByCategory = ({ className }: ShopByCategoryProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className={cn("py-16 md:py-20 bg-asper-stone-light", className)}>
      <div className="luxury-container">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-polished-gold mb-3">
            {isArabic ? "اكتشف حسب الفئة" : "Discover by Category"}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-asper-ink font-bold">
            {isArabic ? "تسوق حسب الفئة" : "Shop by Category"}
          </h2>
          {/* Decorative line */}
          <div className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-polished-gold to-transparent mt-6" />
        </AnimatedSection>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <AnimatedSection
              key={category.id}
              animation="fade-up"
              delay={index * 100}
            >
              <Link
                to={category.link}
                className="group block text-center"
              >
                {/* Icon Circle */}
                <div className="relative mb-4 mx-auto w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                  {/* Background gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                      category.color
                    )}
                  />
                  {/* Border */}
                  <div className="absolute inset-0 rounded-full border-2 border-polished-gold/30 group-hover:border-polished-gold group-hover:shadow-gold-lg transition-all duration-300" />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <category.icon className="w-10 h-10 md:w-12 md:h-12 text-burgundy group-hover:text-polished-gold transition-colors duration-300" />
                  </div>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-polished-gold/0 group-hover:bg-polished-gold/10 blur-xl transition-all duration-500" />
                </div>

                {/* Category Name */}
                <h3 className="font-body text-sm md:text-base font-medium text-asper-ink group-hover:text-burgundy transition-colors duration-300">
                  {isArabic ? category.nameAr || category.name : category.name}
                </h3>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
