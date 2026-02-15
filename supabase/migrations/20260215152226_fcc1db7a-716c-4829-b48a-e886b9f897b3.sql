
ALTER FUNCTION public.sync_tray_product(text, text, skin_concern, regimen_step, integer, boolean, boolean, integer) SET search_path = public;
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.generate_prescription(jsonb) SET search_path = public;
ALTER FUNCTION public.get_tray_by_concern(skin_concern) SET search_path = public;
ALTER FUNCTION public.event_trigger_fn() SET search_path = public;
ALTER FUNCTION public.shopify_pub_broadcast_trigger() SET search_path = public;
