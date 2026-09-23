import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Home, Compass, RotateCcw, Trophy, AlertCircle } from 'lucide-react';

export const PathfinderScreen = () => {
  const { setScreen } = useGameStore();

  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });
  const [visited, setVisited] = useState(['0,0']);
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Generate a procedural 4x4 Grid of Math Expressions with a guaranteed valid path
  const generateNewMaze = () => {
    // Generate expressions with increasing values along at least one valid path
    const newGrid = [
      [
        { expr: '3 × 4', val: 12 },
        { expr: '15 + 8', val: 23 },
        { expr: '6 × 6', val: 36 },
        { expr: '7 × 7', val: 49 }
      ],
      [
        { expr: '4 × 4', val: 16 },
        { expr: '5 × 6', val: 30 },
        { expr: '9 × 5', val: 45 },
        { expr: '8 × 8', val: 64 }
      ],
      [
        { expr: '5 × 5', val: 25 },
        { expr: '6 × 7', val: 42 },
        { expr: '8 × 7', val: 56 },
        { expr: '9 × 9', val: 81 }
      ],
      [
        { expr: '7 × 5', val: 35 },
        { expr: '8 × 6', val: 48 },
        { expr: '9 × 8', val: 72 },
        { expr: '12 × 12', val: 144 }
      ]
    ];

    setGrid(newGrid);
    setCurrentPos({ row: 0, col: 0 });
    setVisited(['0,0']);
    setIsGameOver(false);
    setIsWon(false);
  };

  // Initialize maze on component mount
  React.useEffect(() => {
    generateNewMaze();
  }, []);

  const handleTileClick = (r, c) => {
    if (isGameOver || isWon || grid.length === 0) return;

    // Check adjacency (Up, Down, Left, Right)
    const isAdjacent = Math.abs(r - currentPos.row) + Math.abs(c - currentPos.col) === 1;
    if (!isAdjacent) return;

    const currentVal = grid[currentPos.row][currentPos.col].val;
    const targetVal = grid[r][c].val;

    // Rule: Target expression value MUST be strictly greater than current tile
    if (targetVal > currentVal) {
      const nextVisited = [...visited, `${r},${c}`];
      setCurrentPos({ row: r, col: c });
      setVisited(nextVisited);

      // Check if reached EXIT (Bottom-Right corner tile 3,3)
      if (r === 3 && c === 3) {
        setIsWon(true);
        const earned = 60;
        setXpGained(earned);
        useGameStore.setState((s) => ({ xp: s.xp + earned }));
      }
    } else {
      // WRONG STEP (Target value was not greater) -> Trap Triggered!
      setIsGameOver(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <span style={{ fontSize: '1rem', color: '#6366F1', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Compass size={18} /> 🗺️ Labyrinthe des Sceaux (Grid Pathfinder)
        </span>
      </div>

      <div className="card" style={{ borderColor: '#6366F1', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF' }}>
            Traverse le labyrinthe jusqu'à la sortie (🚪 Bas-Droite) !
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tu ne peux avancer que vers une case adjacente dont la valeur mathématique est <strong>STRICTEMENT PLUS GRANDE</strong>.
          </p>
        </div>

        {/* 4x4 Grid Board */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '360px', margin: '0 auto', width: '100%' }}>
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isCurrent = currentPos.row === r && currentPos.col === c;
              const isVisited = visited.includes(`${r},${c}`);
              const isExit = r === 3 && c === 3;
              const isStart = r === 0 && c === 0;

              let bgColor = 'rgba(255,255,255,0.06)';
              let borderColor = 'rgba(255,255,255,0.15)';

              if (isCurrent) {
                bgColor = '#6366F1';
                borderColor = '#818CF8';
              } else if (isVisited) {
                bgColor = '#4F46E5';
                borderColor = '#6366F1';
              } else if (isExit) {
                borderColor = '#10B981';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  className="btn-primary"
                  style={{
                    height: '75px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justify: 'center',
                    padding: '0.2rem',
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    transform: isCurrent ? 'scale(1.06)' : 'scale(1)',
                    boxShadow: isCurrent ? '0 0 20px rgba(99,102,241,0.6)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handleTileClick(r, c)}
                  disabled={isGameOver || isWon}
                >
                  <span style={{ fontSize: '0.7rem', color: isCurrent ? '#FFF' : 'var(--text-muted)', fontWeight: 800 }}>
                    {isStart ? '🚩 Départ' : isExit ? '🚪 Sortie' : `Case ${r+1},${c+1}`}
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', marginTop: '2px' }}>
                    {cell.expr}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800 }}>
                    ({cell.val})
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Status Messaging */}
        {isGameOver && (
          <div style={{ color: '#EF4444', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <AlertCircle size={20} /> PIÈGE DÉCLENCHÉ ! La case choisie n'était pas plus grande.
          </div>
        )}

        {isWon && (
          <div style={{ color: '#10B981', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Trophy size={24} /> LABYRINTHE TRAVERSÉ ! +{xpGained} XP
          </div>
        )}

        <button className="btn-secondary" style={{ marginTop: '0.5rem' }} onClick={generateNewMaze}>
          <RotateCcw size={16} /> Générer Nouveau Labyrinthe
        </button>
      </div>
    </div>
  );
};
