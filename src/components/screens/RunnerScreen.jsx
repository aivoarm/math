import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { fireConfetti } from '../../lib/confetti';
import { Home, Zap, RotateCcw } from 'lucide-react';

export const RunnerScreen = () => {
  const { setScreen } = useGameStore();

  const [question, setQuestion] = useState({ qText: '7 × 8', choices: [54, 56, 64], answer: 56 });
  const [activeLane, setActiveLane] = useState(1);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 14) + 11;
    const b = Math.floor(Math.random() * 14) + 11;
    const ans = a * b;
    const fakes = [ans - (Math.floor(Math.random() * 8) + 4), ans + (Math.floor(Math.random() * 12) + 6)].sort(() => Math.random() - 0.5);
    const choices = [ans, fakes[0], fakes[1]].sort(() => Math.random() - 0.5);

    setQuestion({
      qText: `${a} × ${b}`,
      choices,
      answer: ans
    });
  };

  const handlePassGate = () => {
    const selectedAnswer = question.choices[activeLane];
    if (selectedAnswer === question.answer) {
      useGameStore.getState().triggerCelebration(`${question.qText} = ${question.answer}`);
      setScore((s) => s + 1);
      useGameStore.setState((s) => ({ xp: s.xp + 15 }));
      generateQuestion();
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#F97316', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={18} /> 🏃 Shinobi Runner (Obstacle Dash)
        </span>
      </div>

      {!isGameOver && (
        <div className="card" style={{ borderColor: '#F97316', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2>Place le Ninja dans la bonne porte d'accès !</h2>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#F97316', margin: '0.5rem 0' }}>
            {question.qText} = ?
          </h1>

          {/* 3 Lanes Runner Field */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', height: '220px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border)' }}>
            {[0, 1, 2].map((laneIdx) => (
              <div
                key={laneIdx}
                onClick={() => setActiveLane(laneIdx)}
                style={{
                  borderRadius: '12px',
                  backgroundColor: activeLane === laneIdx ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
                  border: activeLane === laneIdx ? '2px solid #F97316' : '1px dashed rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
                  🚪 {question.choices[laneIdx]}
                </div>
                {activeLane === laneIdx && (
                  <div style={{ fontSize: '2.5rem' }}>🥷</div>
                )}
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{ padding: '0.9rem', backgroundColor: '#F97316', borderColor: '#F97316', fontSize: '1.1rem' }} onClick={handlePassGate}>
            ⚡ Fonce à travers la porte !
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderColor: '#F97316' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F97316' }}>💥 Obstacle Heurté !</h2>
          <h3>Portes franchies : {score}</h3>
          <button className="btn-primary" style={{ padding: '0.8rem', backgroundColor: '#F97316' }} onClick={() => { setIsGameOver(false); setScore(0); generateQuestion(); }}>
            <RotateCcw size={16} /> Recommencer Course
          </button>
        </div>
      )}
    </div>
  );
};
