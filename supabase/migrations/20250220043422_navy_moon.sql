/*
  # Correzione policy articoli

  1. Modifiche
    - Correzione policy per visibilità articoli
    - Aggiunta policy per autori

  2. Sicurezza
    - Gli articoli approvati sono visibili a tutti
    - Gli autori possono vedere i propri articoli
    - Gli admin possono vedere e moderare tutto
*/

-- Rimuovi le policy esistenti
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Anyone can view approved articles" ON articles;
DROP POLICY IF EXISTS "Admins can view all articles" ON articles;
DROP POLICY IF EXISTS "Users can view own articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Admins can update articles" ON articles;

-- Policy per permettere a tutti di vedere gli articoli approvati
CREATE POLICY "Anyone can view approved articles"
  ON articles FOR SELECT
  USING (status = 'approved');

-- Policy per permettere agli autori di vedere i propri articoli
CREATE POLICY "Authors can view own articles"
  ON articles FOR SELECT
  TO authenticated
  USING (author = auth.email());

-- Policy per permettere agli admin di vedere tutti gli articoli
CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it');

-- Policy per permettere agli utenti autenticati di inserire articoli
CREATE POLICY "Users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = author);

-- Policy per permettere agli admin di moderare gli articoli
CREATE POLICY "Admins can moderate articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it')
  WITH CHECK (auth.email() = 'admin@volipindarici.it');

-- Imposta tutti gli articoli esistenti come approvati
UPDATE articles SET status = 'approved' WHERE status IS NULL;