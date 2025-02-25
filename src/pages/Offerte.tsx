import React, { useEffect, useState } from 'react';
import { Article } from '../components/Article';
import { supabase } from '../lib/supabase';
import { Tag, Clock } from 'lucide-react';

export function Offerte() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();

    const channel = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        () => {
          loadArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'offers')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-slate-600">Caricamento offerte...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Tag size={64} className="mx-auto text-primary mb-8" />
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Offerte Speciali in Arrivo
        </h1>
        <p className="text-xl text-slate-600 mb-4">
          Al momento non ci sono offerte attive, ma stiamo preparando qualcosa di speciale.
        </p>
        <div className="flex items-center justify-center gap-2 text-slate-500">
          <Clock size={20} />
          <span>Torna presto per scoprire le nostre promozioni!</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 text-center mb-12">Offerte Speciali</h1>
      <p className="text-xl text-slate-600 text-center italic mb-8">
        Voli pindarici a prezzi da sogno: offerte limitate per viaggi illimitati
      </p>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {articles.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            title={article.title}
            content={article.content}
            author={article.author}
            date={new Date(article.created_at)}
            image={article.image_url}
          />
        ))}
      </div>
    </div>
  );
}