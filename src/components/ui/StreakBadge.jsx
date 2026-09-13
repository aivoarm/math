import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Flame } from 'lucide-react';

export const StreakBadge = () => {
  const { streak } = useGameStore();

  return (
    <div className="badge badge-cyan pulse" style={{ borderColor: streak > 0 ? 'var(--amber)' : 'var(--border)' }}>
      <Flame size={14} color={streak > 0 ? 'var(--amber)' : 'var(--text-muted)'} />
      <span style={{ color: streak > 0 ? 'var(--amber)' : 'var(--text-muted)' }}>
        {streak}
      </span>
    </div>
  );
};
