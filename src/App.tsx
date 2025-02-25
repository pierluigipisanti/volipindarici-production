import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { GalassieMentali } from './pages/GalassieMentali';
import { ViaggiLavoro } from './pages/ViaggiLavoro';
import { FugaRealta } from './pages/FugaRealta';
import { FuturoAlternativo } from './pages/FuturoAlternativo';
import { MontagneRusse } from './pages/MontagneRusse';
import { MarteExpress } from './pages/MarteExpress';
import { ViaggiQuotidiani } from './pages/ViaggiQuotidiani';
import { SubmitFlight } from './pages/SubmitFlight';
import { AdminDashboard } from './pages/AdminDashboard';
import { Careers } from './pages/Careers';
import { ChiSiamo } from './pages/ChiSiamo';
import { Offerte } from './pages/Offerte';
import { PerchéNoi } from './pages/PerchéNoi';
import { PindaricAssistant } from './components/PindaricAssistant';
import { AnthropicTest } from './components/AnthropicTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galassie-mentali" element={<GalassieMentali />} />
            <Route path="/viaggi-lavoro" element={<ViaggiLavoro />} />
            <Route path="/fuga-realta" element={<FugaRealta />} />
            <Route path="/futuro-alternativo" element={<FuturoAlternativo />} />
            <Route path="/montagne-russe" element={<MontagneRusse />} />
            <Route path="/marte-express" element={<MarteExpress />} />
            <Route path="/viaggi-quotidiani" element={<ViaggiQuotidiani />} />
            <Route path="/submit" element={<SubmitFlight />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/offerte" element={<Offerte />} />
            <Route path="/perche-noi" element={<PerchéNoi />} />
            <Route path="/test-anthropic" element={<AnthropicTest />} />
          </Routes>
        </main>
        <Footer />
        <PindaricAssistant />
      </div>
    </Router>
  );
}

export default App;