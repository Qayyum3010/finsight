# FinSight Design System

*Extracted from Stitch export — 3 desktop screens (Dashboard, Savings Goals, Transactions). No AI/chat components present in source; no native media queries found in exported CSS (all responsiveness is Tailwind-breakpoint-driven, and only `md:`/`lg:` utilities appear in source — mobile behavior below is inferred/extended from those patterns since no mobile screens were exported).*

---

## 1. COLORS

### Core semantic tokens (from `tailwind.config`)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#004ac6` | Primary actions, active nav link, links, primary chart series, focus rings |
| `on-primary` | `#ffffff` | Text/icons on primary surfaces |
| `primary-container` | `#2563eb` | Icon backgrounds, avatar bg, brand mark bg |
| `on-primary-container` | `#eeefff` | Text/icons on primary-container |
| `primary-fixed` | `#dbe1ff` | Fixed-tone primary surface |
| `primary-fixed-dim` | `#b4c5ff` | Dimmed fixed primary |
| `on-primary-fixed` | `#00174b` | Text on primary-fixed |
| `on-primary-fixed-variant` | `#003ea8` | Secondary text on primary-fixed |
| `surface-tint` | `#0053db` | Tint overlay reference color |
| `secondary` | `#006a69` | Secondary chart series (Expenses/Food), positive trend badges, secondary progress bars |
| `on-secondary` | `#ffffff` | Text on secondary |
| `secondary-container` | `#7df5f4` | Secondary badge backgrounds (used at 10–20% opacity) |
| `on-secondary-container` | `#007070` | Text on secondary-container badges |
| `secondary-fixed` | `#7df5f4` | Fixed-tone secondary |
| `secondary-fixed-dim` | `#5ed9d7` | Dimmed fixed secondary |
| `on-secondary-fixed` | `#002020` | Text on secondary-fixed |
| `on-secondary-fixed-variant` | `#00504f` | Secondary text on secondary-fixed |
| `tertiary` | `#784b00` | Tertiary chart series (Transport), tertiary icon color |
| `on-tertiary` | `#ffffff` | Text on tertiary |
| `tertiary-container` | `#996100` | Tertiary container bg |
| `on-tertiary-container` | `#ffeedd` | Text on tertiary-container |
| `tertiary-fixed` | `#ffddb8` | Fixed-tone tertiary |
| `tertiary-fixed-dim` | `#ffb95f` | Dimmed fixed tertiary |
| `on-tertiary-fixed` | `#2a1700` | Text on tertiary-fixed |
| `on-tertiary-fixed-variant` | `#653e00` | Secondary text on tertiary-fixed |
| `error` | `#ba1a1a` | Error text, negative amounts (semantically available; UI currently uses `on-surface`/`text-error` inconsistently) |
| `on-error` | `#ffffff` | Text on error |
| `error-container` | `#ffdad6` | Error banner/badge bg |
| `on-error-container` | `#93000a` | Text on error-container |
| `background` | `#faf8ff` | Page background (token) — **actual rendered bg overridden inline to `#F8FAFC`** (see note below) |
| `on-background` | `#131b2e` | Default text on background |
| `surface` | `#faf8ff` | Header/footer surface |
| `surface-dim` | `#d2d9f4` | Dimmed surface |
| `surface-bright` | `#faf8ff` | Bright surface |
| `surface-container-lowest` | `#ffffff` | Cards, table containers, inputs |
| `surface-container-low` | `#f2f3ff` | Table header row, hover states, pill buttons |
| `surface-container` | `#eaedff` | Donut chart track |
| `surface-container-high` | `#e2e7ff` | Icon avatar backgrounds |
| `surface-container-highest` | `#dae2fd` | Highest emphasis container |
| `on-surface` | `#131b2e` | Primary text |
| `on-surface-variant` | `#434655` | Secondary/label text |
| `surface-variant` | `#dae2fd` | Variant surface fill |
| `outline` | `#737686` | Icon default color, search icon |
| `outline-variant` | `#c3c6d7` | Borders, dividers, input borders |
| `inverse-surface` | `#283044` | Tooltip background |
| `inverse-on-surface` | `#eef0ff` | Tooltip text |
| `inverse-primary` | `#b4c5ff` | Inverse primary accents |

### Hardcoded (non-token) colors found in markup
| Hex | Usage |
|---|---|
| `#F8FAFC` | Actual `body` background (overrides `background` token) |
| `#131b2e` | `body` text color (transactions screen) |
| `#E2E8F0` | `.glass-card` border (savings goals) |
| `#F1F5F9` | `.progress-container` track bg |
| `#DCFCE7` | "Goal Reached" badge bg + laptop icon bg |
| `#166534` | "Goal Reached" badge text/icon color |
| `#22C55E` | Completed (100%) progress bar fill |
| `green-100` / `green-50` / `green-700` / `green-600` (Tailwind defaults) | Income row icon bg, income badge, income amount text |

⚠️ **Inconsistency flag:** the Tailwind config defines a full Material-You-style token set, but two of three screens hardcode `#F8FAFC` for body background instead of using `bg-background` (`#faf8ff`). Recommend standardizing on the token.

---

## 2. TYPOGRAPHY

### Font import
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```
- Body font: **Inter** (all `fontFamily` roles map to `["Inter"]`)
- Icon font: **Material Symbols Outlined**, variation settings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24` (filled variant uses `'FILL' 1` inline on select icons like wallet, shield, flight, laptop)

### Type scale (desktop, from `fontSize` config)

| Role | Size | Line Height | Letter Spacing | Weight |
|---|---|---|---|---|
| `h1` | 32px | 1.2 | -0.02em | 700 |
| `h1-mobile` | 24px | 1.2 | -0.01em | 700 |
| `h2` | 24px | 1.3 | -0.01em | 600 |
| `h3` | 18px | 1.4 | 0 | 600 |
| `body` | 15px | 1.6 | 0 | 400 |
| `label` | 13px | 1.2 | 0.01em | 500 |
| `small` | 13px | 1.5 | 0 | 400 |

### Responsive font scaling (desktop → mobile)
A mobile scale already exists (`h1-mobile`) but isn't applied via responsive classes in source — recommend wiring it up as:

```css
h1 { font-size: 32px; }       /* desktop, ≥768px */
@media (max-width: 767px) {
  h1 { font-size: 24px; letter-spacing: -0.01em; }  /* h1-mobile */
}

h2 { font-size: 24px; }
@media (max-width: 767px) { h2 { font-size: 20px; } }

h3 { font-size: 18px; }
@media (max-width: 640px) { h3 { font-size: 16px; } }

body-text { font-size: 15px; }  /* stays constant across breakpoints */
label { font-size: 13px; }      /* stays constant */
```
Tailwind implementation: `text-h1-mobile md:text-h1`, `text-[20px] md:text-h2`, `text-[16px] md:text-h3`.

---

## 3. SPACING

### Base unit & scale (from `spacing` config)
Base unit: **4px**

| Token | Value | Multiple of base |
|---|---|---|
| `xs` | 4px | 1× |
| `sm` | 8px | 2× |
| `md` | 16px (also `gutter`) | 4× |
| `lg` | 24px | 6× |
| `xl` | 32px | 8× |
| `2xl` | 48px | 12× |
| `margin-mobile` | 16px | 4× |
| `margin-desktop` | 40px | 10× |

### Observed usage
- Page horizontal margin: `px-margin-desktop` (40px) on all three `<main>` containers and headers
- Card padding: `p-lg` (24px) — used on all card/panel components
- Section vertical rhythm: `py-xl` (32px) on `<main>`, `gap-xl`/`gap-lg` between major blocks
- Table cell padding: `px-lg py-md` (24px / 16px)
- Button padding: `px-md py-sm` (16px / 8px) for pill buttons, `px-lg h-[44px]` for primary CTAs
- Gaps: `gap-sm` (8px) icon-to-text, `gap-md` (16px) grouped controls, `gap-lg` (24px) grid gaps

### Responsive spacing reduction (recommended, not present in source — extend pattern)
```
px-margin-desktop (40px)  →  px-margin-mobile (16px)     [Tailwind: px-margin-mobile md:px-margin-desktop]
py-xl (32px)               →  py-lg (24px) on mobile      [py-lg md:py-xl]
p-lg (24px) card padding   →  p-md (16px) on mobile       [p-md md:p-lg]
gap-lg (24px) grid gaps    →  gap-md (16px) on mobile     [gap-md lg:gap-lg]
header height 72px         →  56–64px on mobile
```

---

## 4. BORDER RADIUS

| Token | Value | Used on |
|---|---|---|
| `DEFAULT` | 0.25rem (4px) | Base fallback |
| `lg` | 0.5rem (8px) | Icon avatar squares (`rounded-lg`), buttons, filter inputs |
| `xl` | 0.75rem (12px) | Cards (`rounded-xl`), goal cards, filter bar, CTA buttons, table container |
| `full` | 9999px | Pills/badges, avatar circles, progress bar fill, pagination number buttons, search pill |

Additional inline: `.glass-card { border-radius: 12px; }` (matches `xl` token, hardcoded rather than using class).

---

## 5. SHADOWS

| Class/Selector | Value | Used on |
|---|---|---|
| `.custom-shadow` (dashboard) | `0 1px 3px rgba(0,0,0,0.08)` | Summary cards, chart cards, transaction table, goal cards |
| `.card-shadow` (transactions) | `0 1px 3px rgba(0,0,0,0.08)` | Filter bar, transactions table container |
| `.glass-card` base (savings goals) | `0 1px 3px rgba(0,0,0,0.08)` | Goal cards, contribution history panel |
| `.glass-card:hover` | `0 4px 12px rgba(0,0,0,0.05)` | Same cards, on hover (paired with `translateY(-2px)`) |
| Chart bar tooltip | *(no shadow, solid `bg-on-surface`)* | Tooltip pop-up on bar hover |

All three shadow definitions are functionally identical (same resting-state value) — consolidate into one `--shadow-card: 0 1px 3px rgba(0,0,0,0.08);` and one `--shadow-card-hover: 0 4px 12px rgba(0,0,0,0.05);`.

---

## 6. COMPONENT PATTERNS

### Buttons

**Primary (filled)**
```html
<button class="h-[44px] px-lg rounded-xl bg-primary text-on-primary font-label text-label flex items-center gap-sm">
```
- bg `#004ac6`, text white, height 44px (meets touch target), radius 12px
- Disabled state observed: `bg-outline-variant text-on-surface-variant opacity-60 cursor-not-allowed` ("New Goal" button)

**Secondary (outlined)**
```html
<button class="flex items-center gap-sm px-lg h-[44px] border border-primary text-primary rounded-xl hover:bg-surface-container-low transition-all font-label text-label">
```
- Border `#004ac6`, transparent bg, hover fills `surface-container-low` (#f2f3ff)

**Ghost / Pill (tertiary)**
```html
<button class="flex items-center gap-sm bg-surface-container-low px-md py-sm rounded-full font-label text-label text-on-surface-variant hover:bg-surface-container-high transition-colors">
```
- Used for "This Month" selector, "Category" filter — fully rounded, low-emphasis fill

**Icon button**
```html
<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
```
- 40×40px (below 44px touch minimum — flag for mobile: bump to `w-11 h-11`)

**Text link button**
```html
<button class="text-primary font-label text-label flex items-center gap-xs hover:underline transition-all">
```

### Inputs
```html
<input class="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body text-body bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
```
- Border `#c3c6d7` default, focus border/ring `#004ac6`, radius 8px (dashboard) or 12px `rounded-xl` (transactions filter bar — inconsistent, standardize to `rounded-lg`)
- With leading icon: `pl-[44px]` on transactions screen vs `pl-xl` (32px) on dashboard — inconsistent, standardize to one padding value accounting for icon width

### Select
```html
<select class="w-full px-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary font-body text-body bg-transparent">
```

### Textarea
Not present in source exports — recommend inheriting input styling with `min-h-[80px] resize-y`.

### Cards / Panels
```html
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-sm">
```
- White bg, 24px padding, 12px radius, 1px `outline-variant` border, resting shadow
- Hover-interactive variant (`.glass-card`): adds `translateY(-2px)` + elevated shadow, `transition: transform 0.2s ease, box-shadow 0.2s ease`

### Nav bar (desktop) + mobile collapsed state
**Desktop:**
```html
<header class="bg-surface border-b border-outline-variant h-[72px] flex justify-between items-center px-margin-desktop sticky/fixed top-0 z-50">
  <nav class="hidden md:flex gap-lg items-center h-full">
    <a class="... font-label text-label ...">Link</a>
    <a class="text-primary font-bold border-b-2 border-primary">Active Link</a>
  </nav>
```
- Active state: `text-primary font-bold border-b-2 border-primary`
- Inactive: `text-on-surface-variant hover:bg-surface-container-low`

**Mobile (inferred — `hidden md:flex` implies nav is hidden below 768px but no hamburger/drawer markup exists in source):**
```html
<nav class="hidden md:flex ...">  <!-- desktop nav -->
<button class="md:hidden p-sm rounded-full hover:bg-surface-container-low">
  <span class="material-symbols-outlined">menu</span>
</button>
```
Recommended mobile pattern: hamburger icon (44×44px tap target) triggers a full-height slide-in drawer from left, `transform: translateX(-100%) → translateX(0)`, `transition: transform 0.3s ease`, backdrop `bg-black/40` fade-in.

### Sidebar + mobile drawer
No persistent sidebar exists in the exported screens (top nav pattern only). If added:
- Desktop: `w-64 fixed left-0 top-[72px] h-[calc(100vh-72px)] border-r border-outline-variant bg-surface`
- Mobile: becomes full-screen overlay drawer, `w-[280px]` sliding panel, same transform pattern as mobile nav above, closes on backdrop tap or `Escape`

### Badges / Tags
```html
<span class="bg-secondary-container/20 text-secondary font-label text-[12px] px-sm py-[2px] rounded-full flex items-center gap-xs">
```
Category pills (table): `px-sm py-xs rounded-full ... font-label text-[11px] uppercase tracking-wider` with color pairs:
- Food: `bg-secondary-container/10 text-secondary` (or `on-secondary-container`)
- Housing/Shopping: `bg-primary-container/10 text-primary`
- Transport/Entertainment/Health/Travel: `bg-tertiary-container/10 text-tertiary`
- Income: `bg-green-50 text-green-700`
- Success ("Goal Reached"): `bg-[#DCFCE7] text-[#166534] rounded-full px-2.5 py-0.5 text-xs font-semibold`

### Modals
Not present in source. Recommended pattern consistent with existing card language:
```html
<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
  <div class="bg-surface-container-lowest rounded-xl p-lg w-full max-w-md custom-shadow" style="box-shadow:0 8px 24px rgba(0,0,0,0.12)">
```
Mobile: modal becomes bottom sheet, `rounded-t-xl rounded-b-none`, slides up from bottom (`translateY(100%) → translateY(0)`).

### Alerts
Not present in source. Recommended, using existing error tokens:
```html
<div class="bg-error-container text-on-error-container rounded-lg p-md flex items-center gap-sm border border-error/20">
```
Success variant reuses `#DCFCE7`/`#166534` pattern already established by "Goal Reached" badge.

### Tables (desktop) → Card list (mobile)
**Desktop:**
```html
<table class="w-full">
  <thead class="bg-surface-container-low">
    <th class="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">
  <tbody class="divide-y divide-outline-variant">
    <tr class="hover:bg-surface-container-low transition-colors">
```
**Mobile (recommended collapse pattern, `hidden md:table` / `md:hidden` toggle):**
```html
<div class="md:hidden divide-y divide-outline-variant">
  <div class="p-md flex items-center justify-between">
    <div class="flex items-center gap-md">
      <div class="w-10 h-10 rounded-full bg-surface-container-high ...">[icon]</div>
      <div>
        <p class="font-body font-semibold">Merchant</p>
        <p class="font-small text-on-surface-variant">Category · Date</p>
      </div>
    </div>
    <span class="font-body font-bold text-error">-$00.00</span>
  </div>
</div>
```
Each row becomes a stacked card; sort/filter controls collapse into a single "Filters" button opening a bottom sheet.

### Tabs (full) → scrollable/dropdown (mobile)
Not present in source as literal tabs (nav links serve as top-level tabs). Recommended:
- Desktop: `flex gap-lg border-b border-outline-variant` full row
- Mobile: `flex overflow-x-auto no-scrollbar gap-md` (scrollable) for ≤4 tabs, or collapse into `<select>`-style dropdown for 5+

---

## 7. AI-SPECIFIC COMPONENTS

**None of the exported screens contain AI/chat UI** (no chat bubbles, streaming containers, thinking indicators, or semantic search present in source). Per instructions, providing recommended patterns only, built from the existing token system, since FinSight may add AI features later:

**Chat message bubble**
```html
<!-- User -->
<div class="flex justify-end"><div class="bg-primary text-on-primary rounded-xl rounded-br-sm px-md py-sm max-w-[75%] font-body text-body"></div></div>
<!-- AI -->
<div class="flex justify-start"><div class="bg-surface-container-low text-on-surface rounded-xl rounded-bl-sm px-md py-sm max-w-[75%] font-body text-body border border-outline-variant"></div></div>
```

**AI thinking/loading indicator**
```html
<div class="flex gap-xs items-center p-sm">
  <span class="w-2 h-2 rounded-full bg-outline animate-bounce [animation-delay:-0.3s]"></span>
  <span class="w-2 h-2 rounded-full bg-outline animate-bounce [animation-delay:-0.15s]"></span>
  <span class="w-2 h-2 rounded-full bg-outline animate-bounce"></span>
</div>
```

**Streaming text container**
```html
<div class="font-body text-body text-on-surface leading-relaxed"><span class="border-r-2 border-primary animate-pulse">|</span></div>
```

**Chat input bar**
```html
<div class="flex items-end gap-sm border border-outline-variant rounded-xl p-sm bg-surface-container-lowest">
  <button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low"><span class="material-symbols-outlined">attach_file</span></button>
  <textarea class="flex-1 resize-none border-0 focus:ring-0 font-body text-body bg-transparent"></textarea>
  <button class="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center"><span class="material-symbols-outlined">arrow_upward</span></button>
</div>
```

**AI generation result card**
```html
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant">
  <div class="flex justify-between items-start mb-md"><span class="font-label text-primary">AI Generated</span>
  <div class="flex gap-xs"><button class="w-8 h-8 rounded-full hover:bg-surface-container-low"><span class="material-symbols-outlined text-[18px]">content_copy</span></button></div></div>
</div>
```

**Semantic search input**
```html
<div class="relative"><span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-primary">auto_awesome</span>
<input class="w-full pl-[44px] pr-md py-sm rounded-full border border-outline-variant focus:ring-1 focus:ring-primary bg-surface" placeholder="Ask anything..."/></div>
```

**Error/fallback state (AI unavailable)**
```html
<div class="bg-error-container text-on-error-container rounded-lg p-md flex items-center gap-sm">
  <span class="material-symbols-outlined">error</span>
  <span class="font-body text-body">AI assistant unavailable — try again shortly.</span>
</div>
```

---

## 8. RESPONSIVE BREAKPOINT SYSTEM

Standard Tailwind defaults (implied by `md:`/`lg:` usage in source; no custom breakpoints configured):

| Breakpoint | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Per-layout collapse behavior

**Sidebar** (not in current screens, recommended): visible fixed `lg:block`, hidden below `lg` → drawer.

**Top nav:** `nav.hidden.md:flex` — nav links visible ≥768px; below that, replace with hamburger + drawer (not implemented in source, must be added).

**Card grids:**
- Summary cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (dashboard)
- Charts row: `grid-cols-1 lg:grid-cols-10` (6/4 split collapses to full-width stack <1024px)
- Goals grid: `grid-cols-1 md:grid-cols-3`

**Data tables:** full `<table>` ≥768px (recommended `md:table`); card-list stack below (see Section 6)

**Forms/filter bars:** `grid-cols-12` with `col-span-*` desktop layout → recommend `grid-cols-1 md:grid-cols-12` collapsing filter fields to full-width stacked inputs on mobile, with "Clear Filters" and Search as full-width row

**Chat UI (recommended):** full-screen takeover on mobile (`fixed inset-0`), fixed-width side panel on desktop (`w-[400px] border-l border-outline-variant`)

---

## 9. MOBILE NAVIGATION PATTERN

Not implemented in source; recommended spec consistent with token system:

- **Type:** Slide-in drawer (left-aligned)
- **Trigger:** Hamburger icon button, `w-11 h-11` (44px), positioned left of logo in header, `md:hidden`
- **Contents:** Vertical stack of nav links (`font-body text-body`, `py-md px-lg`), active link gets `bg-primary-container/10 text-primary border-l-4 border-primary`; footer area repeats privacy/terms links
- **Open animation:** Backdrop `bg-black/40 opacity-0→100`, panel `translateX(-100%)→translateX(0)`, `transition: transform 300ms ease, opacity 300ms ease`
- **Close:** Reverse transform, or backdrop tap / swipe-left gesture

---

## 10. TOUCH TARGETS

- Minimum required: **44×44px**, 8px spacing between adjacent targets
- **Compliant in source:** primary/secondary CTA buttons (`h-[44px]`)
- **Non-compliant, flag for mobile fix:**
  - Icon buttons: `w-10 h-10` (40px) — theme toggle, calendar icon, pagination arrows, "more_vert" row actions → bump to `w-11 h-11` on mobile
  - Pagination number buttons: `w-8 h-8` (32px) → increase to `w-11 h-11` on mobile, keep `gap-sm`+ (8px+) between them
- Table row action buttons (`more_vert`, `p-xs`) are undersized on mobile — wrap in `min-w-[44px] min-h-[44px]` tap zone even if icon stays small

---

## 11. LAYOUT PATTERNS

- **Global container:** `max-w-[1440px] mx-auto w-full` on all `<main>` elements
- **Page frame:** `flex flex-col min-h-screen` (body) with sticky/fixed 72px header, flex-grow main, footer
- **Grid systems:** CSS Grid for card layouts (`grid grid-cols-*`), Flexbox for component-internal layout (icon+text rows, button groups)
- **Sticky header:** `sticky top-0 z-50` (dashboard) or `fixed top-0 w-full z-50` with `pt-[104px]` compensation on `<main>` (savings goals) — inconsistent approach, standardize on `sticky` to avoid manual offset padding

---

## 12. TRANSITIONS AND ANIMATIONS

| Element | Transition/Animation | Value |
|---|---|---|
| General color/bg changes | `transition-colors` | Tailwind default (150ms ease) |
| Buttons, links, general | `transition-all` | Tailwind default (150ms ease) |
| `.glass-card` hover | `transform, box-shadow` | `0.2s ease` |
| Donut chart segments | `.donut-segment { transition: stroke-dashoffset 0.3s ease; }` | 300ms ease |
| Progress bars (fill width) | `transition-all duration-1000` | 1000ms |
| Chart bar entrance (JS-driven) | `.chart-bar { transition: height 1s ease-out; }` staggered `100ms + index*100ms` delay | 1000ms ease-out, staggered |
| Row click feedback (JS) | opacity toggle | `opacity-80` for 100ms |
| Tooltip on bar hover | `opacity-0 → opacity-100` | `transition-opacity` (default 150ms) |

**Recommended AI streaming animation** (not in source):
```css
@keyframes blink { 50% { opacity: 0; } }
.streaming-cursor { animation: blink 1s step-end infinite; }
```

---

## 13. ICON STYLE

- **Library:** Material Symbols Outlined
- **Default variation:** `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24` — outlined, regular weight
- **Filled variant:** applied selectively via inline style `font-variation-settings: 'FILL' 1` on brand/emphasis icons (wallet logo, shield, flight, laptop icons in goal cards)
- **Sizing found in source:**
  - Default/unset (24px, from `opsz`) — most nav/action icons
  - `text-[14px]` — trend arrows inside badges
  - `text-[16px]` — table sort carets
  - `text-[18px]` — dropdown chevrons, "view all" arrow
  - `text-[20px]` — search icons, filter icons, download icon
- **Mobile recommendation:** keep icon glyphs at same px size but ensure the *tappable wrapper* is 44×44px (see Section 9), rather than scaling icon size itself.

---

## 14. RESPONSIVE BREAKPOINTS FOUND IN SOURCE (raw audit)

No `@media` queries exist anywhere in the exported `<style>` blocks. All responsiveness is delegated to Tailwind's JIT CDN build via utility prefixes. Only two responsive prefixes appear in the entire export:

- `md:grid-cols-2`, `md:grid-cols-3`, `md:flex-row`, `md:w-64`, `md:flex` (nav), `md:hidden` (implied inverse) — breakpoint 768px
- `lg:grid-cols-4`, `lg:grid-cols-10`, `lg:col-span-6`, `lg:col-span-4` — breakpoint 1024px

**Gap:** no `sm:` usage exists at all, meaning nothing is optimized between 0–767px — the entire sub-768px range currently falls back to the single-column mobile default with no intermediate phone/tablet tuning. This is the primary reason a true mobile pass (drawer nav, card-list tables, touch-target fixes) needs to be built net-new rather than extracted, since the source only ever designed for desktop.