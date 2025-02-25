import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Phone, Mail, Crown, PenSquare, Briefcase, Info, Bus, Laptop } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Plane size={24} className="text-primary" />
              <span className="text-xl font-semibold">Voli Pindarici</span>
            </div>
            <p className="text-slate-400">
              Esplora destinazioni straordinarie con la compagnia aerea più immaginativa d'Italia
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Servizi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/low-cost" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Plane size={18} />
                  <span>Economy</span>
                </Link>
              </li>
              <li>
                <Link to="/business-class" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Crown size={18} />
                  <span>Business Class</span>
                </Link>
              </li>
              <li>
                <Link to="/trasporti-pubblici" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Bus size={18} />
                  <span>Trasporti Pubblici</span>
                </Link>
              </li>
              <li>
                <Link to="/ufficio-informatico" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Laptop size={18} />
                  <span>Ufficio IT</span>
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <PenSquare size={18} />
                  <span>Suggerisci un Volo</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Briefcase size={18} />
                  <span>Lavora con Noi</span>
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Info size={18} />
                  <span>Chi Sono</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Orari Centro Prenotazioni</h3>
            <p className="text-slate-400">Lunedì - Venerdì: 9:00 - 19:00</p>
            <p className="text-slate-400">Sabato: 10:00 - 16:00</p>
            <p className="text-slate-400">Domenica: Solo emergenze</p>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Contatti</h3>
            <div className="flex items-center justify-center md:justify-end gap-2 mb-2 text-slate-400">
              <MapPin size={20} />
              <span>Viale dei Sogni Lucidi, 42° Piano delle Nuvole di Zucchero Filato</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 mb-2 text-slate-400">
              <Phone size={20} />
              <span>+⚷ 42-555-123456</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 text-slate-400">
              <Mail size={20} />
              <span>info@volipindarici.com</span>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Voli Pindarici - Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}