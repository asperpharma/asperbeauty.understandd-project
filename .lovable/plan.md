

## Restore the "Morning Spa" Design Foundation

The current homepage (`Index.tsx`) uses three components that conflict with the DESIGN_SYSTEM.md palette:

1. **`HeroSection.tsx`** — Gold particles on `#FFF8E1`, hardcoded hex colors, "Discover Your Ritual" layout
2. **`CelestialFeaturedCollection.tsx`** — Dark `celestial-gradient` (merlot `#4A0404`) background
3. **`BrandStory.tsx`** — Dark `asper-merlot` (#4A0404) background with gold text

The target design uses `asper-stone` (#F2EFEB) ivory backgrounds, `burgundy` (#6B2D3A) for authority, `rose-clay` for warmth, and `polished-gold` for accents — the "Morning Spa" language already defined in `DESIGN_SYSTEM.md` and partially implemented in `src/components/home/Hero.tsx`.

---

### Implementation Steps

**1. Swap the Hero component**
- Replace `HeroSection` import in `Index.tsx` with `src/components/home/Hero.tsx` (full-screen video + glassmorphism card, "Curated by Pharmacists" headline, trust micro-badges)
- Remove the old `HeroSection.tsx` gold-particle component from the homepage render

**2. Retheme `CelestialFeaturedCollection` to Morning Spa palette**
- Change section background from `bg-celestial-gradient` (dark merlot) to `bg-asper-stone` or `bg-rose-clay-light`
- Update text colors from `text-asper-ivory` / `text-asper-gold` to `text-asper-ink` / `text-burgundy`
- Replace `GlassGoldProductCard` with `luxury-card` pattern (white cards, `shadow-maroon-glow`, polished-gold hover border)
- Update gold accent lines to use design system tokens

**3. Retheme `BrandStory` to Morning Spa palette**
- Change from `bg-asper-merlot` dark background to a warm split: `bg-asper-stone` with a `rose-clay-light` accent panel
- Update headline from `text-asper-gold` to `text-burgundy` with `font-heading`
- Change body text from `text-asper-ivory/80` to `text-asper-ink-muted`
- Update feature list accent lines from `bg-asper-gold` to `bg-polished-gold`

**4. Ensure Tailwind config has all DESIGN_SYSTEM.md tokens**
- Add missing tokens to `tailwind.config.ts`: `asper-stone`, `asper-stone-light`, `asper-stone-dark`, `rose-clay`, `rose-clay-light`, `rose-clay-dark`, `polished-gold`, `asper-ink`, `asper-ink-muted`, `polished-white`
- Add `shadow-maroon-glow` and `shadow-maroon-deep` custom shadows
- Add `font-heading` alias mapping to Playfair Display

**5. Clean up CSS variables in `index.css`**
- Verify `--background` maps to warm ivory (not pure white)
- Ensure body base styles use `bg-asper-stone text-asper-ink`

---

### Technical Notes

- The `src/components/home/Hero.tsx` already exists and is fully functional but unused on the homepage — it just needs to be swapped in
- The Header and Footer already follow the Morning Spa palette (maroon nav bar, burgundy footer with gold accents) — no changes needed there
- All hardcoded hex values (`#FFF8E1`, `#D4AF37`, `#4A0404`) in affected components will be replaced with Tailwind design tokens
- The `celestial-gradient` background image in Tailwind config can remain for backward compatibility but will no longer be used on the homepage

