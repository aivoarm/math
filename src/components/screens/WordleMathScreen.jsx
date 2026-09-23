import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { fireConfetti } from '../../lib/confetti';
import { Home, Sparkles, RotateCcw } from 'lucide-react';

export const WordleMathScreen = () => {
  const { setScreen } = useGameStore();

  const [targetEq, setTargetEq] = useState('8+4=12');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const keyPad = ['1','2','3','4','5','6','7','8','9','0','+','-','*','='];

  const handleKeyPress = (char) => {
    if (currentGuess.length < 6 && !isGameOver) {
      setCurrentGuess((g) => g + char);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((g) => g.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 6 || guesses.length >= 6) return;

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === targetEq) {
      useGameStore.getState().triggerCelebration(`ÉQUATION TROUVÉE : ${targetEq}`);
      setWon(true);
      setIsGameOver(true);
      useGameStore.setState((s) => ({ xp: s.xp + 50 }));
    } else if (nextGuesses.length >= 6) {
      setIsGameOver(true);
    }
  };

  const getCharColor = (guessStr, index) => {
    const char = guessStr[index];
    if (targetEq[index] === char) return '#10B981'; // Green
    if (targetEq.includes(char)) return '#F59E0B'; // Yellow
    return '#374151'; // Gray
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#3B82F6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={18} /> 🔠 Math Wordle (Equation Cracker)
        </span>
      </div>

      <div className="card" style={{ borderColor: '#3B82F6', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <h2>Devine l'équation cachée de 6 caractères !</h2>

        {/* Guesses Board Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px', margin: '0 auto', width: '100%' }}>
          {[0, 1, 2, 3, 4, 5].map((rowIdx) => {
            const guessStr = guesses[rowIdx] || (rowIdx === guesses.length ? currentGuess.padEnd(6, ' ') : '      ');
            const isSubmitted = rowIdx < guesses.length;

            return (
              <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                {guessStr.split('').map((char, colIdx) => (
                  <div
                    key={colIdx}
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: isSubmitted ? getCharColor(guesses[rowIdx], colIdx) : 'rgba(255,255,255,0.06)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#FFF'
                    }}
                  >
                    {char !== ' ' ? char : ''}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Keypad */}
        {!isGameOver && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '360px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {keyPad.map((k) => (
                <button
                  key={k}
                  className="btn-secondary"
                  style={{ width: '42px', height: '42px', padding: 0, fontSize: '1.2rem', fontWeight: 900 }}
                  onClick={() => handleKeyPress(k)}
                >
                  {k}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem' }} onClick={handleBackspace}>
                ⌫ Effacer
              </button>
              <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', backgroundColor: '#3B82F6', borderColor: '#3B82F6' }} onClick={handleSubmit}>
                ✓ Valider
              </button>
            </div>
          </div>
        )}

        {isGameOver && (
          <div>
            <h3>{won ? '🎉 Bravo ! Équation Trouvée !' : `❌ Échec ! C'était : ${targetEq}`}</h3>
            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#3B82F6', marginTop: '0.5rem' }} onClick={() => { setGuesses([]); setCurrentGuess(''); setIsGameOver(false); setWon(false); }}>
              Rejouer <RotateCcw size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
