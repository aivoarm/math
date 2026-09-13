import React from 'react';
import { PartyPopper, Flame, Sparkles } from 'lucide-react';

export const StepBreakdown = ({ strategy, steps, isCorrect, lang }) => {
  return (
    <div 
      className="card" 
      style={{
        borderColor: isCorrect ? 'var(--kpop-mint)' : 'var(--kpop-gold)',
        background: isCorrect ? 'var(--kpop-mint-glow)' : 'rgba(255, 215, 0, 0.12)',
        marginBottom: '1.2rem',
        animation: 'pulseGlow 0.4s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
        {isCorrect ? (
          <PartyPopper color="var(--kpop-mint)" size={22} className="animate-bounce" />
        ) : (
          <Flame color="var(--kpop-gold)" size={22} />
        )}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: isCorrect ? 'var(--kpop-mint)' : 'var(--kpop-gold)' }}>
          {isCorrect 
            ? (lang === 'fr' ? '💖 DAEBAK ! PERFORMANCE PARFAITE 🌟' : '💖 DAEBAK! PERFECT PERFORMANCE 🌟')
            : (lang === 'fr' ? '⚡ Chorégraphie de Révision (Méthode)' : '⚡ Revision Choreo (Method)')}
        </h4>
      </div>

      <p style={{ fontSize: '0.98rem', color: 'var(--text)', marginBottom: '0.8rem', fontStyle: 'italic', fontWeight: 600 }}>
        {strategy}
      </p>

      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.95rem', 
              color: 'var(--kpop-pink)', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} color="var(--kpop-gold)" /> {step}
          </div>
        ))}
      </div>
    </div>
  );
};
