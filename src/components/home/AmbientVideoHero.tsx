import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;

export default function AmbientVideoHero() {
  const { locale, dir } = useLanguage();
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-asper-ink">
      {/* ── Background: Cinematic Ambient Video ── */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-asper-ink/40 via-transparent to-asper-ink/60" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* ── Content: Minimalist Floating Typography ── */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: LUXURY_EASE }}
          className="mb-12"
        >
          <img src="/asper-logo.png" alt="Asper" className="h-16 md:h-24 mx-auto drop-shadow-2xl brightness-0 invert" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASE }}
          className={cn(
            "font-heading text-5xl md:text-8xl lg:text-9xl font-light text-polished-white tracking-tighter leading-none mb-8",
            isAr && "font-arabic"
          )}
        >
          {isAr ? "الجمال بلمسة طبية" : "Clinical Excellence,"}
          <br />
          <span className="font-serif italic text-polished-gold">
            {isAr ? "وفخامة عصرية" : "Elegantly Defined."}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <Button
            asChild
            className="bg-polished-gold text-asper-ink hover:bg-polished-white px-12 py-8 text-sm uppercase tracking-[0.3em] font-bold rounded-none transition-all duration-500 hover:scale-105"
          >
            <Link to="/skin-concerns">
              {isAr ? "ابدئي الاستشارة" : "Begin Consultation"}
            </Link>
          </Button>
          
          <Link to="/shop" className="text-polished-white uppercase tracking-[0.2em] text-xs font-semibold flex items-center group">
            <span className="border-b border-polished-gold/0 group-hover:border-polished-gold transition-all duration-500 pb-1">
              {isAr ? "تسوقي المجموعة" : "Explore The Collection"}
            </span>
            <ArrowRight className="ms-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-polished-gold to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-polished-gold/60">Scroll</span>
      </motion.div>
    </section>
  );
}