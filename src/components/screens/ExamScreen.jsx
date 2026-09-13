import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { examData, generatePart1Problems, generatePart2Problems } from '../../content/exam-data';
import { Scratchpad } from '../game/Scratchpad';
import { Timer, RotateCcw, CheckCircle, Home, Gift, Check, X, Award, Shuffle } from 'lucide-react';

export const ExamScreen = () => {
  const { lang, setScreen } = useGameStore();
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('part1'); // 'part1' | 'part2'
  const [part1Problems, setPart1Problems] = useState(() => generatePart1Problems());
  const [part2Problems, setPart2Problems] = useState(() => generatePart2Problems());

  const [answers, setAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(examData.part1.targetSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);

  const currentPartMeta = activeTab === 'part1' ? examData.part1 : examData.part2;
  const currentProblems = activeTab === 'part1' ? part1Problems : part2Problems;

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isSubmitted]);

  const handleReset = () => {
    // Generate fresh new random problems on reset!
    if (activeTab === 'part1') {
      setPart1Problems(generatePart1Problems());
    } else {
      setPart2Problems(generatePart2Problems());
    }

    setAnswers({});
    setIsSubmitted(false);
    setScoreReport(null);
    setTimerSeconds(currentPartMeta.targetSeconds);
    setIsTimerRunning(false);
  };

  const handleTabChange = (partKey) => {
    setActiveTab(partKey);
    setAnswers({});
    setIsSubmitted(false);
    setScoreReport(null);
    setTimerSeconds(partKey === 'part1' ? examData.part1.targetSeconds : examData.part2.targetSeconds);
    setIsTimerRunning(false);
  };

  const handleInputChange = (probId, value) => {
    if (!isTimerRunning && !isSubmitted) {
      setIsTimerRunning(true); // Auto-start timer on first input
    }
    setAnswers((prev) => ({ ...prev, [probId]: value }));
  };

  const handleSubmit = () => {
    setIsTimerRunning(false);
    setIsSubmitted(true);

    let correctCount = 0;
    const total = currentProblems.length;

    currentProblems.forEach((p) => {
      const userVal = parseInt(answers[p.id], 10);
      if (userVal === p.answer) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / total) * 100);
    setScoreReport({
      correct: correctCount,
      total,
      percent,
      passed: correctCount === total // Requires 100% score (0 mistakes) to unlock snack coupon
    });
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* Navigation & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--naruto-orange)' }}>
          ⏱️ Chunin Exam Space
        </h3>
      </div>

      {/* Part Switch Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className={activeTab === 'part1' ? 'btn-primary' : 'btn-secondary'} 
          style={{ flex: 1, padding: '0.8rem' }}
          onClick={() => handleTabChange('part1')}
        >
          Part 1: Multiplication (5 min)
        </button>
        <button 
          className={activeTab === 'part2' ? 'btn-primary' : 'btn-secondary'} 
          style={{ flex: 1, padding: '0.8rem' }}
          onClick={() => handleTabChange('part2')}
        >
          Part 2: Division (15 min)
        </button>
      </div>

      {/* Timer Bar & Controls */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'var(--naruto-orange)', padding: '1rem 1.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Timer size={24} color={timerSeconds < 60 ? 'var(--naruto-red)' : 'var(--naruto-orange)'} className={isTimerRunning ? 'animate-pulse' : ''} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Temps Restant</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: timerSeconds < 60 ? 'var(--naruto-red)' : 'var(--naruto-orange)' }}>
              {formatTime(timerSeconds)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }} onClick={handleReset}>
            <RotateCcw size={14} /> Reset
          </button>
          {!isSubmitted && (
            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handleSubmit}>
              <CheckCircle size={14} /> Check Answers
            </button>
          )}
        </div>
      </div>

      {/* Score Report Card & Parent Snack Coupon */}
      {isSubmitted && scoreReport && (
        <div 
          className="card pulse" 
          style={{ 
            borderColor: scoreReport.passed ? 'var(--naruto-blue)' : 'var(--naruto-orange)',
            background: scoreReport.passed ? 'var(--naruto-blue-glow)' : 'rgba(255, 107, 0, 0.15)',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '50%', background: 'var(--bg-card)', marginBottom: '0.5rem' }}>
            <Award size={36} color={scoreReport.passed ? 'var(--naruto-blue)' : 'var(--naruto-orange)'} />
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>
            {scoreReport.passed ? '🎉 CHUNIN EXAM PASSED ! Dattebayo !' : '💪 Révise tes Jutsu et réessaye !'}
          </h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--naruto-yellow)', margin: '0.4rem 0' }}>
            Score: {scoreReport.correct} / {scoreReport.total} ({scoreReport.percent}%)
          </p>

          {scoreReport.passed && (
            <div 
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 210, 0, 0.25) 0%, rgba(255, 107, 0, 0.25) 100%)', 
                border: '2px dashed var(--naruto-yellow)', 
                borderRadius: '12px', 
                padding: '1rem', 
                marginTop: '1rem',
                boxShadow: '0 0 15px var(--naruto-yellow-glow)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                <Gift size={20} color="var(--naruto-yellow)" className="animate-bounce" />
                <strong style={{ color: 'var(--naruto-yellow)', fontSize: '1.1rem' }}>🍿 COUPON SNACK PARENT DÉBLOQUÉ ! 🧋</strong>
              </div>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>
                Montre cet écran à tes parents pour obtenir ton snack préféré ! 🍕🍩
              </p>
            </div>
          )}
        </div>
      )}

      {/* Exercises Grid */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--naruto-orange)' }}>
            {lang === 'fr' ? currentPartMeta.titleFr : currentPartMeta.titleEn} ({currentProblems.length} exercices)
          </h4>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }} onClick={handleReset}>
            <Shuffle size={12} /> Nouvelles Questions
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {currentProblems.map((p, idx) => {
            const userVal = answers[p.id] || '';
            const isCorrect = isSubmitted && parseInt(userVal, 10) === p.answer;
            const isWrong = isSubmitted && parseInt(userVal, 10) !== p.answer;

            return (
              <div 
                key={p.id}
                style={{
                  background: 'var(--bg-card-hover)',
                  border: `1.5px solid ${isCorrect ? 'var(--naruto-blue)' : isWrong ? 'var(--naruto-red)' : 'var(--border)'}`,
                  borderRadius: '10px',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  #{p.id}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                  {p.q} =
                </div>

                <input
                  type="number"
                  disabled={isSubmitted}
                  value={userVal}
                  placeholder="?"
                  onChange={(e) => handleInputChange(p.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.4rem',
                    textAlign: 'center',
                    borderRadius: '6px',
                    background: 'var(--bg)',
                    border: `1px solid ${isCorrect ? 'var(--naruto-blue)' : isWrong ? 'var(--naruto-red)' : 'var(--border)'}`,
                    color: 'var(--text)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    outline: 'none'
                  }}
                />

                {!isSubmitted && <Scratchpad problemId={p.id} />}

                {isSubmitted && (
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    {isCorrect ? (
                      <span style={{ color: 'var(--naruto-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Check size={14} /> Correct
                      </span>
                    ) : (
                      <span style={{ color: 'var(--naruto-red)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <X size={14} /> Ans: {p.answer}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
