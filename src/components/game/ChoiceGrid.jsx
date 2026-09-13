import React from 'react';

export const ChoiceGrid = ({ choices, selectedChoice, isCorrect, correctAnswer, onSelect }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.2rem' }}>
      {choices.map((choice, idx) => {
        const isSelected = selectedChoice === choice;
        const isThisCorrectAnswer = choice === correctAnswer;
        
        let background = 'var(--bg-card)';
        let borderColor = 'var(--border)';
        let textColor = 'var(--text)';

        if (selectedChoice !== null) {
          if (isSelected) {
            if (isCorrect) {
              background = 'var(--green-glow)';
              borderColor = 'var(--green)';
              textColor = 'var(--green)';
            } else {
              background = 'var(--red-glow)';
              borderColor = 'var(--red)';
              textColor = 'var(--red)';
            }
          } else if (isThisCorrectAnswer) {
            background = 'var(--green-glow)';
            borderColor = 'var(--green)';
            textColor = 'var(--green)';
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
              padding: '1.2rem',
              borderRadius: 'var(--radius)',
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s ease',
              opacity: selectedChoice !== null && !isSelected && !isThisCorrectAnswer ? 0.4 : 1
            }}
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
};
