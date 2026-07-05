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
Skipped — no backend, no API routes. All data operations (filtering, sorting, searching, date-range slicing, totals calculation) happen client-side via useMemo-based derived hooks (useFilteredTransactions, useSummaryTotals) operating on the static mock dataset.

ALL SCREENS

Screen: Dashboard (Home) — /
Purpose: Header (logo, date-range selector, theme toggle) + summary cards + trend chart + category donut chart + transactions list + savings goals section
AI feature: none
Responsive: 4-col summary cards → 2-col → 1-col stacked; charts side-by-side (lg:grid-cols-10, 6/4 split) → stacked below 1024px; header controls collapse into dropdown on mobile; bottom tab bar appears only on mobile

Screen: Transactions (optional full view) — /transactions
Purpose: Full-height transaction table with search/filter/sort and pagination
AI feature: none
Responsive: full <table> (≥768px) → stacked card-per-transaction list (mobile)

Screen: Goals (optional full view) — /goals
Purpose: Larger goal cards with expanded detail (target date, monthly contribution needed)
AI feature: none
Responsive: 3-col grid → 2-col (tablet) → 1-col (mobile)

Recommendation: build everything as one scrollable dashboard for MVP; only split into routes if it starts feeling cluttered. (Routing has now been installed per 5.4.1 — /transactions and /goals exist as thin placeholder routes; whether they stay long-term is still open, see Section 15.)

DESIGN SYSTEM SUMMARY

Colors (core tokens):

| Token                    | Hex                              | Usage                                               |
| ------------------------ | -------------------------------- | --------------------------------------------------- |
| primary                  | #004ac6                          | Primary actions, active nav, links, focus rings     |
| primary-container        | #2563eb                          | Icon backgrounds, avatar/brand bg                   |
| secondary                | #006a69                          | Secondary chart series, positive trend badge        |
| tertiary                 | #784b00                          | Tertiary chart series (e.g. Transport)              |
| error                    | #ba1a1a                          | Error states / negative amounts                     |
| background (rendered)    | #F8FAFC (light) / #0F172A (dark) | Actual page bg (overrides background token #faf8ff) |
| surface-container-lowest | #ffffff (light) / #1E293B (dark) | Cards, tables, inputs                               |
| on-surface               | #131b2e (light) / #F1F5F9 (dark) | Primary text                                        |
| on-surface-variant       | #434655 (light) / #94A3B8 (dark) | Secondary/label text                                |
| outline-variant          | #c3c6d7 (light) / #334155 (dark) | Borders, dividers                                   |
| success                  | #22C55E                          | Completed progress bars, positive indicators        |
| warning                  | #F59E0B                          | Warning states                                      |

Fonts: Inter (400/500/600/700/800) for all text; Material Symbols Outlined referenced in source export only — all icons translated to Lucide React in actual build.
Type scale: H1 32px desktop / 24px mobile · H2 24px / 20px mobile · H3 18px / 16px mobile · Body 15px (constant) · Label 13px (constant) · Small 13px.
Spacing: Base unit 4px. Scale: xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px. Page margins: 40px desktop → 16px mobile. Card padding: 24px → 16px mobile.
Border radius: lg 8px (inputs, icon squares) · xl 12px (cards, buttons, table containers) · full 9999px (pills, badges, progress fill).
Shadows: Resting: 0 1px 3px rgba(0,0,0,0.08). Hover: 0 4px 12px rgba(0,0,0,0.05) paired with translateY(-2px).
Mobile nav: Slide-in left drawer pattern remains unused/speculative (no drawer built, none currently planned, since MobileTabBar covers section navigation needs). 44×44px hamburger trigger spec retained for reference only.
Component styles: Primary button — filled #004ac6, white text, 44px height, 12px radius. Secondary button — outlined primary border, hover fills surface-container-low. Pill/ghost button — fully rounded, low-emphasis fill, used for date-range/category filters. Cards — white/dark surface, 24px padding, 12px radius, 1px border, resting shadow, hover lift. Tables → mobile card-list collapse pattern per Section 6 of design system doc.
Header logo badge: 40×40px (w-10 h-10), rounded-lg (8px), bg-primary-container, white icon (Lucide Wallet, size 20, strokeWidth 2.25), centered. Wordmark: font-h3/text-h3, semibold, tracking-tight, text-on-surface (light) / text-on-surface-variant (dark).
Header date-range pill: rounded-full, bg-surface-container-low, hover:bg-surface-container-high, font-label/text-label, text-on-surface-variant, px-md py-sm, ChevronDown (Lucide, size 18) trailing icon. Uses shadcn DropdownMenu, align="end", selected option shown bold + text-primary in the open menu.
Header theme toggle: 40×40px (h-10 w-10) circular button, text-on-surface-variant, hover:bg-surface-container-low, Sun icon (light mode active) / Moon icon (dark mode active), both Lucide size 20, aria-label reflects the action.
Layout shell: flex column, min-h-screen, bg-background/text-on-surface at root; main content area is flex-grow so Footer sticks to bottom on short pages.
Footer: bg-surface (light) / bg-surface-container-lowest (dark), border-t border-outline-variant (light) / border-outline (dark), py-lg, centered column of brand name (font-label, bold, text-on-surface) and tagline (font-small, text-on-surface-variant).
MobileTabBar: fixed bottom-0, w-full, bg-surface-container-lowest, border-t border-outline-variant/outline, md:hidden, 4 equal-width flex-1 buttons each min 44×44px, Lucide icon (size 20, 2.5 stroke when active) + 11px label (bold when active) stacked vertically. Inactive: text-on-surface-variant with hover:text-primary. Active: text-primary, driven by IntersectionObserver watching section elements (rootMargin "-45% 0px -45% 0px") plus immediate update on tab click.
Motion utilities: cardHoverLift (transition-transform + transition-shadow, 200ms ease-out, -translate-y-0.5 + shadow bump on hover — matches resting/hover shadow spec above) and fadeIn (animate-in fade-in, 200ms ease-out — needs verification under Tailwind v4, see Known Issues) defined centrally in src/lib/animationClasses.js for reuse across cards/list items.
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
- Source export's savings_goals and transactions_history screens use full horizontal nav links (Dashboard/Savings Goals/Transactions/Reports or similar) — our MVP is a single scrollable page/Layout shell with no such nav; these links are NOT being built, only the logo/wordmark + date/theme controls from the dashboard header pattern, and the simple two-line footer (brand + tagline) rather than the link-row footer variant
- MobileTabBar (5.6.1/5.6.2) has no direct equivalent in the Stitch source exports — built net-new based on the design system's stated mobile-nav strategy, not extracted/translated from any Stitch HTML
- useFilteredTransactions (5.7.1) has no visual/design counterpart — pure logic; date-range cutoff mapping derived from DATE_RANGE_OPTIONS values already defined in DateRangeContext.jsx, not from any design doc
- useSummaryTotals (5.7.2) currently defines "balance" and "netSavings" identically as income−expenses over whatever transaction set it's given; if 7A.1.2 wants "Total Balance" to mean an all-time cumulative balance independent of the active date-range filter, a second hook variant fed by unfiltered data will be needed — flagged for review before Phase 7A
- animationClasses.js's fadeIn class relies on animate-in/fade-in utility names; since this project uses Tailwind v4's core utilities via the Vite plugin (no tailwindcss-animate plugin installed), these class names may not resolve to actual animations out of the box — needs verification during 6.3.1 testing and possibly a custom @utility fallback in index.css later

IMPLEMENTATION PHASES

Phase 0 — Environment & Prerequisites: Install Node LTS, code editor + extensions, create GitHub repo, link Vercel account.
Phase 1 — Project Initialization: Scaffold Vite+React, install/configure Tailwind v4 via the Vite plugin (class-based dark mode via CSS @custom-variant from day one), wire color tokens via @theme, install Inter font, init shadcn/ui, install Recharts/Lucide/Auto Animate/Sonner, set up folder structure, configure Prettier/ESLint, initial commit.
Phase 5 — Frontend Foundation: Build mock data layer (transactions + goals generators), create ThemeContext/DateRangeContext, build Header, decide/install routing, build Layout shell, build mobile tab bar, wire derived-data hooks (useFilteredTransactions, useSummaryTotals).
Phase 6 — Animation & Motion Setup: Install/configure Auto Animate, define reusable Tailwind transition utilities, test on a throwaway list before broader use. **[COMPLETE]**
Phase 7 — Frontend Page by Page: Build Dashboard (7A: summary cards, trend chart, donut chart, responsive pass), Transactions (7B: search/filter/sort/pagination, table→card-list collapse), Savings Goals (7C: progress bars, "Goal Reached" state, grid collapse), Shared UI polish (7D: Auto Animate application, empty states, dark mode pass).
Phase 10 — Third-Party Integrations: Verify Google Fonts loads in production, confirm Vercel build settings.
Phase 12 — Error Handling, Loading States, Edge Cases: Loading skeletons, empty-state/no-match handling, sparse-data note, Error Boundary, theme/date persistence without flash-of-wrong-theme.
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
- 5.2.1 — Built ThemeContext.jsx with ThemeProvider and useTheme, managing theme state and toggle.
- 5.2.2 — Extended ThemeContext.jsx with localStorage persistence and dark class application. Verified and committed.
- 5.2.3 — Built DateRangeContext.jsx with DateRangeProvider, useDateRange, and DATE_RANGE_OPTIONS.
- 5.2.4 — Wrapped root render in main.jsx with ThemeProvider and DateRangeProvider.
- 5.3.1 — Built Header.jsx logo/wordmark (Lucide Wallet icon badge + "FinSight" text). Design HTML pasted into session for the first time.
- 5.3.2 — Added date-range pill dropdown to Header.jsx using shadcn's DropdownMenu, wired to DateRangeContext.
- 5.3.3 — Added circular Sun/Moon theme toggle button to Header.jsx, wired to ThemeContext. Header.jsx fully built for desktop.
- 5.4.1 — Installed and wired up React Router: BrowserRouter in main.jsx, Routes/Route stubs in App.jsx for /, /transactions, /goals, and placeholder pages Dashboard.jsx, TransactionsPage.jsx, GoalsPage.jsx.
- 5.5.1 — Built Layout.jsx (Header + <Outlet /> + Footer) and updated App.jsx to nest all three routes under it via a parent <Route element={<Layout />}>.
- 5.5.2 — Built Footer.jsx with centered brand name + tagline, top border, dark mode aware.
- 5.6.1 — Built MobileTabBar.jsx with 4 static tabs, md:hidden, scroll-to-section click handlers, 44px touch targets.
- 5.6.2 — Wired MobileTabBar.jsx active state via IntersectionObserver plus immediate highlight on tab click.
- 5.7.1 — Built useFilteredTransactions.js: filters by date range, search, category, sorts by date/amount, memoized.
- 5.7.2 — Built useSummaryTotals.js: computes income, expenses, balance, netSavings (currently balance === netSavings) via useMemo.
- 6.1.1 — Built useAutoAnimate.js re-exporting useAutoAnimate from @formkit/auto-animate/react.
- 6.2.1 — Built animationClasses.js exporting cardHoverLift, fadeIn, cardMotion shared Tailwind class strings.
- 6.3.1 — Built temporary TestList.jsx and verified Auto Animate add/remove/reorder behavior; to be deleted once user confirms tests pass.

Current subtask:
ID: 7A.1.1
Title: Build SummaryCard component
Goal: Create a reusable card showing label, value, and trend indicator (arrow icon + %).
Files involved: src/components/SummaryCard.jsx

Next subtask:
ID: 7A.1.2
Title: Wire 4 SummaryCards to useSummaryTotals
Goal: Render 4 SummaryCard instances in a grid, fed by the hook's output.
Files involved: src/pages/Dashboard.jsx

ACTIVE CODEBASE

- vite.config.js — react() + tailwindcss() plugins, @ → src/ alias resolution
- jsconfig.json — @/* → ./src/* path mapping
- index.html — Google Fonts links for Inter, title "FinSight"
- src/index.css — custom @theme block, @custom-variant dark, .dark overrides, @layer base font rule, plus shadcn's Vega-preset CSS variables. Now actually activated visually via ThemeContext's DOM class toggling.
- components.json — shadcn/ui config (Base library, Vega preset)
- src/lib/utils.js — shadcn's cn() utility
- src/lib/mockDataGenerator.js — seeded transaction generator
- src/lib/animationClasses.js — NEW COMPLETE: exports cardHoverLift, fadeIn, cardMotion Tailwind class strings for shared motion styling
- src/data/transactions.js — exports transactions
- src/data/goals.js — exports goals
- src/context/ThemeContext.jsx — exports ThemeProvider and useTheme; theme state persists to localStorage and toggles the dark class on <html>
- src/context/DateRangeContext.jsx — exports DateRangeProvider, useDateRange, and DATE_RANGE_OPTIONS; manages dateRange state (default "This Month") with a setDateRange setter
- src/main.jsx — wraps <App /> in <BrowserRouter><ThemeProvider><DateRangeProvider>...</DateRangeProvider></ThemeProvider></BrowserRouter>
- src/App.jsx — renders <Routes> with a parent <Route element={<Layout />}> containing child routes for /, /transactions, /goals
- src/components/Layout.jsx — COMPLETE: renders Header, a flex-grow <main> with <Outlet />, and Footer — fully functional, no broken imports
- src/components/Header.jsx — COMPLETE: sticky top app bar with logo icon badge (Lucide Wallet) + "FinSight" wordmark on the left; date-range pill dropdown (shadcn DropdownMenu, wired to DateRangeContext) + circular theme toggle button (Sun/Moon, wired to ThemeContext) on the right
- src/components/Footer.jsx — COMPLETE: centered "FinSight" brand label + "FinSight — Demo Dashboard" tagline, top border, bg/text swap for dark mode
- src/components/MobileTabBar.jsx — COMPLETE: 4-tab bottom bar, IntersectionObserver-driven active state plus click-to-scroll; targets section IDs not yet present in Dashboard.jsx; component not yet imported/rendered anywhere
- src/components/TestList.jsx — TEMPORARY (6.3.1): throwaway list demonstrating useAutoAnimate add/remove/shuffle; uses cardHoverLift; DELETE once testing confirms animations work correctly
- src/components/ui/button.jsx — shadcn Button component
- src/components/ui/dropdown-menu.jsx — shadcn DropdownMenu component
- src/pages/Dashboard.jsx — placeholder page, real build starts now in Phase 7A (current subtask)
- src/pages/TransactionsPage.jsx — placeholder page, real build in Phase 7B (if kept)
- src/pages/GoalsPage.jsx — placeholder page, real build in Phase 7C (if kept)
- src/hooks/useFilteredTransactions.js — COMPLETE: filters transactions by date range (via DATE_RANGE_OPTIONS-derived cutoffs), merchant search, category; sorts by date/amount asc/desc; memoized
- src/hooks/useSummaryTotals.js — COMPLETE: exports useSummaryTotals(transactions) → { balance, income, expenses, netSavings }, memoized; balance and netSavings currently identical
- src/hooks/useAutoAnimate.js — NEW COMPLETE: re-exports useAutoAnimate from @formkit/auto-animate/react
- eslint.config.js — flat config with react-refresh/only-export-components disabled project-wide
- .prettierrc / .prettierignore — formatting config in place
- package.json — includes recharts, lucide-react, @formkit/auto-animate, sonner, react-router-dom, prettier (dev); shadcn dropdown-menu dependency (@radix-ui/react-dropdown-menu) added in 5.3.2
- No tailwind.config.js or postcss.config.js

SESSION LOG

- 2026-07-04: Project setup complete. Planning done.
- 2026-07-05: Completed 0.1, 0.3 — environment and GitHub/Vercel setup.
- 2026-07-05: Completed 1.1–1.9 — full Phase 1 tooling setup. Phase 1 complete.
- 2026-07-05: Completed 5.1.1–5.1.3 — mock data generator, transactions dataset, goals dataset.
- 2026-07-05: Completed 5.2.1 — built ThemeContext with state/toggle.
- 2026-07-05: Completed 5.2.2 — added localStorage persistence and dark class application to ThemeContext, verified and committed.
- 2026-07-05: Completed 5.2.3 — built DateRangeContext with dateRange state, setDateRange setter, and DATE_RANGE_OPTIONS.
- 2026-07-05: Completed 5.2.4 — wrapped main.jsx root render with ThemeProvider and DateRangeProvider.
- 2026-07-05: Completed 5.3.1 — built Header.jsx logo/wordmark. Design HTML pasted into session for the first time.
- 2026-07-05: Completed 5.3.2 — installed shadcn dropdown-menu and added the date-range pill dropdown to Header.jsx.
- 2026-07-05: Completed 5.3.3 — added circular Sun/Moon theme toggle button to Header.jsx. Header.jsx fully built for desktop.
- 2026-07-05: Completed 5.4.1 — installed React Router, wrapped main.jsx in BrowserRouter, rewrote App.jsx with Routes/Route stubs, created placeholder pages.
- 2026-07-05: Completed 5.5.1 — built Layout.jsx (Header + Outlet + Footer) and nested all routes under it in App.jsx.
- 2026-07-05: Completed 5.5.2 — built Footer.jsx (centered brand + tagline, top border, dark mode support).
- 2026-07-05: Completed 5.6.1 — built MobileTabBar.jsx (4 static tabs, md:hidden, scroll-to-section handlers, 44px touch targets).
- 2026-07-05: Completed 5.6.2 — wired MobileTabBar.jsx active-state highlighting via IntersectionObserver plus click-driven immediate updates.
- 2026-07-05: Completed 5.7.1 — built useFilteredTransactions.js (date range/search/category filtering + date/amount sorting, memoized).
- 2026-07-05: Completed 5.7.2 — built useSummaryTotals.js (income/expenses/balance/netSavings, memoized).
- 2026-07-05: Completed 6.1.1 — built useAutoAnimate.js wrapper hook.
- 2026-07-05: Completed 6.2.1 — built animationClasses.js with cardHoverLift/fadeIn/cardMotion shared class strings.
- 2026-07-05: Completed 6.3.1 — built temporary TestList.jsx, verified add/remove/shuffle animations via useAutoAnimate; pending user deletion of the test file after confirming. Phase 6 complete.

KNOWN ISSUES AND OPEN QUESTIONS

- Design system was extracted from only 3 desktop Stitch screens with no native mobile designs exported — sub-768px experience must be built net-new.
- Styling inconsistencies flagged in the source export still need resolving during build (Section 10).
- Icon buttons (40×40px) and pagination buttons (32×32px) fall below the 44×44px touch target minimum — fix on mobile breakpoints. Includes Header's theme toggle (h-10 w-10) and date-range pill (auto height).
- shadcn's init appended its own CSS variable naming convention (Vega preset defaults) alongside our custom tokens in src/index.css — coexisting fine so far.
- react-refresh/only-export-components is disabled project-wide.
- Still open: whether /transactions and /goals stay as dedicated routes long-term or get folded back into in-page scroll sections — currently built as thin placeholder routes per 5.4.1/5.5.1.
- Still open: confirm whether the GitHub repo/Vercel project should later be moved under an org account.
- Seed value (42) hardcoded in src/data/transactions.js for demo stability — confirmed intentional.
- "New Laptop" goal is intentionally at 100% completion in goals.js for future "Goal Reached" state testing.
- No flash-of-wrong-theme protection yet (subtask 12.5.1, later in the plan).
- DateRangeContext's value is displayed and settable via Header, and is now consumable by useFilteredTransactions, but Dashboard.jsx doesn't wire them together yet — lands in Phase 7A.
- Confirmed decision: all icon glyphs from the Stitch/Material Symbols export are translated to Lucide React equivalents during build.
- The savings_goals and transactions_history Stitch exports include a full horizontal nav bar that does not match our single-scrollable-page MVP — intentionally not being built.
- Assumption flagged in 5.3.3: the theme-toggle function from ThemeContext.jsx was assumed to be named toggleTheme — confirmed correct per user's DONE reply.
- Assumption flagged in 5.5.2: Footer.jsx uses the simple two-line variant (brand + tagline) rather than the link-row variant from the savings_goals screen — flag for review if a link row is later desired.
- Assumption flagged in 5.6.1/5.6.2: MobileTabBar targets section IDs (overview, trends, transactions, goals) that don't exist yet in Dashboard.jsx — must be added as id attributes when Dashboard.jsx is built in Phase 7. MobileTabBar is also not yet imported/rendered in Layout.jsx or Dashboard.jsx.
- Assumption flagged in 5.7.2: useSummaryTotals treats "balance" and "netSavings" as identical (income − expenses of the input array). If the Stitch design's "Total Balance" card is meant to show an all-time cumulative balance regardless of the active date filter, a separate unfiltered calculation will be needed when wiring 7A.1.2 — needs a decision before that subtask.
- Assumption flagged in 6.2.1/6.3.1: animationClasses.js's fadeIn class uses animate-in/fade-in naming conventions that may not resolve under Tailwind v4's core utilities (no tailwindcss-animate plugin installed) — needs visual verification during 6.3.1 testing; cardHoverLift should work regardless since it only uses core transition/transform utilities. If fadeIn doesn't animate, a custom @utility in index.css will be needed before relying on it in Phase 7D.
- TestList.jsx (6.3.1) is a temporary file that must be deleted, and its import removed from wherever it was temporarily rendered (e.g. Dashboard.jsx), once the user confirms animations work — flagging so it isn't accidentally left in the codebase.
- ACTIVE BLOCKER: none currently.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  END OF PROJECT_CONTEXT.md
  ━━━ ━━━
