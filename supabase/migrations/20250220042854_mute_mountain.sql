/*
  # Aggiunta sistema di moderazione

  1. Modifiche alle tabelle
    - Aggiunta colonna `status` alla tabella `articles`
    - Aggiunta colonna `moderated_at` alla tabella `articles`
    - Aggiunta colonna `moderator` alla tabella `articles`

  2. Aggiornamento RLS
    - Aggiornate le policy per includere il nuovo campo status
*/

-- Aggiungi colonne per la moderazione
ALTER TABLE articles ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE articles ADD COLUMN IF NOT EXISTS moderated_at timestamptz;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS moderator text;

-- Aggiorna le policy esistenti per mostrare solo gli articoli approvati
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
CREATE POLICY "Articles are viewable by everyone" 
  ON articles FOR SELECT 
  TO public 
  USING (status = 'approved' OR auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@volipindarici.it'
  ));

-- Policy per permettere agli admin di vedere tutti gli articoli
CREATE POLICY "Admins can see all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it');

-- Policy per permettere agli admin di moderare gli articoli
CREATE POLICY "Admins can moderate articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it')
  WITH CHECK (auth.email() = 'admin@volipindarici.it');