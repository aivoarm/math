export const meta = {
  id: "sec1.mental-math",
  titleFr: "Debut Album: Calcul Mental Speed Beat",
  titleEn: "Debut Album: Speed Mental Math Beat",
  grade: "Sec 1 • Trainee Stage",
  xpPerProblem: 15,
  descriptionFr: "Maîtrise le tempo rapide pour les multiplications et divisions de scène.",
  descriptionEn: "Master fast stage tempos for multiplications and divisions."
};

export const problems = [
  {
    id: "sec1.mental-math.1",
    qDisplay: "14 × 18",
    strategy: {
      fr: "Chorégraphie : Arrondir 18 à 20, multiplier (280), puis retirer 2 × 14 (28).",
      en: "Choreo: Round 18 to 20, multiply (280), then remove 2 × 14 (28)."
    },
    steps: [
      "Step 1: 14 × 20 = 280",
      "Step 2: 14 × 2 = 28",
      "Step 3: 280 − 28 = 252 💖"
    ],
    answer: 252,
    choices: [238, 252, 264, 272],
    hintPrompt: {
      fr: "PD-nim : Pense à 18 comme (20 - 2) pour faire monter le Fandom Power!",
      en: "PD-nim: Think of 18 as (20 - 2) to boost your Fandom Power!"
    }
  },
  {
    id: "sec1.mental-math.2",
    qDisplay: "25 × 16",
    strategy: {
      fr: "Astuce K-Pop : 25 × 4 = 100 ! Divise 16 en 4 × 4.",
      en: "K-Pop Trick: 25 × 4 = 100! Split 16 into 4 × 4."
    },
    steps: [
      "Step 1: 25 × 4 = 100",
      "Step 2: 16 ÷ 4 = 4",
      "Step 3: 100 × 4 = 400 ✨"
    ],
    answer: 400,
    choices: [350, 380, 400, 425],
    hintPrompt: {
      fr: "PD-nim : Multiplie 25 par 4 d'abord !",
      en: "PD-nim: Multiply 25 by 4 first!"
    }
  },
  {
    id: "sec1.mental-math.3",
    qDisplay: "15% de 240 Lightsticks",
    strategy: {
      fr: "Calcul Fandom : 10% (24) + 5% (12) = 36 !",
      en: "Fandom Math: 10% (24) + 5% (12) = 36!"
    },
    steps: [
      "10% de 240 = 24",
      "5% de 240 = 12",
      "24 + 12 = 36 🎤"
    ],
    answer: 36,
    choices: [30, 36, 42, 48],
    hintPrompt: {
      fr: "PD-nim : Trouve 10% d'abord en enlevant un 0, puis prends la moitié.",
      en: "PD-nim: Find 10% first by dropping a 0, then take half."
    }
  },
  {
    id: "sec1.mental-math.4",
    qDisplay: "99 × 7 Stage Lights",
    strategy: {
      fr: "Piste Remix : (100 × 7) − (1 × 7).",
      en: "Remix Track: (100 × 7) − (1 × 7)."
    },
    steps: [
      "100 × 7 = 700",
      "1 × 7 = 7",
      "700 − 7 = 693 🌟"
    ],
    answer: 693,
    choices: [683, 693, 697, 703],
    hintPrompt: {
      fr: "PD-nim : 99 est presque 100 !",
      en: "PD-nim: 99 is almost 100!"
    }
  },
  {
    id: "sec1.mental-math.5",
    qDisplay: "450 ÷ 5 Trainees",
    strategy: {
      fr: "Rhythme : 45 ÷ 5 = 9, puis ajoute le 0.",
      en: "Rhythm: 45 ÷ 5 = 9, then add the 0."
    },
    steps: [
      "45 ÷ 5 = 9",
      "9 × 10 = 90 👑"
    ],
    answer: 90,
    choices: [80, 85, 90, 95],
    hintPrompt: {
      fr: "PD-nim : 45 divisé par 5 donne quoi ?",
      en: "PD-nim: What is 45 divided by 5?"
    }
  }
];
