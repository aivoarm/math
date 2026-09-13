import React from 'react';

export const QuestionCard = ({ problem, index, total }) => {
  return (
    <div className="card" style={{ textAlign: 'center', marginBottom: '1.2rem', position: 'relative' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', tracking: '0.05em' }}>
        Question {index + 1} / {total}
      </span>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.8rem 0', fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
        {problem.qDisplay}
      </h2>
    </div>
  );
};
