// Helper to get random integer between min and max inclusive
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 30 fresh multiplication problems (two 2-digit numbers)
export const generatePart1Problems = () => {
  const problems = [];
  const count = 30;

  for (let i = 1; i <= count; i++) {
    const num1 = getRandomInt(11, 25);
    const num2 = getRandomInt(11, 20);
    problems.push({
      id: i,
      q: `${num1} × ${num2}`,
      answer: num1 * num2
    });
  }

  return problems;
};

// Generate 20 fresh division problems (product ÷ divisor = quotient)
export const generatePart2Problems = () => {
  const problems = [];
  const count = 20;

  for (let i = 31; i <= 30 + count; i++) {
    const divisor = getRandomInt(11, 25);
    const quotient = getRandomInt(11, 25);
    const dividend = divisor * quotient;

    problems.push({
      id: i,
      q: `${dividend} ÷ ${divisor}`,
      answer: quotient
    });
  }

  return problems;
};

export const examData = {
  meta: {
    id: "chunin-exam-mode",
    titleFr: "Épreuve Chunin : Exam Mode Timé ⏱️",
    titleEn: "Chunin Exam Mode: Timed Speed Trial ⏱️",
  },
  part1: {
    id: "part1",
    titleFr: "Partie 1 : Multiplication Speed Jutsu",
    titleEn: "Part 1: Multiplication Speed Jutsu",
    targetMinutes: 5,
    targetSeconds: 300
  },
  part2: {
    id: "part2",
    titleFr: "Partie 2 : Division Chakra Jutsu",
    titleEn: "Part 2: Division Chakra Jutsu",
    targetMinutes: 15,
    targetSeconds: 900
  }
};
