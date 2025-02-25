import React, { useEffect, useState } from 'react';
import { Article } from '../components/Article';
import { supabase } from '../lib/supabase';

export function ViaggiQuotidiani() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'viaggi_quotidiani')
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
        <div className="text-slate-600">Caricamento articoli...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 text-center mb-12">Viaggi Quotidiani</h1>
      <p className="text-xl text-slate-600 text-center italic mb-8">
        Quando la routine diventa un'avventura straordinaria
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
        {articles.length === 0 && (
          <div className="text-center text-slate-500 py-12">
            Nessun articolo disponibile in questa categoria
          </div>
        )}
      </div>
    </div>
  );
}