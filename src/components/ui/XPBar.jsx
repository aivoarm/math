import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, Crown } from 'lucide-react';

export const XPBar = () => {
  const { xp, level } = useGameStore();
  const currentLevelXp = xp % 100;

  const ranks = ["Trainee 🌱", "Debut Idol 🎤", "Rookie Star 🌟", "Main Vocal 👑", "Global Superstar 💎"];
  const currentRank = ranks[Math.min(level - 1, ranks.length - 1)];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
      <div className="badge badge-gold pulse" style={{ whiteSpace: 'nowrap' }}>
        <Crown size={14} /> {currentRank}
      </div>
      <div style={{ flex: 1, height: '12px', background: 'rgba(20, 14, 45, 0.9)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div 
          style={{
            height: '100%',
            width: `${currentLevelXp}%`,
            background: 'linear-gradient(90deg, var(--kpop-pink) 0%, var(--kpop-mint) 100%)',
            boxShadow: '0 0 10px var(--kpop-pink)',
            transition: 'width 0.4s ease'
          }} 
        />
      </div>
      <span style={{ fontSize: '0.8rem', color: '#FF66B2', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Sparkles size={12} /> {xp} FP
      </span>
    </div>
  );
};
