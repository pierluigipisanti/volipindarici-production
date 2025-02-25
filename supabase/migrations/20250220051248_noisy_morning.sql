/*
  # Create applications table

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `position` (text, required)
      - `superpower` (text, required)
      - `whyYou` (text, required)
      - `craziest_idea` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz, default now())
      - `reviewed_at` (timestamptz)
      - `reviewer` (text)

  2. Security
    - Enable RLS on `applications` table
    - Add policies for:
      - Anyone can insert applications
      - Admin can view and update applications
      - Users can view their own applications
*/

CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  position text NOT NULL,
  superpower text NOT NULL,
  whyYou text NOT NULL,
  craziest_idea text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewer text
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy per permettere a chiunque di inserire una candidatura
CREATE POLICY "Anyone can insert applications"
  ON applications FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy per permettere agli utenti di vedere le proprie candidature
CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO public
  USING (email = auth.email());

-- Policy per permettere agli admin di vedere e gestire tutte le candidature
CREATE POLICY "Admins can manage all applications"
  ON applications FOR ALL
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.it')
  WITH CHECK (auth.email() = 'admin@volipindarici.it');