/*
  # Add database trigger for email notifications

  1. Changes
    - Create function to handle new applications
    - Create trigger to call function on insert

  2. Security
    - Function executes with security definer permissions
*/

-- Funzione che verrà chiamata dal trigger
CREATE OR REPLACE FUNCTION handle_new_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Invoca la Edge Function
  PERFORM
    net.http_post(
      url := CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/handle-application'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crea il trigger
DROP TRIGGER IF EXISTS on_new_application ON applications;
CREATE TRIGGER on_new_application
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_application();