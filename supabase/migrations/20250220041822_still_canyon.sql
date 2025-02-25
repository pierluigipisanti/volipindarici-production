/*
  # Schema per articoli e interazioni

  1. Nuove Tabelle
    - `articles`
      - `id` (uuid, chiave primaria)
      - `title` (text, titolo dell'articolo)
      - `content` (text, contenuto dell'articolo)
      - `author` (text, autore)
      - `image_url` (text, URL dell'immagine)
      - `created_at` (timestamp)
    
    - `votes`
      - `id` (uuid, chiave primaria)
      - `article_id` (uuid, riferimento a articles)
      - `user_id` (uuid, riferimento a auth.users)
      - `type` (text, 'like' o 'dislike')
      - `created_at` (timestamp)
    
    - `comments`
      - `id` (uuid, chiave primaria)
      - `article_id` (uuid, riferimento a articles)
      - `user_id` (uuid, riferimento a auth.users)
      - `content` (text)
      - `created_at` (timestamp)

  2. Sicurezza
    - RLS abilitato su tutte le tabelle
    - Policies per lettura pubblica
    - Policies per scrittura solo per utenti autenticati
*/

-- Creazione tabella articles
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Creazione tabella votes
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('like', 'dislike')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, user_id)
);

-- Creazione tabella comments
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Abilitazione RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies per articles
CREATE POLICY "Articles are viewable by everyone" 
  ON articles FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Articles can be inserted by authenticated users" 
  ON articles FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Policies per votes
CREATE POLICY "Votes are viewable by everyone" 
  ON votes FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Users can manage their own votes" 
  ON votes FOR ALL 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies per comments
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Users can manage their own comments" 
  ON comments FOR ALL 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);