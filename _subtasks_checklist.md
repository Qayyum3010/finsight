# FinSight — Granular Vibe-Coding Task Checklist

━━━
## PHASE 0: Environment and Prerequisites
━━━

[ ] 0.1.1 — Install Node.js — Download and install Node.js LTS (20.x+) from nodejs.org — Files: none — Done when: `node -v` and `npm -v` both return version numbers in terminal — Dependency: none

[ ] 0.1.2 — Verify npm registry access — Run `npm ping` to confirm npm registry connectivity — Files: none — Done when: ping returns success — Dependency: 0.1.1

[ ] 0.2.1 — Install VS Code — Download and install VS Code — Files: none — Done when: VS Code opens successfully — Dependency: none

[ ] 0.2.2 — Install VS Code extensions — Install ES7+ React snippets, Tailwind CSS IntelliSense, Prettier extensions — Files: none — Done when: all three appear in Extensions panel as installed — Dependency: 0.2.1

[ ] 0.3.1 — Create GitHub repo — Create new empty repo named "finsight" on GitHub with Node `.gitignore` template — Files: `.gitignore` (auto-created) — Done when: repo exists and is visible at github.com — Dependency: none

[ ] 0.3.2 — Clone repo locally — Clone the empty repo to local machine — Files: local folder `finsight/` — Done when: `git status` runs cleanly inside the folder — Dependency: 0.3.1

[ ] 0.4.1 — Create Vercel account — Sign up for Vercel using GitHub OAuth — Files: none — Done when: Vercel dashboard loads and shows your account — Dependency: 0.3.1

━━━
## PHASE 1: Project Initialization and Configuration
━━━

[ ] 1.1.1 — Scaffold Vite React app — Run `npm create vite@latest . -- --template react` inside the cloned repo folder — Files: `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `index.html` — Done when: `npm install && npm run dev` starts a working default Vite page — Dependency: 0.3.2

[ ] 1.1.2 — Commit initial scaffold — Stage and commit the raw Vite scaffold — Files: all generated files — Done when: `git log` shows the initial commit and it's pushed to GitHub — Dependency: 1.1.1

[ ] 1.2.1 — Install Tailwind dependencies — Run `npm install -D tailwindcss postcss autoprefixer` — Files: `package.json` — Done when: packages appear in `devDependencies` — Dependency: 1.1.1

[ ] 1.2.2 — Initialize Tailwind config files — Run `npx tailwindcss init -p` — Files: `tailwind.config.js`, `postcss.config.js` — Done when: both files exist with default content — Dependency: 1.2.1

[ ] 1.2.3 — Set Tailwind content paths — Edit `content` array to include `./index.html` and `./src/**/*.{js,jsx}` — Files: `tailwind.config.js` — Done when: Tailwind classes applied in a test div actually render — Dependency: 1.2.2

[ ] 1.2.4 — Enable class-based dark mode — Add `darkMode: 'class'` to Tailwind config — Files: `tailwind.config.js` — Done when: config file shows the setting saved — Dependency: 1.2.2

[ ] 1.2.5 — Add Tailwind directives to CSS — Add `@tailwind base; @tailwind components; @tailwind utilities;` to main CSS file — Files: `src/index.css` — Done when: a test Tailwind utility class (e.g. `bg-red-500`) visibly styles an element in the browser — Dependency: 1.2.3

[ ] 1.3.1 — Add color tokens to Tailwind theme — Extend `theme.extend.colors` with primary, secondary, accent, background, surface, text-primary, text-secondary, border, error, success, warning using exact hex values — Files: `tailwind.config.js` — Done when: a test element using `bg-primary` renders as #2563EB — Dependency: 1.2.4

[ ] 1.4.1 — Add Inter font via CDN link — Add Google Fonts `<link>` tag for Inter (weights 400,500,600,700) to HTML head — Files: `index.html` — Done when: viewing page source shows the font link and Network tab shows font loading — Dependency: 1.1.1

[ ] 1.4.2 — Set Inter as Tailwind default font — Add `fontFamily.sans = ['Inter', 'sans-serif']` to Tailwind theme — Files: `tailwind.config.js` — Done when: default body text visibly renders in Inter — Dependency: 1.4.1, 1.3.1

[ ] 1.5.1 — Initialize shadcn/ui — Run `npx shadcn@latest init`, choosing Tailwind CSS variables and matching existing config — Files: `components.json`, `src/lib/utils.js` — Done when: init completes without errors — Dependency: 1.3.1

[ ] 1.5.2 — Add first shadcn component (Button) — Run `npx shadcn@latest add button` to test the pipeline works — Files: `src/components/ui/button.jsx` — Done when: importing and rendering `<Button>` shows a styled button — Dependency: 1.5.1

[ ] 1.6.1 — Install Recharts — Run `npm install recharts` — Files: `package.json` — Done when: package appears in `dependencies` — Dependency: 1.1.1

[ ] 1.6.2 — Install Lucide React — Run `npm install lucide-react` — Files: `package.json` — Done when: package appears in `dependencies` — Dependency: 1.1.1

[ ] 1.6.3 — Install Auto Animate — Run `npm install @formkit/auto-animate` — Files: `package.json` — Done when: package appears in `dependencies` — Dependency: 1.1.1

[ ] 1.6.4 — Install Sonner — Run `npm install sonner` — Files: `package.json` — Done when: package appears in `dependencies` — Dependency: 1.1.1

[ ] 1.6.5 — Install React Router — Run `npm install react-router-dom` — Files: `package.json` — Done when: package appears in `dependencies` — Dependency: 1.1.1

[ ] 1.7.1 — Create folder structure — Create empty folders `src/components/`, `src/data/`, `src/hooks/`, `src/context/`, `src/lib/`, `src/pages/` — Files: folder structure only (add `.gitkeep` if needed) — Done when: all folders exist and are visible in VS Code explorer — Dependency: 1.1.1

[ ] 1.8.1 — Configure Prettier — Create Prettier config with standard settings (semi, singleQuote, etc.) — Files: `.prettierrc` — Done when: running `npx prettier --check src/` respects the config — Dependency: 1.1.1

[ ] 1.8.2 — Configure ESLint basics — Verify/adjust default Vite ESLint config for React — Files: `.eslintrc.cjs` (or `eslint.config.js`) — Done when: `npm run lint` runs without config errors — Dependency: 1.1.1

[ ] 1.9.1 — Commit full tooling setup — Stage and commit Tailwind, shadcn, and dependency installs — Files: `package.json`, `tailwind.config.js`, `postcss.config.js`, `components.json` — Done when: pushed to GitHub `main` branch — Dependency: 1.2.5, 1.5.2, 1.6.5, 1.7.1, 1.8.2

━━━
## PHASE 5: Frontend Foundation
━━━

[ ] 5.1.1 — Build mock data generator utility — Write a function that generates randomized-but-realistic transactions with seeded randomness — Files: `src/lib/mockDataGenerator.js` — Done when: calling the function returns an array of 150-300 transaction objects matching the defined schema — Dependency: 1.7.1

[ ] 5.1.2 — Generate transactions dataset — Call the generator to produce and export a static 12-month transactions array — Files: `src/data/transactions.js` — Done when: importing the file logs a populated array with realistic dates/amounts — Dependency: 5.1.1

[ ] 5.1.3 — Create goals mock data — Manually write 3 goal objects matching the schema (Emergency Fund, Vacation, New Laptop) — Files: `src/data/goals.js` — Done when: importing the file returns 3 correctly-shaped objects — Dependency: 1.7.1

[ ] 5.2.1 — Build ThemeContext — Create context + provider managing `theme` state ('light'/'dark') with a toggle function — Files: `src/context/ThemeContext.jsx` — Done when: a test component can read and toggle theme value via `useContext` — Dependency: 1.7.1

[ ] 5.2.2 — Persist theme to localStorage — Add `useEffect` to read/write theme value from localStorage and apply `dark` class to `<html>` — Files: `src/context/ThemeContext.jsx` — Done when: toggling theme, then refreshing the page, keeps the same theme — Dependency: 5.2.1

[ ] 5.2.3 — Build DateRangeContext — Create context + provider managing `dateRange` state (default "This Month") with a setter — Files: `src/context/DateRangeContext.jsx` — Done when: a test component can read and update the date range value — Dependency: 1.7.1

[ ] 5.2.4 — Wrap App with providers — Wrap the root component with ThemeProvider and DateRangeProvider — Files: `src/main.jsx` — Done when: both contexts are accessible from any child component without errors — Dependency: 5.2.2, 5.2.3

[ ] 5.3.1 — Build Header logo/wordmark — Create the left side of the header: icon + "FinSight" text — Files: `src/components/Header.jsx` — Done when: logo and wordmark render correctly styled per design spec — Dependency: 1.5.2

[ ] 5.3.2 — Build date range dropdown — Add a shadcn `Select`/`DropdownMenu` with options (This Month, Last 3 Months, Last 6 Months, This Year, All Time) wired to DateRangeContext — Files: `src/components/Header.jsx` — Done when: selecting an option updates the context value (verify via console log) — Dependency: 5.2.4, 5.3.1

[ ] 5.3.3 — Build theme toggle button — Add a circular icon button (sun/moon via Lucide) wired to ThemeContext toggle function — Files: `src/components/Header.jsx` — Done when: clicking the icon switches the app's dark/light class — Dependency: 5.2.4, 5.3.1

[ ] 5.4.1 — Install and set up React Router — Wrap app in `<BrowserRouter>` and define initial route stubs for `/`, `/transactions`, `/goals` — Files: `src/main.jsx`, `src/App.jsx` — Done when: navigating to each URL renders a placeholder page with no errors — Dependency: 1.6.5

[ ] 5.5.1 — Build Layout shell component — Create a Layout wrapping Header, an `<Outlet />` (or children), and Footer — Files: `src/components/Layout.jsx` — Done when: all three routes render inside the shared Header/Footer shell — Dependency: 5.4.1, 5.3.3

[ ] 5.5.2 — Build Footer component — Create simple centered footer text with top border — Files: `src/components/Footer.jsx` — Done when: footer renders at bottom of every route — Dependency: 5.5.1

[ ] 5.6.1 — Build MobileTabBar component — Create bottom tab bar with 4 tab buttons (Overview, Trends, Transactions, Goals), hidden above `md` breakpoint — Files: `src/components/MobileTabBar.jsx` — Done when: tab bar is visible only when browser width is below 768px — Dependency: 5.5.1

[ ] 5.6.2 — Wire tab bar active state — Add active/highlighted styling based on current scroll section or route — Files: `src/components/MobileTabBar.jsx` — Done when: clicking a tab visibly highlights it — Dependency: 5.6.1

[ ] 5.7.1 — Build useFilteredTransactions hook — Create a hook accepting transactions, dateRange, search, category, sort params and returning filtered/sorted array via `useMemo` — Files: `src/hooks/useFilteredTransactions.js` — Done when: calling the hook with test params returns correctly filtered results — Dependency: 5.1.2

[ ] 5.7.2 — Build useSummaryTotals hook — Create a hook that computes balance, income, expenses, net savings from a transactions array via `useMemo` — Files: `src/hooks/useSummaryTotals.js` — Done when: calling the hook returns correct totals for a test dataset — Dependency: 5.1.2

━━━
## PHASE 6: Animation and Motion Setup
━━━

[ ] 6.1.1 — Create useAutoAnimate wrapper hook — Import and re-export `useAutoAnimate` from `@formkit/auto-animate/react` for consistent usage — Files: `src/hooks/useAutoAnimate.js` — Done when: importing the hook in a test component works without errors — Dependency: 1.6.3

[ ] 6.2.1 — Define shared transition utility classes — Add a constants file with reusable Tailwind class strings for card hover-lift and fade-in — Files: `src/lib/animationClasses.js` — Done when: applying the class string to a test card shows hover lift and shadow transition — Dependency: 1.2.5

[ ] 6.3.1 — Test Auto Animate on throwaway list — Build a temporary test list component, apply `useAutoAnimate`, and confirm reorder/fade animation works — Files: `src/components/TestList.jsx` (temporary, delete after) — Done when: adding/removing/reordering items animates smoothly, then delete the test file — Dependency: 6.1.1

━━━
## PHASE 7: Frontend — Page by Page
━━━

### 7A. Dashboard

[ ] 7A.1.1 — Build SummaryCard component — Create a reusable card showing label, value, and trend indicator (arrow icon + %) — Files: `src/components/SummaryCard.jsx` — Done when: passing different props renders correctly styled cards matching Stitch design — Dependency: 1.5.2, 1.6.2

[ ] 7A.1.2 — Wire 4 SummaryCards to useSummaryTotals — Render 4 SummaryCard instances in a grid, fed by the hook's output — Files: `src/pages/Dashboard.jsx` — Done when: cards display correct real values from mock data — Dependency: 7A.1.1, 5.7.2

[ ] 7A.1.3 — Build TrendChart component — Create a Recharts `<LineChart>` inside `<ResponsiveContainer>` plotting income vs expenses over time — Files: `src/components/TrendChart.jsx` — Done when: chart renders two correctly colored lines with mock data — Dependency: 1.6.1, 5.1.2

[ ] 7A.1.4 — Build CategoryDonutChart component — Create a Recharts `<PieChart>` donut with legend list showing category, %, and amount — Files: `src/components/CategoryDonutChart.jsx` — Done when: donut renders with correct segments and legend matches data — Dependency: 1.6.1, 5.1.2

[ ] 7A.1.5 — Assemble Dashboard desktop layout — Compose Header (already global), SummaryCards row, charts row (Trend + Donut side by side), placeholders for transactions/goals sections — Files: `src/pages/Dashboard.jsx` — Done when: desktop (1440px) view visually matches the Stitch dashboard mockup — Dependency: 7A.1.2, 7A.1.3, 7A.1.4

[ ] 7A.2.1 — Make Dashboard responsive — Add Tailwind responsive classes: summary cards 4-col→2-col→1-col, charts side-by-side→stacked — Files: `src/pages/Dashboard.jsx` — Done when: layout looks correct with no overflow at 1440px, 768px, and 375px widths — Dependency: 7A.1.5

### 7B. Transactions

[ ] 7B.1.1 — Build TransactionRow component — Create a single table row showing icon avatar, merchant, category pill, date, amount (color-coded) — Files: `src/components/TransactionRow.jsx` — Done when: passing a transaction object renders a correctly styled row — Dependency: 1.6.2

[ ] 7B.1.2 — Build TransactionsTable shell — Create table with column headers (Merchant, Category, Date, Amount) and sort icon placeholders — Files: `src/components/TransactionsTable.jsx` — Done when: table renders with static header row and mapped TransactionRow instances — Dependency: 7B.1.1

[ ] 7B.1.3 — Build search input — Add a search text input with magnifying-glass icon, debounced onChange — Files: `src/components/TransactionsTable.jsx` — Done when: typing updates a local search state variable (verify via console log) — Dependency: 7B.1.2

[ ] 7B.1.4 — Build category filter dropdown — Add a shadcn dropdown listing all categories + "All Categories" — Files: `src/components/TransactionsTable.jsx` — Done when: selecting a category updates local filter state — Dependency: 7B.1.3

[ ] 7B.1.5 — Wire table to useFilteredTransactions — Connect search, category, and sort state to the hook and render filtered results — Files: `src/components/TransactionsTable.jsx` — Done when: typing/filtering visibly changes displayed rows correctly — Dependency: 7B.1.4, 5.7.1

[ ] 7B.1.6 — Add column sort functionality — Make Date and Amount headers clickable, toggling ascending/descending sort state — Files: `src/components/TransactionsTable.jsx` — Done when: clicking headers re-orders rows and toggles sort icon direction — Dependency: 7B.1.5

[ ] 7B.1.7 — Build pagination controls — Add "Showing X-Y of Z" text and page number buttons, slicing the filtered array client-side — Files: `src/components/TransactionsTable.jsx` — Done when: clicking page numbers shows correct slice of results — Dependency: 7B.1.6

[ ] 7B.1.8 — Embed TransactionsTable in Dashboard — Replace the transactions placeholder in Dashboard.jsx with the real component — Files: `src/pages/Dashboard.jsx` — Done when: table appears correctly inside the dashboard flow — Dependency: 7B.1.7, 7A.1.5

[ ] 7B.2.1 — Make Transactions table responsive — Build a mobile card variant (TransactionCard) for widths under 768px, hide the table, show cards instead — Files: `src/components/TransactionsTable.jsx`, `src/components/TransactionCard.jsx` — Done when: table view shows on desktop/tablet, card list shows correctly on 375px mobile with no overflow — Dependency: 7B.1.8

### 7C. Savings Goals

[ ] 7C.1.1 — Build GoalCard component — Create a card with icon badge, name, amount text, progress bar, stat row — Files: `src/components/GoalCard.jsx` — Done when: passing a goal object renders a correctly styled card matching Stitch design — Dependency: 1.6.2

[ ] 7C.1.2 — Add progress bar calculation logic — Compute percentage complete and estimated completion date from goal data — Files: `src/components/GoalCard.jsx` — Done when: progress bar width and % label match the correct calculated value for test data — Dependency: 7C.1.1

[ ] 7C.1.3 — Build "Goal Reached" variant — Add conditional rendering for goals at 100% showing a green success pill instead of the stat row — Files: `src/components/GoalCard.jsx` — Done when: a goal with currentAmount === targetAmount shows the celebratory state — Dependency: 7C.1.2

[ ] 7C.1.4 — Assemble Goals section desktop layout — Render 3 GoalCard instances in a grid using `src/data/goals.js` — Files: `src/pages/Dashboard.jsx` (or `GoalsSection.jsx`) — Done when: desktop view shows 3 cards side by side matching Stitch mockup — Dependency: 7C.1.3, 5.1.3

[ ] 7C.1.5 — Embed Goals section in Dashboard — Replace goals placeholder in Dashboard.jsx with the real section — Files: `src/pages/Dashboard.jsx` — Done when: goals section appears correctly in the full dashboard flow — Dependency: 7C.1.4, 7A.1.5

[ ] 7C.2.1 — Make Goals section responsive — Add Tailwind responsive classes: 3-col→2-col (tablet)→1-col (mobile) — Files: `src/pages/Dashboard.jsx` (or `GoalsSection.jsx`) — Done when: cards stack correctly with no overflow at 768px and 375px — Dependency: 7C.1.5

### 7D. Shared UI Polish

[ ] 7D.1.1 — Apply Auto Animate to transactions list — Attach the `useAutoAnimate` ref to the transactions table/card container — Files: `src/components/TransactionsTable.jsx` — Done when: filtering/sorting animates row changes smoothly instead of snapping — Dependency: 6.1.1, 7B.2.1

[ ] 7D.1.2 — Apply Auto Animate to goals grid — Attach the `useAutoAnimate` ref to the goals container — Files: `src/pages/Dashboard.jsx` (or `GoalsSection.jsx`) — Done when: any goal list change animates smoothly — Dependency: 6.1.1, 7C.2.1

[ ] 7D.2.1 — Build EmptyState component — Create a reusable "No results" component with icon, message, and optional action button — Files: `src/components/EmptyState.jsx` — Done when: component renders correctly with custom message/button props — Dependency: 1.6.2

[ ] 7D.2.2 — Wire EmptyState into TransactionsTable — Show EmptyState with "Clear Filters" button when filtered results are empty — Files: `src/components/TransactionsTable.jsx` — Done when: filtering to a nonexistent merchant shows the empty state, and clicking Clear Filters resets state — Dependency: 7D.2.1, 7B.1.6

[ ] 7D.3.1 — Dark mode pass: Dashboard — Review and fix any contrast/border/shadow issues in dark mode on the Dashboard page — Files: `src/pages/Dashboard.jsx`, `src/components/SummaryCard.jsx` — Done when: toggling dark mode shows no unreadable text or invisible borders on Dashboard — Dependency: 7A.2.1

[ ] 7D.3.2 — Dark mode pass: Transactions — Review and fix dark mode styling on the transactions table/cards — Files: `src/components/TransactionsTable.jsx`, `src/components/TransactionCard.jsx` — Done when: dark mode transactions view has correct contrast and no styling bugs — Dependency: 7B.2.1

[ ] 7D.3.3 — Dark mode pass: Goals — Review and fix dark mode styling on goal cards — Files: `src/components/GoalCard.jsx` — Done when: dark mode goals view has correct contrast and no styling bugs — Dependency: 7C.2.1

━━━
## PHASE 10: Third-Party Integrations
━━━

[ ] 10.1.1 — Verify font loads in production build — Run `npm run build && npm run preview`, check Network tab confirms Inter font loads — Files: none (verification only) — Done when: font renders correctly in the preview build, not just dev — Dependency: 1.4.2

[ ] 10.2.1 — Link Vercel project to GitHub repo — In Vercel dashboard, import the finsight GitHub repo as a new project — Files: none — Done when: Vercel shows the project connected with correct framework preset ("Vite") — Dependency: 0.4.1, 1.9.1

━━━
## PHASE 12: Error Handling, Loading States, Edge Cases
━━━

[ ] 12.1.1 — Build Skeleton component — Create a reusable pulsing gray placeholder block component — Files: `src/components/Skeleton.jsx` — Done when: component renders a pulsing animation via Tailwind `animate-pulse` — Dependency: 1.2.5

[ ] 12.1.2 — Add skeleton loading state to Dashboard — Show Skeleton components briefly on initial mount (simulated 300-500ms delay) before rendering real cards/charts — Files: `src/pages/Dashboard.jsx` — Done when: refreshing the page briefly shows skeletons before real content appears — Dependency: 12.1.1, 7A.1.5

[ ] 12.2.1 — Verify Clear Filters resets fully — Test and fix the Clear Filters button to reset search, category, and sort state together — Files: `src/components/TransactionsTable.jsx` — Done when: clicking Clear Filters restores the full unfiltered transaction list — Dependency: 7D.2.2

[ ] 12.3.1 — Add sparse-data note to TrendChart — Show a small Text Secondary note under the chart if the data point count for the selected range is below a threshold (e.g., <3) — Files: `src/components/TrendChart.jsx` — Done when: selecting a narrow date range with few data points shows the note — Dependency: 7A.1.3

[ ] 12.4.1 — Build ErrorBoundary component — Create a class-based React Error Boundary with fallback UI — Files: `src/components/ErrorBoundary.jsx` — Done when: intentionally throwing an error in a child component shows the fallback UI instead of a blank screen — Dependency: 1.7.1

[ ] 12.4.2 — Wrap Dashboard in ErrorBoundary — Wrap the main dashboard content with the ErrorBoundary component — Files: `src/App.jsx` or `src/pages/Dashboard.jsx` — Done when: the boundary is confirmed active via the test from 12.4.1 applied to the real page — Dependency: 12.4.1

[ ] 12.5.1 — Prevent flash-of-wrong-theme — Add a small inline script in `index.html` `<head>` that reads localStorage theme and sets the `dark` class before React hydrates — Files: `index.html` — Done when: reloading the page in dark mode shows no flash of light mode before dark styles apply — Dependency: 5.2.2

━━━
## PHASE 13: Full Responsiveness Audit
━━━

[ ] 13.1.1 — Audit Dashboard at 1440px — Open Dashboard in browser at 1440px width, visually check header/cards/charts/transactions/goals together — Files: none (verification, fix files as needed) — Done when: no spacing inconsistencies found or all found issues are fixed — Dependency: 7D.3.1

[ ] 13.1.2 — Audit Dashboard at 768px — Repeat the check at 768px width — Files: none (fix files as needed) — Done when: layout collapses correctly with no overlap/overflow — Dependency: 13.1.1

[ ] 13.1.3 — Audit Dashboard at 375px — Repeat the check at 375px width — Files: none (fix files as needed) — Done when: layout stacks correctly with no horizontal scroll — Dependency: 13.1.2

[ ] 13.2.1 — Audit Transactions at all breakpoints — Check table-to-card transition at 1440px, 768px, 375px — Files: none (fix files as needed) — Done when: transition happens cleanly with no broken layout at any width — Dependency: 7D.3.2

[ ] 13.3.1 — Audit Goals at all breakpoints — Check grid collapse at 1440px, 768px, 375px — Files: none (fix files as needed) — Done when: grid collapses correctly with no overflow at any width — Dependency: 7D.3.3

[ ] 13.4.1 — Audit mobile tab bar across screens — Verify active-tab highlighting and smooth-scroll works from every section — Files: `src/components/MobileTabBar.jsx` — Done when: clicking each tab scrolls to and highlights the correct section — Dependency: 5.6.2, 13.1.3

[ ] 13.5.1 — Audit touch target sizes — Inspect every button, dropdown trigger, filter chip, and row action on mobile to confirm 44×44px minimum — Files: various component files as needed — Done when: all interactive elements meet the minimum size — Dependency: 13.1.3, 13.2.1, 13.3.1

[ ] 13.6.1 — Audit mid-breakpoint widths — Check layout at 900px and 1024px for awkward breaks — Files: various component files as needed — Done when: no layout breaks found at these in-between widths — Dependency: 13.1.3

━━━
## PHASE 14: Performance Optimization
━━━

[ ] 14.1.1 — Confirm useMemo on derived hooks — Verify `useSummaryTotals` and `useFilteredTransactions` are properly memoized with correct dependency arrays — Files: `src/hooks/useSummaryTotals.js`, `src/hooks/useFilteredTransactions.js` — Done when: React DevTools Profiler shows no unnecessary recalculation on unrelated state changes — Dependency: 5.7.1, 5.7.2

[ ] 14.2.1 — Lazy-load Transactions and Goals routes — Convert route imports to `React.lazy` with `Suspense` fallback — Files: `src/App.jsx` — Done when: Network tab shows separate chunk files loading only when those routes are visited — Dependency: 5.4.1

[ ] 14.3.1 — Run Lighthouse audit — Run Chrome DevTools Lighthouse on the production preview build — Files: none (report only) — Done when: report generated and all flagged issues logged — Dependency: 10.1.1

[ ] 14.3.2 — Fix Lighthouse issues — Address flagged performance/accessibility issues from the audit — Files: varies based on findings — Done when: re-running Lighthouse shows improved scores — Dependency: 14.3.1

[ ] 14.4.1 — Memoize chart components — Wrap TrendChart and CategoryDonutChart in `React.memo` — Files: `src/components/TrendChart.jsx`, `src/components/CategoryDonutChart.jsx` — Done when: React DevTools confirms charts don't re-render on unrelated state changes — Dependency: 7A.1.3, 7A.1.4

━━━
## PHASE 15: Testing and Bug Fixing
━━━

[ ] 15.1.1 — Test Flow 1: first load — Load the app fresh, confirm mock data populates with no console errors — Files: none (bug fixes as needed) — Done when: no console errors on initial load — Dependency: 7A.2.1

[ ] 15.2.1 — Test Flow 2: date range change — Change date range, confirm all cards/charts/transactions update in sync — Files: none (bug fixes as needed) — Done when: all data updates correctly for each date range option — Dependency: 7A.2.1

[ ] 15.3.1 — Test Flow 3: search + filter combo — Test search + category filter together, confirm AND logic works — Files: none (bug fixes as needed) — Done when: combined filters return correct intersection results — Dependency: 7B.1.5

[ ] 15.3.2 — Test Flow 4: sorting — Test clicking Date and Amount headers, confirm ascending/descending toggle — Files: none (bug fixes as needed) — Done when: sort order and icon direction are correct in both directions — Dependency: 7B.1.6

[ ] 15.4.1 — Test Flow 5: goals display — Verify goal progress bars and stats display correctly for all 3 goals — Files: none (bug fixes as needed) — Done when: all values match expected calculations — Dependency: 7C.1.5

[ ] 15.4.2 — Test Flow 6: theme persistence — Toggle theme, refresh page, confirm theme persists — Files: none (bug fixes as needed) — Done when: theme is correctly restored after reload — Dependency: 12.5.1

[ ] 15.5.1 — Test Flow 7: mobile navigation — On a 375px viewport, test bottom tab bar scroll-to-section — Files: none (bug fixes as needed) — Done when: each tab scrolls to and highlights the correct section — Dependency: 13.4.1

[ ] 15.6.1 — Cross-browser check: Chrome — Test full app flow in Chrome — Files: none (bug fixes as needed) — Done when: no visual or functional bugs found — Dependency: 15.5.1

[ ] 15.6.2 — Cross-browser check: Firefox — Test full app flow in Firefox — Files: none (bug fixes as needed) — Done when: no visual or functional bugs found — Dependency: 15.5.1

[ ] 15.6.3 — Cross-browser check: Safari — Test full app flow in Safari — Files: none (bug fixes as needed) — Done when: no visual or functional bugs found, especially Recharts SVG rendering — Dependency: 15.5.1

[ ] 15.7.1 — Fix and re-test any bugs found — Address any issues logged during 15.1–15.6 and re-run the affected flow test — Files: varies based on findings — Done when: all previously failing flows now pass — Dependency: 15.6.1, 15.6.2, 15.6.3

━━━
## PHASE 16: Deployment
━━━

[ ] 16.1.1 — Run local production build — Run `npm run build` and check for build errors — Files: `dist/` (generated) — Done when: build completes with zero errors — Dependency: 15.7.1

[ ] 16.2.1 — Push final code to GitHub — Commit and push all remaining changes to `main` branch — Files: all modified files — Done when: GitHub shows the latest commit on `main` — Dependency: 16.1.1

[ ] 16.3.1 — Confirm Vercel build settings — In Vercel dashboard, verify framework preset "Vite", build command `npm run build`, output directory `dist` — Files: none (dashboard config) — Done when: settings are confirmed correct — Dependency: 10.2.1

[ ] 16.3.2 — Trigger deployment — Push triggers auto-deploy, or manually trigger deploy from Vercel dashboard — Files: none — Done when: Vercel shows "Deployment Ready" status — Dependency: 16.2.1, 16.3.1

[ ] 16.4.1 — Verify live URL functionality — Open the deployed Vercel URL, test theme toggle and date filters — Files: none (bug fixes as needed) — Done when: live site works identically to local build — Dependency: 16.3.2

[ ] 16.5.1 — Set custom Vercel subdomain — Change the project's Vercel subdomain to something clean (e.g., finsight-demo.vercel.app) — Files: none (dashboard config) — Done when: new URL loads the live site correctly — Dependency: 16.4.1

━━━
## PHASE 17: Post-Launch
━━━

[ ] 17.1.1 — Install Vercel Analytics — Run `npm install @vercel/analytics` and add the `<Analytics />` component — Files: `package.json`, `src/main.jsx` — Done when: Vercel dashboard shows analytics data after visiting the live site — Dependency: 16.5.1

[ ] 17.2.1 — Write README description — Add project title, one-paragraph description, and tech stack list to README — Files: `README.md` — Done when: README renders correctly on GitHub repo page — Dependency: 16.5.1

[ ] 17.2.2 — Add live demo link to README — Add the deployed Vercel URL prominently near the top of README — Files: `README.md` — Done when: link is clickable and correct on GitHub — Dependency: 17.2.1, 16.5.1

[ ] 17.2.3 — Add screenshots to README — Take screenshots of Dashboard (desktop + mobile) and embed them in README — Files: `README.md`, `docs/screenshots/` — Done when: screenshots render correctly in the GitHub README preview — Dependency: 17.2.2

[ ] 17.3.1 — Add project to portfolio — Add FinSight to personal portfolio site/resume with live link and short description — Files: (external to this repo) — Done when: portfolio entry is live and links correctly — Dependency: 16.5.1