import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Disc3 } from 'lucide-react';

export const StreakBadge = () => {
  const { streak } = useGameStore();

  return (
    <div className="badge badge-pink pulse" style={{ borderColor: streak > 0 ? 'var(--kpop-pink)' : 'var(--border)' }}>
      <Disc3 size={14} className={streak > 0 ? "animate-spin" : ""} color={streak > 0 ? 'var(--kpop-pink)' : 'var(--text-muted)'} />
      <span style={{ color: streak > 0 ? '#FF007A' : 'var(--text-muted)', fontWeight: 800 }}>
        {streak}x Combo
      </span>
    </div>
  );
};
