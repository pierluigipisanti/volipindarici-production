import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  Crown, 
  LogOut, 
  User, 
  LogIn, 
  ShieldCheck, 
  Plane, 
  PenSquare,
  ChevronDown,
  Tag,
  Heart,
  Brain,
  Briefcase,
  DoorOpen,
  Clock,
  Mountain,
  Rocket,
  Bus
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { AuthModal } from './AuthModal';

export function Header() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const isAdmin = user?.email === 'admin@volipindarici.com';

  const destinations = [
    { path: '/galassie-mentali', icon: <Brain size={20} />, label: '🚀 Galassie Mentali' },
    { path: '/viaggi-lavoro', icon: <Briefcase size={20} />, label: '🧳 Viaggi di Lavoro (Inutili)' },
    { path: '/fuga-realta', icon: <DoorOpen size={20} />, label: '🏝 Fuga dalla Realtà' },
    { path: '/futuro-alternativo', icon: <Clock size={20} />, label: '🔮 Futuro Alternativo' },
    { path: '/montagne-russe', icon: <Mountain size={20} />, label: '🎢 Montagne Russe Emotive' },
    { path: '/marte-express', icon: <Rocket size={20} />, label: '🚀 Marte Express' },
    { path: '/viaggi-quotidiani', icon: <Bus size={20} />, label: '🎭 Viaggi Quotidiani' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="logo-container flex items-center gap-4">
            <img 
              src="https://pierluigipisanti.blog/wp-content/uploads/2025/02/volipindarici_logo.png"
              alt="Voli Pindarici Logo"
              className="h-16 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-sm text-slate-600">Agenzia Viaggi</span>
              <h1 className="text-2xl font-bold text-slate-900">"Voli Pindarici"</h1>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                className="nav-link"
                onClick={() => setShowDestinations(!showDestinations)}
                onBlur={() => setTimeout(() => setShowDestinations(false), 200)}
              >
                <Cloud size={20} />
                <span>Destinazioni</span>
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform ${showDestinations ? 'rotate-180' : ''}`}
                />
              </button>
              {showDestinations && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  {destinations.map((dest) => (
                    <Link
                      key={dest.path}
                      to={dest.path}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      {dest.icon}
                      <span>{dest.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/offerte" className="nav-link">
              <Tag size={20} />
              <span>Offerte</span>
            </Link>
            <Link to="/perche-noi" className="nav-link">
              <Heart size={20} />
              <span>Perché Noi</span>
            </Link>
            <Link to="/submit" className="nav-link">
              <PenSquare size={20} />
              <span>Suggerisci Volo</span>
            </Link>
            {user ? (
              <div className="flex items-center gap-4 ml-4 border-l pl-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <User size={20} />
                  <span className="text-sm">{user.email}</span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ShieldCheck size={20} />
                    <span>Moderazione</span>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Esci</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
              >
                <LogIn size={20} />
                <span>Accedi</span>
              </button>
            )}
          </nav>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
}