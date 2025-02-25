import React, { useEffect, useState } from 'react';
import { Article } from '../components/Article';
import { Carousel } from '../components/Carousel';
import { supabase, checkSupabaseConnection, handleSupabaseError } from '../lib/supabase';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1920',
    title: 'Voli Pindarici First Class',
    description: 'Viaggia nell\'immaginazione con il massimo del comfort'
  },
  {
    url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1920',
    title: 'Destinazioni Oniriche',
    description: 'Esplora mete che esistono solo nei tuoi sogni più audaci'
  },
  {
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920',
    title: 'Voli Low Cost dell\'Immaginazione',
    description: 'Viaggi mentali accessibili a tutti i sognatori'
  }
];

const featuredDestinations = [
  {
    id: 'pindaric-first',
    title: 'Volo Pindarico First Class: La Via Lattea Personale',
    content: `Benvenuti a bordo del nostro volo pindarico di prima classe, dove ogni pensiero è una stella e ogni idea una galassia da esplorare!

Servizi Esclusivi:
• Sedili reclinabili fino all'infinito
• Menu degustazione di sapori impossibili
• Biblioteca di sogni ad occhi aperti
• Finestre panoramiche sull'immaginazione
• Assistente di volo personale per guidare i vostri pensieri

Durata del volo: Quanto desiderate
Bagaglio consentito: Tutti i vostri sogni più audaci
Dress code: Eleganza onirica

Prenotate ora il vostro posto tra le stelle dell'immaginazione!`,
    author: 'Comandante dei Sogni',
    date: new Date(),
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1920'
  },
  {
    id: 'dream-express',
    title: 'Dream Express: Il Treno dei Pensieri Volanti',
    content: `Salite a bordo del Dream Express, il primo treno che viaggia sui binari dell'immaginazione! Un'esperienza unica dove ogni carrozza è una nuova avventura mentale.

Caratteristiche del viaggio:
• Carrozze panoramiche con vista sui vostri sogni
• Sala meditazione con nuvole di cotone
• Ristorante delle idee creative
• Cabina del tempo elastico
• Vagone biblioteca con libri che si scrivono da soli

Fermate principali:
1. Stazione della Fantasia
2. Piattaforma dei Ricordi Futuri
3. Terminal delle Idee Brillanti

Biglietto valido per infinite fermate nell'immaginazione!`,
    author: 'Capotreno dei Sogni',
    date: new Date(),
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1920'
  },
  {
    id: 'pindaric-economy',
    title: 'Volo Pindarico Economy: Avventure per Tutti',
    content: `Scoprite il modo più accessibile per viaggiare con la mente! I nostri voli pindarici economy offrono un'esperienza completa per chi vuole iniziare a esplorare i territori dell'immaginazione.

Incluso nel prezzo:
• Posto a sedere nelle nuvole dei pensieri
• Snack di idee creative
• Intrattenimento mentale illimitato
• Guida turistica dell'impossibile
• Assicurazione contro la perdita di fantasia

Promozione speciale:
Prenota ora e ricevi in omaggio un kit del perfetto sognatore!

Note di viaggio:
- Partenza: Dal momento in cui chiudi gli occhi
- Arrivo: Quando la realtà ti richiama
- Scali: Infiniti mondi possibili`,
    author: 'Responsabile Voli Economy',
    date: new Date(),
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920'
  }
];

export function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      setError(null);
      
      // Check connection first
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
      
      if (!connected) {
        setError('Non è stato possibile connettersi al database. Verranno mostrati solo gli articoli in evidenza.');
        setArticles(featuredDestinations);
        setLoading(false);
        return;
      }

      const data = await handleSupabaseError(
        () => supabase
          .from('articles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false }),
        []
      );

      setArticles([...featuredDestinations, ...(data || [])]);
    } catch (error) {
      console.error('Error loading articles:', error);
      setError('Si è verificato un errore nel caricamento degli articoli. Verranno mostrati solo gli articoli in evidenza.');
      setArticles(featuredDestinations);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-slate-600">Preparazione del volo in corso...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-16">
        <Carousel images={carouselImages} />
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {!isConnected && (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-yellow-50 text-yellow-600 rounded-lg">
          Modalità offline: vengono mostrati solo gli articoli in evidenza
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">I Nostri Voli Pindarici</h2>
        <p className="text-xl text-slate-600">
          Scegli la tua classe di viaggio e preparati a spiccare il volo con la mente
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {articles.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            title={article.title}
            content={article.content}
            author={article.author}
            date={new Date(article.created_at || article.date)}
            image={article.image_url || article.image}
            isFeatured={!article.created_at}
          />
        ))}
      </div>
    </div>
  );
}