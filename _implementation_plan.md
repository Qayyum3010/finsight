# FinSight — Complete Implementation Plan

Since this is a FRONTEND-ONLY project with no database, auth, backend, AI, or payments, the following phases are **skipped entirely**: Phase 2 (Database), Phase 3 (Auth), Phase 4 (Backend API), Phase 8 (AI Integration), Phase 9 (Connect Frontend to Backend), Phase 11 (SaaS Payments). Phase 10 (Third-Party Integrations) is minimal since only Vercel + Google Fonts are used.

━━━
## PHASE 0: Environment and Prerequisites
**Goal:** Get your machine ready so nothing blocks setup later.

- **0.1** Install Node.js (LTS version, 20.x or higher) and verify with `node -v` / `npm -v`. *Why now:* Vite and all tooling depend on Node. *Files:* none yet.
- **0.2** Install a code editor (VS Code recommended) with extensions: ES7+ React snippets, Tailwind CSS IntelliSense, Prettier. *Why now:* speeds up every later phase.
- **0.3** Create a GitHub repository for the project (empty, with `.gitignore` for Node). *Why now:* Vercel deploys from GitHub — set this up before writing code so every commit is tracked from day one.
- **0.4** Create a Vercel account and connect it to your GitHub account (don't deploy yet, just link accounts). *Why now:* removes friction later at Phase 16.

━━━
## PHASE 1: Project Initialization and Configuration
**Goal:** Scaffold the project with all core tooling installed and configured before any UI is built.

- **1.1** Run `npm create vite@latest finsight -- --template react` to scaffold the project. *Files:* `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`.
- **1.2** Install Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer` + `npx tailwindcss init -p`). Configure `tailwind.config.js` content paths and enable `darkMode: 'class'` **now**, since retrofitting dark mode later touches every component. *Files:* `tailwind.config.js`, `postcss.config.js`, `src/index.css`.
- **1.3** Add the exact color palette as Tailwind theme extensions (primary, secondary, accent, background, surface, text-primary, text-secondary, border, error, success, warning) so every component uses named tokens instead of raw hex. *Files:* `tailwind.config.js`.
- **1.4** Install and configure Inter font via `@fontsource/inter` or Google Fonts CDN link, set as default Tailwind `fontFamily.sans`. *Files:* `src/main.jsx` or `index.html`, `tailwind.config.js`.
- **1.5** Initialize shadcn/ui (`npx shadcn@latest init`), configure it to use the Tailwind theme tokens from step 1.3. *Files:* `components.json`, `src/components/ui/`.
- **1.6** Install remaining core dependencies: `recharts`, `lucide-react`, `@formkit/auto-animate`, `sonner`. *Why now:* installing all deps upfront avoids interrupting build flow later. *Files:* `package.json`.
- **1.7** Set up project folder structure: `src/components/`, `src/data/`, `src/hooks/`, `src/context/`, `src/lib/`. *Why now:* a clear structure prevents messy imports once multiple screens exist.
- **1.8** Configure Prettier + ESLint basics for consistent formatting. *Files:* `.prettierrc`, `.eslintrc`.
- **1.9** Commit initial scaffold to GitHub (`git init`, initial commit, push). *Why now:* establishes your baseline before feature work starts.

━━━
## PHASE 5: Frontend Foundation (routing, layout, navigation, responsive setup)
**Goal:** Build the shared shell every screen will live inside, so individual pages in Phase 7 just slot into place.

- **5.1** Build the mock data layer: `src/data/transactions.js` (150-300 generated transactions across 12 months with realistic recurring patterns) and `src/data/goals.js` (3 goal objects). *Why now:* every screen needs data to render against — build this before any UI. *Files:* `src/data/transactions.js`, `src/data/goals.js`, `src/lib/mockDataGenerator.js`.
- **5.2** Create `ThemeContext` (dark/light mode state + localStorage persistence) and `DateRangeContext` (selected date range state) using Context API. *Why now:* these are the only two global states in the app — build them before pages need to consume them. *Files:* `src/context/ThemeContext.jsx`, `src/context/DateRangeContext.jsx`.
- **5.3** Build the `Header` component: logo/wordmark, date range dropdown (shadcn `Select` or `DropdownMenu`), theme toggle icon button. *Files:* `src/components/Header.jsx`.
- **5.4** Decide routing approach: since this is a single-scrollable-page dashboard with optional `/transactions` and `/goals` deep views, install React Router now (`npm install react-router-dom`) and set up basic routes. *Files:* `src/main.jsx`, `src/App.jsx`.
- **5.5** Build the persistent layout shell (`Layout.jsx`) wrapping Header + page content + Footer, used across all routes. *Files:* `src/components/Layout.jsx`.
- **5.6** Build the mobile bottom tab bar component (Overview / Trends / Transactions / Goals) — hidden on desktop via Tailwind `md:hidden`, visible on mobile. *Files:* `src/components/MobileTabBar.jsx`.
- **5.7** Wire up derived-data hooks: `useFilteredTransactions(dateRange, search, category, sort)` and `useSummaryTotals(transactions)` using `useMemo`. *Why now:* centralizing derived logic here means every screen/component consumes the same clean hooks instead of duplicating filter logic. *Files:* `src/hooks/useFilteredTransactions.js`, `src/hooks/useSummaryTotals.js`.

━━━
## PHASE 6: Animation and Motion Setup
**Goal:** Wire up the lightweight animation library before building screens that use it, so entrance/list animations are available from the start.

- **6.1** Install and configure Auto Animate (`@formkit/auto-animate`) as a React hook (`useAutoAnimate`). *Files:* `src/hooks/useAutoAnimate.js` (or direct import per component).
- **6.2** Define reusable Tailwind transition utility classes for card hover-lift and fade-in-on-mount effects (e.g., `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`). *Files:* `src/index.css` or a shared `animations.js` constants file.
- **6.3** Test Auto Animate on a throwaway list to confirm it re-orders/fades smoothly before applying it broadly in Phase 7. *Why now:* catching animation bugs early avoids debugging them inside complex screens later.

━━━
## PHASE 7: Frontend — Page by Page

### 7A. Dashboard (Home) — `/`
- **7A.1** Build desktop layout matching the Stitch design: header, 4 summary cards, dual charts row, transactions section, savings goals section, footer. *Files:* `src/pages/Dashboard.jsx`, `src/components/SummaryCard.jsx`, `src/components/TrendChart.jsx`, `src/components/CategoryDonutChart.jsx`.
- **7A.2** Wire summary cards to `useSummaryTotals` hook and connect trend %/arrow indicators to Success/Error colors.
- **7A.3** Build `TrendChart` with Recharts `<LineChart>` wrapped in `<ResponsiveContainer>`, plotting income vs. expenses; build `CategoryDonutChart` with Recharts `<PieChart>` + legend list.
- **7A.4** Make fully responsive — tablet (768px): summary cards go 2-column, charts stack full-width. Mobile (375px): summary cards 1-column stacked, charts full-width stacked, mobile tab bar appears.
- **7A.5** Test all three sizes (desktop 1440px, tablet 768px, mobile 375px) — check no horizontal scroll, no chart collapse, no text overflow — before marking done.

### 7B. Transactions List (embedded section + optional full view `/transactions`)
- **7B.1** Build desktop layout: search input, category filter dropdown, sortable table with sample rows per Stitch spec. *Files:* `src/components/TransactionsTable.jsx`, `src/pages/TransactionsPage.jsx` (if using the full route).
- **7B.2** Wire search/filter/sort controls to `useFilteredTransactions` hook with debounced search input.
- **7B.3** Implement pagination (client-side slicing of filtered array, "Showing X-Y of Z" text + page buttons).
- **7B.4** Make fully responsive — tablet: table remains but with condensed columns. Mobile: convert table rows into stacked card-per-transaction components (per the responsiveness spec — tables don't reflow well).
- **7B.5** Test all three sizes: verify search/filter/sort still work correctly at each breakpoint, verify mobile card list has 44×44px touch targets on any interactive elements.

### 7C. Savings Goals (embedded section + optional full view `/goals`)
- **7C.1** Build desktop layout: goal cards with icon badge, progress bar, stat row, per Stitch spec. *Files:* `src/components/GoalCard.jsx`, `src/pages/GoalsPage.jsx` (if using full route).
- **7C.2** Calculate progress bar percentage and estimated completion date from goal data (simple math: `(target - current) / avgMonthlyContribution`).
- **7C.3** Build the "Goal Reached" state variant (green pill, checkmark) for goals at 100%.
- **7C.4** Make fully responsive — tablet: 3-column grid → 2-column. Mobile: 1-column stacked cards.
- **7C.5** Test all three sizes: confirm progress bars render correctly at narrow widths, text doesn't wrap awkwardly.

### 7D. Shared UI polish across all screens
- **7D.1** Apply Auto Animate to the transactions list and goal cards for smooth re-order/filter transitions.
- **7D.2** Build empty-state components ("No transactions match your filters" with Clear Filters button) even though mock data won't naturally trigger them — needed for portfolio completeness and for the "no results" filter case, which *will* trigger.
- **7D.3** Apply dark mode styling pass across every component (verify contrast, borders, and shadows all look correct in dark mode, not just light).

━━━
## PHASE 10: Third-Party Integrations
**Goal:** Confirm the two external dependencies (font + hosting) are properly wired — minimal since this app avoids third-party services by design.

- **10.1** Verify Google Fonts (Inter) loads correctly in production build, not just dev (check `index.html` link tag or `@fontsource` import is bundled). *Files:* `index.html` or `src/main.jsx`.
- **10.2** Confirm Vercel project is linked to the GitHub repo with correct build settings (`npm run build`, output dir `dist`). *Files:* Vercel dashboard config, no code files.

━━━
## PHASE 12: Error Handling, Loading States, Edge Cases
**Goal:** Handle the realistic edge cases even in a mock-data app, since this is what separates a polished demo from a rough one.

- **12.1** Build a loading skeleton state for charts and cards (shown briefly on initial mount even though data is local, to demonstrate this pattern for recruiters). *Files:* `src/components/Skeleton.jsx`.
- **12.2** Handle the "no transactions match filters" edge case with the empty-state component from 7D.2, including a working "Clear Filters" button that resets search/category state.
- **12.3** Handle the "sparse data for selected date range" edge case (e.g., selecting "This Month" when mock data has few entries) — show a subtle note under charts if the data point count is below a threshold.
- **12.4** Add a React Error Boundary around the main dashboard content to gracefully catch any render errors instead of a blank white screen. *Files:* `src/components/ErrorBoundary.jsx`.
- **12.5** Verify theme toggle and date range selections persist correctly across page reloads (localStorage) and don't flash the wrong theme on load (add a small inline script in `index.html` to set the class before React hydrates, avoiding flash-of-wrong-theme).

━━━
## PHASE 13: Full Responsiveness Audit (every screen, all breakpoints)
**Goal:** Systematically re-verify responsiveness across the whole app now that all screens exist together, catching cross-screen inconsistencies individual page-building might have missed.

- **13.1** Audit Dashboard at 1440px, 768px, 375px — check header, cards, charts, transactions, goals sections all together (not in isolation) for spacing consistency.
- **13.2** Audit Transactions page/section at all three breakpoints, focused on the table-to-card-list transition.
- **13.3** Audit Goals page/section at all three breakpoints, focused on grid column collapse.
- **13.4** Check mobile bottom tab bar behavior across all screens — correct active-tab highlighting, smooth-scroll-to-section works from every screen.
- **13.5** Verify touch target sizes (44×44px minimum) on every interactive element on mobile: buttons, dropdown triggers, table row actions, filter chips.
- **13.6** Test at a few in-between widths (e.g., 900px, 1024px) to catch any awkward mid-breakpoint layout breaks Tailwind's fixed breakpoints might not smooth over.

━━━
## PHASE 14: Performance Optimization
**Goal:** Ensure the app feels fast and professional, since recruiters judge load speed and smoothness quickly.

- **14.1** Memoize expensive derived computations (`useSummaryTotals`, `useFilteredTransactions`) with `useMemo` to avoid recalculating on every render. *Files:* `src/hooks/`.
- **14.2** Lazy-load the `/transactions` and `/goals` routes (if using React Router) with `React.lazy` + `Suspense` to reduce initial bundle size. *Files:* `src/App.jsx`.
- **14.3** Run a Lighthouse audit in Chrome DevTools; address any flagged issues (image sizes if illustrations were added, unused CSS, font-loading strategy).
- **14.4** Verify Recharts isn't re-rendering unnecessarily on unrelated state changes (wrap chart components in `React.memo` if needed).

━━━
## PHASE 15: Testing and Bug Fixing
**Goal:** Manually validate every user flow defined in the project blueprint works end-to-end before deployment.

- **15.1** Walk through Flow 1 (first load) — confirm mock data populates correctly with no console errors.
- **15.2** Walk through Flow 2 (date range change) — confirm all cards/charts/transactions update in sync.
- **15.3** Walk through Flow 3 & 4 (search/filter/sort transactions) — confirm combined filters work correctly (AND logic) and sorting toggles direction properly.
- **15.4** Walk through Flow 5 (goals) and Flow 6 (theme toggle) — confirm persistence works across reload.
- **15.5** Walk through Flow 7 (mobile navigation) — confirm bottom tab bar scroll-to-section works smoothly.
- **15.6** Cross-browser check: test in Chrome, Firefox, Safari (at minimum) for any rendering inconsistencies, especially with Recharts SVG rendering.
- **15.7** Fix any bugs found, re-test affected flows after each fix.

━━━
## PHASE 16: Deployment
**Goal:** Ship the app to a live, shareable URL.

- **16.1** Run `npm run build` locally to confirm a clean production build with no errors. *Files:* `dist/` (generated, gitignored).
- **16.2** Push final code to GitHub `main` branch.
- **16.3** Trigger deployment via Vercel (auto-deploys on push since linked in Phase 0). Confirm build settings: framework preset "Vite", build command `npm run build`, output directory `dist`.
- **16.4** Verify the live Vercel URL loads correctly, test theme toggle and date filters on the deployed version (not just localhost).
- **16.5** Set a custom Vercel subdomain (e.g., `finsight-demo.vercel.app`) for a cleaner link to share with recruiters.

━━━
## PHASE 17: Post-Launch
**Goal:** Add lightweight visibility into usage without adding backend complexity — appropriate for a portfolio demo, not a full production monitoring stack.

- **17.1** Add Vercel Analytics (free tier, one-line install `@vercel/analytics`) to see page views on the deployed demo. *Files:* `src/main.jsx`.
- **17.2** Do a final README pass on the GitHub repo: project description, live demo link, screenshots, tech stack list — this is often the first thing a recruiter reads. *Files:* `README.md`.
- **17.3** Optionally add the project to your portfolio site/resume with the live link and a 1-2 sentence description matching the Step 2 "unique value" framing from the original blueprint.