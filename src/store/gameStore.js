import { create } from 'zustand';
import * as mentalMath from '../content/sec1/mental-math.js';
import * as integers from '../content/sec1/integers.js';
import * as fractions from '../content/sec1/fractions.js';
import * as geometry from '../content/sec1/geometry.js';
import { supabase } from '../lib/supabase.js';
import { fireConfetti } from '../lib/confetti.js';

const TOPICS = [mentalMath, integers, fractions, geometry];

export const useGameStore = create((set, get) => ({
  lang: 'fr',
  xp: 120,
  level: 2,
  streak: 3,
  currentScreen: 'home',
  currentTopic: mentalMath,
  currentProblemIndex: 0,
  selectedChoice: null,
  isCorrect: null,
  showSteps: false,
  sessionScore: 0,
  sessionXpGained: 0,
  aiHint: null,
  isAiLoading: false,
  masteryData: {},

  toggleLang: () => set((state) => ({ lang: state.lang === 'fr' ? 'en' : 'fr' })),

  setScreen: (screen) => set({ currentScreen: screen }),

  selectTopic: (topicId) => {
    const found = TOPICS.find((t) => t.meta.id === topicId) || mentalMath;
    set({
      currentTopic: found,
      currentProblemIndex: 0,
      selectedChoice: null,
      isCorrect: null,
      showSteps: false,
      sessionScore: 0,
      sessionXpGained: 0,
      aiHint: null,
      currentScreen: 'game'
    });
  },

  submitAnswer: async (choice) => {
    const { currentTopic, currentProblemIndex, xp, streak, sessionScore, sessionXpGained } = get();
    const problem = currentTopic.problems[currentProblemIndex];
    const correct = choice === problem.answer;
    const addedXp = correct ? currentTopic.meta.xpPerProblem : 0;

    if (correct) {
      fireConfetti();
    }

    const newXp = xp + addedXp;
    const newLevel = Math.floor(newXp / 100) + 1;
    const newStreak = correct ? streak + 1 : 0;

    set({
      selectedChoice: choice,
      isCorrect: correct,
      showSteps: true,
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      sessionScore: correct ? sessionScore + 1 : sessionScore,
      sessionXpGained: sessionXpGained + addedXp
    });

    // Record attempt to Supabase if configured
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('attempts').insert({
            user_id: user.id,
            problem_id: problem.id,
            correct: correct,
            time_ms: 5000,
            strategy: problem.strategy[get().lang]
          });
        }
      } catch (err) {
        console.warn('Supabase log error:', err);
      }
    }
  },

  nextProblem: () => {
    const { currentTopic, currentProblemIndex } = get();
    if (currentProblemIndex + 1 < currentTopic.problems.length) {
      set({
        currentProblemIndex: currentProblemIndex + 1,
        selectedChoice: null,
        isCorrect: null,
        showSteps: false,
        aiHint: null
      });
    } else {
      set({ currentScreen: 'done' });
    }
  },

  fetchAiHint: async () => {
    const { currentTopic, currentProblemIndex, lang } = get();
    const problem = currentTopic.problems[currentProblemIndex];
    const promptText = problem.hintPrompt[lang] || problem.hintPrompt.fr;

    set({ isAiLoading: true, aiHint: null });

    try {
      const response = await fetch('/.netlify/functions/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, lang })
      });
      const data = await response.json();
      set({ aiHint: data.text || data.error || 'Indice indisponible pour le moment.', isAiLoading: false });
    } catch (err) {
      set({
        aiHint: lang === 'fr' 
          ? `Conseil: Réfléchis à la méthode "${problem.strategy.fr}"` 
          : `Tip: Consider strategy "${problem.strategy.en}"`,
        isAiLoading: false
      });
    }
  },

  // Spaced Repetition & Miss Tracker state
  // Map of factId -> { attempts: number, misses: number, lastSeen: timestamp }
  reflexesStats: JSON.parse(localStorage.getItem('mathquete_reflexes_stats') || '{}'),

  // Record fact result into Spaced Repetition tracker and sync to Supabase table `reflexes_stats`
  recordFactResult: async (factId, isCorrect) => {
    const { reflexesStats } = get();
    const existing = reflexesStats[factId] || { attempts: 0, misses: 0, lastSeen: 0 };
    const updated = {
      attempts: existing.attempts + 1,
      misses: isCorrect ? existing.misses : existing.misses + 1,
      lastSeen: Date.now()
    };
    const newStats = { ...reflexesStats, [factId]: updated };
    localStorage.setItem('mathquete_reflexes_stats', JSON.stringify(newStats));
    set({ reflexesStats: newStats });

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('reflexes_stats').upsert({
            user_id: user.id,
            fact_id: factId,
            attempts: updated.attempts,
            miss_count: updated.misses,
            last_seen: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn('Supabase reflexes log error:', err);
      }
    }
  },

  getAllTopics: () => TOPICS
}));

