export const meta = {
  id: "sec1.mental-math",
  titleFr: "Calcul mental & Astuces",
  titleEn: "Mental Math & Tricks",
  grade: "Sec 1",
  xpPerProblem: 10,
  descriptionFr: "Développe des stratégies rapides pour multiplier et diviser sans calculatrice.",
  descriptionEn: "Develop quick strategies to multiply and divide without a calculator."
};

export const problems = [
  {
    id: "sec1.mental-math.1",
    qDisplay: "14 × 18",
    strategy: {
      fr: "Arrondir 18 à 20, multiplier, puis soustraire 2 fois 14.",
      en: "Round 18 up to 20, multiply, then subtract 2 times 14."
    },
    steps: [
      "14 × 20 = 280",
      "14 × 2 = 28",
      "280 − 28 = 252"
    ],
    answer: 252,
    choices: [238, 252, 264, 272],
    hintPrompt: {
      fr: "Explique comment calculer 14 × 18 mentalement en arrondissant 18 à 20.",
      en: "Explain how to calculate 14 × 18 mentally by rounding 18 up to 20."
    }
  },
  {
    id: "sec1.mental-math.2",
    qDisplay: "25 × 16",
    strategy: {
      fr: "Diviser 16 par 4 et multiplier 25 par 4 (25 × 4 = 100).",
      en: "Divide 16 by 4 and multiply 25 by 4 (25 × 4 = 100)."
    },
    steps: [
      "25 × 4 = 100",
      "16 ÷ 4 = 4",
      "100 × 4 = 400"
    ],
    answer: 400,
    choices: [350, 380, 400, 425],
    hintPrompt: {
      fr: "Astuce : 25 × 4 donne 100. Pense à séparer 16 en 4 × 4.",
      en: "Tip: 25 × 4 is 100. Think of splitting 16 into 4 × 4."
    }
  },
  {
    id: "sec1.mental-math.3",
    qDisplay: "15% de 240",
    strategy: {
      fr: "Trouver 10% (diviser par 10) puis ajouter la moitié (5%).",
      en: "Find 10% (divide by 10) then add half of that (5%)."
    },
    steps: [
      "10% de 240 = 24",
      "5% de 240 = 12",
      "24 + 12 = 36"
    ],
    answer: 36,
    choices: [30, 36, 42, 48],
    hintPrompt: {
      fr: "10% de 240 se calcule en enlevant un zéro. Combien vaut 5% par rapport à 10%?",
      en: "10% of 240 is calculated by dropping a zero. What is 5% compared to 10%?"
    }
  },
  {
    id: "sec1.mental-math.4",
    qDisplay: "99 × 7",
    strategy: {
      fr: "Arrondir 99 à 100, faire 100 × 7, puis soustraire 1 × 7.",
      en: "Round 99 to 100, do 100 × 7, then subtract 1 × 7."
    },
    steps: [
      "100 × 7 = 700",
      "1 × 7 = 7",
      "700 − 7 = 693"
    ],
    answer: 693,
    choices: [683, 693, 697, 703],
    hintPrompt: {
      fr: "Pense à 99 comme (100 - 1).",
      en: "Think of 99 as (100 - 1)."
    }
  },
  {
    id: "sec1.mental-math.5",
    qDisplay: "450 ÷ 5",
    strategy: {
      fr: "Diviser 45 par 5 (9) puis rajouter le zéro.",
      en: "Divide 45 by 5 (9) then attach the zero."
    },
    steps: [
      "45 ÷ 5 = 9",
      "9 × 10 = 90"
    ],
    answer: 90,
    choices: [80, 85, 90, 95],
    hintPrompt: {
      fr: "Ignore le 0 au début: combien font 45 divisé par 5?",
      en: "Ignore the 0 at first: what is 45 divided by 5?"
    }
  }
];
