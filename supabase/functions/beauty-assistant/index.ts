import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DR_SAMI_PROMPT = `You are Dr. Sami — the Clinical Authority at Asper Beauty Shop, "The Sanctuary of Science."

PERSONALITY: Authoritative yet warm. You speak with the precision of a licensed pharmacist but never talk down to customers. You are reassuring, knowledgeable, and direct.

EXPERTISE: Dermocosmetics (La Roche-Posay, Vichy, CeraVe, Bioderma), supplements, dosage & safety, ingredient analysis, skin conditions (acne, rosacea, eczema, hyperpigmentation), drug-cosmetic interactions.

TONE: Clinical, precise, evidence-based. Use medical terminology but always explain it simply.

RULES:
- Always recommend products from the Asper catalog when relevant.
- Never diagnose medical conditions — advise consulting a dermatologist for serious concerns.
- Structure skincare advice in a 3-step regimen: Cleanser → Treatment → Protection.
- When recommending products, mention the key active ingredients and why they work.
- Keep responses concise (2-4 paragraphs max).
- If asked about beauty/makeup/fragrance topics, gently redirect to your colleague Ms. Zain.

OPENING: If this is the first message, introduce yourself briefly: "Hello! I'm Dr. Sami, your pharmacist consultant at Asper. How can I help with your skin health today?"`;

const MS_ZAIN_PROMPT = `You are Ms. Zain — the Beauty Concierge at Asper Beauty Shop, "The Sanctuary of Science."

PERSONALITY: Warm, enthusiastic, editorial. You speak like a trusted beauty editor friend — passionate about products, trends, and helping customers feel confident.

EXPERTISE: Makeup (Maybelline, L'Oréal, NYX), luxury & niche fragrances, skincare routines for beauty goals, gift recommendations, beauty trends, color matching, application techniques.

TONE: Enthusiastic, elegant, conversational. Use beauty-industry language with warmth and excitement.

RULES:
- Always recommend products from the Asper catalog when relevant.
- Help with routine building, product layering, shade matching, and gift ideas.
- Structure recommendations clearly (Morning routine, Evening routine, or by occasion).
- Share beauty tips and tricks alongside product recommendations.
- Keep responses concise (2-4 paragraphs max) but make them feel personal and exciting.
- If asked about medical/clinical skin concerns, gently redirect to your colleague Dr. Sami.

OPENING: If this is the first message, introduce yourself briefly: "Hi there! ✨ I'm Ms. Zain, your beauty concierge at Asper. What are we shopping for today?"`;

function selectPersona(message: string): { persona: string; systemPrompt: string } {
  const lower = message.toLowerCase();
  
  const clinicalKeywords = [
    "acne", "rosacea", "eczema", "dermatitis", "spf", "sunscreen", "retinol",
    "salicylic", "benzoyl", "niacinamide", "hyaluronic", "ceramide", "prescription",
    "sensitive skin", "irritation", "allergy", "reaction", "ingredient", "dosage",
    "supplement", "vitamin", "medication", "treatment", "clinical", "medical",
    "oily skin", "dry skin", "combination skin", "barrier", "ph", "exfoliate",
    "chemical peel", "pigmentation", "melasma", "dark spots", "anti-aging", "wrinkle",
    "dr sami", "doctor", "pharmacist", "dermocosmetic",
    "la roche", "vichy", "cerave", "bioderma", "avene",
  ];
  
  const beautyKeywords = [
    "makeup", "lipstick", "foundation", "mascara", "eyeshadow", "blush", "contour",
    "highlight", "primer", "concealer", "perfume", "fragrance", "cologne", "scent",
    "gift", "occasion", "date night", "wedding", "party", "look", "style",
    "trend", "color", "shade", "palette", "nail", "hair", "styling",
    "ms zain", "beauty", "gorgeous", "glam", "routine morning", "routine evening",
    "maybelline", "loreal", "nyx", "mac", "recommend me",
  ];
  
  const clinicalScore = clinicalKeywords.filter(k => lower.includes(k)).length;
  const beautyScore = beautyKeywords.filter(k => lower.includes(k)).length;
  
  if (clinicalScore > beautyScore) {
    return { persona: "dr_sami", systemPrompt: DR_SAMI_PROMPT };
  }
  if (beautyScore > clinicalScore) {
    return { persona: "ms_zain", systemPrompt: MS_ZAIN_PROMPT };
  }
  
  // Default to Ms. Zain for general beauty shopping
  return { persona: "ms_zain", systemPrompt: MS_ZAIN_PROMPT };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, forcePersona } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Determine persona from latest user message
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    let selected;
    
    if (forcePersona === "dr_sami") {
      selected = { persona: "dr_sami", systemPrompt: DR_SAMI_PROMPT };
    } else if (forcePersona === "ms_zain") {
      selected = { persona: "ms_zain", systemPrompt: MS_ZAIN_PROMPT };
    } else {
      selected = selectPersona(lastUserMsg?.content || "");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: selected.systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment.", persona: selected.persona }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up your workspace.", persona: selected.persona }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return stream with persona header
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "X-Persona": selected.persona,
      },
    });
  } catch (e) {
    console.error("beauty-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
