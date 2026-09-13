import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Zap, Flame } from 'lucide-react';

export const XPBar = () => {
  const { xp, level } = useGameStore();
  const currentLevelXp = xp % 100;

  const ranks = ["Academy Trainee 🍃", "Genin 🗡️", "Chunin 📜", "Jonin ⚡", "Hokage 🌀"];
  const currentRank = ranks[Math.min(level - 1, ranks.length - 1)];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
      <div className="badge badge-yellow pulse" style={{ whiteSpace: 'nowrap' }}>
        <Flame size={14} color="var(--naruto-orange)" /> {currentRank}
      </div>
      <div style={{ flex: 1, height: '12px', background: 'rgba(28, 19, 14, 0.95)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div 
          style={{
            height: '100%',
            width: `${currentLevelXp}%`,
            background: 'linear-gradient(90deg, var(--naruto-orange) 0%, var(--naruto-yellow) 100%)',
            boxShadow: '0 0 12px var(--naruto-orange)',
            transition: 'width 0.4s ease'
          }} 
        />
      </div>
      <span style={{ fontSize: '0.8rem', color: 'var(--naruto-orange)', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Zap size={12} /> {xp} 術
      </span>
    </div>
  );
};
