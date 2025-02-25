/*
  # Aggiunta sistema di post schedulati
  
  1. Nuove Tabelle
    - `scheduled_articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `author` (text)
      - `category` (text)
      - `image_url` (text, optional)
      - `publish_at` (timestamptz)
      - `created_at` (timestamptz)
      - `status` (text)
  
  2. Security
    - Enable RLS
    - Add policies for admin access
    - Add policies for author access
*/

-- Creazione tabella per gli articoli schedulati
CREATE TABLE scheduled_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  category text NOT NULL CHECK (category IN ('economy', 'business', 'transport', 'it')),
  image_url text,
  publish_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'cancelled'))
);

-- Enable RLS
ALTER TABLE scheduled_articles ENABLE ROW LEVEL SECURITY;

-- Policies per gli articoli schedulati
CREATE POLICY "Authors can view own scheduled articles"
  ON scheduled_articles FOR SELECT
  TO authenticated
  USING (author = auth.email());

CREATE POLICY "Authors can insert scheduled articles"
  ON scheduled_articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = author);

CREATE POLICY "Admins can view all scheduled articles"
  ON scheduled_articles FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');

CREATE POLICY "Admins can manage scheduled articles"
  ON scheduled_articles FOR ALL
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com')
  WITH CHECK (auth.email() = 'admin@volipindarici.com');

-- Funzione per pubblicare gli articoli schedulati
CREATE OR REPLACE FUNCTION publish_scheduled_articles()
RETURNS void AS $$
BEGIN
  -- Inserisci gli articoli schedulati che devono essere pubblicati
  INSERT INTO articles (
    title,
    content,
    author,
    category,
    image_url,
    status,
    created_at
  )
  SELECT
    title,
    content,
    author,
    category,
    image_url,
    'approved',
    publish_at
  FROM scheduled_articles
  WHERE status = 'scheduled'
    AND publish_at <= now();

  -- Aggiorna lo stato degli articoli pubblicati
  UPDATE scheduled_articles
  SET status = 'published'
  WHERE status = 'scheduled'
    AND publish_at <= now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crea un trigger che viene eseguito ogni minuto
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('publish-scheduled-articles', '* * * * *', 'SELECT publish_scheduled_articles()');