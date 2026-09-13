import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { Trophy, Zap, Home, RefreshCw } from 'lucide-react';

export const DoneScreen = () => {
  const { sessionScore, sessionXpGained, currentTopic, selectTopic, setScreen, lang } = useGameStore();
  const t = translations[lang];
  const totalQuestions = currentTopic.problems.length;
  const percentage = Math.round((sessionScore / totalQuestions) * 100);

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: 'auto 0' }}>
      <div className="card" style={{ padding: '2.5rem 1.5rem', borderColor: 'var(--cyan)' }}>
        <div style={{ display: 'inline-flex', padding: '1.2rem', borderRadius: '50%', background: 'var(--cyan-glow)', color: 'var(--cyan)', marginBottom: '1rem' }}>
          <Trophy size={48} />
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.sessionComplete}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
          {lang === 'fr' ? currentTopic.meta.titleFr : currentTopic.meta.titleEn}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t.score}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
              {sessionScore}/{totalQuestions} ({percentage}%)
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t.xpGained}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--purple)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Zap size={20} /> +{sessionXpGained}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={() => selectTopic(currentTopic.meta.id)}>
            <RefreshCw size={16} /> Recommencer
          </button>
          <button className="btn-primary" style={{ flex: 1 }} onClick={() => setScreen('home')}>
            <Home size={16} /> {t.backHome}
          </button>
        </div>
      </div>
    </div>
  );
};
