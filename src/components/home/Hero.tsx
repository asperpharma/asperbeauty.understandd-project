import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Leaf, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-sanctuary-video.mp4";

export default function Hero() {
  const { dir, locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 lg:px-16 text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Glassmorphism Card */}
          <div className="bg-background/80 backdrop-blur-xl border border-accent/40 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
            {/* Gold decorative line */}
            <div className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-8" />

            <h1
              className={cn(
                "font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-[1.05] tracking-tight",
                isAr && "font-arabic"
              )}
            >
              {isAr ? (
                <>
                  بإشراف <span className="text-accent">صيدلاني</span>.
                  <br />
                  مدعوم بالذكاء.
                </>
              ) : (
                <>
                  Curated by <span className="text-accent">Pharmacists</span>.
                  <br />
                  Powered by Intelligence.
                </>
              )}
            </h1>

            <p
              className={cn(
                "mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed",
                isAr ? "font-arabic" : "font-body"
              )}
            >
              {isAr
                ? "أصالة مضمونة 100% عبر أكثر من 5,000 منتج — من Vichy إلى Maybelline. روتينك المثالي يبدأ هنا."
                : "Guaranteeing 100% authenticity across 5,000+ SKUs — from Vichy to Maybelline. Your perfect regimen starts here."}
            </p>

            {/* Trust micro-badges */}
            <div className={cn("flex flex-wrap justify-center gap-3 mt-6")}>
              {[
                { icon: Shield, label: isAr ? "أصالة مضمونة" : "100% Authentic" },
                { icon: Leaf, label: isAr ? "خالٍ من القسوة" : "Cruelty-Free" },
                { icon: Sparkles, label: isAr ? "بإشراف صيدلاني" : "Pharmacist-Led" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-border rounded-full px-3 py-1 bg-card/60"
                >
                  <item.icon className="h-3 w-3 text-accent" />
                  {item.label}
                </span>
              ))}
            </div>

            {/* Gold decorative line */}
            <div className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent my-8" />

            {/* CTA */}
            <Link to="/intelligence">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent hover:border-accent hover:shadow-lg hover:shadow-accent/20 text-sm uppercase tracking-widest px-10 h-14 font-semibold transition-all duration-400"
              >
                {isAr ? "ابدئي تحليل بشرتك المجاني" : "Start Free AI Skin Analysis"}
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                    dir === "rtl" ? "mr-2 rotate-180 group-hover:-translate-x-1" : "ml-2"
                  )}
                />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
