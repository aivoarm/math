import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { BookOpen, Play, User } from 'lucide-react';

export const HomeScreen = () => {
  const { lang, selectTopic, getAllTopics, setScreen } = useGameStore();
  const t = translations[lang];
  const topics = getAllTopics();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(90deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t.appTitle}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{t.subTitle}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.selectTopic}</h3>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('profile')}>
          <User size={14} /> {t.profile}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                transition: 'all 0.2s ease'
              }}
              onClick={() => selectTopic(topic.meta.id)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-purple">{topic.meta.grade}</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</p>
              </div>

              <button className="btn-primary" style={{ padding: '0.6rem 1rem' }}>
                <Play size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
