
-- Fix profiles SELECT policy: remove auth_user_id fallback
DROP POLICY IF EXISTS "profile_read_own" ON public.profiles;
CREATE POLICY "profile_read_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Fix profiles UPDATE policy: remove auth_user_id fallback
DROP POLICY IF EXISTS "profile_write_own" ON public.profiles;
CREATE POLICY "profile_write_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
