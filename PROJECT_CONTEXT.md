━━━ ━━━
PROJECT CONTEXT
Paste this entire file at the start of every new Claude chat.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WE ARE BUILDING
App Name: FinSight
Project Type: FRONTEND
Has AI Features: NO
Description: FinSight is a responsive, single-user personal finance dashboard that visualizes income, expenses, spending trends, and savings goals using realistic mock data (no backend, no real accounts). It's a portfolio piece designed to showcase data visualization, dashboard UX, and responsive design skills. Built entirely with static/generated mock data — no signup, no real money moving.

MVP Definition: A dashboard with summary overview cards (balance, income, expenses, net savings), 2 chart types (income/expense trend + spending by category), a filterable/searchable/sortable transactions list, a savings goals tracker with progress bars, a date range filter, and dark/light mode — all fully responsive from 320px to 1920px, populated with 150-300 believable mock transactions spanning 12 months.

TECH STACK

Layer | Technology | Role
--- | --- | ---
Framework | React + Vite | Component-based dashboard build, fast HMR
CSS | Tailwind CSS v4 (via @tailwindcss/vite plugin) | Utility-first responsive styling, class-based dark mode via @custom-variant in CSS (no tailwind.config.js / PostCSS pipeline — v4 uses the Vite plugin directly)
UI Components | shadcn/ui | Accessible primitives (button, dropdown-menu so far; cards, dialogs, tabs, select to follow)
Icons | Lucide React | Icon set paired with shadcn — used for ALL in-app icons, including translations of Material Symbols glyphs found in the Stitch design export
Icon font (design system) | Material Symbols Outlined | Reference only — used in original Stitch design export; every glyph is translated to its closest Lucide equivalent when building real components
Charts | Recharts | Line/bar (trend) + pie/donut (category breakdown), SVG-based, responsive — now live in TrendChart.jsx and CategoryDonutChart.jsx
State Management | Context API | ThemeContext (dark/light + localStorage, consumed by Header) and DateRangeContext (consumed by Header AND now Dashboard.jsx) — both wired at root in main.jsx
Routing | React Router | Active: BrowserRouter in main.jsx, Routes/Route stubs in App.jsx for /, /transactions, /goals, nested under a shared Layout shell — Layout fully functional with Footer included
Animation | Auto Animate (Formkit) | Zero-config list/card transitions (filtering, reordering) — hook wrapper and shared transition classes built (Phase 6), verified on a throwaway test list, cardHoverLift now applied to SummaryCard/TrendChart/CategoryDonutChart
Toasts | Sonner | Lightweight UX polish notifications
Data | Static JSON / seeded mock generator | 150-300 generated transactions across 12 months, no backend/API
Fonts | Inter (Google Fonts) | Body + heading font, weights 400/500/600/700/800
Deployment | Vercel | Zero-config Vite deploys, auto-deploy on GitHub push
Analytics (post-launch) | Vercel Analytics | Free-tier page view tracking

No AI provider, vector DB, backend, database, auth, or payment integration — this is an intentionally frontend-only, mock-data project.

RESPONSIVENESS STRATEGY
Approach: Mobile-first
Breakpoints: sm 640px / md 768px / lg 1024px / xl 1280px (2xl 1536px not used — app caps custom tuning at xl)
Mobile navigation: No traditional nav (single-page dashboard). Sticky top bar with date-range selector collapsing into a dropdown on mobile. Section navigation via a bottom tab bar on mobile (Overview / Trends / Transactions / Goals) that smooth-scrolls to sections and highlights the active tab via IntersectionObserver; on desktop this becomes horizontal tabs/nav links instead.

Key layout shifts:
- Summary cards: 4-column grid (desktop, lg:grid-cols-4) → 2-column (tablet, md:grid-cols-2) → 1-column stacked (mobile) — desktop grid now live in Dashboard.jsx; mobile/tablet stacking is next subtask (7A.2.1)
- Charts row: side-by-side lg:grid-cols-10 (6/4 split) (desktop) → full-width stacked (below 1024px) — desktop split now live; stacking below 1024px pending 7A.2.1
- Transactions: full <table> (≥768px) → card-per-transaction stacked list (mobile) — tables don't reflow well; still a placeholder pending Phase 7B
- Goals grid: 3-column (desktop) → 2-column (tablet) → 1-column stacked (mobile) — still a placeholder pending Phase 7C
- Header: full controls (desktop) → icon-triggered dropdown collapse (mobile) — header itself is desktop-complete; responsive collapsing addressed later in Phase 7/13
- Filter bars: grid-cols-12 desktop → grid-cols-1 stacked full-width inputs on mobile, Search/Clear Filters full-width rows
- Touch target minimum: 44×44px — flagged non-compliant elements to fix on mobile: icon buttons currently w-10 h-10 (40px, e.g. theme toggle, calendar icon, pagination arrows, row "more_vert" actions) → bump to w-11 h-11; pagination number buttons currently w-8 h-8 (32px) → increase to w-11 h-11 with ≥8px gap. This includes the Header's theme toggle (h-10 w-10) and date-range pill (auto height) — flagged for Phase 13 audit. MobileTabBar buttons built to 44px minimum from the start (5.6.1), active-state highlighting wired via IntersectionObserver (5.6.2); section IDs it targets now exist in Dashboard.jsx (7A.1.5) but MobileTabBar is still not rendered anywhere.

AI INTEGRATION OVERVIEW
Skipped — no AI features in this project.

PROJECT FOLDER STRUCTURE
finsight/
├── public/
├── src/
│ ├── main.jsx # App entry; BrowserRouter > ThemeProvider > DateRangeProvider > App
│ ├── App.jsx # Routes: Layout wraps /, /transactions, /goals
│ ├── index.css # Tailwind v4 import, @theme tokens, dark variant
│ ├── components/
│ │ ├── Header.jsx # COMPLETE: logo + date-range dropdown + theme toggle
│ │ ├── Layout.jsx # COMPLETE: wraps Header + <Outlet /> + Footer
│ │ ├── Footer.jsx # COMPLETE: centered brand text + tagline, top border
│ │ ├── MobileTabBar.jsx # COMPLETE: bottom tab bar, IntersectionObserver active state; section IDs it targets now exist in Dashboard.jsx; still not imported/rendered in Layout or Dashboard
│ │ ├── TestList.jsx # TEMPORARY (6.3.1): Auto Animate verification list — DELETE after user confirms tests pass
│ │ ├── SummaryCard.jsx # NEW COMPLETE: reusable label/value/trend-badge card, cardHoverLift applied
│ │ ├── TrendChart.jsx # NEW COMPLETE: Recharts LineChart, income vs expenses aggregated by month, sparse-data note included
│ │ ├── CategoryDonutChart.jsx # NEW COMPLETE: Recharts PieChart donut + legend, spending by category, expenses only
│ │ ├── TransactionsTable.jsx # Desktop table / mobile card-list toggle — Phase 7B
│ │ ├── GoalCard.jsx # Savings goal card w/ progress bar — Phase 7C
│ │ ├── Skeleton.jsx # Loading skeleton states — Phase 12
│ │ ├── ErrorBoundary.jsx # Catches render errors — Phase 12
│ │ └── ui/ # shadcn/ui generated components (button, dropdown-menu)
│ ├── pages/
│ │ ├── Dashboard.jsx # NEW COMPLETE (desktop only): wires DateRangeContext → useFilteredTransactions → useSummaryTotals + charts; summary row, charts row, transactions/goals placeholders; section IDs overview/trends/transactions/goals added; responsive pass is next (7A.2.1)
│ │ ├── TransactionsPage.jsx # Placeholder — real build in Phase 7B (if kept)
│ │ └── GoalsPage.jsx # Placeholder — real build in Phase 7C (if kept)
│ ├── context/
│ │ ├── ThemeContext.jsx # Dark/light mode + localStorage persistence
│ │ └── DateRangeContext.jsx # Selected date range global state — now actually consumed by Dashboard.jsx
│ ├── hooks/
│ │ ├── useFilteredTransactions.js # COMPLETE: filters by date range/search/category, sorts by date or amount, memoized — now wired into Dashboard.jsx
│ │ ├── useSummaryTotals.js # COMPLETE: computes balance, income, expenses, netSavings from a transactions array, memoized — now wired into Dashboard.jsx
│ │ └── useAutoAnimate.js # COMPLETE: re-exports useAutoAnimate from @formkit/auto-animate/react
│ ├── data/
│ │ ├── transactions.js # 150-300 generated mock transactions — now consumed directly by Dashboard.jsx
│ │ └── goals.js # 2-4 mock savings goals
│ └── lib/
│ ├── mockDataGenerator.js # Seeded random generator for realistic data
│ └── animationClasses.js # COMPLETE: exports cardHoverLift, fadeIn, cardMotion — cardHoverLift now applied to SummaryCard/TrendChart/CategoryDonutChart
├── vite.config.js # Includes react() and tailwindcss() plugins
├── components.json # shadcn/ui config
├── package.json
├── .prettierrc
├── .eslintrc
└── README.md # Description, live demo link, screenshots

Note: No tailwind.config.js or postcss.config.js — Tailwind v4 is wired directly via the @tailwindcss/vite plugin, with theme/dark-mode config living in src/index.css instead.

DATABASE SCHEMA
No database — frontend-only, static/generated mock data. Mock data shapes:

```js
// src/data/transactions.js — shape per transaction
{
  id: string,
  date: "YYYY-MM-DD",
  merchant: string,
  category: "Housing" | "Food" | "Transport" | "Entertainment" | "Utilities" | "Income" | "Other",
  amount: number, // negative = expense, positive = income
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

API ROUTES
Skipped — no backend, no API routes. All data operations (filtering, sorting, searching, date-range slicing, totals calculation) happen client-side via useMemo-based derived hooks (useFilteredTransactions, useSummaryTotals) operating on the static mock dataset. Also now: month aggregation for TrendChart and category aggregation for CategoryDonutChart, both computed client-side via useMemo inside their respective components.

ALL SCREENS

Screen: Dashboard (Home) — /
Purpose: Header (logo, date-range selector, theme toggle) + summary cards + trend chart + category donut chart + transactions list + savings goals section
AI feature: none
Responsive: 4-col summary cards → 2-col → 1-col stacked; charts side-by-side (lg:grid-cols-10, 6/4 split) → stacked below 1024px; header controls collapse into dropdown on mobile; bottom tab bar appears only on mobile
Status: desktop layout live (7A.1.5) with real summary cards + charts wired to DateRangeContext; transactions/goals sections are placeholders; responsive pass pending (7A.2.1)

Screen: Transactions (optional full view) — /transactions
Purpose: Full-height transaction table with search/filter/sort and pagination
AI feature: none
Responsive: full <table> (≥768px) → stacked card-per-transaction list (mobile)
Status: placeholder page only, real build in Phase 7B

Screen: Goals (optional full view) — /goals
Purpose: Larger goal cards with expanded detail (target date, monthly contribution needed)
AI feature: none
Responsive: 3-col grid → 2-col (tablet) → 1-col (mobile)
Status: placeholder page only, real build in Phase 7C

Recommendation: build everything as one scrollable dashboard for MVP; only split into routes if it starts feeling cluttered. (Routing has now been installed per 5.4.1 — /transactions and /goals exist as thin placeholder routes; whether they stay long-term is still open, see Section 15.)

DESIGN SYSTEM SUMMARY

Colors (core tokens):

Token | Hex | Usage
--- | --- | ---
primary | #004ac6 | Primary actions, active nav, links, focus rings
primary-container | #2563eb | Icon backgrounds, avatar/brand bg
secondary | #006a69 | Secondary chart series, positive trend badge
tertiary | #784b00 | Tertiary chart series (e.g. Transport)
error | #ba1a1a | Error states / negative amounts
background (rendered) | #F8FAFC (light) / #0F172A (dark) | Actual page bg (overrides background token #faf8ff)
surface-container-lowest | #ffffff (light) / #1E293B (dark) | Cards, tables, inputs
on-surface | #131b2e (light) / #F1F5F9 (dark) | Primary text
on-surface-variant | #434655 (light) / #94A3B8 (dark) | Secondary/label text
outline-variant | #c3c6d7 (light) / #334155 (dark) | Borders, dividers
success | #22C55E | Completed progress bars, positive indicators
warning | #F59E0B | Warning states

Fonts: Inter (400/500/600/700/800) for all text; Material Symbols Outlined referenced in source export only — all icons translated to Lucide React in actual build.
Type scale: H1 32px desktop / 24px mobile · H2 24px / 20px mobile · H3 18px / 16px mobile · Body 15px (constant) · Label 13px (constant) · Small 13px.
Spacing: Base unit 4px. Scale: xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px. Page margins: 40px desktop → 16px mobile. Card padding: 24px → 16px mobile.
Border radius: lg 8px (inputs, icon squares) · xl 12px (cards, buttons, table containers) · full 9999px (pills, badges, progress fill).
Shadows: Resting: 0 1px 3px rgba(0,0,0,0.08). Hover: 0 4px 12px rgba(0,0,0,0.05) paired with translateY(-2px).
Mobile nav: Slide-in left drawer pattern remains unused/speculative (no drawer built, none currently planned, since MobileTabBar covers section navigation needs). 44×44px hamburger trigger spec retained for reference only.
Component styles: Primary button — filled #004ac6, white text, 44px height, 12px radius. Secondary button — outlined primary border, hover fills surface-container-low. Pill/ghost button — fully rounded, low-emphasis fill, used for date-range/category filters. Cards — white/dark surface, 24px padding, 12px radius, 1px border, resting shadow, hover lift (now implemented via cardHoverLift on SummaryCard/TrendChart/CategoryDonutChart). Tables → mobile card-list collapse pattern per Section 6 of design system doc.
Header logo badge: 40×40px (w-10 h-10), rounded-lg (8px), bg-primary-container, white icon (Lucide Wallet, size 20, strokeWidth 2.25), centered. Wordmark: font-h3/text-h3, semibold, tracking-tight, text-on-surface (light) / text-on-surface-variant (dark).
Header date-range pill: rounded-full, bg-surface-container-low, hover:bg-surface-container-high, font-label/text-label, text-on-surface-variant, px-md py-sm, ChevronDown (Lucide, size 18) trailing icon. Uses shadcn DropdownMenu, align="end", selected option shown bold + text-primary in the open menu.
Header theme toggle: 40×40px (h-10 w-10) circular button, text-on-surface-variant, hover:bg-surface-container-low, Sun icon (light mode active) / Moon icon (dark mode active), both Lucide size 20, aria-label reflects the action.
Layout shell: flex column, min-h-screen, bg-background/text-on-surface at root; main content area is flex-grow so Footer sticks to bottom on short pages.
Footer: bg-surface (light) / bg-surface-container-lowest (dark), border-t border-outline-variant (light) / border-outline (dark), py-lg, centered column of brand name (font-label, bold, text-on-surface) and tagline (font-small, text-on-surface-variant).
MobileTabBar: fixed bottom-0, w-full, bg-surface-container-lowest, border-t border-outline-variant/outline, md:hidden, 4 equal-width flex-1 buttons each min 44×44px, Lucide icon (size 20, 2.5 stroke when active) + 11px label (bold when active) stacked vertically. Inactive: text-on-surface-variant with hover:text-primary. Active: text-primary, driven by IntersectionObserver watching section elements (rootMargin "-45% 0px -45% 0px") plus immediate update on tab click.
Motion utilities: cardHoverLift (transition-transform + transition-shadow, 200ms ease-out, -translate-y-0.5 + shadow bump on hover) now applied to SummaryCard, TrendChart, and CategoryDonutChart; fadeIn (animate-in fade-in, 200ms ease-out — needs verification under Tailwind v4, see Known Issues) not yet applied anywhere.
SummaryCard: label (font-label, text-on-surface-variant) + large value (font-h1, tracking-tighter, formatted as USD currency) + optional trend badge (Lucide TrendingUp/TrendingDown, size 14, pill background bg-secondary-container/20 text-secondary for positive or bg-error-container/30 text-error for negative).
TrendChart: Recharts LineChart, two lines (income = primary color, expenses = tertiary color), CartesianGrid, custom tooltip matching surface-container-lowest card styling, legend dots shown in card header instead of chart-native legend, sparse-data note shown below chart when fewer than 3 data points.
CategoryDonutChart: Recharts PieChart donut (innerRadius 70%/outerRadius 100%), center overlay showing "Total" label + USD grand total, legend list below/beside with colored dot + category name + percent; category colors defined in a fixed CATEGORY_COLORS map (Housing→primary, Food→secondary, Transport→tertiary, Entertainment/Utilities/Other→neutral grays/outline).
AI component styles: N/A — no AI features in this project (design system includes speculative chat bubble/streaming/thinking-indicator patterns for future reference only, not used in MVP).

DESIGN REFERENCE INSTRUCTIONS
Designs stored in:
_designs/screens/ — desktop PNG screenshots
_designs/html_exports/ — desktop HTML/CSS per screen
_designs/ALL_SCREENS_HTML.md — all screens combined with responsive notes
_designs/DESIGN_SYSTEM.md — full design + responsive + AI component guide

Design HTML pasted into chat this session (Stitch export covering finsight_dashboard, savings_goals, and transactions_history screens) — available as reference for all remaining frontend subtasks in this session.

INSTRUCTION FOR AI: When building any frontend screen or component:
- Ask me to paste that screen's section from ALL_SCREENS_HTML.md (only if not already pasted this session)
- Build desktop layout first — match the Stitch design exactly
- Then implement tablet (768px) then mobile (375px) responsive
- Follow DESIGN_SYSTEM.md for all styling — do not invent styles
- Translate Stitch HTML into our actual framework (React + Tailwind + Lucide) — never output raw HTML, never pull in Material Symbols
- No screen is done until tested at 375px / 768px / 1280px
- All interactive elements: min 44×44px touch target on mobile

Known design system inconsistencies to resolve during build:
- Body background hardcoded #F8FAFC in two screens instead of token bg-background (#faf8ff) — standardize on the token
- Input left-padding inconsistent: pl-[44px] (transactions) vs pl-xl/32px (dashboard) — standardize to one value accounting for icon width
- Input radius inconsistent: rounded-lg (dashboard) vs rounded-xl (transactions filter bar) — standardize to rounded-lg
- Sticky header uses sticky top-0 on dashboard but fixed top-0 + manual pt-[104px] offset on savings goals — standardize on sticky
- No sm: Tailwind prefixes exist anywhere in the source export — the entire sub-768px range needs a true mobile pass built net-new (drawer nav, card-list tables, touch-target fixes), not extracted from source
- Source export's savings_goals and transactions_history screens use full horizontal nav links — our MVP is a single scrollable page/Layout shell with no such nav; these links are NOT being built, only the logo/wordmark + date/theme controls from the dashboard header pattern, and the simple two-line footer rather than the link-row footer variant
- MobileTabBar has no direct equivalent in the Stitch source exports — built net-new; section IDs it targets now exist in Dashboard.jsx (7A.1.5) but the component itself is still not rendered anywhere
- useFilteredTransactions has no visual/design counterpart — pure logic; date-range cutoff mapping derived from DATE_RANGE_OPTIONS values in DateRangeContext.jsx
- useSummaryTotals currently defines "balance" and "netSavings" identically as income−expenses of whatever set it's given; 7A.1.5 wired "Total Balance" to the date-range-filtered value rather than an all-time cumulative figure — flagged as an assumption, revisit if an unfiltered lifetime balance is wanted instead
- animationClasses.js's fadeIn class relies on animate-in/fade-in utility names that may not resolve under Tailwind v4's core utilities (no tailwindcss-animate plugin) — cardHoverLift is confirmed safe (core utilities only) and is now live on 3 components; fadeIn remains unverified and unused
- SummaryCard trend badges (+4.2%, +8.1% etc. in the Stitch mockup) are illustrative-only in the source design; Dashboard.jsx currently renders all 4 cards with showTrend={false} rather than fabricate percentages — a real period-over-period comparison could be added later if desired
- TrendChart and CategoryDonutChart replace the Stitch mockups' static CSS/SVG placeholder visuals entirely with live Recharts components driven by real transaction data — colors mapped from design tokens via CSS custom properties (assumed to follow --color-<token-name> naming from the @theme block; flag if actual variable names differ)

IMPLEMENTATION PHASES

Phase 0 — Environment & Prerequisites: Install Node LTS, code editor + extensions, create GitHub repo, link Vercel account.
Phase 1 — Project Initialization: Scaffold Vite+React, install/configure Tailwind v4 via the Vite plugin (class-based dark mode via CSS @custom-variant from day one), wire color tokens via @theme, install Inter font, init shadcn/ui, install Recharts/Lucide/Auto Animate/Sonner, set up folder structure, configure Prettier/ESLint, initial commit.
Phase 5 — Frontend Foundation: Build mock data layer (transactions + goals generators), create ThemeContext/DateRangeContext, build Header, decide/install routing, build Layout shell, build mobile tab bar, wire derived-data hooks (useFilteredTransactions, useSummaryTotals).
Phase 6 — Animation & Motion Setup: Install/configure Auto Animate, define reusable Tailwind transition utilities, test on a throwaway list before broader use. **[COMPLETE]**
Phase 7 — Frontend Page by Page:
  - 7A (Dashboard): 7A.1.1–7A.1.5 COMPLETE (SummaryCard, wiring, TrendChart, CategoryDonutChart, desktop assembly). 7A.2.1 (responsive pass) NEXT.
  - 7B (Transactions): not started.
  - 7C (Savings Goals): not started.
  - 7D (Shared UI polish): not started.
Phase 10 — Third-Party Integrations: Verify Google Fonts loads in production, confirm Vercel build settings.
Phase 12 — Error Handling, Loading States, Edge Cases: Loading skeletons, empty-state/no-match handling, sparse-data note (lightweight version already added to TrendChart in 7A.1.3, full pass still 12.3.1), Error Boundary, theme/date persistence without flash-of-wrong-theme.
Phase 13 — Full Responsiveness Audit: Cross-screen audit at 1440/768/375px plus in-between widths (900px, 1024px), touch target verification, mobile tab bar behavior check.
Phase 14 — Performance Optimization: Memoize derived computations, lazy-load routes, Lighthouse audit, React.memo on chart components.
Phase 15 — Testing & Bug Fixing: Manually walk every user flow (load, date filter, search/filter/sort, goals, theme toggle, mobile nav), cross-browser check, fix and re-test.
Phase 16 — Deployment: Local production build check, push to GitHub, trigger Vercel deploy, verify live URL, set custom subdomain.
Phase 17 — Post-Launch: Add Vercel Analytics, final README pass (description, demo link, screenshots, tech stack), add to portfolio/resume.
(Phases 2, 3, 4, 8, 9, 11 — Database, Auth, Backend API, AI Integration, Frontend-Backend Connection, SaaS Payments — are skipped entirely; this is a frontend-only, mock-data, no-AI project.)

CURRENT PROGRESS
Last updated: 2026-07-05

Completed subtasks:
- 0.1 — Environment setup
- 0.3 — GitHub repository created and cloned; Vercel account created and linked
- 1.1 through 1.9 — Full project initialization and tooling setup complete. Phase 1 complete.
- 5.1.1 — Built mockDataGenerator.js (seeded mulberry32 PRNG).
- 5.1.2 — Created src/data/transactions.js with a fixed seed (42).
- 5.1.3 — Created src/data/goals.js with 3 mock goal objects (one intentionally at 100%).
- 5.2.1 — Built ThemeContext.jsx with ThemeProvider and useTheme.
- 5.2.2 — Extended ThemeContext.jsx with localStorage persistence and dark class application.
- 5.2.3 — Built DateRangeContext.jsx with DateRangeProvider, useDateRange, and DATE_RANGE_OPTIONS.
- 5.2.4 — Wrapped root render in main.jsx with ThemeProvider and DateRangeProvider.
- 5.3.1 — Built Header.jsx logo/wordmark.
- 5.3.2 — Added date-range pill dropdown to Header.jsx.
- 5.3.3 — Added circular Sun/Moon theme toggle button to Header.jsx.
- 5.4.1 — Installed and wired up React Router.
- 5.5.1 — Built Layout.jsx (Header + Outlet + Footer).
- 5.5.2 — Built Footer.jsx.
- 5.6.1 — Built MobileTabBar.jsx (static tabs).
- 5.6.2 — Wired MobileTabBar.jsx active state via IntersectionObserver.
- 5.7.1 — Built useFilteredTransactions.js.
- 5.7.2 — Built useSummaryTotals.js.
- 6.1.1 — Built useAutoAnimate.js wrapper hook.
- 6.2.1 — Built animationClasses.js (cardHoverLift, fadeIn, cardMotion).
- 6.3.1 — Built temporary TestList.jsx, verified Auto Animate behavior. Phase 6 complete.
- 7A.1.1 — Built SummaryCard.jsx (label, value, optional trend badge, cardHoverLift applied).
- 7A.1.2 — Wired 4 SummaryCards in Dashboard.jsx to useSummaryTotals output.
- 7A.1.3 — Built TrendChart.jsx (Recharts LineChart, income vs expenses by month, custom tooltip, sparse-data note).
- 7A.1.4 — Built CategoryDonutChart.jsx (Recharts PieChart donut, center total, legend list).
- 7A.1.5 — Assembled Dashboard.jsx desktop layout: summary row, charts row, transactions/goals placeholders, section IDs added, wired to DateRangeContext.

Current subtask:
ID: 7A.2.1
Title: Make Dashboard responsive
Goal: Add Tailwind responsive classes: summary cards 4-col→2-col→1-col, charts side-by-side→stacked.
Files involved: src/pages/Dashboard.jsx

Next subtask:
ID: 7B.1.1
Title: Build TransactionRow component
Goal: Create a single table row showing icon avatar, merchant, category pill, date, amount (color-coded).
Files involved: src/components/TransactionRow.jsx

ACTIVE CODEBASE

- vite.config.js — react() + tailwindcss() plugins, @ → src/ alias resolution
- jsconfig.json — @/* → ./src/* path mapping
- index.html — Google Fonts links for Inter, title "FinSight"
- src/index.css — custom @theme block, @custom-variant dark, .dark overrides, @layer base font rule, plus shadcn's Vega-preset CSS variables
- components.json — shadcn/ui config (Base library, Vega preset)
- src/lib/utils.js — shadcn's cn() utility
- src/lib/mockDataGenerator.js — seeded transaction generator
- src/lib/animationClasses.js — exports cardHoverLift, fadeIn, cardMotion; cardHoverLift now used in SummaryCard, TrendChart, CategoryDonutChart
- src/data/transactions.js — exports transactions; now imported directly into Dashboard.jsx
- src/data/goals.js — exports goals
- src/context/ThemeContext.jsx — exports ThemeProvider and useTheme
- src/context/DateRangeContext.jsx — exports DateRangeProvider, useDateRange, DATE_RANGE_OPTIONS; now actually consumed by Dashboard.jsx to drive filtering
- src/main.jsx — wraps <App /> in <BrowserRouter><ThemeProvider><DateRangeProvider>...</DateRangeProvider></ThemeProvider></BrowserRouter>
- src/App.jsx — renders <Routes> with a parent <Route element={<Layout />}> containing child routes for /, /transactions, /goals
- src/components/Layout.jsx — COMPLETE: Header + <Outlet /> + Footer
- src/components/Header.jsx — COMPLETE: logo, date-range dropdown, theme toggle
- src/components/Footer.jsx — COMPLETE: centered brand + tagline
- src/components/MobileTabBar.jsx — COMPLETE: 4-tab bottom bar with IntersectionObserver active state; section IDs it targets now exist in Dashboard.jsx but component is still not imported/rendered anywhere
- src/components/TestList.jsx — TEMPORARY: Auto Animate demo, pending deletion once confirmed
- src/components/SummaryCard.jsx — NEW COMPLETE: label + currency-formatted value + optional trend badge
- src/components/TrendChart.jsx — NEW COMPLETE: Recharts LineChart aggregating transactions by month, income/expenses lines, custom tooltip, sparse-data note
- src/components/CategoryDonutChart.jsx — NEW COMPLETE: Recharts PieChart donut aggregating expenses by category, center total, legend
- src/components/ui/button.jsx — shadcn Button component
- src/components/ui/dropdown-menu.jsx — shadcn DropdownMenu component
- src/pages/Dashboard.jsx — NEW COMPLETE (desktop only): imports transactions directly, uses useDateRange + useFilteredTransactions + useSummaryTotals, renders summary row (4 SummaryCards), charts row (TrendChart 6-col + CategoryDonutChart 4-col), transactions/goals placeholder sections; section IDs overview/trends/transactions/goals present; responsive classes pending 7A.2.1
- src/pages/TransactionsPage.jsx — placeholder page, real build in Phase 7B
- src/pages/GoalsPage.jsx — placeholder page, real build in Phase 7C
- src/hooks/useFilteredTransactions.js — COMPLETE, now wired into Dashboard.jsx
- src/hooks/useSummaryTotals.js — COMPLETE, now wired into Dashboard.jsx
- src/hooks/useAutoAnimate.js — COMPLETE: re-exports useAutoAnimate
- eslint.config.js — flat config with react-refresh/only-export-components disabled project-wide
- .prettierrc / .prettierignore — formatting config in place
- package.json — includes recharts, lucide-react, @formkit/auto-animate, sonner, react-router-dom, prettier (dev); shadcn dropdown-menu dependency added in 5.3.2
- No tailwind.config.js or postcss.config.js

SESSION LOG

- 2026-07-04: Project setup complete. Planning done.
- 2026-07-05: Completed 0.1, 0.3 — environment and GitHub/Vercel setup.
- 2026-07-05: Completed 1.1–1.9 — full Phase 1 tooling setup.
- 2026-07-05: Completed 5.1.1–5.1.3 — mock data generator, transactions dataset, goals dataset.
- 2026-07-05: Completed 5.2.1–5.2.4 — ThemeContext and DateRangeContext built and wired at root.
- 2026-07-05: Completed 5.3.1–5.3.3 — Header.jsx fully built for desktop (logo, date-range dropdown, theme toggle).
- 2026-07-05: Completed 5.4.1 — React Router installed and wired.
- 2026-07-05: Completed 5.5.1–5.5.2 — Layout.jsx and Footer.jsx built; dev server compiles cleanly.
- 2026-07-05: Completed 5.6.1–5.6.2 — MobileTabBar.jsx built with IntersectionObserver-driven active state.
- 2026-07-05: Completed 5.7.1–5.7.2 — useFilteredTransactions.js and useSummaryTotals.js built.
- 2026-07-05: Completed 6.1.1–6.3.1 — Auto Animate wrapper hook, shared animation classes, and throwaway test list verification. Phase 6 complete.
- 2026-07-05: Completed 7A.1.1–7A.1.5 — built SummaryCard.jsx, TrendChart.jsx, CategoryDonutChart.jsx, and assembled Dashboard.jsx desktop layout wired to DateRangeContext/useFilteredTransactions/useSummaryTotals; added section IDs for MobileTabBar; transactions/goals sections still placeholders.

KNOWN ISSUES AND OPEN QUESTIONS

- Design system was extracted from only 3 desktop Stitch screens with no native mobile designs exported — sub-768px experience must be built net-new.
- Styling inconsistencies flagged in the source export still need resolving during build.
- Icon buttons (40×40px) and pagination buttons (32×32px) fall below the 44×44px touch target minimum — fix on mobile breakpoints.
- shadcn's init appended its own CSS variable naming convention (Vega preset defaults) alongside our custom tokens in src/index.css — coexisting fine so far.
- react-refresh/only-export-components is disabled project-wide.
- Still open: whether /transactions and /goals stay as dedicated routes long-term or get folded back into in-page scroll sections.
- Still open: confirm whether the GitHub repo/Vercel project should later be moved under an org account.
- Seed value (42) hardcoded in src/data/transactions.js for demo stability — confirmed intentional.
- "New Laptop" goal is intentionally at 100% completion in goals.js for future "Goal Reached" state testing.
- No flash-of-wrong-theme protection yet (subtask 12.5.1, later in the plan).
- Confirmed decision: all icon glyphs from the Stitch/Material Symbols export are translated to Lucide React equivalents during build.
- The savings_goals and transactions_history Stitch exports include a full horizontal nav bar not being built, matching our single-scrollable-page MVP decision.
- Assumption flagged in 5.3.3: toggleTheme function name — confirmed correct.
- Assumption flagged in 5.5.2: Footer.jsx uses simple two-line variant rather than link-row variant — flag for review if desired later.
- Assumption flagged in 5.6.1/5.6.2: MobileTabBar's target section IDs now exist in Dashboard.jsx (as of 7A.1.5), but the component itself is STILL not imported/rendered in Layout.jsx or Dashboard.jsx — this needs to happen soon, likely inside Layout.jsx so it persists across routes.
- Assumption flagged in 5.7.2 / carried into 7A.1.5: "Total Balance" in Dashboard.jsx is currently the date-range-filtered balance (income − expenses of the filtered set), not an all-time cumulative balance independent of the date filter. If the intended UX is a lifetime running balance, a second unfiltered calculation is needed — please confirm desired behavior before Phase 13 audit locks this in.
- Assumption flagged in 6.2.1/6.3.1: animationClasses.js's fadeIn class may not resolve visually under Tailwind v4 core utilities (unverified, not yet used in real components); cardHoverLift is confirmed safe and now live in 3 components.
- TestList.jsx (6.3.1) is still a temporary file pending deletion once the user confirms Auto Animate tests passed — not yet removed.
- Assumption flagged in 7A.1.1/7A.1.5: SummaryCard trend badges (e.g. +4.2%) are illustrative-only in the Stitch mockup; real period-over-period trend math wasn't built, so all 4 Dashboard SummaryCards currently render with showTrend={false}. Can be added later if desired.
- Assumption flagged in 7A.1.3/7A.1.4: TrendChart and CategoryDonutChart reference design tokens via CSS custom properties assumed to be named --color-<token> (e.g. --color-primary) based on Tailwind v4's @theme convention — needs visual verification that colors render correctly; if index.css uses different variable naming, chart colors will fall back to browser defaults (likely black) and need correcting.
- Dashboard.jsx is currently desktop-only; summary cards and charts have no responsive breakpoint classes yet — this is explicitly the next subtask (7A.2.1), not an oversight.
- ACTIVE BLOCKER: none currently.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
END OF PROJECT_CONTEXT.md
━━━ ━━━