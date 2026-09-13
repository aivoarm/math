export const meta = {
  id: "sec1.integers",
  titleFr: "Nombres entiers (Z)",
  titleEn: "Integers (Z)",
  grade: "Sec 1",
  xpPerProblem: 12,
  descriptionFr: "Maîtrise l'addition, la soustraction et les priorités d'opérations avec les nombres négatifs.",
  descriptionEn: "Master addition, subtraction, and order of operations with negative numbers."
};

export const problems = [
  {
    id: "sec1.integers.1",
    qDisplay: "(-7) + (-12) − (-5)",
    strategy: {
      fr: "Deux moins consécutifs deviennent un plus: -(-5) = +5.",
      en: "Two consecutive minus signs become a plus: -(-5) = +5."
    },
    steps: [
      "(-7) + (-12) = -19",
      "-19 + 5 = -14"
    ],
    answer: -14,
    choices: [-24, -14, -10, 10],
    hintPrompt: {
      fr: "Rappelle-toi : soustraire un nombre négatif équivaut à ajouter son opposé.",
      en: "Remember: subtracting a negative number is equivalent to adding its opposite."
    }
  },
  {
    id: "sec1.integers.2",
    qDisplay: "(-4) × 6 ÷ (-3)",
    strategy: {
      fr: "Multiplier de gauche à droite, puis appliquer la règle des signes (négatif ÷ négatif = positif).",
      en: "Multiply left to right, then apply the sign rule (negative ÷ negative = positive)."
    },
    steps: [
      "(-4) × 6 = -24",
      "(-24) ÷ (-3) = 8"
    ],
    answer: 8,
    choices: [-8, -6, 6, 8],
    hintPrompt: {
      fr: "Un négatif fois un positif donne un résultat négatif. Deux négatifs divisés donnent un positif.",
      en: "A negative times a positive gives a negative. Two negative numbers divided give a positive."
    }
  }
];
