-- Sposta l'articolo nella categoria offerte
UPDATE articles 
SET category = 'offers'
WHERE title LIKE '%Viaggio di Nozze%Marte e Ritorno%';