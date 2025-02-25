-- Aggiorna le policy per gli articoli
DROP POLICY IF EXISTS "Admins can view all articles" ON articles;
DROP POLICY IF EXISTS "Admins can moderate articles" ON articles;

CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');

CREATE POLICY "Admins can moderate articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');

-- Aggiorna le policy per le candidature
DROP POLICY IF EXISTS "Admins can manage all applications" ON applications;

CREATE POLICY "Admins can manage all applications"
  ON applications FOR ALL
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');