/*
  # Aggiunta categorie agli articoli

  1. Modifiche
    - Aggiunta colonna `category` alla tabella `articles`
    - Valori possibili: 'economy', 'business'
    - Aggiornamento degli articoli esistenti con categorie casuali
*/

-- Aggiungi la colonna category se non esiste
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'category'
  ) THEN
    ALTER TABLE articles ADD COLUMN category text CHECK (category IN ('economy', 'business'));
  END IF;
END $$;

-- Aggiorna gli articoli esistenti assegnando categorie in modo alternato
UPDATE articles 
SET category = CASE 
  WHEN id IN (
    SELECT id FROM articles 
    WHERE id IN (
      SELECT id FROM articles ORDER BY created_at
      OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY
    )
  ) THEN 'economy'
  ELSE 'business'
END
WHERE category IS NULL;