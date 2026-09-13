import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { Sparkles, Play, User, Music } from 'lucide-react';

export const HomeScreen = () => {
  const { lang, selectTopic, getAllTopics, setScreen } = useGameStore();
  const t = translations[lang];
  const topics = getAllTopics();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Banner */}
      <div 
        className="card" 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: 0, 
          borderColor: 'var(--kpop-pink)',
          boxShadow: '0 0 25px var(--kpop-pink-glow)'
        }}
      >
        <img 
          src="/assets/kpop_hero.png" 
          alt="K-Pop Math Idol Hero" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(180deg, rgba(10,7,27,0.2) 0%, rgba(10,7,27,0.9) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.2rem'
          }}
        >
          <h1 className="kpop-gradient-text" style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t.appTitle}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{t.subTitle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Music size={18} color="var(--kpop-pink)" /> {t.selectTopic}
        </h3>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('profile')}>
          <User size={14} /> {t.profile}
        </button>
      </div>

      {/* Album / Topic Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {topics.map((topic) => {
          const title = lang === 'fr' ? topic.meta.titleFr : topic.meta.titleEn;
          const desc = lang === 'fr' ? topic.meta.descriptionFr : topic.meta.descriptionEn;

          return (
            <div
              key={topic.meta.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.25 ease',
                borderLeft: '4px solid var(--kpop-pink)'
              }}
              onClick={() => selectTopic(topic.meta.id)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-pink">{topic.meta.grade}</span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)' }}>{title}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</p>
              </div>

              <button className="btn-primary" style={{ padding: '0.7rem 1.2rem', flexShrink: 0 }}>
                <Play size={18} /> Stage
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
