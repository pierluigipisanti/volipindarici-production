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

-- Imposta tutti gli articoli esistenti come approvati se non hanno uno status
UPDATE articles SET status = 'approved' WHERE status IS NULL;