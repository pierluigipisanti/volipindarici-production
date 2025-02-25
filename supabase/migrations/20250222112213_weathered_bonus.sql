-- Rimuovi temporaneamente il vincolo di categoria
ALTER TABLE articles 
  DROP CONSTRAINT IF EXISTS articles_category_check;

-- Aggiungi la categoria 'offers' al vincolo
ALTER TABLE articles 
  ADD CONSTRAINT articles_category_check 
  CHECK (category IN (
    'galassie_mentali',
    'viaggi_lavoro',
    'fuga_realta',
    'futuro_alternativo',
    'montagne_russe',
    'marte_express',
    'viaggi_quotidiani',
    'offers'
  ));

-- Aggiorna anche la tabella scheduled_articles se esiste
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'scheduled_articles'
  ) THEN
    ALTER TABLE scheduled_articles 
      DROP CONSTRAINT IF EXISTS scheduled_articles_category_check;

    ALTER TABLE scheduled_articles 
      ADD CONSTRAINT scheduled_articles_category_check 
      CHECK (category IN (
        'galassie_mentali',
        'viaggi_lavoro',
        'fuga_realta',
        'futuro_alternativo',
        'montagne_russe',
        'marte_express',
        'viaggi_quotidiani',
        'offers'
      ));
  END IF;
END $$;