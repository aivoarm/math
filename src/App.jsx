import React, { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { translations } from './lib/i18n';
import { XPBar } from './components/ui/XPBar';
import { StreakBadge } from './components/ui/StreakBadge';
import { HomeScreen } from './components/screens/HomeScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DoneScreen } from './components/screens/DoneScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ExamScreen } from './components/screens/ExamScreen';
import { Scratchpad } from './components/game/Scratchpad';
import { Languages, Edit3 } from 'lucide-react';

export function App() {
  const { currentScreen, lang, toggleLang } = useGameStore();
  const t = translations[lang];
  const [showGlobalScratchpad, setShowGlobalScratchpad] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Header / Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <XPBar />
        <StreakBadge />
        <button 
          className="btn-primary" 
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }} 
          onClick={() => setShowGlobalScratchpad(!showGlobalScratchpad)}
        >
          <Edit3 size={14} /> {showGlobalScratchpad ? 'Masquer Brouillon' : '📝 Brouillon Commun'}
        </button>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={toggleLang}>
          <Languages size={14} /> {t.langSwitch}
        </button>
      </header>

      {/* Global Calculation Scratchpad Overlay */}
      {showGlobalScratchpad && (
        <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'var(--naruto-orange)', boxShadow: '0 0 20px var(--naruto-orange-glow)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--naruto-orange)', marginBottom: '0.5rem' }}>
            📝 Espace Brouillon Commun (Common Calculation Space)
          </h4>
          <Scratchpad problemId="global-common" />
        </div>
      )}

      {/* Screen Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'game' && <GameScreen />}
        {currentScreen === 'done' && <DoneScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
        {currentScreen === 'exam' && <ExamScreen />}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        MathQuête — Conforme au programme PFEQ (Québec)
      </footer>
    </div>
  );
}

export default App;
