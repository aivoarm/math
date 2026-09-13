import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { QuestionCard } from '../game/QuestionCard';
import { ChoiceGrid } from '../game/ChoiceGrid';
import { StepBreakdown } from '../game/StepBreakdown';
import { HintPanel } from '../game/HintPanel';
import { ProgressDots } from '../ui/ProgressDots';
import { ArrowRight, Home } from 'lucide-react';

export const GameScreen = () => {
  const {
    currentTopic,
    currentProblemIndex,
    selectedChoice,
    isCorrect,
    submitAnswer,
    nextProblem,
    lang,
    setScreen
  } = useGameStore();

  const t = translations[lang];
  const problem = currentTopic.problems[currentProblemIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <button 
          className="btn-secondary" 
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          onClick={() => setScreen('home')}
        >
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {lang === 'fr' ? currentTopic.meta.titleFr : currentTopic.meta.titleEn}
        </span>
      </div>

      <ProgressDots total={currentTopic.problems.length} current={currentProblemIndex} />

      <QuestionCard 
        problem={problem} 
        index={currentProblemIndex} 
        total={currentTopic.problems.length} 
      />

      <ChoiceGrid
        choices={problem.choices}
        selectedChoice={selectedChoice}
        isCorrect={isCorrect}
        correctAnswer={problem.answer}
        onSelect={submitAnswer}
      />

      {selectedChoice === null && <HintPanel />}

      {selectedChoice !== null && (
        <>
          <StepBreakdown
            strategy={problem.strategy[lang] || problem.strategy.fr}
            steps={problem.steps}
            isCorrect={isCorrect}
            lang={lang}
          />

          <button className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }} onClick={nextProblem}>
            {t.nextProblem} <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};
