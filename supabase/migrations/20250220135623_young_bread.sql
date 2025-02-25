/*
  # Aggiornamento immagini degli articoli

  1. Modifiche
    - Aggiorna gli URL delle immagini degli articoli esistenti con link più affidabili da Unsplash
*/

UPDATE articles 
SET image_url = CASE 
  WHEN title LIKE '%L''Uomo che Voleva Insegnare ai Pesci a Volare%' 
    THEN 'https://images.unsplash.com/photo-1544352448-3b666f421e25?auto=format&fit=crop&w=1920'
  WHEN title LIKE '%Le Nuvole Sono Fatte di Zucchero Filato%' 
    THEN 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920'
  WHEN title LIKE '%Come Addestrare una Nuvola Come Animale Domestico%' 
    THEN 'https://images.unsplash.com/photo-1495756111155-45cb19b8aeee?auto=format&fit=crop&w=1920'
  WHEN title LIKE '%Il Primo Ristorante per Piante Carnivore Vegane%' 
    THEN 'https://images.unsplash.com/photo-1530968033775-2c92736b131e?auto=format&fit=crop&w=1920'
  WHEN title LIKE '%Studio Rivela: I Pensieri Pesanti Galleggiano Meglio%' 
    THEN 'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?auto=format&fit=crop&w=1920'
  WHEN title LIKE '%Brevettato il Primo Sistema di Traduzione Telepatica%' 
    THEN 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1920'
  ELSE image_url
END
WHERE image_url IS NOT NULL;