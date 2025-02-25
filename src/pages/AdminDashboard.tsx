import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, Filter, Clock, Tag, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
  category: 'galassie_mentali' | 'viaggi_lavoro' | 'fuga_realta' | 'futuro_alternativo' | 'montagne_russe' | 'marte_express' | 'viaggi_quotidiani' | 'offers';
  status: 'pending' | 'approved' | 'rejected';
}

const CATEGORIES = {
  galassie_mentali: '🚀 Galassie Mentali',
  viaggi_lavoro: '🧳 Viaggi di Lavoro (Inutili)',
  fuga_realta: '🏝 Fuga dalla Realtà',
  futuro_alternativo: '🔮 Futuro Alternativo',
  montagne_russe: '🎢 Montagne Russe Emotive',
  marte_express: '🚀 Marte Express',
  viaggi_quotidiani: '🎭 Viaggi Quotidiani',
  offers: '🏷️ Offerte Speciali'
};

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'admin@volipindarici.com') {
      navigate('/');
      return;
    }

    loadArticles();

    const channel = supabase.channel('admin-articles')
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
  }, [user, filter, navigate]);

  async function loadArticles() {
    try {
      setError(null);
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      setError('Errore nel caricamento degli articoli. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  }

  async function handleArticleModeration(
    articleId: string, 
    approved: boolean, 
    category: Article['category']
  ) {
    try {
      setError(null);
      const { error } = await supabase
        .from('articles')
        .update({ 
          status: approved ? 'approved' : 'rejected',
          moderated_at: new Date().toISOString(),
          moderator: user?.email,
          category: category
        })
        .eq('id', articleId);

      if (error) throw error;
      
      // Aggiorna la lista degli articoli
      loadArticles();
    } catch (error) {
      console.error('Error moderating article:', error);
      setError('Errore durante la moderazione dell\'articolo. Riprova più tardi.');
    }
  }

  async function handleCategoryUpdate(articleId: string, category: Article['category']) {
    try {
      setError(null);
      const { error } = await supabase
        .from('articles')
        .update({ category })
        .eq('id', articleId);

      if (error) throw error;
      
      // Aggiorna la lista degli articoli
      loadArticles();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Errore durante l\'aggiornamento della categoria. Riprova più tardi.');
    }
  }

  async function handleDeleteArticle(articleId: string) {
    if (!confirm('Sei sicuro di voler eliminare questo articolo? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      setError(null);
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;
      
      // Aggiorna la lista degli articoli
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Errore durante l\'eliminazione dell\'articolo. Riprova più tardi.');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-slate-600">Caricamento articoli...</div>
      </div>
    );
  }

  if (!user || user.email !== 'admin@volipindarici.com') {
    return null;
  }

  const pendingCount = articles.filter(a => a.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard Moderazione</h1>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg">
              <AlertTriangle size={20} />
              <span>{pendingCount} in attesa</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-slate-400" />
          <select
            className="form-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterStatus)}
          >
            <option value="all">Tutti gli articoli</option>
            <option value="pending">In attesa</option>
            <option value="approved">Approvati</option>
            <option value="rejected">Rifiutati</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  {article.title}
                </h2>
                <div className="text-sm text-slate-500">
                  Autore: {article.author} • Inviato il:{' '}
                  {new Date(article.created_at).toLocaleDateString('it-IT')}
                </div>
                <div className="mt-2 flex gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    article.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    article.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {article.status === 'pending' ? 'In attesa' :
                     article.status === 'approved' ? 'Approvato' :
                     'Rifiutato'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-end gap-2">
                  <select
                    className="form-input w-64"
                    value={article.category}
                    onChange={(e) => {
                      const newCategory = e.target.value as Article['category'];
                      handleCategoryUpdate(article.id, newCategory);
                    }}
                  >
                    {Object.entries(CATEGORIES).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    {article.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleArticleModeration(article.id, true, article.category)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check size={20} />
                          <span>Approva</span>
                        </button>
                        <button
                          onClick={() => handleArticleModeration(article.id, false, article.category)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X size={20} />
                          <span>Rifiuta</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Elimina articolo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <div className="text-slate-700 whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <div className="text-center text-slate-600 py-12">
            Nessun articolo da mostrare
          </div>
        )}
      </div>
    </div>
  );
}