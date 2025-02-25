/*
  # Aggiunta categoria offerte

  1. Modifiche
    - Aggiunta categoria 'offers' alle tabelle articles e scheduled_articles
  
  2. Aggiornamento Dati
    - Aggiornamento dei vincoli di categoria esistenti
*/

-- Aggiorna il vincolo di categoria per la tabella articles
ALTER TABLE articles 
  DROP CONSTRAINT IF EXISTS articles_category_check;

ALTER TABLE articles 
  ADD CONSTRAINT articles_category_check 
  CHECK (category IN ('economy', 'business', 'transport', 'it', 'offers'));

-- Aggiorna il vincolo di categoria per la tabella scheduled_articles
ALTER TABLE scheduled_articles 
  DROP CONSTRAINT IF EXISTS scheduled_articles_category_check;

ALTER TABLE scheduled_articles 
  ADD CONSTRAINT scheduled_articles_category_check 
  CHECK (category IN ('economy', 'business', 'transport', 'it', 'offers'));