━━━ ━━━
PROJECT CONTEXT
Paste this entire file at the start of every new Claude chat.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WE ARE BUILDING
App Name: FinSight
Project Type: FRONTEND
Has AI Features: NO
Description: FinSight is a responsive, single-user personal finance dashboard that visualizes income, expenses, spending trends, and savings goals using realistic mock data (no backend, no real accounts). It's a portfolio piece designed to showcase data visualization, dashboard UX, and responsive design skills. Built entirely with static/generated mock data — no signup, no real money moving. The app has THREE screens matching three Stitch exports (Dashboard, Transactions, Goals), connected by a shared nav header — this was a scope expansion from an earlier single-page-dashboard MVP decision; see Phase 7E in the checklist and "ALL SCREENS" below.

MVP Definition: A dashboard with summary overview cards (balance, income, expenses, net savings), 2 chart types (income/expense trend + spending by category), a filterable/searchable/sortable transactions list, a savings goals tracker with progress bars, a date range filter, and dark/light mode — all fully responsive from 320px to 1920px, populated with 150-300 believable mock transactions spanning 12 months. Expanded scope (Phase 7E) adds two more full-page screens (Transactions, Goals) with their own nav-accessible routes, still frontend-only/mock-data/no-auth.

TECH STACK

| Layer                     | Technology                                     | Role                                                                                                                                                                                                             |
| ------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework                 | React + Vite                                   | Component-based dashboard build, fast HMR                                                                                                                                                                        |
| CSS                       | Tailwind CSS v4 (via @tailwindcss/vite plugin) | Utility-first responsive styling, class-based dark mode via @custom-variant in CSS (no tailwind.config.js / PostCSS pipeline — v4 uses the Vite plugin directly)                                                 |
| UI Components             | shadcn/ui                                      | Accessible primitives (button, dropdown-menu so far; cards, dialogs, tabs, select to follow)                                                                                                                     |
| Icons                     | Lucide React                                   | Icon set paired with shadcn — used for ALL in-app icons                                                                                                                                                          |
| Icon font (design system) | Material Symbols Outlined                      | Reference only — translated to Lucide in real build                                                                                                                                                              |
| Charts                    | Recharts                                       | Line/bar (trend) + pie/donut (category breakdown) — live in TrendChart.jsx and CategoryDonutChart.jsx; a third chart (ContributionHistoryChart.jsx, monthly bar chart) is planned in Phase 7E for the Goals page |
| State Management          | Context API                                    | ThemeContext (dark/light + localStorage) and DateRangeContext, both wired at root in main.jsx                                                                                                                    |
| Routing                   | React Router                                   | BrowserRouter in main.jsx, Routes/Route for /, /transactions, /goals under shared Layout shell — /transactions and /goals are currently placeholders, being built out to full pages in Phase 7E                  |
| Animation                 | Auto Animate (Formkit)                         | LIVE on TransactionsTable's tbody + mobile list, and Dashboard's goals grid, plus cardHoverLift-equivalent transitions on SummaryCard/TrendChart/CategoryDonutChart/GoalCard                                     |
| Error Handling            | Custom ErrorBoundary                           | Class component with fallback UI + "Try Again" reset button, wrapping DashboardContent in Dashboard.jsx; will also wrap TransactionsPage and GoalsPage once built (Phase 12.6)                                   |
| Loading States            | Custom Skeleton component                      | animate-pulse placeholder blocks, shown for ~400ms on Dashboard mount before real content renders                                                                                                                |
| Toasts                    | Sonner                                         | Lightweight UX polish notifications                                                                                                                                                                              |
| Data                      | Static JSON / seeded mock generator            | 150-300 generated transactions across 12 months, no backend/API; a new seeded mock file (goalContributions.js) is planned in Phase 7E for the Goals page's contribution history chart                            |
| Fonts                     | Inter (Google Fonts)                           | Body + heading font, weights 400/500/600/700/800 — production build verified (10.1.1)                                                                                                                            |
| Deployment                | Vercel                                         | Zero-config Vite deploys, auto-deploy on GitHub push; project imported/linked in Vercel dashboard (10.2.1)                                                                                                       |
| Analytics (post-launch)   | Vercel Analytics                               | Free-tier page view tracking                                                                                                                                                                                     |

No AI provider, vector DB, backend, database, auth, or payment integration — this is an intentionally frontend-only, mock-data project. This constraint applies to the full Phase 7E expansion as well: new screens/components must stay frontend-only, mock-data, no-auth, consistent with the rest of the app.

RESPONSIVENESS STRATEGY
Approach: Mobile-first
Breakpoints: sm 640px / md 768px / lg 1024px / xl 1280px (2xl 1536px not used)
Mobile navigation: Previously a single-page dashboard with a bottom tab bar that scrolled to in-page sections via IntersectionObserver. As of Phase 7E, the app is becoming a real 3-route app (Dashboard / Transactions / Goals), so MobileTabBar is being refactored (7E.1.3) from scroll-to-anchor into route-based NavLinks. Desktop gets a matching nav header with links (7E.1.1), which the Stitch exports for the Transactions and Goals screens already show but the app never built.

Key layout shifts:

- Summary cards: 4-col → 2-col → 1-col — LIVE, preceded by matching Skeleton grid during simulated load
- Charts row: side-by-side (6/4) → stacked below 1024px — LIVE, preceded by matching Skeleton blocks during load
- Transactions: on Dashboard, this section is being shrunk to a 5-row preview + "View all" link (7E.2.1); the full filterable table now lives on `/transactions` (7E.3.1), with its own table→card responsive transition — LIVE with Auto Animate + EmptyState
- Goals grid: on Dashboard, shrinking to a preview + "View all goals" link (7E.2.2); the full grid + Contribution History chart now lives on `/goals` (7E.4.1–7E.4.3) — LIVE with Auto Animate
- Header: full controls (desktop) → icon-triggered dropdown collapse (mobile) — desktop-complete for the original logo/date-range/theme-toggle controls; nav links being added in 7E.1.1–7E.1.2 and need their own responsive collapse; touch target audit is Phase 13.5.1
- Touch target minimum: 44×44px — TransactionsTable's inputs/buttons and ErrorBoundary "Try Again" / EmptyState "Clear Filters" buttons all built to ≥44px. Header's theme toggle (40px) and date-range pill still flagged non-compliant, pending Phase 13 audit — now covering all 3 pages, not just Dashboard.

AI INTEGRATION OVERVIEW
Skipped — no AI features in this project.

PROJECT FOLDER STRUCTURE
finsight/
├── public/
├── src/
│ ├── main.jsx # App entry; BrowserRouter > ThemeProvider > DateRangeProvider > App
│ ├── App.jsx # Routes: Layout wraps /, /transactions, /goals
│ ├── index.css # Tailwind v4 import, full @theme token set (colors/spacing/font-sizes matching Stitch), dark variant — REWRITTEN this session, see Section 13/Known Issues history
│ ├── components/
│ │ ├── Header.jsx # COMPLETE for logo/date-range/theme-toggle; NAV LINKS PENDING (7E.1.1, 7E.1.2)
│ │ ├── Layout.jsx # COMPLETE
│ │ ├── Footer.jsx # COMPLETE
│ │ ├── MobileTabBar.jsx # COMPLETE but scroll-to-anchor only — PENDING REFACTOR to route-based nav (7E.1.3)
│ │ ├── TestList.jsx # TEMPORARY — still pending deletion
│ │ ├── SummaryCard.jsx # COMPLETE
│ │ ├── TrendChart.jsx # COMPLETE — sparse-data note verified present (12.3.1)
│ │ ├── CategoryDonutChart.jsx # COMPLETE
│ │ ├── ContributionHistoryChart.jsx # PLANNED (7E.4.2) — NOT YET BUILT
│ │ ├── TransactionRow.jsx # COMPLETE
│ │ ├── TransactionCard.jsx # COMPLETE
│ │ ├── TransactionsTable.jsx # COMPLETE: search/filter/sort/paginate, Auto Animate, EmptyState + Clear Filters, dark mode; reused as-is on the future TransactionsPage (7E.3.1)
│ │ ├── EmptyState.jsx # COMPLETE
│ │ ├── GoalCard.jsx # COMPLETE — full dark mode pass; reused as-is on the future GoalsPage (7E.4.1)
│ │ ├── Skeleton.jsx # COMPLETE: animate-pulse placeholder block, className-driven sizing
│ │ ├── ErrorBoundary.jsx # COMPLETE: class component, fallback UI with icon/message/Try Again button, console.error logging (no external reporting service — no backend); currently only wraps Dashboard, PENDING wrap on TransactionsPage/GoalsPage (12.6.1, 12.6.2)
│ │ └── ui/ # shadcn/ui generated components (button, dropdown-menu)
│ ├── pages/
│ │ ├── Dashboard.jsx # COMPLETE as a full single-page dashboard; Transactions/Goals sections inside it are PENDING SHRINK to previews once TransactionsPage/GoalsPage are real (7E.2.1, 7E.2.2)
│ │ ├── TransactionsPage.jsx # PLACEHOLDER — real page with filter bar + full table PENDING (7E.3.1, 7E.3.2)
│ │ └── GoalsPage.jsx # PLACEHOLDER — real page with goal grid + Contribution History chart PENDING (7E.4.1–7E.4.3)
│ ├── context/
│ │ ├── ThemeContext.jsx # Dark/light mode + localStorage persistence — key name `finsight-theme` CONFIRMED matching index.html's inline anti-flash script (verified this session, previously flagged as open)
│ │ └── DateRangeContext.jsx # Selected date range global state
│ ├── hooks/
│ │ ├── useFilteredTransactions.js # COMPLETE
│ │ ├── useSummaryTotals.js # COMPLETE
│ │ └── useAutoAnimate.js # COMPLETE, used in TransactionsTable (×2) and Dashboard's goals grid
│ ├── data/
│ │ ├── transactions.js # 150-300 generated mock transactions
│ │ ├── goals.js # 3 mock savings goals — NAMED export (`export const goals = [...]`), confirmed correct
│ │ └── goalContributions.js # PLANNED (7E.4.2) — NOT YET BUILT; seeded mock monthly contribution totals for ContributionHistoryChart
│ └── lib/
│ ├── mockDataGenerator.js # Seeded random generator for realistic data
│ └── animationClasses.js # COMPLETE: cardHoverLift, fadeIn, cardMotion — fadeIn still unused/unverified
├── vite.config.js # Includes react() and tailwindcss() plugins
├── components.json # shadcn/ui config
├── index.html # Inline anti-flash-of-wrong-theme script in <head>, reading localStorage before React hydrates (12.5.1) — key name CONFIRMED to match ThemeContext.jsx
├── package.json
├── .prettierrc
├── .eslintrc
└── README.md # Description, live demo link, screenshots — screenshots pending update once Transactions/Goals pages are real (17.2.3)

Note: No tailwind.config.js or postcss.config.js — Tailwind v4 is wired directly via the @tailwindcss/vite plugin. All Stitch-derived custom tokens (colors, spacing scale, font-size scale) now live directly in src/index.css's @theme block, since Tailwind v4 utilities only exist if the underlying CSS variable is declared there — this was the root cause of a major design-mismatch bug found and fixed this session (see Session Log).

DATABASE SCHEMA
No database — frontend-only, static/generated mock data.

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

// src/data/goals.js — shape per goal (NAMED export: `export const goals = [...]`)
{
  id: string,
  name: string,
  targetAmount: number,
  currentAmount: number,
  targetDate: "YYYY-MM-DD",
  icon: string
}

// src/data/goalContributions.js — PLANNED shape (Phase 7E.4.2, not yet built)
{
  month: string,       // e.g. "Mar"
  year: number,
  totalContributed: number
}
```

API ROUTES
Skipped — no backend, no API routes. All data operations happen client-side via useMemo-based derived hooks and component-local state.

ALL SCREENS

Screen: Dashboard (Home) — /
Status: FULLY LIVE with Skeleton loading state and ErrorBoundary wrapping the whole page. Summary cards, charts, dark-mode audited. Transactions and Goals sections are currently full inline table/grid (matching the original single-page-dashboard MVP decision) but are PENDING SHRINK to preview + "view all" link format once the standalone pages exist (7E.2.1, 7E.2.2), matching the Stitch dashboard's own "View all goals →" pattern.

Screen: Transactions (full view) — /transactions
Status: PLACEHOLDER PAGE ONLY. This is the primary gap being closed in Phase 7E — the `transactions_history` Stitch export defines a full filter bar (search, category, type, amount range), a richer table with row actions, an Export CSV button, and its own nav header. None of this exists yet; only the embedded, simpler version inside Dashboard.jsx exists today. Building this out is 7E.3.1–7E.3.2, 7E.5.1, 7E.6.1.

Screen: Goals (full view) — /goals
Status: PLACEHOLDER PAGE ONLY. This is the second gap being closed in Phase 7E — the `savings_goals` Stitch export defines a full goal-card grid with page-header stats ("N active goals · $X saved total") plus a "Contribution History" monthly bar chart, and its own nav header. None of this exists yet; only the embedded goal-card grid inside Dashboard.jsx exists today. Building this out is 7E.4.1–7E.4.3, 7E.5.2, 7E.6.2.

Prior recommendation (superseded): "build everything as one scrollable dashboard for MVP; only split into routes if it starts feeling cluttered." This session, the decision was made to expand scope and build out all three Stitch screens as real routes with a shared nav header — see Phase 7E in the checklist for the full task breakdown. This still stays frontend-only, mock-data, no-auth.

DESIGN SYSTEM SUMMARY

Colors, fonts, spacing, radius, shadows: FULLY REWRITTEN this session in src/index.css. The @theme block previously only defined ~9 colors and zero spacing/font-size tokens, meaning most of the app's className references (p-lg, gap-md, font-h1 text-h1, bg-surface-container-low, text-outline, etc.) were silently no-ops in Tailwind v4 — this was the root cause of the design not matching the Stitch mockups. Full token set (all named colors, spacing scale, font-size scale, light + dark values) now declared directly from the Stitch tailwind.config.js source. See Session Log for details.

Component styles: Skeleton — animate-pulse block using bg-surface-container-high dark:bg-surface-container, rounded-lg, sized entirely via passed-in className. ErrorBoundary fallback — centered icon (error-container/30 bg, error-colored AlertTriangle), h3 heading, body text, 44px-min-height primary "Try Again" button. NavHeader links (PLANNED, 7E.1.1) — should match the underline/bold active-state pattern shown in the transactions_history and savings_goals Stitch exports' header nav.

AI component styles: N/A — no AI features in this project.

DESIGN REFERENCE INSTRUCTIONS
Designs stored in:
_designs/screens/ — desktop PNG screenshots
_designs/html_exports/ — desktop HTML/CSS per screen
_designs/ALL_SCREENS_HTML.md — all screens combined with responsive notes
_designs/DESIGN_SYSTEM.md — full design + responsive + AI component guide

All three Stitch screen exports (finsight_dashboard, savings_goals, transactions_history) have been pasted into chat and are available as reference for Phase 7E.

INSTRUCTION FOR AI: When building any frontend screen or component:

- Ask me to paste that screen's section from ALL_SCREENS_HTML.md (only if not already pasted this session)
- Build desktop layout first — match the Stitch design exactly
- Then implement tablet (768px) then mobile (375px) responsive
- Follow DESIGN_SYSTEM.md for all styling — do not invent styles
- Translate Stitch HTML into React + Tailwind + Lucide — never output raw HTML, never pull in Material Symbols
- No screen is done until tested at 375px / 768px / 1280px
- All interactive elements: min 44×44px touch target on mobile
- STANDING PROCESS RULE: never create files directly in this chat unless the user explicitly asks — always output code blocks with `code path/to/file` commands for the user to run themselves.
- STANDING PROCESS RULE: always rewrite the full updated PROJECT_CONTEXT.md in a single copy-paste-friendly code block at the end of every response, per user instruction.
- STANDING PROCESS RULE (added this session): whenever a scope expansion is requested (like Phase 7E), first update the checklist and this context file with the new subtasks BEFORE writing any implementation code, so progress tracking never falls out of sync with actual scope.

Known design system inconsistencies to resolve during build:

- ContributionHistoryChart and NavHeader nav-links are net-new pieces with Stitch source counterparts (savings_goals and transactions_history exports) that were previously never built against — being resolved in Phase 7E, not "out of scope" anymore.
- Input padding/radius standardization, sticky vs fixed header, no sm: prefixes in source export, row-level ⋮ actions out of scope for MVP — carry over unchanged.
- Illustrative-only trend badges, unverified fadeIn utility, Auto Animate pattern, render-time vs effect-time state reset pattern — carry over unchanged, see prior session history for full detail.

IMPLEMENTATION PHASES

Phase 0 — Environment & Prerequisites. **[COMPLETE]**
Phase 1 — Project Initialization. **[COMPLETE]**
Phase 5 — Frontend Foundation. **[COMPLETE]**
Phase 6 — Animation & Motion Setup. **[COMPLETE]**
Phase 7 — Frontend Page by Page. **MOSTLY COMPLETE** — 7A (Dashboard), 7B (Transactions logic/components), 7C (Goals logic/components), 7D (shared UI polish) all complete. **7E (Multi-Page Expansion) is NEW this session and NOT YET STARTED** — builds out `/transactions` and `/goals` as real Stitch-matched pages with a shared nav header, converting Dashboard's inline sections into previews.
Phase 10 — Third-Party Integrations: **[COMPLETE]**
Phase 12 — Error Handling, Loading States, Edge Cases: **MOSTLY COMPLETE** — 12.1.1–12.5.1 all done. **12.6.1, 12.6.2 (wrap TransactionsPage/GoalsPage in ErrorBoundary) are NEW, blocked on 7E.3.1/7E.4.1.**
Phase 13 — Full Responsiveness Audit: **PAUSED mid-phase to accommodate Phase 7E** — 13.1.1 and 13.1.2 (Dashboard at 1440px/768px) done with no issues found. **13.1.3 (Dashboard at 375px) is deferred until after 7E.2.1/7E.2.2 land**, since the Dashboard's Transactions/Goals sections are about to change shape. New audit items 13.2.1 (Transactions page) and 13.3.1 (Goals page) added, replacing the old "audit the embedded sections" framing. 13.4.1 (nav audit) is also new.
Phase 14 — Performance Optimization: not started; gained new items (14.2.1 now also covers lazy-loading the two new real pages; 14.4.1 now also covers memoizing ContributionHistoryChart).
Phase 15 — Testing & Bug Fixing: not started; gained new items (15.4.3 nav flow, 15.5.1 CSV export flow).
Phase 16 — Deployment: not started.
Phase 17 — Post-Launch: not started; 17.2.3 now also requires Transactions/Goals screenshots.
(Phases 2, 3, 4, 8, 9, 11 skipped entirely — frontend-only, mock-data, no-AI project.)

CURRENT PROGRESS
Last updated: 2026-07-05

Completed subtasks:

- 0.1, 0.3, 1.1–1.9
- 5.1.1–5.1.3, 5.2.1–5.2.4, 5.3.1–5.3.3, 5.4.1, 5.5.1–5.5.2, 5.6.1–5.6.2, 5.7.1–5.7.2
- 6.1.1–6.3.1
- 7A.1.1–7A.1.5, 7A.2.1
- 7B.1.1–7B.1.8, 7B.2.1
- 7C.1.1–7C.1.4, 7C.1.5, 7C.2.1
- 7D.1.1, 7D.1.2, 7D.2.1, 7D.2.2, 7D.3.1, 7D.3.2, 7D.3.3
- 10.1.1, 10.2.1
- 12.1.1, 12.1.2, 12.2.1, 12.3.1, 12.4.1, 12.4.2, 12.5.1
- 13.1.1, 13.1.2

Current subtask:
ID: 7E.1.1
Title: Build NavHeader variant
Goal: Extend Header.jsx to add desktop nav links (Dashboard / Transactions / Goals) using NavLink from react-router-dom, with active-route underline/bold styling matching the savings_goals and transactions_history Stitch exports.
Files involved: src/components/Header.jsx

Next subtask:
ID: 7E.1.2
Title: Make nav responsive
Goal: Collapse desktop nav links below md; ensure any interactive nav element keeps 44×44px touch targets.
Files involved: src/components/Header.jsx

Note on 13.1.3: this was the previously-current subtask before the Phase 7E scope expansion was inserted ahead of it. It remains queued and will resume once Phase 7E's Dashboard-preview subtasks (7E.2.1, 7E.2.2) are complete — see Phase 13 notes above.

ACTIVE CODEBASE

- vite.config.js — react() + tailwindcss() plugins, @ → src/ alias resolution
- jsconfig.json — @/* → ./src/* path mapping
- index.html — Google Fonts links for Inter, title "FinSight", inline anti-flash-of-wrong-theme script in `<head>` reading localStorage key `finsight-theme` — CONFIRMED matching ThemeContext.jsx this session
- src/index.css — REWRITTEN this session: full @theme block with all Stitch-derived colors (light + dark), full named spacing scale (xs/sm/md/gutter/lg/xl/2xl/margin-mobile/margin-desktop), full named font-size scale (small/label/body/h3/h2/h1/h1-mobile), plus the existing shadcn @theme inline block and :root variables kept unchanged
- components.json — shadcn/ui config (Base library, Vega preset)
- src/lib/utils.js — shadcn's cn() utility
- src/lib/mockDataGenerator.js — seeded transaction generator
- src/lib/animationClasses.js — exports cardHoverLift, fadeIn, cardMotion
- src/data/transactions.js — exports transactions
- src/data/goals.js — exports `goals` as a NAMED export
- src/data/goalContributions.js — PLANNED, not yet built (7E.4.2)
- src/context/ThemeContext.jsx — exports ThemeProvider and useTheme; localStorage key `finsight-theme` CONFIRMED correct
- src/context/DateRangeContext.jsx — exports DateRangeProvider, useDateRange, DATE_RANGE_OPTIONS
- src/main.jsx — wraps <App /> in <BrowserRouter><ThemeProvider><DateRangeProvider>...</DateRangeProvider></ThemeProvider></BrowserRouter>
- src/App.jsx — renders <Routes> with a parent <Route element={<Layout />}> containing child routes for /, /transactions, /goals
- src/components/Layout.jsx — COMPLETE
- src/components/Header.jsx — COMPLETE for logo/date-range-dropdown/theme-toggle; NAV LINKS PENDING (7E.1.1 — this is the current subtask)
- src/components/Footer.jsx — COMPLETE
- src/components/MobileTabBar.jsx — COMPLETE but scroll-to-anchor logic only; PENDING REFACTOR to route-based NavLinks (7E.1.3)
- src/components/TestList.jsx — TEMPORARY: still pending deletion
- src/components/SummaryCard.jsx — COMPLETE
- src/components/TrendChart.jsx — COMPLETE, sparse-data note verified present
- src/components/CategoryDonutChart.jsx — COMPLETE
- src/components/ContributionHistoryChart.jsx — PLANNED, not yet built (7E.4.2)
- src/components/TransactionRow.jsx — COMPLETE
- src/components/TransactionCard.jsx — COMPLETE
- src/components/TransactionsTable.jsx — COMPLETE, will be reused as-is on the future TransactionsPage
- src/components/EmptyState.jsx — COMPLETE
- src/components/GoalCard.jsx — COMPLETE, will be reused as-is on the future GoalsPage
- src/components/Skeleton.jsx — COMPLETE
- src/components/ErrorBoundary.jsx — COMPLETE; currently wraps only Dashboard, PENDING also wrapping TransactionsPage/GoalsPage (12.6.1, 12.6.2)
- src/components/ui/button.jsx — shadcn Button component
- src/components/ui/dropdown-menu.jsx — shadcn DropdownMenu component
- src/pages/Dashboard.jsx — COMPLETE as full single-page dashboard; Transactions/Goals sections PENDING SHRINK to previews (7E.2.1, 7E.2.2)
- src/pages/TransactionsPage.jsx — PLACEHOLDER, real content PENDING (7E.3.1, 7E.3.2)
- src/pages/GoalsPage.jsx — PLACEHOLDER, real content PENDING (7E.4.1–7E.4.3)
- src/hooks/useFilteredTransactions.js — COMPLETE
- src/hooks/useSummaryTotals.js — COMPLETE
- src/hooks/useAutoAnimate.js — COMPLETE, used in TransactionsTable (×2) and Dashboard's goals grid
- eslint.config.js — flat config with react-refresh/only-export-components disabled project-wide
- .prettierrc / .prettierignore — formatting config in place
- package.json — includes recharts, lucide-react, @formkit/auto-animate, sonner, react-router-dom, prettier (dev)
- No tailwind.config.js or postcss.config.js

SESSION LOG

- 2026-07-04: Project setup complete. Planning done.
- 2026-07-05: Completed 0.1, 0.3, 1.1–1.9 — environment, GitHub/Vercel setup, full Phase 1 tooling.
- 2026-07-05: Completed 5.1.1–5.7.2 — full Phase 5 frontend foundation.
- 2026-07-05: Completed 6.1.1–6.3.1 — Phase 6 animation setup complete.
- 2026-07-05: Completed 7A.1.1–7A.2.1, 7B.1.1–7B.2.1, 7C.1.1–7C.2.1, 7D.1.1–7D.3.3, 10.1.1 — full Phase 7 (Dashboard, Transactions, Goals, shared UI polish) plus production font verification.
- 2026-07-05: Fixed a "setState synchronously within an effect" console warning in TransactionsTable.jsx via render-time filter-signature comparison instead of a useEffect.
- 2026-07-05: Fixed a SyntaxError caused by Dashboard.jsx importing `goals.js`'s named export as a default export — corrected to `import { goals } from '@/data/goals'`.
- 2026-07-05: Completed 10.2.1, 12.1.1, 12.1.2, 12.2.1, 12.3.1, 12.4.1, 12.4.2, 12.5.1, 13.1.1, 13.1.2 — linked Vercel project to GitHub, built Skeleton loading state and wired it into Dashboard, built ErrorBoundary and wrapped Dashboard in it, added anti-flash-of-wrong-theme inline script to index.html, verified Clear Filters and sparse-data note behavior, began Phase 13 audit at 1440px and 768px with no issues found.
- 2026-07-05: Diagnosed and fixed a major design-mismatch bug: src/index.css's @theme block only defined ~9 colors and zero spacing/font-size tokens, so most className references throughout the app (matching the Stitch-derived naming convention) were silently no-ops under Tailwind v4. Rewrote @theme with the full token set (colors, spacing scale, font-size scale, light + dark) sourced directly from the Stitch tailwind.config.js. Confirmed ThemeContext.jsx's localStorage key ('finsight-theme') matches index.html's anti-flash script — closed that open question. Confirmed TrendChart.jsx's sparse-data note is present and correct — closed that open question.
- 2026-07-05: Scope expansion decided: build out all 3 Stitch screens (Dashboard, Transactions, Goals) as real routes with a shared nav header, rather than keeping Transactions/Goals as placeholders per the earlier single-page-dashboard MVP decision. Added Phase 7E to the checklist (13 new subtasks covering nav header, MobileTabBar refactor, Dashboard preview shrink, full TransactionsPage, full GoalsPage, ContributionHistoryChart, responsive + dark mode passes for both new pages). Added supporting subtasks to Phases 12–17 (ErrorBoundary wraps, audit items, nav/CSV test flows, lazy-loading, screenshot updates). Updated current subtask pointer to 7E.1.1, with 13.1.3 deferred until 7E.2.1/7E.2.2 land. No implementation code written yet this session for Phase 7E — checklist and context updated first per new standing process rule.

KNOWN ISSUES AND OPEN QUESTIONS

- Icon buttons (40×40px) in Header (theme toggle, calendar icon) still fall below the 44×44px touch target minimum — still pending Phase 13 audit (now covering all 3 pages).
- shadcn's init appended its own CSS variable naming convention (Vega preset defaults) alongside our custom tokens in src/index.css — coexisting fine; both blocks now fully populated and non-conflicting after this session's rewrite.
- react-refresh/only-export-components is disabled project-wide.
- Seed value (42) hardcoded in src/data/transactions.js for demo stability — confirmed intentional.
- "New Laptop" goal intentionally at 100% completion — confirmed working in both light and dark mode.
- animationClasses.js's fadeIn class remains unverified/unused under Tailwind v4 core utilities.
- TestList.jsx (6.3.1) is still a temporary file pending deletion.
- SummaryCard trend badges remain illustrative-only; all 4 cards still render with showTrend={false}.
- EmptyState's "Clear Filters" action only resets TransactionsTable's own local state, not the global DateRangeContext — flagged for review, not fixed (intentional: date range is a page-level control).
- Row-level "more options" (⋮) actions from the Stitch transactions_history export remain consciously out of scope for MVP even after Phase 7E (deliberately not being built).
- RESOLVED this session: ThemeContext.jsx's localStorage key name ('finsight-theme') confirmed to match index.html's anti-flash script exactly. No mismatch found.
- RESOLVED this session: TrendChart.jsx's sparse-data note (12.3.1) re-verified against actual current file content — present and correct.
- RESOLVED this session: major design-token gap in src/index.css fixed — see Session Log.
- SUPERSEDED this session: "Contribution History chart out of scope for MVP" and "nav links not built" are no longer open issues to leave alone — they are now actively scoped into Phase 7E (7E.4.2 and 7E.1.1 respectively).
- NEW — Dashboard.jsx's simulated loading delay is a hardcoded `setTimeout(400ms)`, not tied to any real async data-fetch (there is no backend) — this is intentional per the project's mock-data nature, but flagged in case the delay duration needs tuning after visual testing.
- NEW — ErrorBoundary's `componentDidCatch` only logs to `console.error`; there is no external error-reporting/monitoring service wired up, consistent with this being a frontend-only portfolio project with no backend.
- NEW — Phase 7E is scoped but not yet implemented as of this session's end. The current subtask is 7E.1.1 (NavHeader). No new component/page code has been written yet — only planning/checklist/context updates.
- ACTIVE BLOCKER: none currently.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  END OF PROJECT_CONTEXT.md
  ━━━ ━━━
