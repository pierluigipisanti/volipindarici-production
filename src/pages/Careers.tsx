import React, { useState } from 'react';
import { 
  Brain, 
  CloudLightning, 
  Sparkles, 
  Coffee, 
  Rocket, 
  Bird,
  Home,
  Laugh,
  Palette,
  Send,
  Mic
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const benefits = [
  {
    icon: <Rocket size={24} />,
    title: "Voli Pindarici Illimitati",
    description: "Accesso esclusivo a tutti i voli dell'immaginazione, senza limiti di quota"
  },
  {
    icon: <Home size={24} />,
    title: "Lavoro da Dove Vuoi",
    description: "Dalla spiaggia, dalla luna o dal tuo divano preferito"
  },
  {
    icon: <Coffee size={24} />,
    title: "Pausa Caffè Quantistica",
    description: "15 minuti che durano quanto vuoi grazie alla dilatazione temporale"
  },
  {
    icon: <Laugh size={24} />,
    title: "Bonus Risate",
    description: "Pacchetto risate garantite, incluse quelle contagiose"
  },
  {
    icon: <Bird size={24} />,
    title: "Unicorno Aziendale",
    description: "Ogni dipendente riceve un unicorno virtuale da accudire"
  },
  {
    icon: <Palette size={24} />,
    title: "Creatività Senza Limiti",
    description: "Budget illimitato per idee folli e progetti impossibili"
  }
];

const positions = [
  {
    title: "Domatore di Idee Selvagge",
    description: "Sei capace di trasformare pensieri sconclusionati in storie memorabili? Puoi domare un'idea ribelle e portarla dritta alla meta senza perderti in un labirinto mentale? Sai volare alto, ma anche atterrare in piedi? Allora sei la persona che cerchiamo!",
    specialDetails: {
      about: [
        "Siamo VoliPindarici.com, il primo portale interamente dedicato ai voli pindarici, quelli che partono da un'idea geniale e finiscono… chissà dove! Un mix di satira, ironia e pura creatività, con un tocco vintage da vecchio giornale satirico."
      ],
      responsibilities: [
        "Inventare e strutturare contenuti surreali, divertenti e originali per il nostro sito e i nostri podcast",
        "Scrivere articoli, sceneggiature e post che facciano ridere, pensare e alzare un sopracciglio per la sorpresa",
        "Curare la sezione Offerte e Perché Noi, trasformando il nonsense in qualcosa di quasi credibile",
        "Collaborare con voci narranti per creare podcast che facciano sorridere anche i più seriosi"
      ],
      requirements: [
        "Fantasia senza freni (ma con la capacità di dare una direzione al caos)",
        "Ottima capacità di scrittura, preferibilmente con un tono ironico e brillante",
        "Esperienza in storytelling, satira, comicità o creazione di contenuti digitali",
        "Attitudine al pensiero laterale (se pensi in linea retta, non è il posto per te)",
        "Gradita esperienza in podcasting, sceneggiatura o stand-up comedy"
      ],
      benefits: [
        "Per ora è un progetto no-profit, quindi niente soldi (neanche in metafore, anche se sarebbe poetico). Ma chissà, in futuro potremmo volare alto insieme!",
        "Libertà creativa assoluta, senza censura su voli pindarici troppo arditi",
        "Possibilità di sperimentare con podcast, formati narrativi e idee fuori dagli schemi",
        "Un ambiente di lavoro surreale (nel senso buono, promettiamo)"
      ],
      howToApply: {
        email: "info@volipindarici.com",
        requirements: [
          "Un breve testo di presentazione pindarico (lascia stare le formalità)",
          "Un tuo articolo, testo, sceneggiatura o qualsiasi prova che dimostri il tuo talento",
          "Se hai già creato podcast, video o doppiaggi, mandaci un link"
        ],
        subject: "Domatore di Idee Selvagge – Il Mondo è Pronto?"
      }
    }
  },
  {
    title: "Voce Narrante con un Tocco di Follia",
    description: "Ti piace raccontare storie? Hai una voce che incanta, diverte o ipnotizza? Sei capace di recitare con la stessa convinzione sia un monologo epico che il menu della pizzeria sotto casa? Allora potresti essere la voce perfetta per VoliPindarici.com, il portale dedicato ai voli pindarici più assurdi, geniali e ironici della rete!",
    specialDetails: {
      responsibilities: [
        "Darai voce ai nostri racconti surreali trasformandoli in podcast irresistibili",
        "Interpreterai personaggi, narrerai situazioni assurde e magari, se capita, fingerai di essere un GPS impazzito nel traffico di una città distopica",
        "Ti divertirai. Tanto"
      ],
      requirements: [
        "Persone con voce espressiva e capacità interpretativa",
        "Amanti dell'ironia, del sarcasmo e dell'assurdo",
        "Esperienza nel doppiaggio o nella narrazione? Ottimo! Nessuna esperienza ma una voce magnetica? Ottimo lo stesso!",
        "Se hai già registrato qualcosa, mandaci un audio demo (anche la lista della spesa va bene, se letta con pathos)",
        "Puoi registrare da casa, con un buon microfono e un ambiente silenzioso (non accettiamo registrazioni con sottofondo di aspirapolvere o suocere che brontolano)",
        "Sarai pagato in base ai progetti completati… oppure in applausi virtuali, meme personalizzati e eterna gratitudine"
      ],
      howToApply: {
        email: "info@volipindarici.com",
        requirements: [
          "Una tua breve presentazione",
          "Un demo audio (o link a lavori precedenti)",
          "Una frase a caso detta con estrema drammaticità (es. \"Mi è finito il Wi-Fi e ora vivo nel Medioevo\")"
        ]
      }
    }
  }
];

export function Careers() {
  const [formData, setFormData] = useState({
    position: '',
    name: '',
    email: '',
    superpower: '',
    whyYou: '',
    craziestIdea: '',
    audioDemoUrl: '',
    portfolioUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          position: formData.position,
          name: formData.name,
          email: formData.email,
          superpower: formData.superpower,
          why_you: formData.whyYou,
          craziest_idea: formData.craziestIdea,
          audio_demo_url: formData.audioDemoUrl || null,
          portfolio_url: formData.portfolioUrl || null
        }]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        position: '',
        name: '',
        email: '',
        superpower: '',
        whyYou: '',
        craziestIdea: '',
        audioDemoUrl: '',
        portfolioUrl: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Brain size={48} className="text-primary" />
            <CloudLightning size={24} className="absolute -top-2 -right-2 text-secondary" />
            <Sparkles size={24} className="absolute -bottom-2 -left-2 text-accent" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Lavora nel Mondo dei Sogni
        </h1>
        <p className="text-xl text-slate-600">
          Cerchiamo menti creative, spiriti liberi e sognatori professionisti
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit, index) => (
          <div key={index} className="card">
            <div className="flex items-center gap-3 mb-3 text-primary">
              {benefit.icon}
              <h3 className="font-semibold text-lg text-slate-900">
                {benefit.title}
              </h3>
            </div>
            <p className="text-slate-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Posizioni Aperte
        </h2>
        <div className="space-y-6">
          {positions.map((position, index) => (
            <div key={index} className="card">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                {position.title}
              </h3>
              <p className="text-slate-600 mb-6">{position.description}</p>
              
              <div className="space-y-6">
                {position.specialDetails.about && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">🔹 Chi siamo?</h4>
                    {position.specialDetails.about.map((text, i) => (
                      <p key={i} className="text-slate-600">{text}</p>
                    ))}
                  </div>
                )}

                {position.specialDetails.responsibilities && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">🔹 Cosa farai?</h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {position.specialDetails.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-slate-800 mb-2">🔹 Chi cerchiamo?</h4>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    {position.specialDetails.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {position.specialDetails.benefits && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">🔹 Cosa offriamo?</h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {position.specialDetails.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Candidati per un Viaggio Straordinario
        </h2>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <Sparkles size={48} className="text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">
              La tua candidatura è stata inviata con successo!
            </h3>
            <p className="text-slate-600">
              Ti contatteremo telepaticamente o tramite segnali di fumo quantistici.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-2">
                Posizione
              </label>
              <select
                id="position"
                className="form-input"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              >
                <option value="">Scegli una posizione</option>
                {positions.map((pos) => (
                  <option key={pos.title} value={pos.title}>{pos.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="superpower" className="block text-sm font-medium text-slate-700 mb-2">
                Il Tuo Superpotere
              </label>
              <input
                type="text"
                id="superpower"
                className="form-input"
                value={formData.superpower}
                onChange={(e) => setFormData({ ...formData, superpower: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="whyYou" className="block text-sm font-medium text-slate-700 mb-2">
                Perché Proprio Tu?
              </label>
              <textarea
                id="whyYou"
                rows={4}
                className="form-input"
                value={formData.whyYou}
                onChange={(e) => setFormData({ ...formData, whyYou: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="craziestIdea" className="block text-sm font-medium text-slate-700 mb-2">
                La Tua Idea Più Folle
              </label>
              <textarea
                id="craziestIdea"
                rows={4}
                className="form-input"
                value={formData.craziestIdea}
                onChange={(e) => setFormData({ ...formData, craziestIdea: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="audioDemoUrl" className="block text-sm font-medium text-slate-700 mb-2">
                Link al Demo Audio (opzionale)
              </label>
              <input
                type="url"
                id="audioDemoUrl"
                className="form-input"
                value={formData.audioDemoUrl}
                onChange={(e) => setFormData({ ...formData, audioDemoUrl: e.target.value })}
                placeholder="https://"
              />
            </div>

            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-medium text-slate-700 mb-2">
                Link al Portfolio (opzionale)
              </label>
              <input
                type="url"
                id="portfolioUrl"
                className="form-input"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://"
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 w-full"
              disabled={isSubmitting}
            >
              <Send size={20} />
              <span>{isSubmitting ? 'Invio in corso...' : 'Invia Candidatura'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}