import React from 'react';
import { Sparkles, Heart, Users, Lightbulb } from 'lucide-react';

export function PerchéNoi() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Perché Noi?</h1>
        <div className="flex justify-center gap-4 mb-8">
          <Sparkles className="text-primary" size={32} />
          <Heart className="text-secondary" size={32} />
          <Lightbulb className="text-accent" size={32} />
        </div>
      </div>

      <div className="prose max-w-none text-lg text-slate-700">
        <p className="mb-6">
          Nel frastuono quotidiano, tra impegni e responsabilità, capita di perdere il sorriso e la capacità di stupirci. 
          È facile restare con i piedi troppo saldi a terra, dimenticando che un pizzico di ironia può alleggerire anche 
          le giornate più pesanti.
        </p>

        <p className="mb-6">
          Noi di VoliPindarici.com crediamo che la fantasia sia un antidoto al grigiore e che una risata, anche breve, 
          possa trasformare la prospettiva su tutto il resto. Creiamo voli pindarici per offrirti un momento di sollievo, 
          un'occasione per staccare la mente da problemi e scadenze e riscoprire il gusto di sorridere.
        </p>

        <p className="mb-8">
          Non lo facciamo solo per scherzo: dietro ogni racconto assurdo c'è l'idea che la creatività sia uno strumento potente. 
          Un pensiero bizzarro, una metafora buffa o un'immagine surreale possono diventare un trampolino per nuove idee, 
          un modo per affrontare la realtà con un pizzico di coraggio in più.
        </p>

        <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Perché noi? Perché qui troverai:</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Spensieratezza</h3>
                <p>Un rifugio dove concederti di volare con la mente, senza giudizi.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Users className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Comunità</h3>
                <p>Uno spazio in cui condividere voli pindarici, strappare un sorriso agli altri e scoprire che non siamo mai soli nel desiderio di leggerezza.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Lightbulb className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Stimoli</h3>
                <p>Racconti, idee e contenuti che, dietro l'assurdo, nascondono un invito a guardare le cose da angolazioni inaspettate.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-6">
          Prendersi sul serio può essere utile, ma prendersi sempre sul serio può diventare un peso. Noi preferiamo viaggiare leggeri, 
          con la valigia piena di immaginazione e la voglia di contagiare chiunque ci incontri.
        </p>

        <p className="mb-6">
          Se anche tu senti il bisogno di una piccola fuga dal quotidiano, VoliPindarici.com è pronto a darti il benvenuto: 
          un luogo in cui sorridere, inventare e ricordare che la vita, con un po' di ironia, può essere più leggera.
        </p>
      </div>
    </div>
  );
}