# 🧮 MathQuête (Math Quest)

**MathQuête** is an interactive, gamified math learning platform designed for Quebec students (aligned with the **PFEQ - Programme de formation de l'école québécoise** curriculum). Featuring a energetic **Naruto / Ninja themed aesthetic**, it turns math practice into an engaging quest complete with XP, rank progression, streaks, interactive step-by-step problem breakdown, scratchpad canvas drawing with OCR symbol detection, AI-powered tutoring hints via Claude 3.5 Sonnet, and full bilingual support (French/English).

---

## 🌟 Key Features

- **🎮 Gamified Progression & Ninja Ranks**: Earn XP, unlock ranks (from *Élève Ninja / Genin* to *Maître Hokage / Kage*), and maintain daily streaks to boost math motivation.
- **📚 PFEQ Curriculum Alignment**: Curriculum-tailored math modules covering Primary and Secondary levels:
  - *Primaire*: Addition/subtraction, multiplication/division, geometry, fractions & decimals.
  - *Secondaire 1 & 2*: Algebra basics, equations, proportional reasoning.
  - *Secondaire 3*: Functions & linear equations, geometry & trigonometry.
  - *Secondaire 4 (SN & CST)*: Quadratics, exponential functions, analytic geometry.
  - *Secondaire 5 (SN & CST)*: Logarithms, advanced trigonometry, vectors & matrices.
- **📝 Interactive Canvas Scratchpad**: Draw freehand equations, write scratch notes directly on an HTML5 Canvas workspace, and use built-in geometry tool helpers or math OCR features.
- **🤖 AI Hints (Claude 3.5 Sonnet)**: Netlify serverless function integration (`/api/hint`) powered by `@anthropic-ai/sdk` to provide contextual, step-by-step hints without giving away direct answers.
- **📝 Full Exam Simulator**: Practice timed exam modes under realistic conditions with immediate score reports, mastery breakdowns, and review sessions.
- **🌐 Bilingual Support**: Seamlessly toggle between French (`fr`) and English (`en`) at any time across the entire UI and question base.
- **☁️ Supabase Sync**: Local-first state management with Zustand, with optional cloud backup and sync powered by Supabase integration.

---

## 🏗️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: Vanilla CSS (Custom design system with dark mode, vibrant orange/gold gradients, glassmorphism, and responsive layout)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Serverless**: [Netlify Functions](https://docs.netlify.com/functions/overview/) (Node.js)
- **AI Integration**: Anthropic Claude 3.5 Sonnet (`@anthropic-ai/sdk`)
- **Database & Auth**: [Supabase JS Client](https://supabase.com/) (`@supabase/supabase-js`)

---

## 📁 Project Structure

```
math/
├── index.html                  # Main HTML entry point
├── vite.config.js              # Vite configuration
├── netlify.toml                # Netlify deployment & redirect config
├── netlify/
│   └── functions/
│       └── hint.js             # Serverless endpoint for Anthropic AI hints
├── src/
│   ├── main.jsx                # React app entry point
│   ├── App.jsx                 # Main App wrapper, header nav, and screen router
│   ├── index.css               # Global theme tokens, typography, and styling
│   ├── components/
│   │   ├── game/               # Gameplay components (Scratchpad, QuestionCard, HintPanel, ChoiceGrid, StepBreakdown)
│   │   ├── screens/            # Application views (HomeScreen, GameScreen, ExamScreen, DoneScreen, ProfileScreen)
│   │   └── ui/                 # Reusable UI elements (XPBar, StreakBadge, Buttons, Badges)
│   ├── content/                # PFEQ curriculum modules & question databases
│   ├── lib/                    # Supabase setup, i18n translation dictionary, OCR & utilities
│   └── store/                  # Zustand state store for player progression, active session, and settings
└── public/                     # Static assets & favicons
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or later recommended)
- **npm** (v9.x or later)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd math
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the project root directory:
   ```env
   # Anthropic AI Key (for Netlify serverless hints)
   ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm run dev`**  
  Starts the Vite development server locally at `http://localhost:5173`.

- **`npm run build`**  
  Builds the production-ready bundle into the `dist` directory.

- **`npm run preview`**  
  Locally previews the built production application.

- **`npx netlify dev`** *(Optional)*  
  Runs Vite alongside Netlify serverless functions locally for full AI hint endpoint testing.

---

## 🛡️ License & Credits

Designed & Created for **MathQuête** — Conforme au programme PFEQ (Québec).
All rights reserved.
