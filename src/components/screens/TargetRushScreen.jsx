import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { fireConfetti } from '../../lib/confetti';
import { Home, Target, RotateCcw, Flame } from 'lucide-react';

export const TargetRushScreen = () => {
  const { lang, setScreen, recordFactResult } = useGameStore();
  const t = translations[lang];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timer, setTimer] = useState(30);
  const [xpGained, setXpGained] = useState(0);

  // Target Rule & Orbs state
  const [rule, setRule] = useState({ titleFr: 'Multiples de 6', check: (n) => n % 6 === 0 });
  const [orbs, setOrbs] = useState([]);

  const rulesList = [
    { id: 'mult3', titleFr: 'Multiples de 3', titleEn: 'Multiples of 3', check: (n) => n % 3 === 0 },
    { id: 'mult4', titleFr: 'Multiples de 4', titleEn: 'Multiples of 4', check: (n) => n % 4 === 0 },
    { id: 'mult6', titleFr: 'Multiples de 6', titleEn: 'Multiples of 6', check: (n) => n % 6 === 0 },
    { id: 'mult7', titleFr: 'Multiples de 7', titleEn: 'Multiples of 7', check: (n) => n % 7 === 0 },
    { id: 'squares', titleFr: 'Carrés Parfaits', titleEn: 'Perfect Squares', check: (n) => Number.isInteger(Math.sqrt(n)) },
    { id: 'even', titleFr: 'Nombres Pairs', titleEn: 'Even Numbers', check: (n) => n % 2 === 0 }
  ];

  const startGame = () => {
    const selectedRule = rulesList[Math.floor(Math.random() * rulesList.length)];
    setRule(selectedRule);
    setScore(0);
    setMisses(0);
    setTimer(30);
    setOrbs([]);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  // Timer Countdown
  useEffect(() => {
    let interval = null;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  // Orb Spawner loop
  useEffect(() => {
    let spawnInterval = null;
    if (isPlaying && !isGameOver) {
      spawnInterval = setInterval(() => {
        const val = Math.floor(Math.random() * 60) + 1;
        const newOrb = {
          id: Date.now() + Math.random(),
          val,
          top: Math.floor(Math.random() * 70) + 15, // 15% to 85%
          left: Math.floor(Math.random() * 70) + 15,
          scale: 1
        };
        setOrbs((prev) => [...prev.slice(-6), newOrb]);
      }, 1100);
    }
    return () => clearInterval(spawnInterval);
  }, [isPlaying, isGameOver]);

  const handleOrbTap = (orb) => {
    const isCorrect = rule.check(orb.val);
    setOrbs((prev) => prev.filter((o) => o.id !== orb.id));

    if (isCorrect) {
      useGameStore.getState().triggerCelebration(`${orb.val} ✅ (${rule.titleFr || rule.titleEn})`);
      setScore((s) => s + 1);
    } else {
      setMisses((m) => m + 1);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    const earnedXp = Math.max(10, score * 10 - misses * 5);
    setXpGained(earnedXp);
    useGameStore.setState((s) => ({ xp: s.xp + earnedXp }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#EC4899', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Target size={18} /> 🥷 Target Rush (Chakra Darts)
        </span>
      </div>

      {!isPlaying && !isGameOver && (
        <div className="card" style={{ borderLeft: '5px solid #EC4899', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>🥷 Ninja Target Rush</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Une règle s'affiche à l'écran. Clique ou touche rapidement SEULEMENT les orbes de Chakra qui respectent la règle avant la fin du temps !
          </p>
          <button className="btn-primary" style={{ padding: '0.9rem', backgroundColor: '#EC4899', borderColor: '#EC4899', fontSize: '1.1rem' }} onClick={startGame}>
            🎯 Lancer la Session Darts (30s)
          </button>
        </div>
      )}

      {isPlaying && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ color: '#EC4899', fontWeight: 800 }}>⏱️ Temps : {timer}s</div>
            <div style={{ fontWeight: 800, color: 'var(--naruto-gold)' }}>🎯 Score : {score}</div>
            <div style={{ fontWeight: 800, color: '#EF4444' }}>❌ Ratés : {misses}</div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '1rem', borderColor: '#EC4899' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Règle Active</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#EC4899', margin: '0.3rem 0' }}>
              {lang === 'fr' ? rule.titleFr : rule.titleEn}
            </h2>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '320px', background: 'rgba(15,10,25,0.8)', borderRadius: '16px', border: '2px dashed rgba(236,72,153,0.3)', overflow: 'hidden' }}>
            {orbs.map((orb) => (
              <button
                key={orb.id}
                onClick={() => handleOrbTap(orb)}
                style={{
                  position: 'absolute',
                  top: `${orb.top}%`,
                  left: `${orb.left}%`,
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #EC4899, #831843)',
                  border: '3px solid #F472B6',
                  color: '#FFF',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(236,72,153,0.6)',
                  transform: 'translate(-50%, -50%)',
                  transition: 'transform 0.1s ease'
                }}
              >
                {orb.val}
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderColor: '#EC4899' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#EC4899' }}>🎯 Session Darts Terminée !</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <div><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cibles Touchées</span><h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{score}</h3></div>
            <div><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Erreurs</span><h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#EF4444' }}>{misses}</h3></div>
            <div><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>XP Gagné</span><h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--naruto-gold)' }}>+{xpGained} XP</h3></div>
          </div>
          <button className="btn-primary" style={{ padding: '0.8rem', backgroundColor: '#EC4899', borderColor: '#EC4899' }} onClick={startGame}>
            <RotateCcw size={16} /> Recommencer
          </button>
        </div>
      )}
    </div>
  );
};
