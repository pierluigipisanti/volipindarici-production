-- Aggiorna le policy esistenti
DROP POLICY IF EXISTS "Admins can view all articles" ON articles;
DROP POLICY IF EXISTS "Admins can moderate articles" ON articles;

-- Ricrea le policy per gli admin con il nuovo dominio email
CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');

CREATE POLICY "Admins can moderate articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');

-- Imposta tutti gli articoli esistenti come approvati
UPDATE articles SET status = 'approved' WHERE status IS NULL;