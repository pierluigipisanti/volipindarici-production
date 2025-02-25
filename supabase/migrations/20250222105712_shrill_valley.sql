-- First, temporarily remove the category constraint
ALTER TABLE articles 
  DROP CONSTRAINT IF EXISTS articles_category_check;

-- Update existing articles to use new categories
UPDATE articles 
SET category = 'galassie_mentali'
WHERE category IN ('it', 'economy', 'business');

UPDATE articles 
SET category = 'viaggi_quotidiani'
WHERE category IN ('transport');

-- Set a default category for any NULL or invalid values
UPDATE articles 
SET category = 'galassie_mentali'
WHERE category IS NULL 
   OR category NOT IN (
    'galassie_mentali',
    'viaggi_lavoro',
    'fuga_realta',
    'futuro_alternativo',
    'montagne_russe',
    'marte_express',
    'viaggi_quotidiani'
   );

-- Now add the new constraint with all categories
ALTER TABLE articles 
  ADD CONSTRAINT articles_category_check 
  CHECK (category IN (
    'galassie_mentali',
    'viaggi_lavoro',
    'fuga_realta',
    'futuro_alternativo',
    'montagne_russe',
    'marte_express',
    'viaggi_quotidiani'
  ));

-- Update scheduled_articles table if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'scheduled_articles'
  ) THEN
    -- Remove the old constraint
    ALTER TABLE scheduled_articles 
      DROP CONSTRAINT IF EXISTS scheduled_articles_category_check;

    -- Update existing scheduled articles
    UPDATE scheduled_articles 
    SET category = 'galassie_mentali'
    WHERE category IN ('it', 'economy', 'business');

    UPDATE scheduled_articles 
    SET category = 'viaggi_quotidiani'
    WHERE category IN ('transport');

    -- Set default for any invalid categories
    UPDATE scheduled_articles 
    SET category = 'galassie_mentali'
    WHERE category IS NULL 
       OR category NOT IN (
        'galassie_mentali',
        'viaggi_lavoro',
        'fuga_realta',
        'futuro_alternativo',
        'montagne_russe',
        'marte_express',
        'viaggi_quotidiani'
       );

    -- Add the new constraint
    ALTER TABLE scheduled_articles 
      ADD CONSTRAINT scheduled_articles_category_check 
      CHECK (category IN (
        'galassie_mentali',
        'viaggi_lavoro',
        'fuga_realta',
        'futuro_alternativo',
        'montagne_russe',
        'marte_express',
        'viaggi_quotidiani'
      ));
  END IF;
END $$;