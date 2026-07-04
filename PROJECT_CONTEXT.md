# PROJECT CONTEXT
Paste this entire file at the start of every new Claude chat.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. WHAT WE ARE BUILDING
**App Name:** FinSight

**Project Type:** FRONTEND

**Has AI Features:** NO

**Description:** FinSight is a responsive, single-user personal finance dashboard that visualizes income, expenses, spending trends, and savings goals using realistic mock data (no backend, no real accounts). It's a portfolio piece designed to showcase data visualization, dashboard UX, and responsive design skills. Built entirely with static/generated mock data — no signup, no real money moving.

**MVP Definition:** A dashboard with summary overview cards (balance, income, expenses, net savings), 2 chart types (income/expense trend + spending by category), a filterable/searchable/sortable transactions list, a savings goals tracker with progress bars, a date range filter, and dark/light mode — all fully responsive from 320px to 1920px, populated with 150-300 believable mock transactions spanning 12 months.

## 2. TECH STACK
| Layer | Technology | Role |
|---|---|---|
| Framework | React + Vite | Component-based dashboard build, fast HMR |
| CSS | Tailwind CSS | Utility-first responsive styling, `darkMode: 'class'` strategy |
| UI Components | shadcn/ui | Accessible primitives (cards, dropdowns, dialogs, tabs, select) |
| Icons | Lucide React | Icon set paired with shadcn |
| Icon font (design system) | Material Symbols Outlined | Used in original Stitch design export |
| Charts | Recharts | Line/bar (trend) + pie/donut (category breakdown), SVG-based, responsive |
| State Management | Context API | `ThemeContext` (dark/light + localStorage) and `DateRangeContext` — only 2 global values needed |
| Routing | React Router (optional) | Only if deep-linking `/transactions` or `/goals`; default is single scrollable page |
| Animation | Auto Animate (Formkit) | Zero-config list/card transitions (filtering, reordering) |
| Toasts | Sonner | Lightweight UX polish notifications |
| Data | Static JSON / seeded mock generator | 150-300 generated transactions across 12 months, no backend/API |
| Fonts | Inter (Google Fonts) | Body + heading font, weights 400/500/600/700/800 |
| Deployment | Vercel | Zero-config Vite deploys, auto-deploy on GitHub push |
| Analytics (post-launch) | Vercel Analytics | Free-tier page view tracking |

*No AI provider, vector DB, backend, database, auth, or payment integration — this is an intentionally frontend-only, mock-data project.*

## 3. RESPONSIVENESS STRATEGY
**Approach:** Mobile-first

**Breakpoints:** sm 640px / md 768px / lg 1024px / xl 1280px *(2xl 1536px not used — app caps custom tuning at xl)*

**Mobile navigation:** No traditional nav (single-page dashboard). Sticky top bar with date-range selector collapsing into a dropdown on mobile. Section navigation via a bottom tab bar on mobile (Overview / Trends / Transactions / Goals) that smooth-scrolls to sections and highlights the active tab; on desktop this becomes horizontal tabs/nav links instead.

**Key layout shifts:**
- Summary cards: 4-column grid (desktop, `lg:grid-cols-4`) → 2-column (tablet, `md:grid-cols-2`) → 1-column stacked (mobile)
- Charts row: side-by-side `lg:grid-cols-10` (6/4 split) (desktop) → full-width stacked (below 1024px)
- Transactions: full `<table>` (≥768px) → card-per-transaction stacked list (mobile) — tables don't reflow well
- Goals grid: 3-column (desktop) → 2-column (tablet) → 1-column stacked (mobile)
- Header: full controls (desktop) → icon-triggered dropdown collapse (mobile)
- Filter bars: `grid-cols-12` desktop → `grid-cols-1` stacked full-width inputs on mobile, Search/Clear Filters full-width rows

**Touch target minimum:** 44×44px — flagged non-compliant elements to fix on mobile: icon buttons currently `w-10 h-10` (40px, e.g. theme toggle, calendar icon, pagination arrows, row "more_vert" actions) → bump to `w-11 h-11`; pagination number buttons currently `w-8 h-8` (32px) → increase to `w-11 h-11` with ≥8px gap.

## 4. AI INTEGRATION OVERVIEW
**Skipped — no AI features in this project.**

## 5. PROJECT FOLDER STRUCTURE
```
finsight/
├── public/
├── src/
│   ├── main.jsx                     # App entry, font/theme init
│   ├── App.jsx                      # Root component, routes
│   ├── index.css                    # Tailwind directives, global styles
│   ├── components/
│   │   ├── Header.jsx               # Logo, date range dropdown, theme toggle
│   │   ├── Layout.jsx               # Shared shell: Header + content + Footer
│   │   ├── MobileTabBar.jsx         # Bottom tab bar (mobile only, md:hidden)
│   │   ├── SummaryCard.jsx          # Balance/Income/Expenses/Net Savings card
│   │   ├── TrendChart.jsx           # Recharts LineChart, income vs expenses
│   │   ├── CategoryDonutChart.jsx   # Recharts PieChart, spending by category
│   │   ├── TransactionsTable.jsx    # Desktop table / mobile card-list toggle
│   │   ├── GoalCard.jsx             # Savings goal card w/ progress bar
│   │   ├── Skeleton.jsx             # Loading skeleton states
│   │   ├── ErrorBoundary.jsx        # Catches render errors
│   │   └── ui/                      # shadcn/ui generated components
│   ├── pages/
│   │   ├── Dashboard.jsx            # Home screen `/`
│   │   ├── TransactionsPage.jsx     # Optional full view `/transactions`
│   │   └── GoalsPage.jsx            # Optional full view `/goals`
│   ├── context/
│   │   ├── ThemeContext.jsx         # Dark/light mode + localStorage persistence
│   │   └── DateRangeContext.jsx     # Selected date range global state
│   ├── hooks/
│   │   ├── useFilteredTransactions.js  # search/category/sort/date derived data
│   │   ├── useSummaryTotals.js         # balance/income/expense/savings calc
│   │   └── useAutoAnimate.js           # Auto Animate hook wrapper
│   ├── data/
│   │   ├── transactions.js          # 150-300 generated mock transactions
│   │   └── goals.js                 # 2-4 mock savings goals
│   └── lib/
│       └── mockDataGenerator.js     # Seeded random generator for realistic data
├── tailwind.config.js               # Color tokens, darkMode: 'class', fontFamily
├── postcss.config.js
├── components.json                  # shadcn/ui config
├── vite.config.js
├── package.json
├── .prettierrc
├── .eslintrc
└── README.md                        # Description, live demo link, screenshots
```

## 6. DATABASE SCHEMA
**No database — frontend-only, static/generated mock data.** Mock data shapes:

```js
// src/data/transactions.js — shape per transaction
{
  id: string,
  date: "YYYY-MM-DD",
  merchant: string,
  category: "Housing" | "Food" | "Transport" | "Entertainment" | "Utilities" | "Income" | "Other",
  amount: number,        // negative = expense, positive = income
  type: "income" | "expense"
}

// src/data/goals.js — shape per goal
{
  id: string,
  name: string,
  targetAmount: number,
  currentAmount: number,
  targetDate: "YYYY-MM-DD",
  icon: string
}
```
Generate ~150-300 mock transactions spanning 12 months with realistic recurring patterns (rent on the 1st, biweekly paycheck, weekly groceries, etc.). 3 goal objects (e.g., "Emergency Fund," "Vacation," "New Laptop").

## 7. API ROUTES
**Skipped — no backend, no API routes.** All data operations (filtering, sorting, searching, date-range slicing, totals calculation) happen client-side via `useMemo`-based derived hooks (`useFilteredTransactions`, `useSummaryTotals`) operating on the static mock dataset.

## 8. ALL SCREENS
**Screen: Dashboard (Home)** — `/`
- Purpose: Header (logo, date-range selector, theme toggle) + summary cards + trend chart + category donut chart + transactions list + savings goals section
- AI feature: none
- Responsive: 4-col summary cards → 2-col → 1-col stacked; charts side-by-side (`lg:grid-cols-10`, 6/4 split) → stacked below 1024px; header controls collapse into dropdown on mobile; bottom tab bar appears only on mobile

**Screen: Transactions (optional full view)** — `/transactions`
- Purpose: Full-height transaction table with search/filter/sort and pagination
- AI feature: none
- Responsive: full `<table>` (≥768px) → stacked card-per-transaction list (mobile)

**Screen: Goals (optional full view)** — `/goals`
- Purpose: Larger goal cards with expanded detail (target date, monthly contribution needed)
- AI feature: none
- Responsive: 3-col grid → 2-col (tablet) → 1-col (mobile)

*Recommendation: build everything as one scrollable dashboard for MVP; only split into routes if it starts feeling cluttered.*

## 9. DESIGN SYSTEM SUMMARY

**Colors (core tokens):**
| Token | Hex | Usage |
|---|---|---|
| primary | `#004ac6` | Primary actions, active nav, links, focus rings |
| primary-container | `#2563eb` | Icon backgrounds, avatar/brand bg |
| secondary | `#006a69` | Secondary chart series, positive trend badges |
| tertiary | `#784b00` | Tertiary chart series (e.g. Transport) |
| error | `#ba1a1a` | Error states / negative amounts |
| background (rendered) | `#F8FAFC` (light) / `#0F172A` (dark) | Actual page bg (overrides `background` token `#faf8ff`) |
| surface-container-lowest | `#ffffff` (light) / `#1E293B` (dark) | Cards, tables, inputs |
| on-surface | `#131b2e` (light) / `#F1F5F9` (dark) | Primary text |
| on-surface-variant | `#434655` (light) / `#94A3B8` (dark) | Secondary/label text |
| outline-variant | `#c3c6d7` (light) / `#334155` (dark) | Borders, dividers |
| success | `#22C55E` | Completed progress bars, positive indicators |
| warning | `#F59E0B` | Warning states |

**Fonts:** Inter (400/500/600/700/800) for all text; Material Symbols Outlined for icons (`'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`, filled variant `'FILL' 1` on select brand icons).

**Type scale:** H1 32px desktop / 24px mobile · H2 24px / 20px mobile · H3 18px / 16px mobile · Body 15px (constant) · Label 13px (constant) · Small 13px.

**Spacing:** Base unit 4px. Scale: xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px. Page margins: 40px desktop → 16px mobile. Card padding: 24px → 16px mobile.

**Border radius:** lg 8px (inputs, icon squares) · xl 12px (cards, buttons, table containers) · full 9999px (pills, badges, progress fill).

**Shadows:** Resting: `0 1px 3px rgba(0,0,0,0.08)`. Hover: `0 4px 12px rgba(0,0,0,0.05)` paired with `translateY(-2px)`.

**Mobile nav:** Slide-in left drawer, 44×44px hamburger trigger, `translateX(-100%)→translateX(0)` over 300ms ease, backdrop `bg-black/40` fade.

**Component styles:** Primary button — filled `#004ac6`, white text, 44px height, 12px radius. Secondary button — outlined primary border, hover fills `surface-container-low`. Pill/ghost button — fully rounded, low-emphasis fill, used for date-range/category filters. Cards — white/dark surface, 24px padding, 12px radius, 1px border, resting shadow, hover lift. Tables → mobile card-list collapse pattern per Section 6 of design system doc.

**AI component styles:** N/A — no AI features in this project (design system includes speculative chat bubble/streaming/thinking-indicator patterns for future reference only, not used in MVP).

## 10. DESIGN REFERENCE INSTRUCTIONS
Designs stored in:
- `_designs/screens/` — desktop PNG screenshots
- `_designs/html_exports/` — desktop HTML/CSS per screen
- `_designs/ALL_SCREENS_HTML.md` — all screens combined with responsive notes
- `_designs/DESIGN_SYSTEM.md` — full design + responsive + AI component guide

**INSTRUCTION FOR AI:** When building any frontend screen or component:
1. Ask me to paste that screen's section from ALL_SCREENS_HTML.md
2. Build desktop layout first — match the Stitch design exactly
3. Then implement tablet (768px) then mobile (375px) responsive
4. Follow DESIGN_SYSTEM.md for all styling — do not invent styles
5. Use AI component patterns from DESIGN_SYSTEM.md for any AI UI elements (N/A for this project — no AI features)
6. Translate Stitch HTML into our actual framework (React + Tailwind) — never output raw HTML
7. No screen is done until tested at 375px / 768px / 1280px
8. All interactive elements: min 44×44px touch target on mobile

**Known design system inconsistencies to resolve during build:**
- Body background hardcoded `#F8FAFC` in two screens instead of token `bg-background` (`#faf8ff`) — standardize on the token
- Input left-padding inconsistent: `pl-[44px]` (transactions) vs `pl-xl`/32px (dashboard) — standardize to one value accounting for icon width
- Input radius inconsistent: `rounded-lg` (dashboard) vs `rounded-xl` (transactions filter bar) — standardize to `rounded-lg`
- Sticky header uses `sticky top-0` on dashboard but `fixed top-0` + manual `pt-[104px]` offset on savings goals — standardize on `sticky`
- No `sm:` Tailwind prefixes exist anywhere in the source export — the entire sub-768px range needs a true mobile pass built net-new (drawer nav, card-list tables, touch-target fixes), not extracted from source

## 11. IMPLEMENTATION PHASES
- **Phase 0 — Environment & Prerequisites:** Install Node LTS, code editor + extensions, create GitHub repo, link Vercel account.
- **Phase 1 — Project Initialization:** Scaffold Vite+React, install/configure Tailwind (dark mode `class` strategy from day one), wire color tokens, install Inter font, init shadcn/ui, install Recharts/Lucide/Auto Animate/Sonner, set up folder structure, configure Prettier/ESLint, initial commit.
- **Phase 5 — Frontend Foundation:** Build mock data layer (transactions + goals generators), create ThemeContext/DateRangeContext, build Header, decide/install routing, build Layout shell, build mobile tab bar, wire derived-data hooks (`useFilteredTransactions`, `useSummaryTotals`).
- **Phase 6 — Animation & Motion Setup:** Install/configure Auto Animate, define reusable Tailwind transition utilities, test on a throwaway list before broader use.
- **Phase 7 — Frontend Page by Page:** Build Dashboard (7A: summary cards, trend chart, donut chart, responsive pass), Transactions (7B: search/filter/sort/pagination, table→card-list collapse), Savings Goals (7C: progress bars, "Goal Reached" state, grid collapse), Shared UI polish (7D: Auto Animate application, empty states, dark mode pass).
- **Phase 10 — Third-Party Integrations:** Verify Google Fonts loads in production, confirm Vercel build settings.
- **Phase 12 — Error Handling, Loading States, Edge Cases:** Loading skeletons, empty-state/no-match handling, sparse-data note, Error Boundary, theme/date persistence without flash-of-wrong-theme.
- **Phase 13 — Full Responsiveness Audit:** Cross-screen audit at 1440/768/375px plus in-between widths (900px, 1024px), touch target verification, mobile tab bar behavior check.
- **Phase 14 — Performance Optimization:** Memoize derived computations, lazy-load routes, Lighthouse audit, `React.memo` on chart components.
- **Phase 15 — Testing & Bug Fixing:** Manually walk every user flow (load, date filter, search/filter/sort, goals, theme toggle, mobile nav), cross-browser check, fix and re-test.
- **Phase 16 — Deployment:** Local production build check, push to GitHub, trigger Vercel deploy, verify live URL, set custom subdomain.
- **Phase 17 — Post-Launch:** Add Vercel Analytics, final README pass (description, demo link, screenshots, tech stack), add to portfolio/resume.

*(Phases 2, 3, 4, 8, 9, 11 — Database, Auth, Backend API, AI Integration, Frontend-Backend Connection, SaaS Payments — are skipped entirely; this is a frontend-only, mock-data, no-AI project.)*

## 12. CURRENT PROGRESS
**Last updated:** 2026-07-04

**Completed subtasks:** None yet — planning phase complete (project blueprint, implementation plan, and design system have been finalized).

**Current subtask:**
- ID: 0.1
- Title: Environment setup
- Goal: Install Node.js LTS (20.x+), verify with `node -v`/`npm -v`, set up code editor with ES7+ React snippets / Tailwind CSS IntelliSense / Prettier extensions
- Files involved: none yet

**Next subtask:**
- ID: 0.3
- Title: Create GitHub repository (empty, Node `.gitignore`) and link Vercel account

## 13. ACTIVE CODEBASE
No code yet.

## 14. SESSION LOG
- 2026-07-04: Project setup complete. Planning done (project blueprint, implementation plan, design system all finalized). Ready to code, starting at Phase 0.

## 15. KNOWN ISSUES AND OPEN QUESTIONS
- Design system was extracted from only 3 desktop Stitch screens with no native mobile designs exported — the entire sub-768px experience (drawer nav, card-list table collapse, touch-target sizing) must be designed/built net-new rather than translated from source.
- Several styling inconsistencies flagged in the source export need resolving during build (see Section 10): background token mismatch, input padding/radius inconsistency, sticky vs. fixed header approach.
- Icon buttons (40×40px) and pagination buttons (32×32px) in the source design fall below the 44×44px touch target minimum and must be bumped up specifically for mobile breakpoints.
- Not yet decided: whether `/transactions` and `/goals` get dedicated routes (React Router) or stay as in-page scroll sections — default plan is single-page unless it feels cluttered once built.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━