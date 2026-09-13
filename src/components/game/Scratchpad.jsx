import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2, Plus, Eraser, Edit3 } from 'lucide-react';

export const Scratchpad = ({ problemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scratchLines, setScratchLines] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState('lines'); // 'lines' | 'canvas'

  // Canvas ref for freehand drawing
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const addLine = () => setScratchLines((prev) => [...prev, '']);
  const clearLines = () => setScratchLines(['', '', '']);

  const updateLine = (idx, value) => {
    setScratchLines((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  // Canvas drawing functions
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div style={{ marginTop: '0.4rem', width: '100%' }}>
      <button 
        type="button"
        className="btn-secondary" 
        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '4px', width: '100%', justifyContent: 'center' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Edit3 size={12} color="var(--naruto-orange)" /> 
        {isOpen ? 'Masquer Brouillon' : '📝 Espace Brouillon / Calculs (Scratchpad)'}
      </button>

      {isOpen && (
        <div 
          style={{ 
            marginTop: '0.5rem', 
            padding: '0.75rem', 
            background: 'rgba(13, 9, 7, 0.95)', 
            border: '1px solid var(--naruto-orange)', 
            borderRadius: '8px' 
          }}
        >
          {/* Mode Selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                type="button"
                style={{ 
                  fontSize: '0.75rem', 
                  padding: '3px 8px', 
                  borderRadius: '4px', 
                  background: activeTab === 'lines' ? 'var(--naruto-orange)' : 'transparent',
                  color: activeTab === 'lines' ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700
                }}
                onClick={() => setActiveTab('lines')}
              >
                Lignes d'addition
              </button>
              <button 
                type="button"
                style={{ 
                  fontSize: '0.75rem', 
                  padding: '3px 8px', 
                  borderRadius: '4px', 
                  background: activeTab === 'canvas' ? 'var(--naruto-orange)' : 'transparent',
                  color: activeTab === 'canvas' ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700
                }}
                onClick={() => setActiveTab('canvas')}
              >
                Dessin à main levée
              </button>
            </div>

            <button 
              type="button" 
              style={{ background: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '2px' }}
              onClick={activeTab === 'lines' ? clearLines : clearCanvas}
            >
              <Trash2 size={12} /> Effacer
            </button>
          </div>

          {/* Sub-total calculation lines e.g. 190, 10, 18 */}
          {activeTab === 'lines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Écris tes sous-totaux (ex: 190, 10, 18 puis additionne) :
              </span>
              {scratchLines.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Sous-total #${idx + 1}`}
                  value={val}
                  onChange={(e) => updateLine(idx, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.35rem 0.5rem',
                    borderRadius: '4px',
                    background: 'var(--bg-card-hover)',
                    border: '1px solid var(--border)',
                    color: 'var(--naruto-yellow)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              ))}

              <button 
                type="button"
                style={{ background: 'none', color: 'var(--naruto-blue)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}
                onClick={addLine}
              >
                <Plus size={12} /> Ajouter une ligne
              </button>
            </div>
          )}

          {/* Freehand canvas for writing/drawing */}
          {activeTab === 'canvas' && (
            <div style={{ position: 'relative', width: '100%', height: '140px', background: '#000', borderRadius: '6px', overflow: 'hidden' }}>
              <canvas
                ref={canvasRef}
                width={260}
                height={140}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ cursor: 'crosshair', width: '100%', height: '100%', touchAction: 'none' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
