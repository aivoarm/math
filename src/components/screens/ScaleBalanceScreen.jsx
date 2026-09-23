import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { fireConfetti } from '../../lib/confetti';
import { Home, Scale, CheckCircle2, RotateCcw } from 'lucide-react';

export const ScaleBalanceScreen = () => {
  const { setScreen } = useGameStore();

  const [a, setA] = useState(2);
  const [b, setB] = useState(6);
  const [rightVal, setRightVal] = useState(20);
  const [userX, setUserX] = useState(1);
  const [isBalanced, setIsBalanced] = useState(false);
  const [score, setScore] = useState(0);

  const generatePuzzle = () => {
    const coeff = Math.floor(Math.random() * 4) + 2;
    const targetX = Math.floor(Math.random() * 8) + 1;
    const constant = Math.floor(Math.random() * 10) + 1;
    const right = coeff * targetX + constant;

    setA(coeff);
    setB(constant);
    setRightVal(right);
    setUserX(1);
    setIsBalanced(false);
  };

  const currentLeftVal = a * userX + b;
  const isMatch = currentLeftVal === rightVal;

  const handleCheck = () => {
    if (isMatch) {
      fireConfetti();
      setIsBalanced(true);
      setScore((s) => s + 1);
      useGameStore.setState((s) => ({ xp: s.xp + 20 }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#F59E0B', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Scale size={18} /> ⚖️ Balance Algébrique Ninja
        </span>
      </div>

      <div className="card" style={{ borderColor: '#F59E0B', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <h2>Ajuste le poids de X pour équilibrer la balance !</h2>

        {/* Visual Balance Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: '2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
          {/* Left Pan */}
          <div style={{ flex: 1, textAlign: 'center', transform: `translateY(${(rightVal - currentLeftVal) * 2}px)`, transition: 'transform 0.3s ease' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PLATEAU GAUCHE</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>
              {a}x + {b}
            </h2>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>Valeur = {currentLeftVal}</div>
          </div>

          {/* Scale Fulcrum Center */}
          <div style={{ fontSize: '3rem', margin: '0 1rem' }}>⚖️</div>

          {/* Right Pan */}
          <div style={{ flex: 1, textAlign: 'center', transform: `translateY(${(currentLeftVal - rightVal) * 2}px)`, transition: 'transform 0.3s ease' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PLATEAU DROITE</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#10B981' }}>
              {rightVal}
            </h2>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>Valeur = {rightVal}</div>
          </div>
        </div>

        {/* Adjust Slider for X */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '350px', margin: '0 auto', width: '100%' }}>
          <label style={{ fontWeight: 800, fontSize: '1.2rem' }}>Valeur de X = {userX}</label>
          <input
            type="range"
            min="1"
            max="12"
            value={userX}
            onChange={(e) => setUserX(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#F59E0B', height: '8px', cursor: 'pointer' }}
          />
        </div>

        {!isBalanced ? (
          <button className="btn-primary" style={{ padding: '0.8rem', backgroundColor: '#F59E0B', borderColor: '#F59E0B', fontSize: '1.1rem' }} onClick={handleCheck}>
            ⚖️ Vérifier l'Équilibre
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div style={{ color: '#10B981', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={24} /> ÉQUILIBRE PARFAIT ! x = {userX}
            </div>
            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#F59E0B' }} onClick={generatePuzzle}>
              Épreuve Suivante <RotateCcw size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
