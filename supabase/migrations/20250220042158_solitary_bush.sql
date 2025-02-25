/*
  # Seed iniziale degli articoli

  1. Contenuto
    - Aggiunge articoli iniziali per testare il sistema
    - Include esempi per ogni categoria
*/

INSERT INTO articles (title, content, author, image_url, created_at) VALUES
(
  'L''Uomo che Voleva Insegnare ai Pesci a Volare',
  'In una piccola città costiera, un eccentrico inventore ha dedicato gli ultimi vent''anni della sua vita a progettare ali aerodinamiche per pesci. "Se gli uccelli possono nuotare, perché i pesci non possono volare?" sostiene con ferma convinzione...',
  'Leonardo da Pinci',
  'https://images.unsplash.com/photo-1534575180408-b7d7c0136ee8?auto=format&fit=crop&w=800',
  NOW() - INTERVAL '5 days'
),
(
  'Scoperta Sensazionale: Le Nuvole Sono Fatte di Zucchero Filato',
  'Un gruppo di meteorologi golosi ha finalmente dimostrato ciò che molti bambini sospettavano da tempo: le nuvole sono composte al 99% di zucchero filato. La scoperta è avvenuta durante una spedizione in mongolfiera quando...',
  'Maria Sognante',
  'https://images.unsplash.com/photo-1595865749889-b37a43c4eba0?auto=format&fit=crop&w=800',
  NOW() - INTERVAL '4 days'
),
(
  'Come Addestrare una Nuvola Come Animale Domestico',
  'Guida pratica per principianti: tutto quello che dovete sapere per catturare, addestrare e prendervi cura della vostra prima nuvola domestica. Include consigli su come evitare che piova in casa e come gestire i temporali emotivi...',
  'Cirro Cumulo',
  'https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=800',
  NOW() - INTERVAL '3 days'
),
(
  'Il Primo Ristorante per Piante Carnivore Vegane',
  'Un innovativo imprenditore ha aperto il primo ristorante al mondo dedicato alle piante carnivore che hanno scelto uno stile di vita vegano. Il menu include tofu a forma di mosca e tempeh che imita perfettamente il sapore delle farfalle...',
  'Flora Mangiatutto',
  'https://images.unsplash.com/photo-1525923838299-2312b60f6d69?auto=format&fit=crop&w=800',
  NOW() - INTERVAL '2 days'
),
(
  'Studio Rivela: I Pensieri Pesanti Galleggiano Meglio di Quelli Leggeri',
  'Una ricerca rivoluzionaria condotta presso l''Università dell''Impossibile ha dimostrato che, contrariamente a quanto si credeva, i pensieri più pesanti hanno una maggiore capacità di galleggiamento nell''etere cosmico. La scoperta potrebbe rivoluzionare l''industria della meditazione quantistica...',
  'Prof. Pensatore Profondo',
  'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=800',
  NOW() - INTERVAL '1 day'
),
(
  'Brevettato il Primo Sistema di Traduzione Telepatica per Gatti',
  'Dopo decenni di ricerca nel campo della comunicazione felina, un team di scienziati ha sviluppato un dispositivo in grado di tradurre i pensieri dei gatti in 27 lingue diverse. Le prime traduzioni rivelano che i gatti pensano principalmente a conquistare il mondo mentre dormono...',
  'Dott.ssa Micia Mente',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800',
  NOW()
);