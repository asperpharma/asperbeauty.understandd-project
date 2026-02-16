-- Add RLS policies to cleanup_allowlist to restrict access to admins only
CREATE POLICY "Only admins can read cleanup_allowlist"
ON public.cleanup_allowlist
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert cleanup_allowlist"
ON public.cleanup_allowlist
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update cleanup_allowlist"
ON public.cleanup_allowlist
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete cleanup_allowlist"
ON public.cleanup_allowlist
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));