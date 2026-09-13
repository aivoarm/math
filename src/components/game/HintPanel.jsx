import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { Sparkles, Loader2 } from 'lucide-react';

export const HintPanel = () => {
  const { fetchAiHint, aiHint, isAiLoading, lang } = useGameStore();
  const t = translations[lang];

  return (
    <div style={{ marginBottom: '1.2rem' }}>
      {!aiHint && !isAiLoading && (
        <button className="btn-secondary" style={{ width: '100%' }} onClick={fetchAiHint}>
          <Sparkles size={16} color="var(--cyan)" /> {t.hint}
        </button>
      )}

      {isAiLoading && (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          <Loader2 className="animate-spin" size={18} color="var(--cyan)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.loadingHint}</span>
        </div>
      )}

      {aiHint && (
        <div className="card" style={{ borderColor: 'var(--cyan)', background: 'var(--cyan-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <Sparkles size={16} color="var(--cyan)" />
            <strong style={{ fontSize: '0.85rem', color: 'var(--cyan)', textTransform: 'uppercase' }}>{t.aiHintTitle}</strong>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{aiHint}</p>
        </div>
      )}
    </div>
  );
};
