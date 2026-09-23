import React from 'react';
import { useGameStore } from './store/gameStore';
import { translations } from './lib/i18n';
import { XPBar } from './components/ui/XPBar';
import { StreakBadge } from './components/ui/StreakBadge';
import { HomeScreen } from './components/screens/HomeScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DoneScreen } from './components/screens/DoneScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ReflexesScreen } from './components/screens/ReflexesScreen';
import { MemoryScreen } from './components/screens/MemoryScreen';
import { TargetRushScreen } from './components/screens/TargetRushScreen';
import { CascadeScreen } from './components/screens/CascadeScreen';
import { ScaleBalanceScreen } from './components/screens/ScaleBalanceScreen';
import { WordleMathScreen } from './components/screens/WordleMathScreen';
import { PathfinderScreen } from './components/screens/PathfinderScreen';
import { RunnerScreen } from './components/screens/RunnerScreen';
import { Home, Gamepad2, User, Zap } from 'lucide-react';

export function App() {
  const { currentScreen, setScreen, lang } = useGameStore();
  const t = translations[lang];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Mobile Top Navigation Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.8rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border)' }}>
        <XPBar />
        <StreakBadge />
      </header>

      {/* Main Mobile Screen Router Viewport */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'game' && <GameScreen />}
        {currentScreen === 'done' && <DoneScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
        {currentScreen === 'reflexes' && <ReflexesScreen />}
        {currentScreen === 'memory' && <MemoryScreen />}
        {currentScreen === 'target' && <TargetRushScreen />}
        {currentScreen === 'cascade' && <CascadeScreen />}
        {currentScreen === 'balance' && <ScaleBalanceScreen />}
        {currentScreen === 'wordle' && <WordleMathScreen />}
        {currentScreen === 'pathfinder' && <PathfinderScreen />}
        {currentScreen === 'runner' && <RunnerScreen />}
      </main>

      {/* Mobile App Bottom Tab Bar Navigation */}
      <nav className="mobile-bottom-nav">
        <button 
          className={`nav-item ${currentScreen === 'home' ? 'active' : ''}`}
          onClick={() => setScreen('home')}
        >
          <Home size={20} />
          <span>Accueil</span>
        </button>

        <button 
          className={`nav-item ${currentScreen === 'reflexes' ? 'active' : ''}`}
          onClick={() => setScreen('reflexes')}
        >
          <Zap size={20} />
          <span>Réflexes</span>
        </button>

        <button 
          className={`nav-item ${['target', 'cascade', 'runner', 'balance', 'wordle', 'pathfinder', 'memory'].includes(currentScreen) ? 'active' : ''}`}
          onClick={() => setScreen('home')}
        >
          <Gamepad2 size={20} />
          <span>Jeux</span>
        </button>

        <button 
          className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
          onClick={() => setScreen('profile')}
        >
          <User size={20} />
          <span>Profil</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
