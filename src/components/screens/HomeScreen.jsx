import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { User } from 'lucide-react';

export const HomeScreen = () => {
  const { lang, selectTopic, getAllTopics, setScreen } = useGameStore();
  const t = translations[lang];
  const topics = getAllTopics();

  const games = [
    {
      id: 'pfeq_mission',
      title: '📜 Rouleau Ninja Jutsu',
      badge: 'S-Rank Jutsu',
      color: '#06B6D4',
      desc: 'Épreuves Ninja de calcul guidées pas-à-pas avec résolution interactive.',
      action: () => selectTopic(topics[0]?.meta.id || 'sec1.mental-math')
    },
    {
      id: 'reflexes',
      title: '⚡ Mode Réflexes',
      badge: 'Flash',
      color: 'var(--naruto-orange)',
      desc: 'Rappel ultra-rapide avec minuteur (3s/2s/1s) & multiplicateurs de combo.',
      action: () => setScreen('reflexes')
    },
    {
      id: 'memory',
      title: '🧠 Mémoire Shinobi',
      badge: 'Cartes',
      color: '#A855F7',
      desc: 'Jeu de mémoire visuel et spatial (Matching Pairs d\'équations).',
      action: () => setScreen('memory')
    },
    {
      id: 'target',
      title: '🎯 Target Rush',
      badge: 'Darts',
      color: '#EC4899',
      desc: 'Tire rapidement sur les orbes de Chakra selon la règle active.',
      action: () => setScreen('target')
    },
    {
      id: 'cascade',
      title: '🧱 Cascade Tetris',
      badge: 'Tetris',
      color: '#10B981',
      desc: 'Empile les blocs d\'opérations pour atteindre la cible exacte.',
      action: () => setScreen('cascade')
    },
    {
      id: 'runner',
      title: '🏃 Shinobi Runner',
      badge: 'Course',
      color: '#F97316',
      desc: 'Esquive et franchis les portes de réponse dans une course effrénée.',
      action: () => setScreen('runner')
    },
    {
      id: 'balance',
      title: '⚖️ Balance Algébrique',
      badge: 'Physique',
      color: '#F59E0B',
      desc: 'Équilibre les plateaux de la balance pour trouver la valeur de x.',
      action: () => setScreen('balance')
    },
    {
      id: 'wordle',
      title: '🔠 Math Wordle',
      badge: 'Puzzle',
      color: '#3B82F6',
      desc: 'Devine l\'équation mathématique cachée de 6 caractères.',
      action: () => setScreen('wordle')
    },
    {
      id: 'pathfinder',
      title: '🗺️ Labyrinthe',
      badge: 'Labyrinthe',
      color: '#6366F1',
      desc: 'Trouve le chemin optimal dans la grille vers la sortie.',
      action: () => setScreen('pathfinder')
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Banner */}
      <div 
        className="card" 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: 0, 
          borderColor: 'var(--naruto-orange)',
          boxShadow: '0 0 25px var(--naruto-orange-glow)'
        }}
      >
        <img 
          src="/assets/naruto_hero.png" 
          alt="Naruto Math Hero" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(180deg, rgba(13,9,7,0.2) 0%, rgba(13,9,7,0.9) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 className="naruto-gradient-text" style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t.appTitle}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>{t.subTitle}</p>
            </div>
            <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('profile')}>
              <User size={14} /> {t.profile}
            </button>
          </div>
        </div>
      </div>

      {/* Uniform Game Tiles Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
          🎮 Sélectionne un Mode de Jeu
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {games.map((g) => (
            <div
              key={g.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '10px',
                cursor: 'pointer',
                borderColor: g.color,
                boxShadow: `0 4px 15px rgba(0,0,0,0.3)`
              }}
              onClick={g.action}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge" style={{ backgroundColor: g.color, color: '#FFF' }}>{g.badge}</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#FFF', marginBottom: '4px' }}>
                  {g.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {g.desc}
                </p>
              </div>

              <button className="btn-primary" style={{ padding: '0.5rem', backgroundColor: g.color, borderColor: g.color, width: '100%', fontSize: '0.85rem' }}>
                Lancer ⚡
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
