import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { reflexFactSets } from '../../content/reflexes-facts';
import { Brain, Home, RotateCcw, Trophy, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const MemoryScreen = () => {
  const { lang, setScreen, recordFactResult, reflexesStats } = useGameStore();
  const t = translations[lang];

  // Config: Set, Grid Size (6 pairs = 12 cards, 8 pairs = 16 cards)
  const [selectedSet, setSelectedSet] = useState('times_tables');
  const [pairCount, setPairCount] = useState(6); // 6 or 8
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Card Game State
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairIds, setMatchedPairIds] = useState([]);
  const [flipsCount, setFlipsCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [xpGained, setXpGained] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isPlaying && !isGameOver) {
      interval = setInterval(() => {
        setTimerSeconds((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  // Generate Deck with Spaced Repetition Priority
  const setupDeck = () => {
    const factSet = reflexFactSets[selectedSet];
    const factsMap = new Map();

    // Pull distinct facts
    while (factsMap.size < pairCount) {
      const fact = factSet.generate();
      if (!factsMap.has(fact.id)) {
        factsMap.set(fact.id, fact);
      }
    }

    const deck = [];
    Array.from(factsMap.values()).forEach((fact) => {
      // Expression Card
      deck.push({
        id: `${fact.id}_expr`,
        pairId: fact.id,
        type: 'expr',
        text: fact.qDisplay.replace(' = ?', ''),
        fact: fact
      });
      // Answer Card
      deck.push({
        id: `${fact.id}_ans`,
        pairId: fact.id,
        type: 'ans',
        text: String(fact.answer),
        fact: fact
      });
    });

    // Shuffle Deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setFlipsCount(0);
    setTimerSeconds(0);
    setXpGained(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  const handleCardClick = (index) => {
    // Prevent clicking already flipped or matched cards or if 2 cards are currently flipped
    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      matchedPairIds.includes(cards[index].pairId)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    setFlipsCount((f) => f + 1);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = cards[firstIdx];
      const card2 = cards[secondIdx];

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        // MATCH FOUND!
        const newMatched = [...matchedPairIds, card1.pairId];
        setMatchedPairIds(newMatched);
        setFlippedIndices([]);

        // Record correct match to Spaced Repetition & trigger celebration overlay
        recordFactResult(card1.pairId, true);
        const exprCard = card1.type === 'expr' ? card1 : card2;
        const ansCard = card1.type === 'ans' ? card1 : card2;
        useGameStore.getState().triggerCelebration(`${exprCard.text} = ${ansCard.text}`);

        // Check Victory
        if (newMatched.length === pairCount) {
          handleVictory(flipsCount + 1, timerSeconds);
        }
      } else {
        // MISMATCH - Flip back after delay
        if (card1.pairId === card2.pairId) {
          // Same card double click protection
          setFlippedIndices([]);
          return;
        }

        recordFactResult(card1.pairId, false);
        recordFactResult(card2.pairId, false);

        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleVictory = (finalFlips, finalTime) => {
    setIsGameOver(true);
    setIsPlaying(false);

    // Calculate XP: Base 50 + bonus for low flips & fast time
    const minFlips = pairCount * 2;
    const efficiency = Math.max(0, 100 - (finalFlips - minFlips) * 5);
    const timeBonus = Math.max(0, 60 - finalTime);
    const totalXp = 50 + efficiency + timeBonus;

    setXpGained(totalXp);
    useGameStore.setState((state) => ({
      xp: state.xp + totalXp,
      streak: state.streak + 1
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* Navbar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="btn-secondary" 
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          onClick={() => setScreen('home')}
        >
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#A855F7', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Brain size={18} /> Mémoire Shinobi (Matching Cards)
        </span>
      </div>

      {/* Mode Config Setup */}
      {!isPlaying && !isGameOver && (
        <div className="card" style={{ borderLeft: '5px solid #A855F7', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.4rem' }}>
              🧠 Cartes de Mémoire Mathématique
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Associe les expressions mathématiques avec leurs solutions correspondantes pour entraîner ta mémoire visuelle et spatiale.
            </p>
          </div>

          {/* Module Selection */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              🎯 Module de Cartes:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {Object.values(reflexFactSets).map((set) => (
                <button
                  key={set.id}
                  className={selectedSet === set.id ? 'btn-primary' : 'btn-secondary'}
                  style={{ 
                    justify: 'flex-start', 
                    padding: '0.6rem 0.8rem', 
                    fontSize: '0.85rem',
                    backgroundColor: selectedSet === set.id ? '#A855F7' : '',
                    borderColor: selectedSet === set.id ? '#A855F7' : ''
                  }}
                  onClick={() => setSelectedSet(set.id)}
                >
                  <span style={{ fontSize: '1.1rem' }}>{set.icon}</span>
                  {lang === 'fr' ? set.titleFr : set.titleEn}
                </button>
              ))}
            </div>
          </div>

          {/* Pair Count / Grid size */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              🎴 Taille de la Grille:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className={pairCount === 6 ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '0.6rem', backgroundColor: pairCount === 6 ? '#A855F7' : '', borderColor: pairCount === 6 ? '#A855F7' : '' }}
                onClick={() => setPairCount(6)}
              >
                12 Cartes (6 Paires)
              </button>
              <button
                className={pairCount === 8 ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '0.6rem', backgroundColor: pairCount === 8 ? '#A855F7' : '', borderColor: pairCount === 8 ? '#A855F7' : '' }}
                onClick={() => setPairCount(8)}
              >
                16 Cartes (8 Paires - Ninja Pro)
              </button>
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '0.9rem', fontSize: '1.1rem', backgroundColor: '#A855F7', borderColor: '#A855F7', marginTop: '0.5rem' }} 
            onClick={setupDeck}
          >
            🎴 Mélanger & Lancer le Jeu
          </button>
        </div>
      )}

      {/* Active Game Board */}
      {isPlaying && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Stats Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#A855F7" /> Temps : {timerSeconds}s
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
              Flips : {flipsCount}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#A855F7' }}>
              Paires : {matchedPairIds.length} / {pairCount}
            </div>
          </div>

          {/* Cards Memory Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${pairCount === 6 ? 4 : 4}, 1fr)`, 
              gap: '12px' 
            }}
          >
            {cards.map((card, index) => {
              const isFlipped = flippedIndices.includes(index);
              const isMatched = matchedPairIds.includes(card.pairId);

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  style={{
                    height: '100px',
                    perspective: '1000px',
                    cursor: isMatched ? 'default' : 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.4s ease',
                      transform: (isFlipped || isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Card Back (Covered) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, rgba(30,22,64,0.9) 0%, rgba(15,10,35,0.9) 100%)',
                        border: '2px solid rgba(168,85,247,0.4)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      <span style={{ fontSize: '1.8rem', opacity: 0.6 }}>忍</span>
                    </div>

                    {/* Card Front (Revealed) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: isMatched ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
                        border: isMatched ? '2px solid #10B981' : '2px solid #C084FC',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.4rem',
                        color: '#FFF',
                        textAlign: 'center',
                        boxShadow: isMatched ? '0 0 15px rgba(16,185,129,0.3)' : '0 4px 15px rgba(168,85,247,0.4)'
                      }}
                    >
                      {isMatched && (
                        <CheckCircle2 size={16} color="#10B981" style={{ position: 'absolute', top: '6px', right: '6px' }} />
                      )}
                      <span style={{ 
                        fontSize: card.text.length > 5 ? '1.1rem' : '1.5rem', 
                        fontWeight: 900, 
                        fontFamily: 'var(--font-mono)' 
                      }}>
                        {card.text}
                      </span>
                      <span style={{ fontSize: '0.65rem', opacity: 0.8, textTransform: 'uppercase', marginTop: '2px' }}>
                        {card.type === 'expr' ? 'Équation' : 'Réponse'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Victory Summary Modal */}
      {isGameOver && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', borderColor: '#10B981', boxShadow: '0 0 25px rgba(16,185,129,0.3)' }}>
          <Trophy size={48} color="#10B981" style={{ margin: '0 auto' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981' }}>
            🎉 Grille Complétée !
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '0.5rem 0' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Temps Total</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{timerSeconds}s</h3>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Coups Flips</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{flipsCount}</h3>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chakra Gagné</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--naruto-gold)' }}>+{xpGained} XP</h3>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary" style={{ flex: 1, padding: '0.8rem', backgroundColor: '#A855F7', borderColor: '#A855F7' }} onClick={setupDeck}>
              <RotateCcw size={16} /> Rejouer Grille
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
