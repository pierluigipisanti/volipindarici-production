/*
  # Update applications table policies

  This migration updates the policies for the applications table to use the correct admin email domain.
  No table creation is needed since it already exists.
*/

-- Drop existing admin policy if it exists
DROP POLICY IF EXISTS "Admins can manage all applications" ON applications;

-- Create new admin policy with correct domain
CREATE POLICY "Admins can manage all applications"
  ON applications FOR ALL
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');