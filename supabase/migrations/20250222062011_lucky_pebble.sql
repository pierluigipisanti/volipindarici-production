/*
  # Add new categories to articles table

  1. Changes
    - Add new categories ('transport' and 'it') to the category column check constraint
    - Update existing articles without a category to 'economy'

  2. Notes
    - Uses safe ALTER TABLE with IF EXISTS checks
    - Preserves existing data
*/

-- Update the category column check constraint to include new categories
DO $$ 
BEGIN
  -- First remove the existing check constraint if it exists
  ALTER TABLE articles 
    DROP CONSTRAINT IF EXISTS articles_category_check;
  
  -- Add the new check constraint with updated categories
  ALTER TABLE articles 
    ADD CONSTRAINT articles_category_check 
    CHECK (category IN ('economy', 'business', 'transport', 'it'));

  -- Set default category for any articles without one
  UPDATE articles 
  SET category = 'economy' 
  WHERE category IS NULL;
END $$;