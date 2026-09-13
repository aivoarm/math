import React from 'react';

const CHOICE_EMOJIS = ["🎤", "🎸", "🎧", "🎹"];

export const ChoiceGrid = ({ choices, selectedChoice, isCorrect, correctAnswer, onSelect }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '1.2rem' }}>
      {choices.map((choice, idx) => {
        const isSelected = selectedChoice === choice;
        const isThisCorrectAnswer = choice === correctAnswer;
        const emoji = CHOICE_EMOJIS[idx % CHOICE_EMOJIS.length];
        
        let background = 'rgba(20, 14, 45, 0.85)';
        let borderColor = 'var(--border)';
        let textColor = 'var(--text)';
        let transform = 'none';

        if (selectedChoice !== null) {
          if (isSelected) {
            if (isCorrect) {
              background = 'var(--kpop-mint-glow)';
              borderColor = 'var(--kpop-mint)';
              textColor = 'var(--kpop-mint)';
              transform = 'scale(1.05)';
            } else {
              background = 'rgba(255, 0, 122, 0.25)';
              borderColor = 'var(--kpop-pink)';
              textColor = '#FF66B2';
            }
          } else if (isThisCorrectAnswer) {
            background = 'var(--kpop-mint-glow)';
            borderColor = 'var(--kpop-mint)';
            textColor = 'var(--kpop-mint)';
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
              boxShadow: isSelected && isCorrect ? '0 0 20px var(--kpop-mint)' : '0 4px 15px rgba(0,0,0,0.3)',
              opacity: selectedChoice !== null && !isSelected && !isThisCorrectAnswer ? 0.35 : 1
            }}
          >
            <span>{emoji}</span>
            <span>{choice}</span>
            {isSelected && isCorrect && <span>🎉</span>}
          </button>
        );
      })}
    </div>
  );
};
