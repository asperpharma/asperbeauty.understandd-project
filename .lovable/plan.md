

# Plan: Clinical Editorial Homepage Redesign

## Overview
Merge Ilia Beauty's breathable, magazine-like minimalism with Asper's medical luxury DNA. This is a visual and structural overhaul of 5 homepage components plus the header, keeping the existing 7-zone architecture but elevating the aesthetic from "store" to "editorial clinic."

## Changes

### 1. Header — Transparent-to-Frosted-Glass Morph
**File:** `src/components/Header.tsx`
- On homepage (route `/`), header starts fully transparent with white text/icons over the hero
- On scroll past 60px, morphs to `bg-asper-stone-light/90 backdrop-blur-xl` (frosted glass)
- Logo and nav links swap from `text-polished-white` to `text-burgundy` on scroll
- Non-homepage routes keep current solid behavior

### 2. Hero — Split Editorial "Magazine Cover"
**File:** `src/components/home/AmbientVideoHero.tsx` (rewrite)
- Replace centered video hero with a **split layout**: left half = massive Playfair headline + CTAs on ivory background, right half = full-bleed macro texture image (serum drop / cream swirl)
- Headline: "The Architecture of Healthy Skin."
- Primary CTA: Deep Maroon "Begin Your Consultation" → links to AI concierge
- Secondary CTA: Outline "Explore Protocols" → `/skin-concerns`
- Mobile: stacks vertically (image on top, text below)
- Keeps AR/EN switching, RTL support, luxury easing animations

### 3. Shop by Protocol — Editorial Navigation Grid
**File:** `src/components/home/ShopByCategory.tsx` (rewrite as `ShopByProtocol`)
- Replace circle emoji icons with large, borderless lifestyle images in a 2×3 grid
- Labels become clinical protocol names: "The Acne Protocol", "Cellular Repair", "Barrier Defense", "Radiance Revival", "Sun Shield", "Scalp Therapy"
- Hover: thin `border-polished-gold` stitches around image + micro-reveal of top 3 active ingredients (e.g., "Salicylic Acid · Niacinamide · Zinc")
- Move this section UP in the homepage order (after Dual-Persona Triage, before product sliders)

### 4. Product Slider — Floating Minimal Cards
**File:** `src/components/home/ProductSlider.tsx` (restyle)
- Remove card borders and background — products "float" on the section background
- Add pill-shaped clinical tag above product name: `[ Pharmacist Curated ]` or `[ 0.5% Retinol ]`
- Typography: Gold vendor label → Playfair product name → italic Montserrat benefit line
- Keep existing shimmer beam hover effect
- Keep horizontal scroll with arrow navigation

### 5. Clinical Dispatch — Dr. Sami Editorial Block
**File:** `src/components/home/EditorialSpotlight.tsx` (rework content)
- Asymmetric layout: large B&W editorial photo (lab/spa setting) on one side
- Content framed as AI-pharmacist advice: "Why Dr. Sami Prescribes Peptides for Urban Environments"
- CTA: Hollow outline button "Read the Dossier" in Deep Maroon
- Keep existing grid structure but update copy and styling to match clinical editorial tone

### 6. Homepage Zone Reorder
**File:** `src/pages/Index.tsx`
- Reorder to match the editorial flow:
  1. Hero (Split Editorial)
  2. Dual-Persona Triage (unchanged)
  3. Shop by Protocol (moved up from Zone 7)
  4. Product Sliders (Bestsellers + New)
  5. DermoBrands + EliteBrandShowcase
  6. Clinical Dispatch (Editorial)
  7. Clinical Truth Banner + Social Proof
  8. CelestialFeaturedCollection + remaining sections

## Technical Notes
- All components continue using existing design tokens (`burgundy`, `polished-gold`, `asper-stone`, `polished-white`)
- Framer Motion animations use the established `LUXURY_EASE` curve `[0.19, 1, 0.22, 1]`
- `useLanguage()` hook handles AR/EN + RTL throughout
- No new dependencies required
- `AnimatedSection` component provides scroll-triggered fade-up with configurable delay

## Scope
~6 files modified. No backend/database changes. No new routes. Pure frontend visual and structural overhaul.

