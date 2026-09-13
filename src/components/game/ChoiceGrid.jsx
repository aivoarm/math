import React from 'react';

const NINJA_EMOJIS = ["🌀", "🍃", "🗡️", "🍥"];

export const ChoiceGrid = ({ choices, selectedChoice, isCorrect, correctAnswer, onSelect }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '1.2rem' }}>
      {choices.map((choice, idx) => {
        const isSelected = selectedChoice === choice;
        const isThisCorrectAnswer = choice === correctAnswer;
        const emoji = NINJA_EMOJIS[idx % NINJA_EMOJIS.length];
        
        let background = 'rgba(28, 19, 14, 0.9)';
        let borderColor = 'var(--border)';
        let textColor = 'var(--text)';
        let transform = 'none';

        if (selectedChoice !== null) {
          if (isSelected) {
            if (isCorrect) {
              background = 'var(--naruto-blue-glow)';
              borderColor = 'var(--naruto-blue)';
              textColor = 'var(--naruto-blue)';
              transform = 'scale(1.05)';
            } else {
              background = 'rgba(230, 57, 70, 0.25)';
              borderColor = 'var(--naruto-red)';
              textColor = '#FF6B6B';
            }
          } else if (isThisCorrectAnswer) {
            background = 'var(--naruto-blue-glow)';
            borderColor = 'var(--naruto-blue)';
            textColor = 'var(--naruto-blue)';
          }
        }

        return (
          <button
            key={idx}
            disabled={selectedChoice !== null}
            onClick={() => onSelect(choice)}
            style={{
              background,
              border: `2px solid ${borderColor}`,
              color: textColor,
              padding: '1.3rem 1rem',
              borderRadius: 'var(--radius)',
              fontSize: '1.35rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isSelected && isCorrect ? '0 0 20px var(--naruto-blue)' : '0 4px 15px rgba(0,0,0,0.4)',
              opacity: selectedChoice !== null && !isSelected && !isThisCorrectAnswer ? 0.35 : 1
            }}
          >
            <span>{emoji}</span>
            <span>{choice}</span>
            {isSelected && isCorrect && <span>🔥</span>}
          </button>
        );
      })}
    </div>
  );
};
