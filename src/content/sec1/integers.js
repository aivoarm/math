export const meta = {
  id: "sec1.integers",
  titleFr: "Mission C: Nombres Entiers (Z) & Sceaux 📜",
  titleEn: "C-Rank Mission: Integers (Z) & Seals 📜",
  grade: "Sec 1 • 30 Min Mission",
  xpPerProblem: 15,
  descriptionFr: "Mission de 30 minutes : Addition, soustraction et opérations avec nombres négatifs.",
  descriptionEn: "30-minute mission: Addition, subtraction, and operations with negative numbers."
};

export const problems = Array.from({ length: 15 }).map((_, i) => {
  const a = (i % 2 === 0 ? -1 : 1) * (i + 4);
  const b = (i % 3 === 0 ? -1 : 1) * (i + 7);
  const ans = a + b;
  return {
    id: `sec1.integers.${i + 1}`,
    qDisplay: `(${a}) + (${b})`,
    strategy: {
      fr: `Règle des signes Shinobi : combiner ${a} et ${b}.`,
      en: `Shinobi sign rule: combine ${a} and ${b}.`
    },
    steps: [`Sceau: (${a}) + (${b}) = ${ans} 🍃`],
    answer: ans,
    choices: [ans - 2, ans, ans + 2, ans + 4],
    hintPrompt: {
      fr: "Sensei : Attention à la direction du Chakra quand tu calcules avec des nombres négatifs !",
      en: "Sensei: Mind the direction of your Chakra when calculating negative numbers!"
    }
  };
});
