export const meta = {
  id: "sec1.mental-math",
  titleFr: "Mission D: Speed Chakra Calculation Jutsu 🍥",
  titleEn: "D-Rank Mission: Speed Chakra Calculation Jutsu 🍥",
  grade: "Sec 1 • 30 Min Mission",
  xpPerProblem: 15,
  descriptionFr: "Mission complète de 30 minutes : 15 exercices de calcul mental intensifs.",
  descriptionEn: "Full 30-minute mission: 15 intensive mental math exercises."
};

export const problems = [
  {
    id: "sec1.mental-math.1",
    qDisplay: "14 × 18 Kunai",
    strategy: {
      fr: "Chorégraphie : Arrondir 18 à 20 (280), puis soustraire 2 × 14 (28). Dattebayo !",
      en: "Choreo: Round 18 to 20 (280), then subtract 2 × 14 (28). Dattebayo!"
    },
    steps: ["Step 1: 14 × 20 = 280", "Step 2: 14 × 2 = 28", "Step 3: 280 − 28 = 252 🍃"],
    answer: 252,
    choices: [238, 252, 264, 272],
    hintPrompt: {
      fr: "Sensei : Pense à 18 comme (20 - 2) pour concentrer ton Chakra !",
      en: "Sensei: Think of 18 as (20 - 2) to focus your Chakra!"
    }
  },
  {
    id: "sec1.mental-math.2",
    qDisplay: "25 × 16 Shuriken",
    strategy: {
      fr: "Clone Jutsu : 25 × 4 = 100 ! Divise 16 Shuriken en 4 × 4.",
      en: "Clone Jutsu: 25 × 4 = 100! Split 16 Shuriken into 4 × 4."
    },
    steps: ["Step 1: 25 × 4 = 100", "Step 2: 16 ÷ 4 = 4", "Step 3: 100 × 4 = 400 🌀"],
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
    steps: ["10% de 240 = 24", "5% de 240 = 12", "24 + 12 = 36 🍥"],
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
    steps: ["100 × 7 = 700", "1 × 7 = 7", "700 − 7 = 693 🔥"],
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
    steps: ["45 ÷ 5 = 9", "9 × 10 = 90 ⚡"],
    answer: 90,
    choices: [80, 85, 90, 95],
    hintPrompt: {
      fr: "Sensei : 45 divisé par 5 donne quoi ?",
      en: "Sensei: What is 45 divided by 5?"
    }
  },
  {
    id: "sec1.mental-math.6",
    qDisplay: "19 × 12 Katana",
    strategy: {
      fr: "Chorégraphie : 19 × 10 = 190, 19 × 2 = 38. 190 + 38 = 228.",
      en: "Choreo: 19 × 10 = 190, 19 × 2 = 38. 190 + 38 = 228."
    },
    steps: ["19 × 10 = 190", "19 × 2 = 38", "190 + 38 = 228 🗡️"],
    answer: 228,
    choices: [218, 228, 238, 248],
    hintPrompt: {
      fr: "Sensei : Décompose 12 en (10 + 2).",
      en: "Sensei: Split 12 into (10 + 2)."
    }
  },
  {
    id: "sec1.mental-math.7",
    qDisplay: "18 × 15 Chakra Scrolls",
    strategy: {
      fr: "18 × 10 = 180, 18 × 5 = 90. 180 + 90 = 270.",
      en: "18 × 10 = 180, 18 × 5 = 90. 180 + 90 = 270."
    },
    steps: ["18 × 10 = 180", "18 × 5 = 90", "180 + 90 = 270 🌀"],
    answer: 270,
    choices: [250, 260, 270, 280],
    hintPrompt: {
      fr: "Sensei : Multiplie par 10 puis ajoute la moitié !",
      en: "Sensei: Multiply by 10 then add half!"
    }
  },
  {
    id: "sec1.mental-math.8",
    qDisplay: "22 × 14 Training Dummy",
    strategy: {
      fr: "22 × 10 = 220, 22 × 4 = 88. 220 + 88 = 308.",
      en: "22 × 10 = 220, 22 × 4 = 88. 220 + 88 = 308."
    },
    steps: ["22 × 10 = 220", "22 × 4 = 88", "220 + 88 = 308 💥"],
    answer: 308,
    choices: [298, 308, 318, 328],
    hintPrompt: {
      fr: "Sensei : Décompose 14 en (10 + 4).",
      en: "Sensei: Split 14 into (10 + 4)."
    }
  },
  {
    id: "sec1.mental-math.9",
    qDisplay: "21 × 12 Ninja Guards",
    strategy: {
      fr: "21 × 10 = 210, 21 × 2 = 42. 210 + 42 = 252.",
      en: "21 × 10 = 210, 21 × 2 = 42. 210 + 42 = 252."
    },
    steps: ["21 × 10 = 210", "21 × 2 = 42", "210 + 42 = 252 🛡️"],
    answer: 252,
    choices: [242, 252, 262, 272],
    hintPrompt: {
      fr: "Sensei : 21 × 10 fait 210. Combien font 21 × 2 ?",
      en: "Sensei: 21 × 10 is 210. What is 21 × 2?"
    }
  },
  {
    id: "sec1.mental-math.10",
    qDisplay: "238 ÷ 14 Ninja Squads",
    strategy: {
      fr: "14 × 10 = 140. Reste 98. 14 × 7 = 98. 10 + 7 = 17.",
      en: "14 × 10 = 140. Remainder 98. 14 × 7 = 98. 10 + 7 = 17."
    },
    steps: ["238 - 140 = 98", "98 ÷ 14 = 7", "10 + 7 = 17 📜"],
    answer: 17,
    choices: [15, 16, 17, 18],
    hintPrompt: {
      fr: "Sensei : Utilise le crochet de division dans le Brouillon !",
      en: "Sensei: Use the division bracket in the Scratchpad!"
    }
  },
  {
    id: "sec1.mental-math.11",
    qDisplay: "25% de 360 Chakra Pills",
    strategy: {
      fr: "25% = Diviser par 4. 360 ÷ 4 = 90.",
      en: "25% = Divide by 4. 360 ÷ 4 = 90."
    },
    steps: ["360 ÷ 2 = 180", "180 ÷ 2 = 90 💊"],
    answer: 90,
    choices: [80, 85, 90, 95],
    hintPrompt: {
      fr: "Sensei : Prendre 25%, c'est prendre la moitié de la moitié !",
      en: "Sensei: 25% is half of half!"
    }
  },
  {
    id: "sec1.mental-math.12",
    qDisplay: "16 × 15 Explosive Tags",
    strategy: {
      fr: "16 × 10 = 160, 16 × 5 = 80. 160 + 80 = 240.",
      en: "16 × 10 = 160, 16 × 5 = 80. 160 + 80 = 240."
    },
    steps: ["16 × 10 = 160", "16 × 5 = 80", "160 + 80 = 240 💣"],
    answer: 240,
    choices: [230, 240, 250, 260],
    hintPrompt: {
      fr: "Sensei : Multiplie par 10 puis ajoute la moitié !",
      en: "Sensei: Multiply by 10 then add half!"
    }
  },
  {
    id: "sec1.mental-math.13",
    qDisplay: "324 ÷ 18 Wind Blades",
    strategy: {
      fr: "18 × 10 = 180. Reste 144. 18 × 8 = 144. 10 + 8 = 18.",
      en: "18 × 10 = 180. Remainder 144. 18 × 8 = 144. 10 + 8 = 18."
    },
    steps: ["324 - 180 = 144", "144 ÷ 18 = 8", "10 + 8 = 18 🍃"],
    answer: 18,
    choices: [16, 17, 18, 19],
    hintPrompt: {
      fr: "Sensei : 18 × 18 = 324 !",
      en: "Sensei: 18 × 18 = 324!"
    }
  },
  {
    id: "sec1.mental-math.14",
    qDisplay: "24 × 15 Fire Orbs",
    strategy: {
      fr: "24 × 10 = 240, 24 × 5 = 120. 240 + 120 = 360.",
      en: "24 × 10 = 240, 24 × 5 = 120. 240 + 120 = 360."
    },
    steps: ["24 × 10 = 240", "24 × 5 = 120", "240 + 120 = 360 🔥"],
    answer: 360,
    choices: [340, 350, 360, 370],
    hintPrompt: {
      fr: "Sensei : 240 + 120 fait combien ?",
      en: "Sensei: What is 240 + 120?"
    }
  },
  {
    id: "sec1.mental-math.15",
    qDisplay: "625 ÷ 25 Shadow Clones",
    strategy: {
      fr: "25 × 20 = 500. Reste 125. 25 × 5 = 125. 20 + 5 = 25.",
      en: "25 × 20 = 500. Remainder 125. 25 × 5 = 125. 20 + 5 = 25."
    },
    steps: ["625 - 500 = 125", "125 ÷ 25 = 5", "20 + 5 = 25 👥"],
    answer: 25,
    choices: [23, 24, 25, 26],
    hintPrompt: {
      fr: "Sensei : 25 au carré (25 × 25) donne 625 !",
      en: "Sensei: 25 squared (25 × 25) is 625!"
    }
  }
];
