
CREATE POLICY "Users can delete own chat logs"
ON public.chat_logs FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Users can delete own concierge profile"
ON public.concierge_profiles FOR DELETE
USING (( SELECT auth.uid() AS uid) = user_id);

CREATE POLICY "Users can delete own profile"
ON public.profiles FOR DELETE
USING (( SELECT auth.uid() AS uid) = user_id);

CREATE POLICY "Users can delete own telemetry"
ON public.telemetry_events FOR DELETE
USING (user_id = auth.uid());
