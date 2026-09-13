export const meta = {
  id: "sec1.fractions",
  titleFr: "Fractions & Dénominateurs",
  titleEn: "Fractions & Denominators",
  grade: "Sec 1",
  xpPerProblem: 15,
  descriptionFr: "Additionner, soustraire et simplifier des fractions avec un dénominateur commun.",
  descriptionEn: "Add, subtract, and simplify fractions with a common denominator."
};

export const problems = [
  {
    id: "sec1.fractions.1",
    qDisplay: "2/3 + 3/4",
    strategy: {
      fr: "Mettre les deux fractions sur un dénominateur commun (12).",
      en: "Put both fractions over a common denominator (12)."
    },
    steps: [
      "2/3 = 8/12",
      "3/4 = 9/12",
      "8/12 + 9/12 = 17/12"
    ],
    answer: "17/12",
    choices: ["5/7", "11/12", "17/12", "12/17"],
    hintPrompt: {
      fr: "Quel est le plus petit commun multiple (PPCM) de 3 et 4?",
      en: "What is the least common multiple (LCM) of 3 and 4?"
    }
  }
];
