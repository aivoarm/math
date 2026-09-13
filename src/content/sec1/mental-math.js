export const meta = {
  id: "sec1.mental-math",
  titleFr: "Mission D: Speed Chakra Calculation Jutsu 🍥",
  titleEn: "D-Rank Mission: Speed Chakra Calculation Jutsu 🍥",
  grade: "Sec 1 • Academy Student",
  xpPerProblem: 15,
  descriptionFr: "Maîtrise le calcul rapide comme un vrai Shinobi de Konoha.",
  descriptionEn: "Master quick math like a true Konoha Shinobi."
};

export const problems = [
  {
    id: "sec1.mental-math.1",
    qDisplay: "14 × 18 Kunai",
    strategy: {
      fr: "Technique Secret : Arrondir 18 à 20 (280), puis soustraire 2 × 14 (28). Dattebayo !",
      en: "Secret Technique: Round 18 to 20 (280), then subtract 2 × 14 (28). Dattebayo!"
    },
    steps: [
      "Sceau 1: 14 × 20 = 280",
      "Sceau 2: 14 × 2 = 28",
      "Sceau 3: 280 − 28 = 252 🍃"
    ],
    answer: 252,
    choices: [238, 252, 264, 272],
    hintPrompt: {
      fr: "Sensei : Pense aux Sceaux de Main (20 - 2) pour concentrer ton Chakra !",
      en: "Sensei: Think of the Hand Seals (20 - 2) to focus your Chakra!"
    }
  },
  {
    id: "sec1.mental-math.2",
    qDisplay: "25 × 16 Shuriken",
    strategy: {
      fr: "Clone Jutsu : 25 × 4 = 100 ! Divise 16 Shuriken en 4 × 4.",
      en: "Clone Jutsu: 25 × 4 = 100! Split 16 Shuriken into 4 × 4."
    },
    steps: [
      "Sceau 1: 25 × 4 = 100",
      "Sceau 2: 16 ÷ 4 = 4",
      "Sceau 3: 100 × 4 = 400 🌀"
    ],
    answer: 400,
    choices: [350, 380, 400, 425],
    hintPrompt: {
      fr: "Sensei : Multiplie 25 par 4 d'abord !",
      en: "Sensei: Multiply 25 by 4 first!"
    }
  },
  {
    id: "sec1.mental-math.3",
    qDisplay: "15% de 240 Bols de Ramen 🍜",
    strategy: {
      fr: "Chakra Boost : 10% (24) + 5% (12) = 36 !",
      en: "Chakra Boost: 10% (24) + 5% (12) = 36!"
    },
    steps: [
      "10% de 240 = 24",
      "5% de 240 = 12",
      "24 + 12 = 36 🍥"
    ],
    answer: 36,
    choices: [30, 36, 42, 48],
    hintPrompt: {
      fr: "Sensei : Trouve 10% d'abord en enlevant un 0.",
      en: "Sensei: Find 10% first by dropping a 0."
    }
  },
  {
    id: "sec1.mental-math.4",
    qDisplay: "99 × 7 Ninja Scrolls 📜",
    strategy: {
      fr: "Rasengan Math : (100 × 7) − (1 × 7).",
      en: "Rasengan Math: (100 × 7) − (1 × 7)."
    },
    steps: [
      "100 × 7 = 700",
      "1 × 7 = 7",
      "700 − 7 = 693 🔥"
    ],
    answer: 693,
    choices: [683, 693, 697, 703],
    hintPrompt: {
      fr: "Sensei : 99 est égal à (100 - 1) !",
      en: "Sensei: 99 is equal to (100 - 1)!"
    }
  },
  {
    id: "sec1.mental-math.5",
    qDisplay: "450 ÷ 5 Shinobi Academy",
    strategy: {
      fr: "Taijutsu Speed : 45 ÷ 5 = 9, puis rajoute le 0.",
      en: "Taijutsu Speed: 45 ÷ 5 = 9, then attach the 0."
    },
    steps: [
      "45 ÷ 5 = 9",
      "9 × 10 = 90 ⚡"
    ],
    answer: 90,
    choices: [80, 85, 90, 95],
    hintPrompt: {
      fr: "Sensei : 45 divisé par 5 donne quoi ?",
      en: "Sensei: What is 45 divided by 5?"
    }
  }
];
