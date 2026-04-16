# AGENTS.md — Delhi Air Pollution Mitigation Impact Dashboard

> Canonical specification for AI agents and developers working on this codebase.
> Every section below is authoritative. When in doubt, follow this document over
> ad-hoc instructions.

---

## 1. Project Overview

| Field       | Value |
|-------------|-------|
| **Product** | Delhi Air Pollution Mitigation — Impact Dashboard |
| **Audience** | Government officers (state, city, ULB level) — non-technical users |
| **Purpose** | Track KPI progress across 8 pollution-mitigation initiatives across 9 cities in Delhi-NCR |
| **Cities** | Delhi, Noida, Gurugram, Greater Noida, Ghaziabad, Neemrana, Rohtak, Panipat, Alwar |
| **States** | Delhi, Uttar Pradesh, Haryana, Rajasthan |
| **Deployment** | Vercel — Next.js App Router |
| **Quality gate** | `tsc --noEmit` + `next lint` must pass with zero errors before any PR is merged |

---

## 2. Technical Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14+ (App Router) | Server Components by default |
| Language | TypeScript — strict mode | No `any` types anywhere |
| Styling | Tailwind CSS v3 | No external CSS files; all tokens via CSS custom properties in `globals.css` |
| Animation | Framer Motion | All animations defined as `variants` objects, never inline `animate` |
| Icons | Lucide React | |
| Charts | Recharts | For progress bars and completion charts |
| Map | Custom SVG component | No Leaflet/Mapbox — wireframe uses illustrated map |
| Font | Inter (via `next/font/google`) | Weights 400, 500, 600, 700 |
| Deployment | Vercel | App Router compatible |

---

## 3. Design Files

Two design files are the source of truth:

1. **`Impact_Dashboard_Wireframes_15_Apr.pdf`** — primary wireframes (12 pages)
2. **`vaqct_slide.svg`** — V-AQcT colour palette reference

### Design Fidelity Rules

- Implement every layout, grid, column width, and spacing relationship faithfully.
- Implement all component states: default, hover, active, disabled, loading.
- Map exact colour usage per element to the token system (Section 5).
- Implement all interactive behaviours described in annotation callouts.
- Implement all filter/navigation relationships between pages.
- Table column structures must include locked vs editable cell states.
- Completion bar colour thresholds must use green/yellow/red as specified.
- **Do NOT invent layout or features** not present in the wireframes.
- Where a callout annotation describes behaviour, implement it exactly.
- Where something is ambiguous, implement the most sensible interpretation and leave a `// DESIGN NOTE:` comment explaining your assumption.

---

## 4. Application Pages & Flow

### PAGE 1 — `/login` (Wireframe slide 5: "Log-in page")

**Layout:** Two-column full-screen

- **LEFT HALF:** Solid blue (`--color-blue-panel` / `#3B5BA5`) background, centered white text: "Delhi Air Pollution Mitigation Dashboard"
- **RIGHT HALF:** Off-white/cream (`--color-surface` / `#F5F3EC`) card
  - Top-right logo "ProjectPro"
  - Email input — placeholder `"hello@example.com"`
  - Password input — show/hide toggle (eye icon, Lucide)
  - "Sign In" CTA — dark green (`--color-success` / `#2D6A4F`), full width, white text
  - "Illustrative" badge top-right (slate/grey pill)
- **Callout note:** "Common log-in for all dashboards (PMO, Impact, AQI)"
- **On success →** route to `/home`

### PAGE 2 — `/home` (Wireframe slide 6: "Dashboard selection")

**Layout:** Blue gradient header + 3-column card grid

- Page heading: "Dashboard selection" (white, left-aligned, on blue header)
- 3 selector cards:
  - **PMO DASHBOARD** — blue label (`#4A90D9`), grey bg, subtle border
  - **IMPACT DASHBOARD** — blue label (`#4A90D9`), white bg, cyan border (active/highlighted)
  - **AQI DASHBOARD** — orange label (`#E07B2A`), grey bg, subtle border, sub-label "(Phase 3 - TBD)"
- Clicking **IMPACT DASHBOARD →** route to `/dashboard/summary`

### PAGE 3 — `/dashboard/summary` (Wireframe slides 7–8: "Summary Page 1/2" + "2/2")

Single scrollable page combining both wireframe halves.

**Top Bar** (persistent across all dashboard pages):
- Left: home icon + "Back to Summary page" link (shown on detail pages)
- Center: page title badge — "SUMMARY PAGE (1/2)" dark navy pill
- Right: two dashboard switcher dropdowns ("PMO Dashboard ▼" | "AQI Dashboard ▼")

**Main Content** — "Overall Delhi-NCR Performance" (white text on blue header band)

**Left Panel (≈40% width)** — 8 Initiative KPI Cards in 2-column grid:

| Column 1 | Column 2 |
|-----------|----------|
| Naya Safar Yojana | C&D - ICCC |
| Green Cess | C&D - SCC |
| Greening | Road Repair |
| CEMS/APCD Installation | MRS |

Each card: initiative name (blue link-style header), progress fraction + percentage, horizontal completion bar (threshold-coloured), sub-label, blue circular drill-down icon.

**Right Panel (≈60% width)** — Interactive Map + Table toggle:
- Selected initiative title banner (dark navy, white text)
- MAP / TABLE toggle buttons (outlined style)
- **Map view (default):** Choropleth SVG of Delhi-NCR with state-level data and center bubble ("15,300" Pre-BS VI Trucks/Buses Converted)
- **Table view:** Columns: State | Target | Achieved | Completion (with coloured bars)

**Bottom Bar:**
- Left: "Detailed view ▼" button
- Right: "Enter manual data field ▼" button

### PAGE 4 — `/dashboard/detail` (Wireframe slides 9–10: "Detailed View 1/2" + "2/2")

Single scrollable page — top half = map + metrics, bottom half = tables.

**Filter Bar** (dark navy, full width): State ▼ | City ▼ | RTO ▼ | Initiative selector ▼

**Left Column — Map panel:**
- Sub-header: "Pre-BSIV buses/trucks converted"
- View toggle: [State] [City] [RTO] segmented control
- Interactive SVG map with 9 city bubbles (✓ green = on track, ✗ red = off track)
- Center bubble: "15,300" with subtitle
- Below map: 3 average oval badges (Delhi-NCR avg | State avg | City avg)

**Right Column — Metrics panel:**
- **Outcome Metrics** section: 2 cards (trucks/buses converted + events conducted)
- **Progress Metrics** section: 4 sub-metrics with icon + label + value + progress bar

**Bottom Content — Data Tables:**
- Two side-by-side tables ("Pre-BS VI trucks/buses converted" + "Number of events conducted")
- Columns: Geography | Target | Achieved | Completion
- Target/Achieved cells: warm background (`--color-surface-warm`)
- Dashed row dividers

### PAGE 5 — `/dashboard/upload` (Wireframe slides 11–12: "Manual Data Upload Screen" + "Excel Upload Template")

**Filter Row:** Initiative ▼ | Metric (label) | State ▼ | City ▼

**Action Buttons:**
- "⬇ Download template ▼" — green Excel icon
- "⬆ Upload updated data ▼" — green Excel icon

**Data Entry Table Columns:**
Geography | Metric | Metric type | Target Val | Current Val | Unit | New Val | Last updated | Last updated by | Start date | End date | Remarks

- Only "New Val" column is editable (white bg + visible border)
- All other columns are read-only (greyed bg for locked cells)
- Rows filtered to user's access level

**Excel Template Preview** — below main table, showing locked/unlocked cell layout.

---

## 5. Colour System — Complete Token Set

All colours defined as CSS custom properties in `app/globals.css` and extended in `tailwind.config.ts`. **Never hardcode hex values in JSX or Tailwind classes.**

```css
:root {
  /* ── Dashboard Blues (wireframe primary palette) ── */
  --color-navy:             #1A2B4A;
  --color-navy-mid:         #1E3A5F;
  --color-blue-panel:       #3B5BA5;
  --color-blue-header:      #2E4B8F;
  --color-blue-link:        #4A90D9;
  --color-blue-light:       #5DADE2;
  --color-blue-pale:        #EAF3FB;

  /* ── V-AQcT Brand (from SVG file) ── */
  --color-ink:              #111111;
  --color-accent:           #EEE815;

  /* ── Page & Surface ── */
  --color-page:             #FFFFFF;
  --color-surface:          #F5F3EC;
  --color-surface-grey:     #F0F0F0;
  --color-surface-warm:     #FFF8E7;
  --color-surface-light:    #F7F7F7;

  /* ── Borders & Dividers ── */
  --color-border:           #D3D1C7;
  --color-border-blue:      #7EB3E0;
  --color-border-table:     #D0D5DD;
  --color-divider-dashed:   #E5E7EB;

  /* ── Text ── */
  --color-text-primary:     #111827;
  --color-text-secondary:   #4B5563;
  --color-text-muted:       #9CA3AF;
  --color-text-white:       #FFFFFF;
  --color-text-blue-link:   #4A90D9;
  --color-text-orange:      #E07B2A;

  /* ── Completion Bar Thresholds ── */
  --color-bar-high:         #1B5E20;  /* ≥70% filled */
  --color-bar-high-rem:     #4CAF50;  /* ≥70% remainder */
  --color-bar-mid:          #8BC34A;  /* 40–69% */
  --color-bar-mid-rem:      #CDDC39;
  --color-bar-low:          #6D0D1A;  /* 20–39% filled */
  --color-bar-low-rem:      #E91E63;  /* 20–39% remainder */

  /* ── Semantic ── */
  --color-success:          #2D6A4F;
  --color-success-light:    #EAF3DE;
  --color-warning:          #D97706;
  --color-danger:           #A32D2D;
  --color-danger-light:     #FDECEA;

  /* ── Map City Indicators ── */
  --color-map-on-track:     #4CAF50;
  --color-map-off-track:    #E53935;
  --color-map-haryana:      #A8D5A2;
  --color-map-up:           #F9E4A0;
  --color-map-delhi:        #7EB3E0;
  --color-map-rajasthan:    #FFFACD;

  /* ── Excel Template ── */
  --color-cell-locked:      #D3D3D3;
  --color-cell-editable:    #FFFFFF;
  --color-cell-highlight:   #FFF9C4;
}
```

### Completion Bar Thresholds

| Range   | Filled Colour | Remainder Colour |
|---------|--------------|-----------------|
| ≥ 70%   | `--color-bar-high` (#1B5E20) | `--color-bar-high-rem` (#4CAF50) |
| 40–69%  | `--color-bar-mid` (#8BC34A) | `--color-bar-mid-rem` (#CDDC39) |
| 20–39%  | `--color-bar-low` (#6D0D1A) | `--color-bar-low-rem` (#E91E63) |
| < 20%   | `--color-bar-low` (#6D0D1A) | `--color-bar-low-rem` (#E91E63) |

---

## 6. Typography

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-2xs` | 10px | 14px | Timestamps, locked cell labels |
| `text-xs` | 11px | 16px | Table footnotes, annotation text |
| `text-sm` | 12px | 18px | Table body, filter labels |
| `text-base` | 14px | 20px | Card body, form inputs |
| `text-lg` | 16px | 24px | Card headers, section labels |
| `text-xl` | 18px | 28px | Page section headings |
| `text-2xl` | 24px | 32px | Stat numbers (120, 15,300) |
| `text-3xl` | 32px | 40px | Hero map central number |

**Font setup:**
```ts
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
```

---

## 7. File Architecture

```
app/
  layout.tsx                   ← font setup, metadata, global CSS
  globals.css                  ← ALL CSS custom properties + resets
  (login)/
    page.tsx                   ← Login page
  (home)/
    page.tsx                   ← Dashboard selection page
  dashboard/
    summary/page.tsx           ← Summary page (slides 7–8 combined)
    detail/page.tsx            ← Detailed view (slides 9–10 combined)
    upload/page.tsx            ← Manual data upload screen

components/
  layout/
    TopBar.tsx                 ← Persistent top bar with back link + switchers
    DashboardSwitcher.tsx      ← PMO / AQI dropdown switcher
    BottomBar.tsx              ← "Detailed view" + "Enter manual data" bar
  ui/
    CompletionBar.tsx          ← Horizontal bar with threshold colour logic
    InitiativeCard.tsx         ← KPI card (summary page left panel)
    MetricCard.tsx             ← Outcome metric card (detail page right panel)
    ProgressMetricRow.tsx      ← Progress metric list item with icon + bar
    AverageOval.tsx            ← Delhi-NCR avg / State avg / City avg oval badge
    FilterPill.tsx             ← Dark navy dropdown filter pill
    DashboardCard.tsx          ← Home page selector card (PMO/Impact/AQI)
    DataTable.tsx              ← Reusable table (Geography/Target/Achieved/Completion)
    EditableDataTable.tsx      ← Upload page table with editable New Val cells
    ExcelTemplatePreview.tsx   ← Locked/unlocked cell preview section
    Badge.tsx                  ← Status badges (Illustrative, Tentative, etc.)
    ViewToggle.tsx             ← Map/Table + State/City/RTO segmented controls
  maps/
    DelhiNCRMap.tsx            ← SVG choropleth map with city bubbles
    CityBubble.tsx             ← Individual city bubble with icon + value

lib/
  types.ts                     ← All TypeScript interfaces
  constants.ts                 ← Static data, mock data, thresholds
  utils.ts                     ← cn(), getBarColour(), formatNumber()

middleware.ts                  ← Route protection (redirect to /login if no auth)
```

---

## 8. Component Contracts

### General Rules

- All components use TypeScript with explicit prop interfaces.
- `'use client'` ONLY for: interactive filters, map hover, editable table, login form, view toggles. Everything else is Server Components.
- No component longer than ~150 lines — split into sub-components.
- All static data in `lib/constants.ts` — never inline data in JSX.
- No magic numbers — all threshold values in `COMPLETION_THRESHOLDS` constant.
- `getBarColour(pct: number): string` — centralised threshold logic used by every progress bar.

### CompletionBar

```ts
interface CompletionBarProps {
  value: number       // 0–100
  target?: number     // optional target marker
  showLabel?: boolean // show "70%" text
  size?: 'sm' | 'md' // sm for table rows, md for cards
}
```
Reads `COMPLETION_THRESHOLDS`, never has colour logic inline.

### DelhiNCRMap

```ts
interface DelhiNCRMapProps {
  initiative: string
  viewLevel: 'state' | 'city' | 'rto'
  data: MapDataPoint[]
  onCityClick?: (city: string) => void
}
```

Pure SVG React component. Regions coloured by `--color-map-*` tokens. City bubbles show name + status icon (✓/✗) + value. Center bubble is extra-large with total and subtitle. Hover shows "See on map" tooltip.

### Key TypeScript Interfaces (in `lib/types.ts`)

- `Initiative` — name, slug, metrics
- `Metric` — name, target, achieved, type
- `MetricType` — `'outcome' | 'progress' | 'readiness'`
- `Geography` — state, city, rto
- `CompletionData` — value, target, percentage
- `MapDataPoint` — city, value, onTrack boolean
- `UploadRow` — all columns for manual data upload table

---

## 9. Government User UX Rules

1. Minimum **44×44px** touch target on ALL interactive elements.
2. Status always shown as **colour + icon + text** — never colour alone.
3. Every navigation action has a visible **"Back" link**.
4. Active filters are always visually distinct (highlighted, not just bold).
5. **Loading states:** skeleton loaders on every data panel (never blank).
6. **Empty states:** explicit message — "No data available for this filter".
7. Editable cells must be unmistakably different from read-only cells (white bg + visible border vs grey bg for locked).
8. All numbers formatted with **Indian numeral system**: use `formatNumber()` — e.g. "1,91,239".
9. Breadcrumb trail visible at all times showing current page context.
10. Dashboard switcher (PMO / AQI) accessible from every page in one click.

---

## 10. Delhi-NCR SVG Map Specification

Build as a pure SVG React component. No external map library.

### Regions (simplified path shapes)

| Region | Position | Fill Token |
|--------|----------|-----------|
| Haryana | Northwest | `--color-map-haryana` (#A8D5A2) |
| Uttar Pradesh | East | `--color-map-up` (#F9E4A0) |
| Delhi | Center | `--color-map-delhi` (#7EB3E0) |
| Rajasthan | South | `--color-map-rajasthan` (#FFFACD) |

### City Bubbles (9 total)

Each bubble: city name (bold) + status icon (✓ green / ✗ red) + value.

Center bubble (Delhi-NCR total): extra large, white circle with drop shadow, large bold number, two sub-lines.

### Hover Behaviour

- City bubble hover → "See on map" tooltip
- Region hover → darker tint highlight
- Cursor: pointer on all interactive regions

---

## 11. Manual Data Upload Specification

### Editable Table Rules

- Only "New Val" column is editable (white cell, visible input border).
- All other columns are read-only (greyed bg for cells without data).
- Start date + End date columns blank except for specific metrics (e.g. "Total quantum of malba received at SCC", "MRS: Road coverage").
- Rows filtered to user's access level.
- "Last updated" shows timestamp; "Last updated by" shows user.

### Download Template

- Client-side file download (mock CSV/XLSX in demo).
- Same columns as table.
- Greyed columns = locked.

### Upload

- File input (accept `.xlsx`, `.csv`).
- Validates uploaded file matches template structure.
- Shows success/error state with explicit message.

---

## 12. Animation (Framer Motion)

| Element | Animation | Duration |
|---------|-----------|----------|
| Page transitions | Fade + slight upward slide | 0.3s ease-in-out |
| Initiative cards (summary) | Staggered fade-in | — |
| Progress bars | Width from 0 → value on mount | 0.6s ease-out |
| Map bubbles | Scale 0.8 → 1.0 (staggered by city) | — |
| Filter changes | Content area cross-fade | 0.2s |

### Rules

- All animations defined as `variants` objects — no inline `animate` objects.
- Always use `useReducedMotion()` — static fallback for reduced-motion users.
- No animation on editable table cells (government precision context).

---

## 13. Accessibility (WCAG AA minimum)

- All interactive elements: `focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2`
- Tables: `<thead>` with `<th scope="col">` on all columns
- Sortable columns: `aria-sort` attribute
- Completion bars: `aria-label="70% complete"` (not just visual)
- Map city bubbles: `aria-label="Gurugram — 3,500 trucks converted — on track"`
- Form inputs: explicit `<label>` elements, not placeholder-only
- Colour contrast: all text ≥ 4.5:1 against its background
- Login form: `autocomplete="email"` and `autocomplete="current-password"`
- Dashboard cards: `role="button"` `tabIndex={0}` with keyboard Enter/Space handler

---

## 14. Vercel Deployment Requirements

- `next/image` for all raster images (explicit width, height, priority on LCP).
- `next/font` for Inter (zero layout shift).
- No Node.js-only APIs in `'use client'` components.
- `next.config.ts`: configure `images.remotePatterns` if any external images.
- All env vars: `NEXT_PUBLIC_` prefix for client access.
- `tsc --noEmit` + `next lint`: zero errors before considering complete.
- `middleware.ts`: basic route protection (redirect `/dashboard/*` to `/login` if no auth cookie — mock auth acceptable for now).

---

## 15. Implementation Order

Files must be delivered in this exact sequence:

| # | File | Notes |
|---|------|-------|
| 1 | `tailwind.config.ts` | All colour tokens as Tailwind utilities |
| 2 | `app/globals.css` | All CSS custom properties + resets |
| 3 | `lib/types.ts` | All TypeScript interfaces |
| 4 | `lib/constants.ts` | All mock data, thresholds, initiative list |
| 5 | `lib/utils.ts` | `cn()`, `getBarColour()`, `formatNumber()` |
| 6 | `app/layout.tsx` | Font setup, metadata, global CSS |
| 7 | `components/ui/CompletionBar.tsx` | Build first — used everywhere |
| 8 | `components/ui/Badge.tsx` | |
| 9 | `components/ui/FilterPill.tsx` | |
| 10 | `components/ui/ViewToggle.tsx` | |
| 11 | `components/layout/TopBar.tsx` | |
| 12 | `components/layout/DashboardSwitcher.tsx` | |
| 13 | `components/layout/BottomBar.tsx` | |
| 14 | `components/maps/CityBubble.tsx` | |
| 15 | `components/maps/DelhiNCRMap.tsx` | |
| 16 | `components/ui/InitiativeCard.tsx` | |
| 17 | `components/ui/MetricCard.tsx` | |
| 18 | `components/ui/ProgressMetricRow.tsx` | |
| 19 | `components/ui/AverageOval.tsx` | |
| 20 | `components/ui/DataTable.tsx` | |
| 21 | `components/ui/EditableDataTable.tsx` | |
| 22 | `components/ui/ExcelTemplatePreview.tsx` | |
| 23 | `components/ui/DashboardCard.tsx` | |
| 24 | `app/(login)/page.tsx` | |
| 25 | `app/(home)/page.tsx` | |
| 26 | `app/dashboard/summary/page.tsx` | |
| 27 | `app/dashboard/detail/page.tsx` | |
| 28 | `app/dashboard/upload/page.tsx` | |
| 29 | `middleware.ts` | |

### File Header Convention

Every file must open with:

```ts
// FILE: path/to/file.tsx
// PURPOSE: What this file does
// DESIGN REF: Wireframe slide number(s) and section this implements
```

---

## 16. Data Strategy

All data is currently **mock data** in `lib/constants.ts`. Every point where real API data will eventually replace mock data must be marked with:

```ts
// TODO: replace with API call
```

### Key Data Constants

- `INITIATIVES` — 8 items (Naya Safar Yojana, Green Cess, Greening, CEMS/APCD Installation, C&D - ICCC, C&D - SCC, Road Repair, MRS)
- `CITIES` — 9 items
- `STATES` — 4 items (Delhi, Uttar Pradesh, Haryana, Rajasthan)
- `COMPLETION_THRESHOLDS` — threshold config for bar colours
- `MOCK_SUMMARY_DATA` — KPI data for summary page
- `MOCK_DETAIL_DATA` — metrics and geography data for detail page
- `MOCK_UPLOAD_ROWS` — row data for upload page table

---

## 17. Suggested Future Enhancements

These are **not** in scope for the initial build but should be planned for:

- **Real authentication** via NextAuth (replacing mock auth cookie)
- **API integration** — replace all `lib/constants.ts` mock data with backend calls
- **Hindi / regional language support** (i18n) — given the government audience
- **Dark mode** — extend the token system with dark-mode variants
- **Print / export view** — PDF generation of dashboard pages for reports
- **Role-based access control** — different ULB users see different city rows
