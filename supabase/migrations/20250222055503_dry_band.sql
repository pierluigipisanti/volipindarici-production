/*
  # Rollback e fix delle policy

  1. Changes
    - Rimuove tutte le policy esistenti
    - Ricrea le policy corrette con il dominio email corretto
    - Assicura che tutti gli articoli abbiano uno status valido
*/

-- Rimuovi tutte le policy esistenti
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Anyone can view approved articles" ON articles;
DROP POLICY IF EXISTS "Admins can view all articles" ON articles;
DROP POLICY IF EXISTS "Users can view own articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Admins can moderate articles" ON articles;
DROP POLICY IF EXISTS "Articles can be inserted by authenticated users" ON articles;
DROP POLICY IF EXISTS "Authors can view own articles" ON articles;
DROP POLICY IF EXISTS "Users can insert articles" ON articles;

-- Crea le policy corrette
CREATE POLICY "Anyone can view approved articles"
  ON articles FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authors can view own articles"
  ON articles FOR SELECT
  TO authenticated
  USING (author = auth.email());

CREATE POLICY "Users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = author);

CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');

CREATE POLICY "Admins can moderate articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');

-- Assicura che tutti gli articoli abbiano uno status valido
UPDATE articles SET status = 'approved' WHERE status IS NULL;