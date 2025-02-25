import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { AuthModal } from '../components/AuthModal';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function SubmitFlight() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    category: 'galassie_mentali' as 'galassie_mentali' | 'viaggi_lavoro' | 'fuga_realta' | 'futuro_alternativo' | 'montagne_russe' | 'marte_express' | 'viaggi_quotidiani' | 'offers'
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = {
    galassie_mentali: '🚀 Galassie Mentali',
    viaggi_lavoro: '🧳 Viaggi di Lavoro (Inutili)',
    fuga_realta: '🏝 Fuga dalla Realtà',
    futuro_alternativo: '🔮 Futuro Alternativo',
    montagne_russe: '🎢 Montagne Russe Emotive',
    marte_express: '🚀 Marte Express',
    viaggi_quotidiani: '🎭 Viaggi Quotidiani',
    offers: '🏷️ Offerte Speciali'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('articles')
        .insert([
          {
            ...formData,
            author: user.email,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      navigate('/', { 
        state: { 
          message: 'Il tuo volo pindarico è stato inviato ed è in attesa di approvazione.' 
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">
        Invia il tuo Volo Pindarico
      </h1>
      <p className="text-center text-slate-600 mb-8">
        Il tuo volo sarà sottoposto a moderazione prima di essere pubblicato
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Titolo del Volo
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
            Categoria
          </label>
          <select
            id="category"
            className="form-input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof formData.category })}
            required
          >
            {Object.entries(categories).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
            Il tuo Volo Pindarico
          </label>
          <textarea
            id="content"
            rows={6}
            className="form-input"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-2">
            URL Immagine (opzionale)
          </label>
          <input
            type="url"
            id="image_url"
            className="form-input"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://..."
          />
          <p className="mt-2 text-sm text-slate-500">
            Inserisci l'URL di un'immagine che rappresenti il tuo volo pindarico
          </p>
        </div>

        <button 
          type="submit" 
          className="btn-primary flex items-center gap-2 w-full justify-center"
          disabled={isSubmitting}
        >
          <Send size={20} />
          <span>{isSubmitting ? 'Invio in corso...' : 'Fai Decollare'}</span>
        </button>
      </form>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}