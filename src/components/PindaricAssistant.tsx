import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, Plane, Send, X, Loader2, PenSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { sendMessageToAnthropic } from '../lib/anthropic';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

// Risposte tematiche per diversi argomenti
const responses = {
  careers: [
    "🎭 Abbiamo delle posizioni aperte molto interessanti! Al momento cerchiamo:\n\n" +
    "• Domatori di Idee Selvagge - Per trasformare pensieri sconclusionati in storie memorabili\n" +
    "• Voci Narranti con un Tocco di Follia - Per dare vita ai nostri podcast surreali\n\n" +
    "Ti interessa? Visita la nostra sezione [Careers](/careers) per tutti i dettagli e per candidarti!",
    
    "🎪 Fantastico che tu voglia unirti alla nostra famiglia di sognatori! Abbiamo posizioni creative uniche:\n\n" +
    "• Content Creator per i nostri voli pindarici\n" +
    "• Narratori per i nostri podcast\n\n" +
    "Dai un'occhiata alla sezione [Lavora con Noi](/careers) per scoprire tutti i benefici assurdi che offriamo!",
    
    "✨ Cerchiamo persone che sappiano pensare fuori dagli schemi! Se ami l'assurdo e hai una passione per la creatività, " +
    "potresti essere la persona giusta per noi. Visita la [sezione Careers](/careers) per vedere tutte le posizioni aperte " +
    "e i fantastici benefit che offriamo, come la pausa caffè quantistica e l'unicorno aziendale!",
    
    "🚀 Vuoi far parte di un'azienda dove la normalità è bandita? Perfetto! Stiamo cercando:\n\n" +
    "• Creativi visionari\n" +
    "• Narratori di storie impossibili\n" +
    "• Esperti in viaggi dell'immaginazione\n\n" +
    "Scopri tutte le opportunità nella nostra [sezione Careers](/careers)!"
  ],
  destinations: [
    "✈️ Ho trovato alcuni voli pindarici interessanti:\n\n" +
    "• [Economy](/low-cost) - Per principianti del nonsense\n" +
    "• [Business Class](/business-class) - Esperienze surreali di prima classe\n" +
    "• [Trasporti Pubblici](/trasporti-pubblici) - Avventure quotidiane straordinarie\n" +
    "• [Ufficio IT](/ufficio-informatico) - Viaggi digitali unici",
    
    "🌅 Che tipo di viaggio stai cercando? Abbiamo diverse categorie:\n\n" +
    "• [Economy](/low-cost) - Voli pindarici accessibili a tutti\n" +
    "• [Business Class](/business-class) - Per esperti sognatori\n" +
    "• [Trasporti Pubblici](/trasporti-pubblici) - Dove la realtà supera la fantasia\n" +
    "• [Ufficio IT](/ufficio-informatico) - Per viaggi nel cyberspazio"
  ],
  about: [
    "🌈 Siamo VoliPindarici.com, il primo portale dedicato ai viaggi dell'immaginazione! " +
    "Scopri di più su di noi nella sezione [Chi Siamo](/chi-siamo) e [Perché Noi](/perche-noi).",
    
    "🎪 La nostra missione? Rendere il mondo più surreale, un volo pindarico alla volta. " +
    "Scopri la nostra storia nella sezione [Chi Siamo](/chi-siamo)!",
    
    "💫 Siamo specializzati in destinazioni impossibili e itinerari surreali. " +
    "Leggi di più su di noi e la nostra filosofia nella sezione [Perché Noi](/perche-noi)!"
  ],
  help: [
    "🎯 Posso aiutarti a trovare il volo pindarico perfetto! Dai un'occhiata alle nostre [offerte speciali](/offerte) " +
    "o esplora le nostre diverse categorie di viaggio.",
    
    "💡 Vuoi suggerire un nuovo volo pindarico? Usa la sezione [Suggerisci Volo](/submit) " +
    "per condividere la tua idea con noi!",
    
    "🤝 Posso aiutarti a scoprire cosa rende unici i nostri voli pindarici! " +
    "Visita la sezione [Perché Noi](/perche-noi) per saperne di più."
  ]
};

// Suggerimenti rapidi per l'utente
const quickSuggestions = [
  "Raccontami delle vostre destinazioni",
  "Vorrei lavorare con voi",
  "Chi siete?",
  "Mostrami le offerte del momento"
];

export function PindaricAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        type: 'assistant', 
        content: "✨ Benvenuto a bordo del nostro Assistente di Volo Pindarico!\n\n" +
          "Sono qui per guidarti attraverso i nostri voli dell'immaginazione e aiutarti a trovare " +
          "la destinazione impossibile perfetta per te.\n\n" +
          "Come posso rendere il tuo viaggio più surreale oggi? 🌈"
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getResponseCategory = (input: string): keyof typeof responses => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('lavor') || lowercaseInput.includes('carriera') || 
        lowercaseInput.includes('posizion') || lowercaseInput.includes('candidat')) {
      return 'careers';
    }
    if (lowercaseInput.includes('destinazion') || lowercaseInput.includes('viaggio') || 
        lowercaseInput.includes('volo') || lowercaseInput.includes('meta')) {
      return 'destinations';
    }
    if (lowercaseInput.includes('chi siete') || lowercaseInput.includes('azienda') || 
        lowercaseInput.includes('about') || lowercaseInput.includes('chi sono')) {
      return 'about';
    }
    return 'help';
  };

  const handleLinkClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const formatMessageWithLinks = (content: string) => {
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [_, text, href] = linkMatch;
        return (
          <button
            key={index}
            onClick={() => handleLinkClick(href)}
            className="text-primary hover:underline"
          >
            {text}
          </button>
        );
      }
      return part;
    });
  };

  const getRandomResponse = (category: keyof typeof responses) => {
    const categoryResponses = responses[category];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    return categoryResponses[randomIndex];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const response = await sendMessageToAnthropic([
        ...messages,
        { type: 'user', content: userMessage }
      ]);

      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "Mi dispiace, si è verificato un errore. Riprova più tardi." 
      }]);
    } finally {
      setIsTyping(false);
      setTimeout(() => setShowSuggestions(true), 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50",
      "flex flex-col items-end"
    )}>
      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "bg-white rounded-lg shadow-xl w-96 mb-4 border border-slate-200",
          "flex flex-col",
          minimized ? "h-14" : "h-[600px]"
        )}>
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Plane size={24} />
              <span className="font-semibold">Assistente di Volo Pindarico</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                {minimized ? <MessageSquare size={20} /> : <PenSquare size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.type === 'user'
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-900"
                        )}
                      >
                        {message.type === 'assistant' 
                          ? formatMessageWithLinks(message.content)
                          : message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-900 rounded-lg p-3 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        <span>L'assistente sta scrivendo...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Suggestions */}
              {showSuggestions && !isTyping && (
                <div className="border-t border-slate-200 p-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-sm px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 bg-white shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Chiedi qualcosa di assurdo..."
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                    disabled={isTyping}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Sparkles size={24} />
        </button>
      )}
    </div>
  );
}