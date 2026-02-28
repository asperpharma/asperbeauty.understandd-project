

## Plan: Enhance Intent-Based Deep Linking

### Current State
The `AIConcierge.tsx` already has basic deep linking (lines 169-186): it reads `?intent=` and `?source=` from the URL, opens the panel, and pre-fills the input text. However, it has several gaps:

1. **No auto-send** — it only fills the input; the user must manually press Send
2. **No intent-to-prompt mapping** — raw intent like "acne" becomes generic "I need help with acne" instead of a tailored clinical prompt
3. **No URL cleanup** — query params remain in the URL bar after handling
4. **No source tracking** — the `source` param (ig, tiktok, fb) isn't logged or used for analytics

### Implementation Steps

**1. Add an intent-to-prompt mapping object** in `AIConcierge.tsx` that maps common marketing intents to rich, persona-appropriate opening messages:
- `acne` → "I'm struggling with acne and oiliness. What's the best clinical routine?"
- `glow` → "I want radiant, glowing skin. What do you recommend?"
- `anti-aging` → "I'm looking for an anti-aging routine with proven actives."
- `hydration` → "My skin is very dry. I need a deep hydration regimen."
- `bridal` → "I'm getting married soon! Help me with a bridal skincare bootcamp."
- `pregnancy` → "I'm pregnant and need a safe skincare routine."
- Fallback: `"I need help with {intent}."`

**2. Modify the deep link `useEffect`** to:
- Map the intent to a tailored prompt using the mapping
- Auto-send the message after auth check completes (watch `isAuthenticated` state) instead of just filling the input
- Clean up the URL using `window.history.replaceState` to remove `?intent=` and `?source=` params
- Store `source` in a ref so it can optionally be included in the API payload for analytics

**3. Add a `deepLinkIntent` ref** that stores the pending intent text, and trigger `send()` automatically once `isAuthenticated === true` — this solves the timing issue where auth hasn't resolved yet when the deep link fires.

### Files Changed
- `src/components/AIConcierge.tsx` — All changes in this single file

### Technical Notes
- Uses `window.history.replaceState` for clean URL (no page reload)
- The auto-send fires only once via the existing `deepLinkHandled` ref
- Intent mapping is extensible — new campaigns just add a key to the map

