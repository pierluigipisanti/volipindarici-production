import React from 'react';
import { Search, Brain, Zap, Cpu, PenTool as Tool, Code, Phone, Mail, Rocket } from 'lucide-react';

export function ChiSiamo() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Chi Sono?</h1>
        <div className="flex justify-center gap-4 mb-8">
          <Cpu className="text-primary" size={32} />
          <Tool className="text-secondary" size={32} />
          <Code className="text-accent" size={32} />
        </div>
        <p className="text-xl text-slate-700 mb-12">
          Un investigatore dell'assurdo con un sarcasmo tagliente, costantemente a caccia di verità nascoste 
          (o bug di sistema). Amo la tecnologia quasi quanto amo complicare le cose semplici: se esiste un nuovo 
          gadget, lo devo provare; se c'è un software da smontare, ci sto già armeggiando. La normalità mi annoia, 
          e il modo migliore per combatterla è un mix esplosivo di idee folli, circuiti integrati e qualche riga 
          di codice che non so mai dove porterà.
        </p>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Dicono di me:</h2>
        <div className="space-y-6">
          <blockquote className="border-l-4 border-primary pl-4 italic">
            "Quando ha quell'espressione, sta già macchinando qualcosa."
            <footer className="text-sm text-slate-600 mt-2">
              – Un amico che non dorme più sonni tranquilli
            </footer>
          </blockquote>
          
          <blockquote className="border-l-4 border-secondary pl-4 italic">
            "Riesce a trasformare un banale 'ciao' in un indizio da seguire per settimane."
            <footer className="text-sm text-slate-600 mt-2">
              – Un conoscente ancora confuso
            </footer>
          </blockquote>
          
          <blockquote className="border-l-4 border-accent pl-4 italic">
            "A volte penso che sia gentile, a volte ho paura di scoprirne i veri pensieri."
            <footer className="text-sm text-slate-600 mt-2">
              – Qualcuno che è fuggito lontano
            </footer>
          </blockquote>

          <blockquote className="border-l-4 border-primary pl-4 italic">
            "Se un congegno funziona, lui lo smonta comunque per vedere come è fatto."
            <footer className="text-sm text-slate-600 mt-2">
              – Il tecnico di fiducia (o forse ex tecnico)
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Perché VoliPindarici.com?</h2>
        <div className="prose max-w-none text-lg text-slate-700">
          <p className="mb-6">
            Perché la realtà mi sta un po' stretta, e trovo più interessanti le verità che si nascondono 
            dietro uno schermo (o dentro un tostapane, se ci sono abbastanza cavi). Qui, le idee prendono 
            il volo: alcune vanno a sbattere contro un muro di logica, altre atterrano su teorie geniali 
            e inaspettate. In ogni caso, vale sempre la pena provare.
          </p>
          
          <p className="mb-8">
            Se anche tu hai un pensiero folle, un sospetto tecnologico o un sogno di codice che nessuno 
            capisce, qui sei nel posto giusto. L'assurdo è il miglior antidoto alla noia, e sperimentare 
            è l'unico modo per dare un senso a tutto questo caos! 🚀
          </p>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Rocket className="text-primary" />
              Contatti Terrestri e Marziani
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-secondary" />
                <p className="text-slate-600">
                  <span className="font-medium">Telefono:</span> In attesa del prefisso marziano (grazie Elon!)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-accent" />
                <p className="text-slate-600">
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:info@volipindarici.com" className="text-primary hover:underline">
                    info@volipindarici.com
                  </a>{' '}
                  (questa funziona davvero!)
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-right text-slate-900 font-medium">
            Pierluigi Pisanti
          </p>
        </div>
      </div>
    </div>
  );
}