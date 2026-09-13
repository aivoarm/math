import React from 'react';
import { useGameStore } from './store/gameStore';
import { translations } from './lib/i18n';
import { XPBar } from './components/ui/XPBar';
import { StreakBadge } from './components/ui/StreakBadge';
import { HomeScreen } from './components/screens/HomeScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DoneScreen } from './components/screens/DoneScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { Languages } from 'lucide-react';

export function App() {
  const { currentScreen, lang, toggleLang } = useGameStore();
  const t = translations[lang];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Header / Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <XPBar />
        <StreakBadge />
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={toggleLang}>
          <Languages size={14} /> {t.langSwitch}
        </button>
      </header>

      {/* Screen Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'game' && <GameScreen />}
        {currentScreen === 'done' && <DoneScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        MathQuête — Conforme au programme PFEQ (Québec)
      </footer>
    </div>
  );
}

export default App;
