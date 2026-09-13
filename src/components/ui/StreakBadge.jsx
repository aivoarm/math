import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Flame } from 'lucide-react';

export const StreakBadge = () => {
  const { streak } = useGameStore();

  return (
    <div className="badge badge-orange pulse" style={{ borderColor: streak > 0 ? 'var(--naruto-orange)' : 'var(--border)' }}>
      <Flame size={14} className={streak > 0 ? "animate-bounce" : ""} color={streak > 0 ? 'var(--naruto-orange)' : 'var(--text-muted)'} />
      <span style={{ color: streak > 0 ? 'var(--naruto-orange)' : 'var(--text-muted)', fontWeight: 800 }}>
        {streak}x Jutsu
      </span>
    </div>
  );
};
