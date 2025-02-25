import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { ThumbsUp, ThumbsDown, MessageCircle, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { AuthModal } from './AuthModal';

interface ArticleProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  image?: string;
  isFeatured?: boolean;
}

export function Article({ id, title, content, author, date, image, isFeatured = false }: ArticleProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [articleComments, setArticleComments] = useState<any[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!isFeatured) {
      loadInteractions();
    } else {
      setIsLoading(false);
    }
  }, [id, isFeatured]);

  async function loadInteractions() {
    setIsLoading(true);
    try {
      // Load votes
      const { data: votesData } = await supabase
        .from('votes')
        .select('type, user_id')
        .eq('article_id', id);

      if (votesData) {
        const likesCount = votesData.filter(v => v.type === 'like').length;
        const dislikesCount = votesData.filter(v => v.type === 'dislike').length;
        setLikes(likesCount);
        setDislikes(dislikesCount);

        // Check current user's vote
        if (user) {
          const userVoteData = votesData.find(v => v.user_id === user.id);
          setUserVote(userVoteData?.type as 'like' | 'dislike' | null);
        }
      }

      // Load comments
      const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', id)
        .order('created_at', { ascending: false });

      if (commentsData) {
        setComments(commentsData.length);
        setArticleComments(commentsData);
      }
    } catch (error) {
      console.error('Error loading interactions:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVote(type: 'like' | 'dislike') {
    if (isFeatured) return;
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      if (userVote === type) {
        // Remove vote
        await supabase
          .from('votes')
          .delete()
          .eq('article_id', id)
          .eq('user_id', user.id);
        
        setUserVote(null);
        type === 'like' ? setLikes(l => l - 1) : setDislikes(d => d - 1);
      } else {
        // If there was a previous vote, remove it
        if (userVote) {
          await supabase
            .from('votes')
            .delete()
            .eq('article_id', id)
            .eq('user_id', user.id);
          
          userVote === 'like' ? setLikes(l => l - 1) : setDislikes(d => d - 1);
        }

        // Add new vote
        await supabase
          .from('votes')
          .insert([
            {
              article_id: id,
              user_id: user.id,
              type
            }
          ]);

        setUserVote(type);
        type === 'like' ? setLikes(l => l + 1) : setDislikes(d => d + 1);
      }
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (isFeatured) return;
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            article_id: id,
            user_id: user.id,
            content: commentText
          }
        ])
        .select();

      if (error) throw error;

      setCommentText('');
      setComments(c => c + 1);
      setArticleComments([data[0], ...articleComments]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  const getOptimizedImageUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      return `${url}&q=80&w=${window.innerWidth <= 768 ? '800' : '1920'}`;
    }
    return url;
  };

  return (
    <article className="card">
      {image && (
        <div className="mb-6 -mx-6 -mt-6">
          <img 
            src={getOptimizedImageUrl(image)}
            alt={title} 
            className="w-full h-96 md:h-[500px] object-cover rounded-t-xl" 
            loading="lazy"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-slate-500 mb-4 text-sm md:text-base flex-wrap">
        <MapPin size={18} />
        <span>Destinazione Immaginaria</span>
        <span className="mx-2">•</span>
        <Clock size={18} />
        <span>{format(date, "d MMMM yyyy", { locale: it })}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">{title}</h2>
      <div className="text-sm text-slate-500 mb-4">
        <span>Guida: {author || 'Anonimo'}</span>
      </div>
      <div className="text-slate-700 mb-6 whitespace-pre-wrap">
        {content}
      </div>
      {!isFeatured && (
        <>
          <div className="flex items-center gap-4 md:gap-6 text-slate-600 mb-6 flex-wrap">
            <button 
              className={`flex items-center gap-1 transition-colors ${
                userVote === 'like' ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={() => handleVote('like')}
              disabled={isLoading}
            >
              <ThumbsUp size={18} />
              <span>{likes}</span>
            </button>
            <button 
              className={`flex items-center gap-1 transition-colors ${
                userVote === 'dislike' ? 'text-red-600' : 'hover:text-red-600'
              }`}
              onClick={() => handleVote('dislike')}
              disabled={isLoading}
            >
              <ThumbsDown size={18} />
              <span>{dislikes}</span>
            </button>
            <button 
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              onClick={() => user ? setShowCommentForm(!showCommentForm) : setShowAuthModal(true)}
            >
              <MessageCircle size={18} />
              <span>{comments}</span>
            </button>
          </div>

          {showCommentForm && (
            <div className="border-t border-slate-200 pt-6">
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  className="form-input mb-4"
                  rows={3}
                  placeholder="Scrivi un commento..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary">
                  Invia commento
                </button>
              </form>

              <div className="space-y-4">
                {articleComments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-500 mb-2">
                      {format(new Date(comment.created_at), "d MMMM yyyy, HH:mm", { locale: it })}
                    </div>
                    <p className="text-slate-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
          />
        </>
      )}
    </article>
  );
}