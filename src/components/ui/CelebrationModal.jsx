import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export const CelebrationModal = () => {
  const { celebrateFact, dismissCelebration } = useGameStore();

  if (!celebrateFact) return null;

  return (
    <div
      onClick={dismissCelebration}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 7, 5, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '1.5rem',
        cursor: 'pointer',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        className="card pulse"
        style={{
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          borderColor: '#10B981',
          boxShadow: '0 0 60px rgba(16,185,129,0.7)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(13,9,7,0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 900, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Sparkles size={24} /> {celebrateFact.title} <CheckCircle2 size={24} />
        </div>

        <h1 style={{ fontSize: '3.6rem', fontWeight: 900, color: '#10B981', margin: '0.8rem 0', fontFamily: 'var(--font-mono)', textShadow: '0 0 35px rgba(16,185,129,0.9)' }}>
          {celebrateFact.statement}
        </h1>

        <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.7rem 1.4rem', borderRadius: '30px', backgroundColor: '#10B981', color: '#FFF', fontWeight: 800, fontSize: '1rem' }}>
          Touche pour continuer ⚡
        </div>
      </div>
    </div>
  );
};
