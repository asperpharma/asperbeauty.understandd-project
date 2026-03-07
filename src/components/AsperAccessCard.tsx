import { useState, MouseEvent } from "react";

export default function AsperAccessCard({ name = "Guest", protocol = "HYDRATION" }: { name?: string; protocol?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    setRotateX(((y - centerY) / centerY) * -15);
    setRotateY(((x - centerX) / centerX) * 15);
    setGlareX((x / box.width) * 100);
    setGlareY((y / box.height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <div className="relative w-[400px] h-[250px]" style={{ perspective: "1000px" }}>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative rounded-2xl transition-all duration-200 ease-out cursor-pointer"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 30px 60px -12px hsl(var(--burgundy) / 0.3), 0 18px 36px -18px hsl(var(--polished-gold) / 0.2)"
            : "0 10px 30px -10px hsl(var(--burgundy) / 0.15)",
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-background border border-polished-gold overflow-hidden z-10">
          {/* DNA dot pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--polished-gold)) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Glare */}
          <div
            className="absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
            style={{
              opacity: isHovered ? 0.6 : 0,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 10%, transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-30 p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground tracking-widest uppercase">
                  Asper
                </h2>
                <p className="font-body text-[10px] text-burgundy tracking-[0.2em] font-bold mt-1">
                  CLINICAL ACCESS
                </p>
              </div>
              <div className="w-10 h-8 rounded bg-gradient-to-br from-[hsl(46,72%,58%)] to-polished-gold border border-polished-gold/60 opacity-80 flex items-center justify-center">
                <div className="w-6 h-4 border border-background/50 rounded-sm" />
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                  Patient Profile
                </p>
                <p className="font-heading text-xl text-foreground">{name}</p>
              </div>
              <div className="text-right">
                <p className="font-body text-[10px] text-burgundy mb-1 font-bold">
                  AES-256 SECURED
                </p>
                <div className="bg-foreground px-3 py-1 rounded-full">
                  <p className="font-body text-xs text-polished-gold tracking-wider">
                    PROTOCOL: {protocol}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div
        className="absolute -bottom-12 left-10 right-10 h-8 transition-opacity duration-500 blur-md rounded-[100%]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--burgundy) / 0.15) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0.4,
          transform: `scaleX(${isHovered ? 1.1 : 1})`,
        }}
      />
    </div>
  );
}
