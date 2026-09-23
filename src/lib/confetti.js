import confetti from 'canvas-confetti';

export function fireConfetti(options = {}) {
  try {
    confetti({
      particleCount: options.particleCount || 75,
      spread: options.spread || 80,
      origin: options.origin || { y: 0.6 },
      colors: options.colors || ['#10B981', '#FF6B00', '#FFD200', '#A855F7', '#3B82F6']
    });
  } catch (e) {
    // fallback if canvas unavailable
  }
}
