import React from 'react';

export const ProgressDots = ({ total, current }) => {
  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', margin: '0.5rem 0 1rem 0' }}>
      {Array.from({ length: total }).map((_, idx) => {
        const active = idx === current;
        const completed = idx < current;
        return (
          <div
            key={idx}
            style={{
              width: active ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: active 
                ? 'var(--cyan)' 
                : completed 
                  ? 'var(--purple)' 
                  : 'var(--border)',
              transition: 'all 0.3s ease'
            }}
          />
        );
      })}
    </div>
  );
};
