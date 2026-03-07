import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Zone 2 — Dual-Persona Triage
 * Immediately below the hero. Segments user intent before they see 5,000 products.
 * Two elegant cards: Dr. Sami (Clinical) vs Ms. Zain (Aesthetic).
 */
export default function DualPersonaTriage() {
  const { locale, dir } = useLanguage();
  const isAr = locale === "ar";

  const personas = [
    {
      id: "clinical",
      icon: ShieldCheck,
      title: isAr ? "إصلاح وحماية" : "Repair & Protect",
      subtitle: isAr ? "استشارة الدكتور سامي" : "Consult Dr. Sami",
      description: isAr
        ? "فلترة طبية للكاتالوج — إكزيما، إصلاح حاجز البشرة، حب الشباب، حماية من الشمس."
        : "Clinical filtering for barrier repair, eczema, acne, and sun protection.",
      cta: isAr ? "ابدئي الاستشارة" : "Start Consultation",
      href: "/skin-concerns",
      accent: "border-burgundy/30 hover:border-burgundy/60",
      iconColor: "text-burgundy",
      bgHover: "hover:bg-burgundy/5",
      tagBg: "bg-burgundy/10 text-burgundy",
      tag: isAr ? "طبي" : "Clinical",
    },
    {
      id: "aesthetic",
      icon: Sparkles,
      title: isAr ? "إشراقة وتألق" : "Glow & Enhance",
      subtitle: isAr ? "تحدّثي مع مس زين" : "Chat with Ms. Zain",
      description: isAr
        ? "اكتشفي السيرومات الفاخرة، صبغات البشرة، وروتين الإشراقة الصباحي."
        : "Discover luxury serums, skin tints, and your morning radiance ritual.",
      cta: isAr ? "اكتشفي روتينك" : "Find My Ritual",
      href: "/skin-concerns",
      accent: "border-polished-gold/30 hover:border-polished-gold/60",
      iconColor: "text-polished-gold",
      bgHover: "hover:bg-polished-gold/5",
      tagBg: "bg-polished-gold/10 text-polished-gold",
      tag: isAr ? "جمالي" : "Aesthetic",
    },
  ];

  return (
    <section className="py-20 bg-asper-stone">
      <div className="luxury-container">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
        >
          <span className="font-body text-[10px] sm:text-xs uppercase tracking-[0.35em] text-polished-gold mb-3 block">
            {isAr ? "مسارك الشخصي" : "Your Personalized Path"}
          </span>
          <h2 className={cn(
            "font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight",
            isAr && "font-arabic"
          )}>
            {isAr ? "كيف نساعدك اليوم؟" : "How Can We Help Today?"}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-polished-gold to-transparent mx-auto mt-6" />
          <p className={cn(
            "font-body text-muted-foreground mt-4 max-w-lg mx-auto",
            isAr && "font-arabic"
          )}>
            {isAr
              ? "اختاري مسارك — سنفلتر أكثر من 5,000 منتج إلى روتين مخصّص لكِ."
              : "Choose your path — we'll filter 5,000+ products into a routine made for you."}
          </p>
        </motion.div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: LUXURY_EASE }}
            >
              <Link
                to={persona.href}
                className={cn(
                  "group block p-8 md:p-10 rounded-none border-2 bg-card transition-all duration-300",
                  persona.accent,
                  persona.bgHover,
                  "hover:shadow-lg"
                )}
              >
                {/* Tag + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={cn("text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full", persona.tagBg)}>
                    {persona.tag}
                  </span>
                  <persona.icon className={cn("h-8 w-8", persona.iconColor)} />
                </div>

                {/* Title */}
                <h3 className={cn(
                  "font-heading text-2xl md:text-3xl font-bold text-foreground mb-2",
                  isAr && "font-arabic"
                )}>
                  {persona.title}
                </h3>

                {/* Subtitle — persona name */}
                <p className={cn("font-body text-sm uppercase tracking-widest mb-4", persona.iconColor)}>
                  {persona.subtitle}
                </p>

                {/* Description */}
                <p className={cn(
                  "font-body text-muted-foreground text-sm leading-relaxed mb-6",
                  isAr && "font-arabic"
                )}>
                  {persona.description}
                </p>

                {/* CTA row */}
                <span className={cn(
                  "inline-flex items-center font-body text-sm font-semibold uppercase tracking-widest transition-colors duration-200",
                  persona.iconColor
                )}>
                  {persona.cta}
                  <ArrowRight className={cn(
                    "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                    dir === "rtl" ? "mr-2 rotate-180 group-hover:-translate-x-1" : "ml-2"
                  )} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
