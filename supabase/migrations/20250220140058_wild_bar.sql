/*
  # Aggiornamento immagine articolo dei pesci volanti

  1. Modifiche
    - Aggiorna l'URL dell'immagine dell'articolo "L'Uomo che Voleva Insegnare ai Pesci a Volare"
    con una nuova immagine più appropriata e affidabile da Unsplash
*/

UPDATE articles 
SET image_url = 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=1920'
WHERE title LIKE '%L''Uomo che Voleva Insegnare ai Pesci a Volare%';