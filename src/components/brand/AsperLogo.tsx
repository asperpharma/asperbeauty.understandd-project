import { cn } from "@/lib/utils";

interface AsperLogoProps {
  variant?: "seal" | "bloom";
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Architectural Seal — A geometric "A" enclosed in an authentic verification seal.
 * Botanical sprout (nature) + technical node (AI logic).
 */
function ArchitecturalSeal({ size = 120, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer dotted verification seal */}
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="hsl(43, 69%, 46%)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.6"
      />
      {/* Inner solid ring */}
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="hsl(345, 100%, 25%)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Secondary inner ring */}
      <circle
        cx="60"
        cy="60"
        r="46"
        stroke="hsl(43, 69%, 46%)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />

      {/* Geometric "A" — main stroke */}
      <path
        d="M60 28 L42 82 L48 82 L52 70 L68 70 L72 82 L78 82 Z"
        fill="hsl(345, 100%, 25%)"
      />
      {/* "A" crossbar */}
      <rect x="54" y="60" width="12" height="2" rx="1" fill="hsl(240, 100%, 99.2%)" />

      {/* Botanical sprout — left leaf */}
      <path
        d="M38 72 C36 62 42 56 50 54"
        stroke="hsl(43, 69%, 46%)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="36"
        cy="70"
        rx="4"
        ry="7"
        transform="rotate(-20 36 70)"
        fill="hsl(43, 69%, 46%)"
        opacity="0.25"
      />

      {/* Technical node — right side */}
      <circle cx="82" cy="54" r="2" fill="hsl(43, 69%, 46%)" />
      <line x1="78" y1="56" x2="74" y2="60" stroke="hsl(43, 69%, 46%)" strokeWidth="0.8" />
      <circle cx="86" cy="48" r="1.2" fill="hsl(43, 69%, 46%)" opacity="0.6" />
      <line x1="82" y1="52" x2="85" y2="49" stroke="hsl(43, 69%, 46%)" strokeWidth="0.5" />

      {/* "ASPER" text along bottom */}
      <text
        x="60"
        y="96"
        textAnchor="middle"
        fill="hsl(345, 100%, 25%)"
        fontSize="7"
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
        letterSpacing="4"
      >
        ASPER
      </text>
    </svg>
  );
}

/**
 * Molecular Bloom — A faceted crystalline form resembling both
 * a chemical molecule (Dr. Sami) and a blooming lotus (Ms. Zain).
 * Built on 60° clinical facets.
 */
function MolecularBloom({ size = 120, className }: { size: number; className?: string }) {
  const cx = 60;
  const cy = 55;
  const r = 24;

  // 6 petals at 60° intervals
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    return { px, py, angle: i * 60 - 90 };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer subtle ring */}
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="hsl(43, 69%, 46%)"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Petal facets */}
      {petals.map((p, i) => {
        const nextP = petals[(i + 1) % 6];
        return (
          <polygon
            key={i}
            points={`${cx},${cy} ${p.px},${p.py} ${nextP.px},${nextP.py}`}
            fill={i % 2 === 0 ? "hsl(345, 100%, 25%)" : "hsl(345, 80%, 32%)"}
            opacity={0.85}
          />
        );
      })}

      {/* Inner bloom highlight */}
      <circle cx={cx} cy={cy} r="8" fill="hsl(43, 69%, 46%)" opacity="0.3" />
      <circle cx={cx} cy={cy} r="4" fill="hsl(43, 69%, 46%)" opacity="0.6" />

      {/* Molecular bonds extending from petals */}
      {petals.map((p, i) => {
        const outerAngle = ((i * 60 - 90) * Math.PI) / 180;
        const ox = cx + (r + 12) * Math.cos(outerAngle);
        const oy = cy + (r + 12) * Math.sin(outerAngle);
        return (
          <g key={`bond-${i}`}>
            <line
              x1={p.px}
              y1={p.py}
              x2={ox}
              y2={oy}
              stroke="hsl(43, 69%, 46%)"
              strokeWidth="0.8"
              opacity="0.5"
            />
            <circle cx={ox} cy={oy} r="1.5" fill="hsl(43, 69%, 46%)" opacity="0.7" />
          </g>
        );
      })}

      {/* "ASPER" text along bottom */}
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fill="hsl(345, 100%, 25%)"
        fontSize="7"
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
        letterSpacing="4"
      >
        ASPER
      </text>
    </svg>
  );
}

export default function AsperLogo({ variant = "seal", size = 120, className, animated }: AsperLogoProps) {
  const wrapperClass = cn(
    animated && "transition-transform duration-700 hover:scale-105",
    className
  );

  return variant === "seal" ? (
    <ArchitecturalSeal size={size} className={wrapperClass} />
  ) : (
    <MolecularBloom size={size} className={wrapperClass} />
  );
}
