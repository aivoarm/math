import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { translations } from '../../lib/i18n';
import { supabase } from '../../lib/supabase';
import { Home, Mail, CheckCircle2, Trophy, Flame, Zap } from 'lucide-react';

export const ProfileScreen = () => {
  const { xp, level, streak, lang, setScreen, getAllTopics } = useGameStore();
  const t = translations[lang];
  const topics = getAllTopics();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!email || !supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (!error) {
      setSent(true);
    } else {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setScreen('home')}>
          <Home size={14} /> Accueil
        </button>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.profile}</h3>
      </div>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Niveau</span>
          <h2 style={{ color: 'var(--purple)', fontSize: '1.8rem', fontWeight: 800 }}>{level}</h2>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>XP Total</span>
          <h2 style={{ color: 'var(--cyan)', fontSize: '1.8rem', fontWeight: 800 }}>{xp}</h2>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Série</span>
          <h2 style={{ color: 'var(--amber)', fontSize: '1.8rem', fontWeight: 800 }}>{streak}d</h2>
        </div>
      </div>

      <div className="card">
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>{t.mastery}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topics.map((topic, i) => (
            <div key={topic.meta.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem', background: 'var(--bg-card-hover)', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {lang === 'fr' ? topic.meta.titleFr : topic.meta.titleEn}
              </span>
              <span className={`badge ${i === 0 ? 'badge-cyan' : 'badge-purple'}`}>
                {i === 0 ? t.mastered : t.inProgress}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--border)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t.loginWithSupabase}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Sauvegarde tes progrès en ligne sans mot de passe.
        </p>

        {sent ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
            <CheckCircle2 size={18} /> Lien magique envoyé à {email}!
          </div>
        ) : (
          <form onSubmit={handleMagicLink} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder={t.enterEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none'
              }}
              required
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.75rem 1rem' }}>
              <Mail size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
