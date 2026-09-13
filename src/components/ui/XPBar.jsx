import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Zap } from 'lucide-react';

export const XPBar = () => {
  const { xp, level } = useGameStore();
  const currentLevelXp = xp % 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
      <div className="badge badge-purple" style={{ whiteSpace: 'nowrap' }}>
        <Zap size={14} /> Niv. {level}
      </div>
      <div style={{ flex: 1, height: '10px', background: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
        <div 
          style={{
            height: '100%',
            width: `${currentLevelXp}%`,
            background: 'linear-gradient(90deg, var(--purple) 0%, var(--cyan) 100%)',
            transition: 'width 0.4s ease'
          }} 
        />
      </div>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {xp} XP
      </span>
    </div>
  );
};
