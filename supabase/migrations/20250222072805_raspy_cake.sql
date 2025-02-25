-- Add missing columns for job applications moderation
ALTER TABLE job_applications
ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
ADD COLUMN IF NOT EXISTS reviewer text;

-- Update policies for admin moderation
DROP POLICY IF EXISTS "Admins can moderate applications" ON job_applications;

CREATE POLICY "Admins can moderate applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');