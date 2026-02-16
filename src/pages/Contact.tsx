import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { socialLinks } from "@/components/brand/SocialLinks";
import { cn } from "@/lib/utils";
import asperLogo from "@/assets/asper-lotus-logo.png";
import ScrollProgress from "@/components/ScrollProgress";
import MobileBottomNav from "@/components/MobileBottomNav";
import MegaMenu from "@/components/MegaMenu";
import BrandIcon from "@/components/brand/BrandIcon";
import { CartDrawer } from "@/components/CartDrawer";
import AuthButton from "@/components/AuthButton";
import SearchBar from "@/components/home/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCartStore } from "@/stores/cartStore";
import { useState, useEffect } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const Contact = () => {
  const { t, toggle, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((t, i) => t + i.quantity, 0));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Descriptions per platform for the contact cards
  const platformDescriptions: Record<string, { tagline: string; cta: string }> = {
    whatsapp: { tagline: "VIP consultations, order tracking & Dr. Sami AI Chat", cta: "Chat Now" },
    instagram: { tagline: "Brand aesthetics, Reels & DM automation", cta: "Follow Us" },
    facebook: { tagline: "Community, social commerce & exclusive offers", cta: "Join Community" },
    tiktok: { tagline: "Morning Routine videos & Ms. Zain beauty content", cta: "Watch Now" },
    youtube: { tagline: "Long-form educational content & pharmacist guides", cta: "Subscribe" },
    snapchat: { tagline: "Quick regional content & behind-the-scenes", cta: "Add Us" },
    linkedin: { tagline: "Corporate credibility & pharmacist network", cta: "Connect" },
    pinterest: { tagline: "Morning Spa aesthetic boards & routine inspiration", cta: "Explore" },
    x: { tagline: "Customer service updates & wellness news", cta: "Follow" },
  };

  return (
    <div className="min-h-screen bg-background mobile-bottom-pad" dir={dir}>
      <ScrollProgress />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-accent/10 glass-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={asperLogo}
                alt="Asper"
                className={cn("w-auto transition-all duration-500 ease-luxury", scrolled ? "h-6" : "h-8")}
              />
              <span className={cn(
                "text-xs font-body uppercase tracking-[0.25em] text-muted-foreground mt-1 transition-all duration-500",
                scrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              )}>Beauty Shop</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <MegaMenu label={t("nav.shop")} />
              <Link to="/intelligence" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{t("nav.intelligence")}</Link>
              <Link to="/contact" className="text-sm font-medium text-primary transition-colors">Contact</Link>
              <Link to="/#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{t("nav.about")}</Link>
            </div>
            <div className="flex items-center gap-1">
              <BrandIcon icon="globe" onClick={toggle} ariaLabel="Switch language" />
              <SearchBar />
              <BrandIcon icon="cart" notificationCount={cartCount} onClick={() => setCartOpen(true)} ariaLabel="Open cart" />
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5">
            GET IN TOUCH
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Connect with a <span className="text-primary">Pharmacist</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Reach us on any platform. Our AI-powered concierge and pharmacist team are ready to guide your beauty & wellness journey.
          </p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Contact Info Bar */}
      <section className="py-10 bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: "WhatsApp Concierge", value: "+962 79 065 6666", href: "https://wa.me/962790656666" },
              { icon: MapPin, label: "Amman, Jordan", value: "Free delivery over 50 JOD", href: undefined },
              { icon: Clock, label: "Response Time", value: "Under 5 minutes via AI", href: undefined },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/5 border border-border group-hover:border-accent/40 flex items-center justify-center transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-heading font-semibold text-foreground hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-heading font-semibold text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Social Platform Cards — The Big 4 */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Our <span className="text-accent">Core Channels</span>
            </h2>
            <p className="text-muted-foreground font-body">Your direct line to personalized beauty intelligence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {socialLinks.filter(l => ["whatsapp", "instagram", "facebook", "tiktok"].includes(l.key)).map(({ key, href, label, Icon }) => {
              const desc = platformDescriptions[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-[0_8px_30px_hsl(43_69%_46%/0.12)] transition-all duration-500 overflow-hidden"
                >
                  {/* Gold top bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="w-14 h-14 rounded-xl bg-primary/5 border border-border group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-[0_0_16px_hsl(43_69%_46%/0.15)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300">
                      <Icon />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{label}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{desc?.tagline}</p>
                    <span className="inline-block mt-3 text-xs font-body font-semibold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      {desc?.cta} →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Extended Network */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Extended <span className="text-primary">Network</span>
            </h2>
            <p className="text-muted-foreground font-body">Find us across all platforms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {socialLinks.filter(l => !["whatsapp", "instagram", "facebook", "tiktok"].includes(l.key)).map(({ key, href, label, Icon }) => {
              const desc = platformDescriptions[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-[0_4px_20px_hsl(43_69%_46%/0.1)] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/5 border border-border group-hover:border-accent/40 flex items-center justify-center shrink-0 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300">
                      <Icon />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</h3>
                    <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">{desc?.tagline}</p>
                  </div>
                  <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity font-body font-semibold">
                    {desc?.cta} →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* CTA */}
      <section className="py-20 lab-zone">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Prefer a <span className="text-accent">Personal Touch</span>?
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Our AI Concierge is available 24/7 on WhatsApp. Get instant pharmacist-grade advice, product recommendations, and order tracking.
          </p>
          <a
            href="https://wa.me/962790656666"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-lg hover:bg-primary/90 hover:shadow-maroon-deep transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2a10 10 0 0 0-8.535 15.15L2 22l4.985-1.408A10 10 0 1 0 12 2z" />
            </svg>
            Chat with Dr. Sami on WhatsApp
          </a>
        </div>
      </section>

      <CartDrawer />
      <MobileBottomNav onOpenConcierge={() => {}} onOpenCart={() => setCartOpen(true)} />
    </div>
  );
};

export default Contact;
