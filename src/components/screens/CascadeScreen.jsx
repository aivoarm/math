import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { fireConfetti } from '../../lib/confetti';
import { Home, Layers, RotateCcw } from 'lucide-react';

export const CascadeScreen = () => {
  const { setScreen } = useGameStore();

  const [targetVal, setTargetVal] = useState(24);
  const [currentSum, setCurrentSum] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const [fallingBlocks, setFallingBlocks] = useState([
    { id: 1, val: 5, op: '+' },
    { id: 2, val: 10, op: '+' },
    { id: 3, val: 2, op: '×' },
    { id: 4, val: 4, op: '+' }
  ]);

  const generateTarget = () => {
    const targets = [12, 20, 24, 30, 36, 40, 50, 60, 100];
    return targets[Math.floor(Math.random() * targets.length)];
  };

  const startNewRound = () => {
    const newTarget = generateTarget();
    setTargetVal(newTarget);
    setCurrentSum(0);
    generateBlocks();
  };

  const generateBlocks = () => {
    const ops = ['+', '+', '+', '×'];
    const blocks = [];
    for (let i = 0; i < 5; i++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      const val = op === '×' ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 12) + 1;
      blocks.push({ id: Date.now() + i, val, op });
    }
    setFallingBlocks(blocks);
  };

  const applyBlock = (block) => {
    let nextSum = currentSum;
    if (block.op === '+') nextSum += block.val;
    if (block.op === '×') nextSum *= block.val;

    setCurrentSum(nextSum);
    setFallingBlocks((prev) => prev.filter((b) => b.id !== block.id));

    if (nextSum === targetVal) {
      // EXACT HIT!
      useGameStore.getState().triggerCelebration(`${targetVal} ATTEINT ! 🎉`);
      setScore((s) => s + 1);
      setTimeout(startNewRound, 600);
    } else if (nextSum > targetVal) {
      // BUST
      endGame();
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    const earned = score * 15;
    setXpGained(earned);
    useGameStore.setState((s) => ({ xp: s.xp + earned }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#10B981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={18} /> 🧱 Cascade Ninja (Tetris Arithmetic)
        </span>
      </div>

      {!isGameOver && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ textAlign: 'center', borderColor: '#10B981' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CIBLE À ATTEINDRE EXACTION</span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#10B981', margin: '0.2rem 0' }}>{targetVal}</h1>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: currentSum > targetVal ? '#EF4444' : '#FFF' }}>
              Somme Actuelle : <span style={{ color: 'var(--naruto-gold)' }}>{currentSum}</span>
            </div>
          </div>

          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Empile les blocs de calculs pour atteindre la cible exact !</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
            {fallingBlocks.map((b) => (
              <button
                key={b.id}
                className="btn-primary"
                style={{ padding: '1.2rem', fontSize: '1.6rem', backgroundColor: '#10B981', borderColor: '#10B981', fontWeight: 900 }}
                onClick={() => applyBlock(b)}
              >
                {b.op}{b.val}
              </button>
            ))}
          </div>
          <button className="btn-secondary" style={{ marginTop: '0.5rem' }} onClick={generateBlocks}>
            🔄 Régénérer Blocs
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderColor: '#10B981' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981' }}>🧱 Session Cascade Terminée !</h2>
          <h3>Cibles Réussies : {score}</h3>
          <h3>XP Gagné : +{xpGained} XP</h3>
          <button className="btn-primary" style={{ padding: '0.8rem', backgroundColor: '#10B981', borderColor: '#10B981' }} onClick={() => { setIsGameOver(false); startNewRound(); }}>
            <RotateCcw size={16} /> Recommencer
          </button>
        </div>
      )}
    </div>
  );
};
