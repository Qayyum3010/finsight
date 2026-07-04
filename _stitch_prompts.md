# Google Stitch Prompts — FinSight Personal Finance Dashboard

Since this app has no AI features and is a single-page dashboard, I'm generating Stitch prompts for the main Dashboard screen plus the two optional expanded views (Transactions, Goals) so you have full-detail desktop mockups for each distinct layout. All prompts share identical design tokens for consistency.

━━━

STITCH PROMPT: Main Dashboard — /
━━━
Design a desktop web dashboard, 1440px width reference, minimal & clean visual mood, generous white space, soft rounded corners.

**Color palette (exact hex):** Primary #2563EB, Secondary #0EA5A4, Accent #F59E0B, Background #F8FAFC, Surface/Card #FFFFFF, Text Primary #0F172A, Text Secondary #64748B, Border #E2E8F0, Error #EF4444, Success #22C55E, Warning #F59E0B.

**Typography:** Inter font family throughout. H1 32px/700 weight, H2 24px/600, H3 18px/600, Body 15px/400, Small 13px/400, Label 13px/500.

**Spacing:** 4px base unit, 24-48px section gaps, 16-24px card padding.

**Border radius:** 12px soft rounding on all cards, buttons, and inputs.

**Shadows:** Subtle — soft, barely-visible drop shadow on cards (0 1px 3px rgba(0,0,0,0.08)).

**Icons:** Lucide-style outlined icons throughout (thin stroke, 20-24px).

**Top to bottom layout:**

1. **Header bar** (full width, white background, bottom border #E2E8F0, 72px height): Left side shows a logo mark (simple wallet/chart icon in Primary blue #2563EB) + "FinSight" wordmark in H3 weight. Center-right shows a date range selector styled as a pill-shaped dropdown button (border #E2E8F0, background white, text "This Month" with a small chevron-down icon). Far right shows a circular theme toggle icon button (sun/moon icon) followed by a subtle vertical divider.

2. **Summary cards row** (4 equal-width cards in a horizontal grid, 24px gap, each card white surface #FFFFFF, 12px radius, 24px padding, subtle shadow):
   - Card 1 "Current Balance": Label in Text Secondary #64748B small caps, large value "$12,480.32" in H2 bold Text Primary, small green pill below showing "+4.2%" with an up-arrow icon in Success #22C55E.
   - Card 2 "Total Income": value "$6,200.00" with a small trending-up icon in Secondary teal.
   - Card 3 "Total Expenses": value "$3,940.15" with a small trending-down icon in Warning amber.
   - Card 4 "Net Savings": value "$2,259.85" with a progress-style mini icon, green up-arrow "+8.1%".

3. **Charts row** (2 columns side by side, 60/40 width split, 24px gap):
   - Left card "Income vs Expenses": H3 title top-left, a line chart with two lines — one Primary blue #2563EB labeled "Income", one Warning amber #F59E0B labeled "Expenses" — plotted over 6 months (Jan–Jun) on the x-axis, dollar values on y-axis, subtle grid lines in Border color, small legend below chart with colored dots.
   - Right card "Spending by Category": H3 title top-left, a donut chart in the center with 5-6 colored segments (blue, teal, amber, purple, gray), a legend list to the right of the donut showing category name, colored dot, percentage, and dollar amount for each: "Housing — 38% — $1,497", "Food — 22% — $867", "Transport — 15% — $591", "Entertainment — 12% — $473", "Utilities — 8% — $315", "Other — 5% — $197".

4. **Transactions section** (full-width card, white surface, 24px padding):
   - Header row: H3 title "Recent Transactions" on the left, a search input with a magnifying-glass icon on the right (placeholder "Search merchant..."), and a category filter dropdown pill next to it ("All Categories").
   - Table below with column headers: Merchant, Category, Date, Amount (each header has a small sort-arrow icon, Amount column sorted active with a highlighted arrow).
   - Sample data rows (show 5 rows), each row 56px height, subtle bottom border, hover state implied with slightly darker background:
     - Row 1: circular icon avatar with a shopping-bag icon, "Whole Foods Market", category tag pill "Food" (light teal background, teal text), "Jun 28, 2026", amount "-$84.32" in Error red.
     - Row 2: circular icon avatar with a house icon, "Landlord LLC", category tag "Housing" (light blue background), "Jun 1, 2026", amount "-$1,450.00" in Error red.
     - Row 3: circular icon avatar with a briefcase icon, "Acme Corp Payroll", category tag "Income" (light green background), "Jun 15, 2026", amount "+$3,100.00" in Success green.
   - Bottom of table: pagination control, small text "Showing 1-10 of 84" on left, page number buttons on right.

5. **Savings Goals section** (full-width, 3 equal cards in a row, 24px gap, white surface cards):
   - Each goal card: small circular icon (piggy bank / plane / shield icon depending on goal), H3 goal name ("Emergency Fund", "Vacation to Japan", "New Laptop"), current/target amount text ("$3,200 / $5,000"), a horizontal progress bar (Primary blue fill, Border-colored track, 8px height, fully rounded), percentage label below bar ("64% complete"), small Text Secondary caption at bottom ("Est. completion: Nov 2026").

6. **Footer** (subtle, centered, small Text Secondary text): "FinSight — Demo Dashboard" with a thin top border.

Overall feel: airy, trustworthy, data-forward but uncluttered — like a modern fintech product, not a spreadsheet.
END
━━━

STITCH PROMPT: Transactions Full View — /transactions
━━━
Design a desktop web page, 1440px width reference, same design system as the main dashboard: Inter font, Primary #2563EB, Secondary #0EA5A4, Accent #F59E0B, Background #F8FAFC, Surface #FFFFFF, Text Primary #0F172A, Text Secondary #64748B, Border #E2E8F0, Error #EF4444, Success #22C55E, 12px radius, subtle shadows, Lucide-style outlined icons.

**Top to bottom layout:**

1. **Header bar** — identical to Dashboard: logo + "FinSight" wordmark left, date range pill selector center-right, theme toggle icon right.

2. **Page title row**: H1 "Transactions" on the left, Text Secondary subtitle below it ("84 transactions in this period"). On the right, a secondary button "Export CSV" (outlined style, border #E2E8F0, download icon) — visually present but non-functional in MVP.

3. **Filter bar** (full-width card, white surface, 16px padding, horizontal row of controls with 16px gaps):
   - Search input with magnifying-glass icon, placeholder "Search by merchant..."
   - Category filter dropdown pill ("All Categories")
   - Type filter dropdown pill ("Income & Expenses")
   - Amount range: two small number inputs labeled "Min" and "Max" with $ prefix
   - "Clear Filters" text-link button in Text Secondary color

4. **Transactions table** (full-width card, white surface, 12px radius):
   - Column headers with sort icons: Merchant, Category, Date, Amount — each clickable with small chevron-up/down icon; Date column shown as actively sorted descending (filled arrow icon in Primary blue).
   - 10 visible sample rows, 56px row height, alternating subtle hover states, left-aligned circular category icon avatars (colored background matching category, e.g., light blue for Housing, light teal for Food, light green for Income):
     - Sample row detail: icon avatar with a car icon, "Shell Gas Station", category pill "Transport" (light amber background, amber text), "Jun 30, 2026", amount "-$52.40" in Error red, right-aligned.
     - Another sample row: icon avatar with a film icon, "Netflix", category pill "Entertainment" (light purple background), "Jun 27, 2026", amount "-$15.99" in Error red.
   - Right-aligned three-dot "more options" icon button at the end of each row (visual only).

5. **Pagination footer** (bottom of table card): "Showing 1–10 of 84" on left, numbered page buttons (1, 2, 3 ... 9) with active page highlighted in Primary blue background/white text, previous/next chevron icon buttons on far ends.

Overall feel: dense but organized data table, clear visual hierarchy, consistent with dashboard's clean fintech aesthetic.
END
━━━

STITCH PROMPT: Savings Goals Full View — /goals
━━━
Design a desktop web page, 1440px width reference, same design system as other screens: Inter font, Primary #2563EB, Secondary #0EA5A4, Accent #F59E0A, Background #F8FAFC, Surface #FFFFFF, Text Primary #0F172A, Text Secondary #64748B, Border #E2E8F0, Success #22C55E, Warning #F59E0B, 12px radius, subtle shadows, Lucide-style outlined icons.

**Top to bottom layout:**

1. **Header bar** — identical to other screens: logo + wordmark left, date range pill center-right, theme toggle right.

2. **Page title row**: H1 "Savings Goals" on the left, Text Secondary subtitle below ("3 active goals · $8,700 saved total"). Right side shows a disabled-looking secondary button "+ New Goal" (outlined, plus icon) — visual only, non-functional in MVP, slightly reduced opacity to imply future feature.

3. **Goals grid** (3 columns, 24px gap, each a larger detail card than the dashboard summary version, white surface, 12px radius, 32px padding):
   - **Card 1 — "Emergency Fund"**: top row has a circular icon badge (shield icon, light blue background #DBEAFE, blue icon) and a small Text Secondary label "Target: Dec 2026" top-right. Below: H2 large current amount "$3,200" with Text Secondary "of $5,000" beside it. A horizontal progress bar (12px height, fully rounded, Primary blue fill at 64%, Border-colored track). Below bar: "64% complete" label left, "$1,800 remaining" label right. Bottom section: a small stat row with two mini metrics side by side — "Monthly contribution: $267" and "Est. completion: Nov 2026" — each with a small icon (calendar, trending-up).
   - **Card 2 — "Vacation to Japan"**: same structure, icon badge with plane icon (light teal background), amount "$2,100 of $4,000", progress bar 52% in Secondary teal fill, "Monthly contribution: $175", "Est. completion: Feb 2027".
   - **Card 3 — "New Laptop"**: icon badge with laptop icon (light amber background), amount "$3,400 of $3,400", progress bar 100% in Success green fill, a small "Goal Reached! 🎉" badge/pill in Success green background replacing the stat row, celebratory but still minimal (no illustration, just a colored pill and checkmark icon).

4. **Below the grid — "Goal History" section** (full-width card, white surface): H3 title "Contribution History", a simple horizontal bar chart showing monthly total contributions across all goals for the last 6 months (bars in Primary blue, x-axis labeled Jan–Jun, y-axis dollar amounts, subtle grid lines in Border color).

Overall feel: motivating and clear, celebratory without being childish, consistent fintech-minimal styling matching the rest of the app.
END