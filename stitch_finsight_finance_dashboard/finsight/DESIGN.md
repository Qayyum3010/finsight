---
name: FinSight
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a69'
  on-secondary: '#ffffff'
  secondary-container: '#7df5f4'
  on-secondary-container: '#007070'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#7df5f4'
  secondary-fixed-dim: '#5ed9d7'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#00504f'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  small:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system centers on a **Modern Corporate** aesthetic tailored for high-trust financial environments. The visual narrative prioritizes clarity, precision, and an "airy" atmosphere to reduce the cognitive load often associated with complex financial data.

The brand personality is authoritative yet accessible, utilizing a minimalist framework that leverages generous white space to create a sense of calm and organization. By avoiding unnecessary decorative elements, the focus remains entirely on data visualization and user actions, evoking an emotional response of security and professional competence.

## Colors
The palette is rooted in a professional "Blue-Chip" primary color, supported by a sophisticated teal secondary for specialized financial indicators. 

- **Primary (#2563EB):** Used for main actions, active states, and brand identifiers.
- **Secondary (#0EA5A4):** Utilized for secondary data streams, investment-related highlights, or alternative action paths.
- **Surface & Background:** A high-contrast relationship between the Slate background and pure White surfaces ensures clear elevation and content separation.
- **Semantic Colors:** Error, Success, and Warning colors follow standard financial conventions to ensure immediate recognition of account statuses and market movements.

## Typography
This design system utilizes **Inter** exclusively to maintain a systematic, utilitarian feel. The hierarchy is defined by clear weight shifts and tight tracking in larger headings to maintain a modern, "tech-first" appearance.

- **Headings:** Use H1 for page titles. On mobile devices, H1 scales down to 24px to prevent awkward line breaks.
- **Body:** The 15px base size is optimized for readability in data-heavy tables and long-form financial statements.
- **Labels:** Used for table headers, form field captions, and small metadata. These should often be paired with the Text Secondary color for better visual hierarchy.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile. 

- **Spacing Rhythm:** All margins, paddings, and gaps must be multiples of the 4px base unit. 
- **Sectioning:** Use `xl` (32px) or `2xl` (48px) spacing between major logical blocks to maintain the "airy" feel.
- **Alignment:** Data in tables should be strictly aligned—numerical data right-aligned, text data left-aligned—to ensure rapid scannability.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and subtle ambient shadows rather than heavy gradients.

- **Level 0 (Background):** #F8FAFC. The lowest layer.
- **Level 1 (Cards/Surfaces):** #FFFFFF with a soft stroke (#E2E8F0) and a subtle drop shadow (0 1px 3px rgba(0,0,0,0.08)).
- **Level 2 (Modals/Popovers):** These should use a more pronounced shadow to indicate temporary interaction, while maintaining the 12px corner radius.
- **Interactive States:** On hover, buttons and cards should slightly deepen their shadow or undergo a subtle tonal shift to provide tactile feedback without breaking the minimalist aesthetic.

## Shapes
The shape language is consistently **Rounded**, using a 12px (0.75rem) radius as the standard for containers. 

- **Standard Elements:** Buttons, cards, and input fields all utilize the 12px radius to create a friendly, approachable interface.
- **Small Elements:** Tooltips and tags may use a reduced radius (4px) to maintain visual balance.
- **Icons:** Use Lucide-style outlined icons with a consistent 1.5pt or 2pt stroke weight. Icons should always be placed within a square bounding box to maintain alignment within the grid.

## Components
Consistent component behavior is vital for a professional fintech experience.

- **Buttons:** 
  - *Primary:* Solid #2563EB with white text.
  - *Secondary:* Ghost style with #2563EB border and text, or a subtle gray wash.
  - *Sizing:* Default height of 44px for touch-ready precision.
- **Input Fields:** 12px rounded corners with a 1px #E2E8F0 border. Focus state moves the border to 2px Primary #2563EB.
- **Cards:** The primary container for all financial data. Cards should have no internal borders between header and body; use spacing (24px padding) to create separation.
- **Chips/Status Tags:** Use light tinted backgrounds (e.g., 10% opacity of the semantic color) with high-contrast text for status indicators like "Completed" or "Pending."
- **Data Tables:** Use thin horizontal dividers only. Avoid vertical lines. Headers should be in the `label` typography style.