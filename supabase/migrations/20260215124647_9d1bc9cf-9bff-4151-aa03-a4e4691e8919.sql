-- Add pharmacist note field for "Why it's here" rationale
ALTER TABLE public.products
ADD COLUMN pharmacist_note text;

COMMENT ON COLUMN public.products.pharmacist_note IS '1-sentence pharmacist rationale explaining why this product is curated';
