/*
  # Aggiornamento schema articoli e policy

  1. Modifiche
    - Aggiunta colonna status per moderazione
    - Aggiunta colonne per tracciamento moderazione
    - Aggiornamento policy per visibilità e moderazione

  2. Sicurezza
    - Gli articoli approvati sono visibili a tutti
    - Gli admin possono vedere e moderare tutti gli articoli
    - Gli autori possono vedere i propri articoli in attesa
*/

-- Aggiungi colonne per la moderazione se non esistono
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'status'
  ) THEN
    ALTER TABLE articles ADD COLUMN status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'moderated_at'
  ) THEN
    ALTER TABLE articles ADD COLUMN moderated_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'moderator'
  ) THEN
    ALTER TABLE articles ADD COLUMN moderator text;
  END IF;
END $$;

-- Rimuovi le policy esistenti
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Admins can see all articles" ON articles;
DROP POLICY IF EXISTS "Admins can moderate articles" ON articles;
DROP POLICY IF EXISTS "Articles can be inserted by authenticated users" ON articles;

-- Policy per permettere a tutti di vedere gli articoli approvati
CREATE POLICY "Anyone can view approved articles"
  ON articles FOR SELECT
  USING (status = 'approved');

-- Policy per permettere agli admin di vedere tutti gli articoli
CREATE POLICY "Admins can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it');

-- Policy per permettere agli utenti di vedere i propri articoli
CREATE POLICY "Users can view own articles"
  ON articles FOR SELECT
  TO authenticated
  USING (author = auth.email());

-- Policy per permettere agli utenti autenticati di inserire articoli
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = author);

-- Policy per permettere agli admin di moderare gli articoli
CREATE POLICY "Admins can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it')
  WITH CHECK (auth.email() = 'admin@volipindarici.it');

-- Imposta tutti gli articoli esistenti come approvati se non hanno uno status
UPDATE articles SET status = 'approved' WHERE status IS NULL;