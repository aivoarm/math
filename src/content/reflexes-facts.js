export const reflexFactSets = {
  times_tables: {
    id: 'times_tables',
    titleFr: 'Multiplications Avancées (12-25)',
    titleEn: 'Advanced Multiplication (12-25)',
    icon: '✖️',
    generate: () => {
      const a = Math.floor(Math.random() * 14) + 12; // 12 to 25
      const b = Math.floor(Math.random() * 14) + 12; // 12 to 25
      const factId = `mult_${Math.min(a, b)}x${Math.max(a, b)}`;
      return {
        id: factId,
        qDisplay: `${a} × ${b}`,
        a,
        b,
        op: '×',
        answer: a * b,
        category: 'times_tables'
      };
    }
  },
  squares: {
    id: 'squares',
    titleFr: 'Carrés Parfaits (11-35)',
    titleEn: 'Perfect Squares (11-35)',
    icon: '²',
    generate: () => {
      const n = Math.floor(Math.random() * 25) + 11; // 11 to 35
      const factId = `sq_${n}`;
      return {
        id: factId,
        qDisplay: `${n}²`,
        n,
        answer: n * n,
        category: 'squares'
      };
    }
  },
  cubes: {
    id: 'cubes',
    titleFr: 'Cubes (5-20)',
    titleEn: 'Cubes (5-20)',
    icon: '³',
    generate: () => {
      const n = Math.floor(Math.random() * 16) + 5; // 5 to 20
      const factId = `cube_${n}`;
      return {
        id: factId,
        qDisplay: `${n}³`,
        n,
        answer: n * n * n,
        category: 'cubes'
      };
    }
  },
  fractions_decimals: {
    id: 'fractions_decimals',
    titleFr: 'Fractions ↔ Décimaux',
    titleEn: 'Fractions ↔ Decimals',
    icon: '½',
    generate: () => {
      const pairs = [
        { q: '1/2', a: 0.5, id: 'frac_1_2' },
        { q: '1/4', a: 0.25, id: 'frac_1_4' },
        { q: '3/4', a: 0.75, id: 'frac_3_4' },
        { q: '1/5', a: 0.2, id: 'frac_1_5' },
        { q: '2/5', a: 0.4, id: 'frac_2_5' },
        { q: '3/5', a: 0.6, id: 'frac_3_5' },
        { q: '4/5', a: 0.8, id: 'frac_4_5' },
        { q: '1/8', a: 0.125, id: 'frac_1_8' },
        { q: '3/8', a: 0.375, id: 'frac_3_8' },
        { q: '5/8', a: 0.625, id: 'frac_5_8' },
        { q: '7/8', a: 0.875, id: 'frac_7_8' },
        { q: '1/10', a: 0.1, id: 'frac_1_10' }
      ];
      const item = pairs[Math.floor(Math.random() * pairs.length)];
      return {
        id: item.id,
        qDisplay: `${item.q} = ?`,
        answer: item.a,
        category: 'fractions_decimals'
      };
    }
  },
  powers_of_2: {
    id: 'powers_of_2',
    titleFr: 'Puissances de 2 (2⁰ à 2¹⁰)',
    titleEn: 'Powers of 2 (2⁰ to 2¹⁰)',
    icon: '⚡',
    generate: () => {
      const p = Math.floor(Math.random() * 11); // 0 to 10
      const factId = `pow2_${p}`;
      return {
        id: factId,
        qDisplay: `2^${p}`,
        p,
        answer: Math.pow(2, p),
        category: 'powers_of_2'
      };
    }
  }
};

/**
 * Generate choices around the correct answer for reflex mode
 */
export function generateReflexChoices(fact, allowReverse = false) {
  const isReverse = allowReverse && Math.random() < 0.35 && fact.a && fact.b;
  let qText = fact.qDisplay;
  let correctAnswer = fact.answer;
  let fullStatement = `${fact.a} × ${fact.b} = ${fact.answer}`;

  if (isReverse) {
    const showAFirst = Math.random() < 0.5;
    if (showAFirst) {
      qText = `? × ${fact.b} = ${fact.answer}`;
      correctAnswer = fact.a;
      fullStatement = `${fact.a} × ${fact.b} = ${fact.answer}`;
    } else {
      qText = `${fact.a} × ? = ${fact.answer}`;
      correctAnswer = fact.b;
      fullStatement = `${fact.a} × ${fact.b} = ${fact.answer}`;
    }
  } else if (fact.category === 'squares') {
    fullStatement = `${fact.n}² = ${fact.answer}`;
  } else if (fact.category === 'cubes') {
    fullStatement = `${fact.n}³ = ${fact.answer}`;
  } else if (fact.category === 'powers_of_2') {
    fullStatement = `2^${fact.p} = ${fact.answer}`;
  } else if (fact.category === 'fractions_decimals') {
    fullStatement = `${fact.qDisplay.replace(' = ?', '')} = ${fact.answer}`;
  }

  const choices = new Set([correctAnswer]);

  while (choices.size < 4) {
    let offset;
    if (Number.isInteger(correctAnswer)) {
      offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
      if (Math.abs(correctAnswer) > 20) {
        offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() < 0.5 ? 2 : -2);
      }
    } else {
      offset = (Math.floor(Math.random() * 4) + 1) * 0.05 * (Math.random() < 0.5 ? 1 : -1);
    }
    const fake = Number.isInteger(correctAnswer) ? correctAnswer + offset : parseFloat((correctAnswer + offset).toFixed(3));
    if (fake >= 0) {
      choices.add(fake);
    }
  }

  return {
    questionText: qText,
    correctAnswer,
    fullStatement,
    choices: Array.from(choices).sort(() => Math.random() - 0.5)
  };
}
