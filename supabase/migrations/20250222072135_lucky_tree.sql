/*
  # Add job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `position` (text)
      - `name` (text)
      - `email` (text)
      - `superpower` (text)
      - `why_you` (text)
      - `craziest_idea` (text)
      - `audio_demo_url` (text, nullable)
      - `portfolio_url` (text, nullable)
      - `created_at` (timestamptz)
      - `status` (text)
  2. Security
    - Enable RLS
    - Add policies for inserting and viewing applications
*/

CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  superpower text,
  why_you text,
  craziest_idea text,
  audio_demo_url text,
  portfolio_url text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application
CREATE POLICY "Anyone can submit applications"
  ON job_applications FOR INSERT
  TO public
  WITH CHECK (true);

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  TO public
  USING (email = current_user);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');