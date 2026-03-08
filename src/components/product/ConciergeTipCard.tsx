import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConciergeTipCardProps {
  tip?: string;
  persona?: "dr_sami" | "ms_zain";
  className?: string;
}

export const ConciergeTipCard = ({
  tip,
  persona = "dr_sami",
  className,
}: ConciergeTipCardProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const defaultTip = isArabic
    ? "ينصح د. سامي: ضعي هذا السيروم على بشرة رطبة مباشرة بعد التنظيف لتعزيز امتصاص حمض الهيالورونيك."
    : "Dr. Sami suggests: Apply this serum to damp skin immediately after cleansing to maximize hyaluronic acid absorption.";

  const signature = persona === "dr_sami"
    ? (isArabic ? "— د. بوت 🩺" : "— Dr. Bot 🩺")
    : (isArabic ? "— مس. زين ✨" : "— Ms. Zain ✨");

  return (
    <div
      className={cn(
        "relative bg-soft-ivory border border-shiny-gold shadow-md p-6 lg:p-8 rounded-sm",
        isArabic && "text-right",
        className
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Decorative gold pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" fill="hsl(var(--polished-gold))" stroke="hsl(var(--polished-gold))" strokeWidth="1" opacity="0.9" />
          <circle cx="6" cy="6" r="2" fill="hsl(var(--polished-gold))" opacity="0.5" />
        </svg>
      </div>

      {/* Header */}
      <h4 className="font-heading text-xl font-semibold text-burgundy mb-3">
        {isArabic ? "نصيحة الكونسيرج" : "Concierge Tip"}
      </h4>

      {/* Body */}
      <p className="font-body text-sm leading-relaxed text-dark-charcoal">
        {tip || defaultTip}
      </p>

      {/* Signature */}
      <p className={cn(
        "mt-4 font-body text-xs italic text-polished-gold",
        isArabic ? "text-left" : "text-right"
      )}>
        {signature}
      </p>
    </div>
  );
};
