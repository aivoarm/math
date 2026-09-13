import React from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

export const StepBreakdown = ({ strategy, steps, isCorrect, lang }) => {
  return (
    <div 
      className="card" 
      style={{
        borderColor: isCorrect ? 'var(--green)' : 'var(--amber)',
        background: isCorrect ? 'var(--green-glow)' : 'rgba(245, 158, 11, 0.1)',
        marginBottom: '1.2rem',
        animation: 'pulseGlow 0.5s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
        {isCorrect ? (
          <CheckCircle2 color="var(--green)" size={20} />
        ) : (
          <XCircle color="var(--amber)" size={20} />
        )}
        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
          {lang === 'fr' ? 'Méthode recommandée' : 'Recommended Strategy'}
        </h4>
      </div>

      <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.8rem', fontStyle: 'italic' }}>
        {strategy}
      </p>

      <div style={{ background: 'var(--bg-card)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        {steps.map((step, idx) => (
          <div key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--cyan)', margin: '4px 0' }}>
            → {step}
          </div>
        ))}
      </div>
    </div>
  );
};
