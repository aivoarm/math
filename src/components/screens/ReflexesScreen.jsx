import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { reflexFactSets, generateReflexChoices } from '../../content/reflexes-facts';
import { Zap, Clock, Flame, ShieldAlert, Award, Home, RotateCcw, ArrowRight } from 'lucide-react';

export const ReflexesScreen = () => {
  const { lang, setScreen, xp, streak, recordFactResult, reflexesStats } = useGameStore();
  const t = translations[lang];

  // Config state
  const [selectedSet, setSelectedSet] = useState('times_tables');
  const [timerDuration, setTimerDuration] = useState(3); // 3s, 2s, 1s
  const [allowReverse, setAllowReverse] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Active game session state
  const [currentFact, setCurrentFact] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [chainQuestion, setChainQuestion] = useState(null); // Chain mode: answer feeds next

  const timerRef = useRef(null);

  // Select next fact using Spaced Repetition weights
  const getNextFact = () => {
    const factSet = reflexFactSets[selectedSet];
    // Generate 3 candidate facts and pick the one with highest miss rate or oldest lastSeen
    const candidates = [factSet.generate(), factSet.generate(), factSet.generate()];
    
    candidates.sort((a, b) => {
      const statsA = reflexesStats[a.id] || { misses: 0, lastSeen: 0 };
      const statsB = reflexesStats[b.id] || { misses: 0, lastSeen: 0 };
      // Weight score: high misses + older time
      const scoreA = (statsA.misses * 10) + ((Date.now() - statsA.lastSeen) / 100000);
      const scoreB = (statsB.misses * 10) + ((Date.now() - statsB.lastSeen) / 100000);
      return scoreB - scoreA;
    });

    return candidates[0];
  };

  const startNextTurn = (prevAnswer = null) => {
    let fact = getNextFact();
    
    // Chain mode logic: if prevAnswer exists, adapt next question around it if possible
    if (prevAnswer !== null && selectedSet === 'times_tables') {
      const b = Math.floor(Math.random() * 12) + 1;
      fact = {
        id: `chain_${prevAnswer}x${b}`,
        qDisplay: `${prevAnswer} × ${b}`,
        a: prevAnswer,
        b: b,
        answer: prevAnswer * b,
        category: 'times_tables'
      };
    }

    const qData = generateReflexChoices(fact, allowReverse);
    setCurrentFact(fact);
    setQuestionData(qData);
    setSelectedChoice(null);
    setIsCorrect(null);
    setTimeLeft(timerDuration);
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setSessionStreak(0);
    setSessionScore(0);
    setSessionXp(0);
    startNextTurn();
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!isPlaying || isGameOver || selectedChoice !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, isGameOver, selectedChoice, currentFact]);

  const handleTimeOut = () => {
    setIsCorrect(false);
    setSelectedChoice('TIMEOUT');
    setSessionStreak(0);
    if (currentFact) {
      recordFactResult(currentFact.id, false);
    }
  };

  const handleChoiceSelect = (choice) => {
    if (selectedChoice !== null || !isPlaying) return;
    clearInterval(timerRef.current);

    const correct = choice === questionData.correctAnswer;
    setSelectedChoice(choice);
    setIsCorrect(correct);

    if (currentFact) {
      recordFactResult(currentFact.id, correct);
    }

    if (correct) {
      const newStreak = sessionStreak + 1;
      // Streak Multiplier bonus XP calculation: Base 10 XP + multiplier
      const streakBonus = Math.min(newStreak, 5);
      const earnedXp = 10 * streakBonus;

      setSessionStreak(newStreak);
      setSessionScore((s) => s + 1);
      setSessionXp((x) => x + earnedXp);

      useGameStore.setState((state) => ({
        xp: state.xp + earnedXp,
        streak: state.streak + 1
      }));
    } else {
      setSessionStreak(0);
      useGameStore.setState({ streak: 0 });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="btn-secondary" 
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          onClick={() => setScreen('home')}
        >
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: 'var(--naruto-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={18} /> Mode Réflexes (Shinobi Flash)
        </span>
      </div>

      {/* Setup / Config Screen */}
      {!isPlaying && !isGameOver && (
        <div className="card" style={{ borderLeft: '5px solid var(--naruto-gold)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.4rem' }}>
              ⚡ Entraînement au Reflex Jutsu
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Aucun brouillon, aucun indice — pure mémoire visuelle & vitesse absolue.
            </p>
          </div>

          {/* Fact Set Selection */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              🎯 Sélectionne le Module de Facts:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {Object.values(reflexFactSets).map((set) => (
                <button
                  key={set.id}
                  className={selectedSet === set.id ? 'btn-primary' : 'btn-secondary'}
                  style={{ justifyContent: 'flex-start', padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
                  onClick={() => setSelectedSet(set.id)}
                >
                  <span style={{ fontSize: '1.1rem' }}>{set.icon}</span>
                  {lang === 'fr' ? set.titleFr : set.titleEn}
                </button>
              ))}
            </div>
          </div>

          {/* Timer Speed Selection */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              ⏱️ Temps par Réponse:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[3, 2, 1].map((sec) => (
                <button
                  key={sec}
                  className={timerDuration === sec ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', fontWeight: 800 }}
                  onClick={() => setTimerDuration(sec)}
                >
                  <Clock size={16} /> {sec} Seconde{sec > 1 ? 's' : ''} {sec === 1 ? '🔥 (Hokage)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Reverse Questions toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              🔄 Équations Inversées (`? × 12 = 156`)
            </span>
            <input 
              type="checkbox" 
              checked={allowReverse} 
              onChange={(e) => setAllowReverse(e.target.checked)} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <button className="btn-primary" style={{ padding: '0.9rem', fontSize: '1.1rem', marginTop: '0.5rem' }} onClick={startGame}>
            ⚡ Démarrer l'Épreuve Reflex
          </button>
        </div>
      )}

      {/* Active Reflex Gameplay Screen */}
      {isPlaying && questionData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Progress & Multiplier Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--naruto-orange)', fontWeight: 800 }}>
              <Flame size={20} className="animate-bounce" /> Multiplicateur Combo: x{Math.min(sessionStreak + 1, 5)}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--naruto-gold)' }}>
              +{sessionXp} XP Gagné
            </div>
          </div>

          {/* Timer Progress Bar */}
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${(timeLeft / timerDuration) * 100}%`, 
                background: timeLeft < 1 ? '#EF4444' : 'var(--naruto-orange)',
                transition: 'width 0.1s linear' 
              }} 
            />
          </div>

          {/* Question Display Card */}
          <div 
            className="card" 
            style={{ 
              textAlign: 'center', 
              padding: '2.5rem 1rem', 
              borderColor: selectedChoice !== null ? (isCorrect ? '#10B981' : '#EF4444') : 'var(--naruto-orange)',
              boxShadow: selectedChoice !== null ? (isCorrect ? '0 0 25px rgba(16,185,129,0.4)' : '0 0 25px rgba(239,68,68,0.4)') : '0 0 20px var(--naruto-orange-glow)'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 800 }}>
              Fact Instantané • {timerDuration}s
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFF', margin: '0.8rem 0', fontFamily: 'var(--font-mono)' }}>
              {questionData.questionText}
            </h1>
            {selectedChoice === 'TIMEOUT' && (
              <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '1.1rem' }}>
                ⏰ TEMPS ÉCOULÉ ! Réponse : {questionData.correctAnswer}
              </span>
            )}
          </div>

          {/* Choices Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {questionData.choices.map((choice, idx) => {
              let btnClass = 'btn-secondary';
              let customStyle = { padding: '1.2rem', fontSize: '1.5rem', fontWeight: 900 };

              if (selectedChoice !== null) {
                if (choice === questionData.correctAnswer) {
                  btnClass = 'btn-primary';
                  customStyle.backgroundColor = '#10B981';
                  customStyle.borderColor = '#10B981';
                } else if (choice === selectedChoice) {
                  customStyle.backgroundColor = '#EF4444';
                  customStyle.borderColor = '#EF4444';
                }
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  style={customStyle}
                  onClick={() => handleChoiceSelect(choice)}
                  disabled={selectedChoice !== null}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Next / Chain Action button */}
          {selectedChoice !== null && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}
                onClick={() => startNextTurn(isCorrect ? questionData.correctAnswer : null)}
              >
                Épreuve Suivante <ArrowRight size={18} />
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '1rem 1.2rem' }}
                onClick={() => { setIsPlaying(false); setIsGameOver(true); }}
              >
                Terminer Session
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Over / Summary Screen */}
      {isGameOver && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--naruto-orange)' }}>
            ⚡ Session Réflexes Terminée !
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1rem 0' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score Facts</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{sessionScore}</h3>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chakra XP Total</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--naruto-gold)' }}>+{sessionXp} XP</h3>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary" style={{ flex: 1, padding: '0.8rem' }} onClick={startGame}>
              <RotateCcw size={16} /> Recommencer Session
            </button>
            <button className="btn-secondary" style={{ padding: '0.8rem 1.2rem' }} onClick={() => { setIsGameOver(false); setIsPlaying(false); }}>
              Changer Config
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
