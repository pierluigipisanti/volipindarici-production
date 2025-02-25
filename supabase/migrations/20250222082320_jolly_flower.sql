/*
  # Aggiungi policy per la cancellazione degli articoli

  1. Modifiche
    - Aggiunta policy per permettere agli admin di eliminare gli articoli
*/

-- Aggiungi policy per permettere agli admin di eliminare gli articoli
CREATE POLICY "Admins can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@volipindarici.com');