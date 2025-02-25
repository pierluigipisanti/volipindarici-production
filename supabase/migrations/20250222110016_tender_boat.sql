/*
  # Update article category

  1. Changes
    - Move "Viaggio di Nozze 'Marte e Ritorno'" article to 'marte_express' category
*/

UPDATE articles 
SET category = 'marte_express'
WHERE title LIKE '%Viaggio di Nozze%Marte e Ritorno%';