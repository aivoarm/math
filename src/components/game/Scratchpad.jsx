import React, { useState, useRef } from 'react';
import { Pencil, Trash2, Plus, Edit3, Divide } from 'lucide-react';

export const Scratchpad = ({ problemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scratchLines, setScratchLines] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState('division'); // 'division' | 'lines' | 'canvas'

  // Long Division Framework State
  const [divisionData, setDivisionData] = useState({
    dividend: '238',
    divisor: '14',
    quotient: '',
    steps: [
      { subProduct: '140', remainder: '98' },
      { subProduct: '98', remainder: '0' }
    ]
  });

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

  const addDivisionStep = () => {
    setDivisionData((prev) => ({
      ...prev,
      steps: [...prev.steps, { subProduct: '', remainder: '' }]
    }));
  };

  const updateDivisionStep = (idx, field, value) => {
    setDivisionData((prev) => {
      const nextSteps = [...prev.steps];
      nextSteps[idx] = { ...nextSteps[idx], [field]: value };
      return { ...prev, steps: nextSteps };
    });
  };

  const clearDivision = () => {
    setDivisionData({
      dividend: '',
      divisor: '',
      quotient: '',
      steps: [{ subProduct: '', remainder: '' }]
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
        {isOpen ? 'Masquer Brouillon' : '📝 Espace Brouillon & Crochet de Division'}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <button 
                type="button"
                style={{ 
                  fontSize: '0.7rem', 
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  background: activeTab === 'division' ? 'var(--naruto-orange)' : 'transparent',
                  color: activeTab === 'division' ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700
                }}
                onClick={() => setActiveTab('division')}
              >
                ⟌ Crochet Division
              </button>

              <button 
                type="button"
                style={{ 
                  fontSize: '0.7rem', 
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  background: activeTab === 'lines' ? 'var(--naruto-orange)' : 'transparent',
                  color: activeTab === 'lines' ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700
                }}
                onClick={() => setActiveTab('lines')}
              >
                Sous-totaux
              </button>

              <button 
                type="button"
                style={{ 
                  fontSize: '0.7rem', 
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  background: activeTab === 'canvas' ? 'var(--naruto-orange)' : 'transparent',
                  color: activeTab === 'canvas' ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700
                }}
                onClick={() => setActiveTab('canvas')}
              >
                Dessin
              </button>
            </div>

            <button 
              type="button" 
              style={{ background: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '2px' }}
              onClick={activeTab === 'division' ? clearDivision : activeTab === 'lines' ? clearLines : clearCanvas}
            >
              <Trash2 size={12} /> Effacer
            </button>
          </div>

          {/* Long Division Framework (Crochet de division traditionnel) */}
          {activeTab === 'division' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Framework de Division posée (ex: Dividende ⟌ Diviseur = Quotient) :
              </span>

              {/* Division Bracket Box */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto 1fr', 
                  gap: '8px', 
                  alignItems: 'start',
                  background: 'var(--bg-card)', 
                  padding: '0.6rem', 
                  borderRadius: '6px',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Left Side: Dividende & Subtraction Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dividende</label>
                  <input
                    type="text"
                    placeholder="238"
                    value={divisionData.dividend}
                    onChange={(e) => setDivisionData({ ...divisionData, dividend: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.3rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--naruto-orange)',
                      borderRadius: '4px',
                      color: 'var(--naruto-orange)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '0.9rem'
                    }}
                  />

                  {/* Subtraction steps */}
                  {divisionData.steps.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--naruto-red)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>-</span>
                        <input
                          type="text"
                          placeholder="Produit (140)"
                          value={step.subProduct}
                          onChange={(e) => updateDivisionStep(sIdx, 'subProduct', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.2rem',
                            background: 'var(--bg)',
                            border: '1px dashed var(--naruto-red)',
                            borderRadius: '4px',
                            color: 'var(--naruto-red)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}
                        />
                      </div>
                      <div style={{ height: '1px', background: 'var(--border)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--naruto-blue)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>=</span>
                        <input
                          type="text"
                          placeholder="Reste (98)"
                          value={step.remainder}
                          onChange={(e) => updateDivisionStep(sIdx, 'remainder', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.2rem',
                            background: 'var(--bg)',
                            border: '1px solid var(--naruto-blue)',
                            borderRadius: '4px',
                            color: 'var(--naruto-blue)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    style={{ background: 'none', color: 'var(--naruto-blue)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}
                    onClick={addDivisionStep}
                  >
                    <Plus size={10} /> Étape suivante
                  </button>
                </div>

                {/* Center Bracket Line ⟌ */}
                <div style={{ width: '2px', background: 'var(--naruto-orange)', height: '100%', minHeight: '100px' }} />

                {/* Right Side: Diviseur & Quotient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Diviseur</label>
                    <input
                      type="text"
                      placeholder="14"
                      value={divisionData.divisor}
                      onChange={(e) => setDivisionData({ ...divisionData, divisor: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.3rem',
                        background: 'var(--bg)',
                        border: '1px solid var(--naruto-yellow)',
                        borderRadius: '4px',
                        color: 'var(--naruto-yellow)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ height: '2px', background: 'var(--naruto-yellow)' }} />

                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--naruto-yellow)', textTransform: 'uppercase', fontWeight: 800 }}>Quotient (Résultat)</label>
                    <input
                      type="text"
                      placeholder="17"
                      value={divisionData.quotient}
                      onChange={(e) => setDivisionData({ ...divisionData, quotient: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.3rem',
                        background: 'var(--bg)',
                        border: '1.5px solid var(--naruto-yellow)',
                        borderRadius: '4px',
                        color: 'var(--naruto-yellow)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-total calculation lines */}
          {activeTab === 'lines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Sous-totaux d'addition (ex: 190, 10, 18) :
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
