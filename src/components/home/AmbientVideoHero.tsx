import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Zone 1 — Ambient Video Hero
 * Full-bleed cinematic looping video with "Glass Skin" glow overlay.
 * 85vh on desktop, optimised for readability with layered gradient overlays.
 */
export default function AmbientVideoHero() {
  const { locale, dir } = useLanguage();
  const isAr = locale === "ar";
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* ── 1. Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoReady(true)}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          videoReady ? "opacity-100" : "opacity-0"
        )}
        src="/hero-video.mp4"
      />

      {/* Fallback poster while video loads */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
          videoReady ? "opacity-0" : "opacity-100"
        )}
        style={{ backgroundImage: "url('/hero-banner.jpg')" }}
      />

      {/* ── 2. "Glass Skin" Glow Overlays ── */}
      {/* Bottom-up charcoal gradient for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-asper-ink/60 via-asper-ink/20 to-transparent" />
      {/* Subtle warm tone wash to match Morning Spa palette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-burgundy/10 via-transparent to-polished-gold/5" />
      {/* Soft vignette for cinematic depth */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--asper-ink)/0.25)_100%)]" />

      {/* ── 3. Content Lockup ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16">
        {/* Campaign tag */}
        <motion.span
          className="inline-block font-body text-[10px] sm:text-xs uppercase tracking-[0.35em] text-polished-gold mb-6 border border-polished-gold/30 px-5 py-2 rounded-full backdrop-blur-sm bg-asper-ink/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
        >
          {isAr ? "جمال طبّي فاخر" : "Clinical Luxury"}
        </motion.span>

        {/* Headline */}
        <motion.h1
          className={cn(
            "font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 drop-shadow-lg",
            "text-polished-white",
            isAr && "font-arabic"
          )}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASE }}
          dir={isAr ? "rtl" : "ltr"}
        >
          {isAr ? (
            <>
              علم البشرة.
              <br />
              <span className="italic text-polished-gold">نتائج حقيقية.</span>
            </>
          ) : (
            <>
              Skin Science.
              <br />
              <span className="italic text-polished-gold">Real Results.</span>
            </>
          )}
        </motion.h1>

        {/* Decorative gold line */}
        <motion.div
          className="w-20 h-px bg-gradient-to-r from-transparent via-polished-gold to-transparent mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASE }}
        />

        {/* Subheadline */}
        <motion.p
          className={cn(
            "max-w-xl text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-body text-polished-white/85",
            isAr && "font-arabic"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: LUXURY_EASE }}
          dir={isAr ? "rtl" : "ltr"}
        >
          {isAr
            ? "اكتشفي التقاء العلم الجلدي والجمال الأصيل — معتمد صيدلانياً."
            : "Discover the intersection of dermatological science and authentic beauty."}
        </motion.p>

        {/* ── 4. Conversion Actions ── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: LUXURY_EASE }}
        >
          {/* Primary CTA — Deep Maroon */}
          <Button
            asChild
            size="lg"
            className={cn(
              "group bg-burgundy text-polished-white hover:bg-burgundy-dark",
              "px-10 py-6 text-sm uppercase tracking-[0.2em] font-semibold",
              "transition-all duration-300 hover:shadow-maroon-glow rounded-none"
            )}
          >
            <Link to="/shop">
              {isAr ? "تسوّقي المجموعة" : "Shop Bestsellers"}
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                  dir === "rtl" ? "mr-2 rotate-180 group-hover:-translate-x-1" : "ml-2"
                )}
              />
            </Link>
          </Button>

          {/* Secondary CTA — AI Persona entry */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "border-2 border-polished-white/60 text-polished-white bg-transparent",
              "hover:bg-polished-white hover:text-asper-ink",
              "px-10 py-6 text-sm uppercase tracking-[0.2em] font-semibold",
              "transition-all duration-300 rounded-none"
            )}
          >
            <Link to="/skin-concerns">
              <Sparkles className={cn("h-4 w-4", isAr ? "ms-2" : "me-2", "text-polished-gold")} />
              {isAr ? "اكتشفي روتينك" : "Find Your Routine"}
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-polished-gold/50 bg-asper-ink/30 pt-2 backdrop-blur-sm animate-bounce">
          <div className="h-2 w-1 rounded-full bg-polished-gold" />
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-polished-gold/40 to-transparent" />
    </section>
  );
}
