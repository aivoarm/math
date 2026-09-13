export const meta = {
  id: "sec1.geometry",
  titleFr: "Périmètre & Aire",
  titleEn: "Perimeter & Area",
  grade: "Sec 1",
  xpPerProblem: 15,
  descriptionFr: "Calcul de l'aire et du périmètre de polygones décomposables.",
  descriptionEn: "Calculation of area and perimeter of composite polygons."
};

export const problems = [
  {
    id: "sec1.geometry.1",
    qDisplay: "Aire d'un rectangle de 24m par 15m",
    strategy: {
      fr: "Formule de l'aire: A = Longueur × Largeur",
      en: "Area formula: A = Length × Width"
    },
    steps: [
      "A = 24 × 15",
      "24 × 10 = 240",
      "24 × 5 = 120",
      "240 + 120 = 360 m²"
    ],
    answer: 360,
    choices: [310, 340, 360, 390],
    hintPrompt: {
      fr: "Pour calculer l'aire d'un rectangle, on multiplie sa longueur par sa largeur.",
      en: "To calculate the area of a rectangle, multiply its length by its width."
    }
  }
];
