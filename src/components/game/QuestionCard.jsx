import React from 'react';
import { Sparkles, Music, Star, Disc } from 'lucide-react';

export const QuestionCard = ({ problem, index, total }) => {
  return (
    <div 
      className="card pulse" 
      style={{ 
        textAlign: 'center', 
        marginBottom: '1.2rem', 
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(20,14,45,0.9) 0%, rgba(30,22,64,0.9) 100%)',
        borderColor: 'var(--kpop-pink)',
        boxShadow: '0 0 20px var(--kpop-pink-glow)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--kpop-mint)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', tracking: '0.08em' }}>
        <Music size={14} className="animate-bounce" /> Piste {index + 1} / {total} Stage Beat <Star size={14} fill="var(--kpop-gold)" color="var(--kpop-gold)" />
      </div>

      <h2 style={{ fontSize: '2.8rem', fontWeight: 900, margin: '0.8rem 0', fontFamily: 'var(--font-mono)', color: '#FFF', textShadow: '0 0 15px var(--kpop-pink)' }}>
        ✨ {problem.qDisplay} ✨
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span className="badge badge-mint"><Disc size={12} className="animate-spin" /> Live Stage</span>
        <span className="badge badge-pink"><Sparkles size={12} /> +{problem.xpPerProblem || 15} FP</span>
      </div>
    </div>
  );
};
