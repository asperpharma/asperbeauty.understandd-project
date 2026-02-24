-- Fix chat_logs UPDATE policy: add WITH CHECK to prevent user_id tampering
DROP POLICY IF EXISTS "Users can update own chat logs" ON public.chat_logs;

CREATE POLICY "Users can update own chat logs"
ON public.chat_logs
FOR UPDATE
USING (( SELECT auth.uid() AS uid) = user_id)
WITH CHECK (( SELECT auth.uid() AS uid) = user_id);