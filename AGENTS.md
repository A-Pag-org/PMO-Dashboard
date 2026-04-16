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

1. **`Impact_Dashboard_Wireframes_15_Apr.pdf`** — primary wireframes (13 pages, April 2026)
2. **`vaqct_slide.svg`** — V-AQcT colour palette reference (**not yet uploaded; colour tokens below are from the textual specification and must be verified against the SVG once available**)

### Page Map (PDF → Application Route)

| PDF Page | Wireframe Title | Application Route |
|----------|----------------|-------------------|
| 1 of 13 | Title page: "Wireframes for Impact Dashboard" | — |
| 2 of 13 | Impact dashboard flow (1/3) — full flow diagram | — (reference only) |
| 3 of 13 | Impact dashboard flow (2/3) — Login → Home | — (reference only) |
| 4 of 13 | Impact dashboard flow (3/3) — Summary → Detail → Upload | — (reference only) |
| 5 of 13 | Log-in page | `/login` |
| 6 of 13 | Dashboard selection | `/home` |
| 7 of 13 | Summary Page (1/2) — initiative cards + map view | `/dashboard/summary` |
| 8 of 13 | Summary Page (2/2) — initiative cards + table view | `/dashboard/summary` |
| 9 of 13 | Detailed View (1/2) — map + metrics panels | `/dashboard/detail` |
| 10 of 13 | Detailed View (2/2) — data tables | `/dashboard/detail` |
| 11 of 13 | Manual Data Upload Screen | `/dashboard/upload` |
| 12 of 13 | Excel Upload Template (preview) | `/dashboard/upload` |
| 13 of 13 | Thank you | — |

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

## 4. Navigation Flow

Derived from wireframe pages 2–4 (flow diagrams 1/3, 2/3, 3/3).

```
┌──────────┐     ┌──────────┐     ┌─────────────────────┐
│  LOGIN   │────►│   HOME   │────►│  SUMMARY PAGE       │
│  /login  │     │  /home   │     │  /dashboard/summary  │
└──────────┘     └──────────┘     └──────────┬──────────┘
                                             │
                      ┌──────────────────────┼──────────────────────┐
                      ▼                      │                      ▼
         ┌────────────────────┐              │         ┌────────────────────────┐
         │  DETAILED VIEW     │              │         │  MANUAL DATA UPLOAD    │
         │  /dashboard/detail │──────────────┘         │  /dashboard/upload     │
         └────────────────────┘                        └────────────────────────┘
```

**Cross-dashboard navigation** (from wireframe annotation):
- "Integration across dashboards will be needed"
- PMO Dashboard and AQI Dashboard switchers are accessible from every dashboard page via the TopBar
- All dashboard pages have a "Back to Summary page" link

**Key navigation rules:**
- Login success → `/home`
- Home: clicking IMPACT DASHBOARD card → `/dashboard/summary`
- Summary: "Detailed view" button (bottom-left) → `/dashboard/detail`
- Summary: "Enter manual data field" button (bottom-right) → `/dashboard/upload`
- Detail: "Enter manual data field" button (bottom-right) → `/dashboard/upload`
- Detail: "Back to Summary page" link (top-left) → `/dashboard/summary`
- Upload: "Back to Summary page" link (top-left) → `/dashboard/summary`

---

## 5. Application Pages — Detailed Specifications

### PAGE 1 — `/login` (Wireframe: page 5 of 13)

**Layout:** Two-column full-screen

- **LEFT HALF:** Solid blue (`--color-blue-panel` / `#3B5BA5`) background, centered white text: "Delhi Air Pollution Mitigation Dashboard"
- **RIGHT HALF:** Off-white/cream (`--color-surface` / `#F5F3EC`) card
  - Top-right logo "ProjectPro"
  - Email input — placeholder `"hello@example.com"`
  - Password input — show/hide toggle (eye icon, Lucide)
  - "Sign In" CTA — dark green (`--color-success` / `#2D6A4F`), full width, white text
  - **"Illustrative"** badge top-right corner (slate/grey pill)
- **Wireframe callout:** "Common log-in for all dashboards, i.e., PMO, Impact, and AQI monitoring)"
- **On success →** route to `/home`

### PAGE 2 — `/home` (Wireframe: page 6 of 13)

**Layout:** Blue gradient header + 3-column card grid

- Page heading: "Dashboard selection" (white, left-aligned, on blue header)
- 3 selector cards:
  - **PMO DASHBOARD** — blue label (`#4A90D9`), grey bg, subtle border
  - **IMPACT DASHBOARD** — blue label (`#4A90D9`), white bg, cyan border (active/highlighted)
  - **AQI DASHBOARD** — orange label (`#E07B2A`), grey bg, subtle border, sub-label "(Phase 3 - TBD)"
- Clicking **IMPACT DASHBOARD →** route to `/dashboard/summary`

### PAGE 3 — `/dashboard/summary` (Wireframe: pages 7–8 of 13)

Single scrollable page combining both wireframe halves (1/2 = map view, 2/2 = table view).

#### Top Bar (persistent across all dashboard pages)
- Left: home icon + "Back to Summary page" link (visible on detail/upload pages; on summary page itself, this may show as home icon only)
- Center: page title badge — **"SUMMARY PAGE (1/2)"** dark navy pill
- Right: two dashboard switcher links — **"PMO Dashboard"** | **"AQI Dashboard"** (dark navy bg, white text, with icons)
- Wireframe callout: "Links to other dashboards"

#### Main Content Header
- **"Overall Delhi-NCR Performance"** (white text on blue header band, full width)

#### Left Panel (≈40% width) — 8 Initiative KPI Cards in 2×4 grid

The card grid layout follows the exact wireframe order (pages 7–8):

| Row | Column 1 | Column 2 |
|-----|----------|----------|
| 1 | **Naya Safar Yojana** | **C&D - ICCC** |
| 2 | **CEMS/APCD Installation** | **Road Repair** |
| 3 | **Green Cess** | **C&D - SCC** |
| 4 | **Greening** | **MRS** |

Each card contains:
- Initiative name as header (blue link-style)
- Progress fraction + percentage: **"X/Y (Xx%)"** in bold
- Horizontal completion bar (colour by threshold — see Section 6)
- Primary metric sub-label (see table below)
- Small blue circular info/drill-down icon (bottom-right)

#### Initiative Primary Metrics (from wireframe)

| Initiative | Primary Metric Sub-label |
|------------|-------------------------|
| Naya Safar Yojana | Pre-BSIV buses/trucks converted |
| C&D - ICCC | # sites integrated in ICCC |
| CEMS/APCD Installation | # industries with CEMS / APCDs installed |
| Road Repair | Km road-length repaired |
| Green Cess | # tolls with cess collection initiated |
| C&D - SCC | # SCC setup achieved |
| Greening | Phase 1 implementation of greening action plan initiated |
| MRS | Route coverage achieved |

#### Right Panel (≈60% width) — Interactive Map + Table

- Selected initiative title banner: **"Naya Safar Yojana"** (dark navy, white text)
- Primary metric sub-label beneath it: **"Pre-BSIV buses/trucks converted"** (dark navy pill)
- **MAP / TABLE** toggle buttons (top-right of panel, outlined style)
- **Wireframe callout:** "Map / table changes with initiative selected" — when user clicks a different initiative card on the left, the right panel updates to show that initiative's data
- **Wireframe callout:** "View toggle" — switches between map and table views

**Map view (default — shown in page 7 of 13):**
- Choropleth SVG of Delhi-NCR region with state-level data
- Center bubble: large bold total number with label and subtitle
- State-level data labels on map regions

**Table view (shown in page 8 of 13):**

| State | Target | Achieved | Completion |
|-------|--------|----------|------------|
| Delhi | 3,200 | 2,240 | 70% |
| Uttar Pradesh | 2,000 | 500 | 40% |
| Haryana | 2,500 | 500 | 20% |
| Rajasthan | 1,500 | 750 | 50% |

- Dark navy table header row, white text, bold
- Completion column: coloured progress bar + percentage (same threshold colours as initiative cards)

#### Bottom Bar
- Left: **"Detailed view ▼"** button (icon + label, dark navy) — wireframe callout: "Link to detailed view dashboard"
- Right: **"Enter manual data field ▼"** button (icon + label) — wireframe callout: "Link to data entry portal"

### PAGE 4 — `/dashboard/detail` (Wireframe: pages 9–10 of 13)

Single scrollable page — top half = map + metrics, bottom half = data tables.

#### Top Bar
- Left: **"← Back to Summary page"** (house icon, blue link)
- Center: page title badge — **"DETAILED VIEW (1/2)"** dark navy pill
- Right: **"PMO Dashboard"** | **"AQI Dashboard"** switcher links

#### Filter Bar (dark navy, full width)
- Dropdown filters: **"State ▼"** | **"City ▼"** | **"RTO ▼"**
- Initiative selector: **"Naya Safar Yojana ▼"** (large dropdown)
- Wireframe callout: "Filters"
- All filters interact: selecting a filter updates both map and metrics panels

#### Top Content — Left Column: Map Panel
- Sub-header: **"Pre-BSIV buses/trucks converted"** (dark navy bar)
- View toggle below header: **[State] [City] [RTO]** segmented control — wireframe callout: "View toggle"
- Interactive Delhi-NCR SVG map with labelled city bubbles
- **"% completion of filtered geo"** label — shown as "Xx%" oval badge on the map
- City bubbles: ✓ green (on track), ✗ red (off track)
- Wireframe callout: **Hover: "See on map"** — hovering a city bubble shows this tooltip

**Below map — 3 average oval badges:**
- **"Delhi-NCR avg  Xx%"** | **"State avg  Xx%"** | **"City avg  Xx%"**

**Wireframe behavioral note (page 9):**
> "The state avg and city avg metrics will only be visible for city and RTO filters respectively"

This means:
- Delhi-NCR avg: always visible
- State avg: visible only when City or RTO view is selected
- City avg: visible only when RTO view is selected

#### Top Content — Right Column: Metrics Panel

**Outcome Metrics** section (white panel, dark navy header):
- Card 1: **"Pre-BS VI trucks / buses converted"** — "X/Y" fraction, progress bar, drill-down icon
- Card 2: (implied — events conducted or similar, with "Xx%" label)

**Progress Metrics** section (dark navy header):
- List of sub-metrics with icon + label + value + progress bar + drill-down icon each

**Wireframe behavioral note (page 9):**
> "Page will also contain readiness metrics for the applicable initiatives; the first outcome metric of the filtered initiative will be selected by default"

**Wireframe behavioral note (page 9) — central-level metrics:**
> "For metrics that are at the central level (like 'PSBs / NBFCs onboarded'), the map will only show a value in the center bubble"

#### Bottom Content — Data Tables (Detailed View 2/2, page 10)

Two side-by-side metric tables:
- **Table 1 header:** "Pre-BS VI trucks/buses converted" (dark navy)
- **Table 2 header:** "Number of events conducted" (dark navy)

Both tables share the same structure:

| Geography | Target | Achieved | Completion |
|-----------|--------|----------|------------|
| Delhi | 3,200 | 2,240 | 70% |
| Noida | 2,000 | 500 | 40% |
| Gurugram | 2,500 | 500 | 20% |
| Neemrana | 1,500 | 750 | 50% |

- Completion column: coloured progress bar + percentage (same threshold colours)
- Wireframe callout: **"All other metrics (previous page) on right side >>>"**

**Wireframe behavioral note (page 10):**
> "This is the bottom half of the same detailed view page; the Y-axis of the table will change according to the view selected above; only metrics applicable to the selected view will be shown. E.g. since 'PSBs/NBFCs onboarded' is a center-level metric, it will not appear in the table when viewing data at the state, city, or RTO level"

#### Bottom Bar
- Right: **"Enter manual data field ▼"** button

### PAGE 5 — `/dashboard/upload` (Wireframe: pages 11–12 of 13)

#### Top Bar
- Left: **"← Back to Summary page"**
- Center: **"MANUAL DATA UPLOAD SCREEN"** badge
- Right: **"PMO Dashboard"** | **"AQI Dashboard"** switchers

#### Filter Row (4 items, dark navy pills)
- **"Initiative ▼"** — dropdown
- **"Metric"** — label/dropdown
- **"State ▼"** — dropdown
- **"City ▼"** — dropdown

#### Action Buttons (top-right)
- **"⬇ Download template"** — green Excel icon + label
- **"⬆ Upload updated data"** — green Excel icon + label
- Wireframe callout: "User can alternatively upload excel to update data"

#### Data Entry Table

**Columns** (dark navy header row, white text):

| Geography | Metric | Metric type | Target Val | Current Val | Unit | New Val | Last updated | Last updated by | Start date | End date | Remarks |
|-----------|--------|-------------|------------|-------------|------|---------|--------------|-----------------|------------|----------|---------|

**Row data from wireframe (page 11):**

| Geography | Metric | Type | Target | Current | Unit | New Val |
|-----------|--------|------|--------|---------|------|---------|
| Noida | No. of SCC setup achieved | Outcome | 500 | 200 | - | [ ] |
| Noida | Total quantum of malba received at SCC | Outcome | 400 | 50 | MMT | [ ] |
| Noida | No. of SCC identified (land parcels earmarked) | Progress | - | 30 | - | [ ] |
| Noida | No. of SCC required | Readiness | - | 500 | - | [ ] |
| Greater Noida | No. of SCC setup achieved | Outcome | - | | | [ ] |
| Greater Noida | Total quantum of malba received at SCC | Outcome | | | MMT | [ ] |
| Greater Noida | No. of SCC identified (land parcels earmarked) | Progress | | | - | [ ] |
| Greater Noida | No. of SCC required | Readiness | | | - | [ ] |
| Ghaziabad | No. of SCC setup achieved | Outcome | | | - | [ ] |
| Ghaziabad | Total quantum of malba received at SCC | Outcome | | | MMT | [ ] |

**Editable table rules:**
- Only **"New Val"** column is editable (white bg, visible input border `[ ]`)
- All other columns are read-only (greyed bg for cells without data)
- Rows with data (Noida): white background
- Rows without data (Greater Noida, Ghaziabad): light grey background

**Wireframe behavioral notes (page 11):**
> "Data will only be input for the lowest level, and then aggregated to the nearest upper level; the UI will only show the rows relevant to the user (e.g. ULB of Noida will not be shown rows for Delhi)"

> "'Start date' and 'End date' columns will be blanked out except for metrics 'Total quantum of malba received at SCC' and 'MRS: Road coverage' due to their repetitive nature"

> "'Download template' will download an excel (having locked columns) of the latest data, which the user can edit and upload to the portal to update the data"

#### Excel Template Preview Section (page 12 of 13)

- Section header: **"EXCEL UPLOAD TEMPLATE"** (dark navy pill, centered)
- **"Tentative"** badge (top-right, slate pill)
- Wireframe callout: "Downloaded from the manual data upload screen" (with arrow)
- Wireframe callout: "Only unshaded cells are unlocked (depends on the user)"
- Same columns as data entry table
- Greyed cells = locked; white/unshaded cells = editable by user

**Wireframe note (page 12):**
> "The greyed-out cells will be locked to the user once the excel template is downloaded containing the latest data; the portal will only update the data that the user has access for in the case the user tries uploading another user's workbook"

---

## 6. Colour System — Complete Token Set

All colours defined as CSS custom properties in `app/globals.css` and extended in `tailwind.config.ts`. **Never hardcode hex values in JSX or Tailwind classes.**

> **Note:** The `vaqct_slide.svg` colour palette file has not yet been uploaded.
> The V-AQcT Brand tokens below (`--color-ink`, `--color-accent`) are from the
> textual specification and **must be verified** against the actual SVG once available.
> All other tokens are derived from the wireframe visual language.

```css
:root {
  /* ── Dashboard Blues (wireframe primary palette) ── */
  --color-navy:             #1A2B4A;  /* darkest navy — table headers, badges */
  --color-navy-mid:         #1E3A5F;  /* filter bar, section headers */
  --color-blue-panel:       #3B5BA5;  /* login left panel, page headers */
  --color-blue-header:      #2E4B8F;  /* "Overall Delhi-NCR Performance" band */
  --color-blue-link:        #4A90D9;  /* initiative card titles, links */
  --color-blue-light:       #5DADE2;  /* cyan — active card border, progress bar */
  --color-blue-pale:        #EAF3FB;  /* hover bg on cards, table row highlight */

  /* ── V-AQcT Brand (from SVG file — PENDING VERIFICATION) ── */
  --color-ink:              #111111;  /* deep black — V-AQcT topbar */
  --color-accent:           #EEE815;  /* brand yellow — V-AQcT highlights */

  /* ── Page & Surface ── */
  --color-page:             #FFFFFF;
  --color-surface:          #F5F3EC;  /* login right panel, card bg */
  --color-surface-grey:     #F0F0F0;  /* inactive dashboard cards, empty rows */
  --color-surface-warm:     #FFF8E7;  /* Target/Achieved table cells */
  --color-surface-light:    #F7F7F7;  /* stat cards */

  /* ── Borders & Dividers ── */
  --color-border:           #D3D1C7;
  --color-border-blue:      #7EB3E0;  /* active card border */
  --color-border-table:     #D0D5DD;  /* table cell borders */
  --color-divider-dashed:   #E5E7EB;  /* dashed row dividers */

  /* ── Text ── */
  --color-text-primary:     #111827;
  --color-text-secondary:   #4B5563;
  --color-text-muted:       #9CA3AF;
  --color-text-white:       #FFFFFF;
  --color-text-blue-link:   #4A90D9;
  --color-text-orange:      #E07B2A;  /* AQI dashboard label */

  /* ── Completion Bar Thresholds ── */
  --color-bar-high:         #1B5E20;  /* ≥70% filled */
  --color-bar-high-rem:     #4CAF50;  /* ≥70% remainder */
  --color-bar-mid:          #8BC34A;  /* 40–69% */
  --color-bar-mid-rem:      #CDDC39;
  --color-bar-low:          #6D0D1A;  /* 20–39% and <20% filled */
  --color-bar-low-rem:      #E91E63;  /* 20–39% and <20% remainder */

  /* ── Semantic ── */
  --color-success:          #2D6A4F;  /* Sign In button */
  --color-success-light:    #EAF3DE;
  --color-warning:          #D97706;
  --color-danger:           #A32D2D;
  --color-danger-light:     #FDECEA;

  /* ── Map City Indicators ── */
  --color-map-on-track:     #4CAF50;  /* ✓ green bubbles */
  --color-map-off-track:    #E53935;  /* ✗ red bubbles */
  --color-map-haryana:      #A8D5A2;  /* choropleth fills */
  --color-map-up:           #F9E4A0;
  --color-map-delhi:        #7EB3E0;
  --color-map-rajasthan:    #FFFACD;

  /* ── Excel Template ── */
  --color-cell-locked:      #D3D3D3;  /* greyed locked cells */
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

## 7. Typography

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

## 8. File Architecture

```
app/
  layout.tsx                   ← font setup, metadata, global CSS
  globals.css                  ← ALL CSS custom properties + resets
  (login)/
    page.tsx                   ← Login page (wireframe page 5)
  (home)/
    page.tsx                   ← Dashboard selection page (wireframe page 6)
  dashboard/
    summary/page.tsx           ← Summary page (wireframe pages 7–8 combined)
    detail/page.tsx            ← Detailed view (wireframe pages 9–10 combined)
    upload/page.tsx            ← Manual data upload (wireframe pages 11–12)

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

## 9. Component Contracts

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

Pure SVG React component. Regions coloured by `--color-map-*` tokens. City bubbles show name + status icon (✓/✗) + value. Center bubble is extra-large with total and subtitle. Hover shows "See on map" tooltip (per wireframe page 9 callout).

### Key TypeScript Interfaces (in `lib/types.ts`)

- `Initiative` — name, slug, primaryMetric, metrics
- `Metric` — name, target, achieved, type
- `MetricType` — `'outcome' | 'progress' | 'readiness'`
- `Geography` — state, city, rto
- `CompletionData` — value, target, percentage
- `MapDataPoint` — city, value, onTrack boolean
- `UploadRow` — all 12 columns for manual data upload table

---

## 10. Government User UX Rules

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

## 11. Delhi-NCR SVG Map Specification

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

### Hover Behaviour (from wireframe page 9 callout)

- City bubble hover → **"See on map"** tooltip
- Region hover → darker tint highlight
- Cursor: pointer on all interactive regions

### View-Level Behaviour (from wireframe page 9)

- **State view:** map shows state-level aggregate data
- **City view:** map shows individual city bubbles with city-level data
- **RTO view:** map shows RTO-level data within selected city/state

### Central-Level Metrics Rule (from wireframe page 9)

> "For metrics that are at the central level (like 'PSBs / NBFCs onboarded'), the map will only show a value in the center bubble"

When displaying a central-level metric, all city/state bubbles should be hidden and only the center summary bubble is shown.

---

## 12. Manual Data Upload Specification

### Editable Table Rules (from wireframe page 11)

- Only **"New Val"** column is editable (white cell, visible input border).
- All other columns are read-only (greyed bg for cells without data).
- **Start date + End date** columns blank except for metrics:
  - "Total quantum of malba received at SCC"
  - "MRS: Road coverage"
  (due to their repetitive nature)
- Rows filtered to user's access level (e.g. ULB of Noida will not see Delhi rows).
- "Last updated" shows [timestamp]; "Last updated by" shows [user].
- Data is input at the lowest level only, then aggregated to the nearest upper level.

### Download Template (from wireframe pages 11–12)

- Button triggers client-side file download (mock CSV/XLSX in demo).
- Downloaded template has same columns as table.
- Greyed columns = locked (cannot be edited by user).
- Only unshaded cells are unlocked (varies per user's access).

### Upload (from wireframe page 11)

- File input (accept `.xlsx`, `.csv`).
- Validates uploaded file matches template structure.
- Shows success/error state with explicit message.
- Portal will only update data that the user has access for (even if user uploads another user's workbook).

---

## 13. Animation (Framer Motion)

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

## 14. Accessibility (WCAG AA minimum)

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

## 15. Vercel Deployment Requirements

- `next/image` for all raster images (explicit width, height, priority on LCP).
- `next/font` for Inter (zero layout shift).
- No Node.js-only APIs in `'use client'` components.
- `next.config.ts`: configure `images.remotePatterns` if any external images.
- All env vars: `NEXT_PUBLIC_` prefix for client access.
- `tsc --noEmit` + `next lint`: zero errors before considering complete.
- `middleware.ts`: basic route protection (redirect `/dashboard/*` to `/login` if no auth cookie — mock auth acceptable for now).

---

## 16. Implementation Order

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
// DESIGN REF: Wireframe page number(s) and section this implements
```

---

## 17. Mock Data Reference (from wireframe)

All data is currently **mock data** in `lib/constants.ts`. Every point where real API data will eventually replace mock data must be marked with:

```ts
// TODO: replace with API call
```

### Summary Page Table Data (wireframe page 8)

```ts
const MOCK_SUMMARY_TABLE = [
  { state: 'Delhi',           target: 3200, achieved: 2240, completion: 70 },
  { state: 'Uttar Pradesh',   target: 2000, achieved: 500,  completion: 40 },
  { state: 'Haryana',         target: 2500, achieved: 500,  completion: 20 },
  { state: 'Rajasthan',       target: 1500, achieved: 750,  completion: 50 },
]
```

### Detail Page Table Data (wireframe page 10)

Geography rows use cities (not states): **Delhi, Noida, Gurugram, Neemrana**

Both "Pre-BS VI trucks/buses converted" and "Number of events conducted" tables share the same row values in the wireframe:

```ts
const MOCK_DETAIL_TABLE = [
  { geography: 'Delhi',    target: 3200, achieved: 2240, completion: 70 },
  { geography: 'Noida',    target: 2000, achieved: 500,  completion: 40 },
  { geography: 'Gurugram', target: 2500, achieved: 500,  completion: 20 },
  { geography: 'Neemrana', target: 1500, achieved: 750,  completion: 50 },
]
```

### Upload Page Table Data (wireframe page 11)

See Section 5, PAGE 5 for the full row data. Key observations:
- Noida has 4 metrics with data filled in
- Greater Noida has same 4 metrics but with empty current values
- Ghaziabad has partial data (only 2 rows shown in wireframe)

### Key Data Constants

- `INITIATIVES` — 8 items in grid order: Naya Safar Yojana, C&D - ICCC, CEMS/APCD Installation, Road Repair, Green Cess, C&D - SCC, Greening, MRS
- `CITIES` — 9 items: Delhi, Noida, Gurugram, Greater Noida, Ghaziabad, Neemrana, Rohtak, Panipat, Alwar
- `STATES` — 4 items: Delhi, Uttar Pradesh, Haryana, Rajasthan
- `COMPLETION_THRESHOLDS` — threshold config for bar colours
- `MOCK_SUMMARY_DATA` — KPI data for summary page
- `MOCK_DETAIL_DATA` — metrics and geography data for detail page
- `MOCK_UPLOAD_ROWS` — row data for upload page table

---

## 18. Wireframe Annotation Callouts — Complete Reference

All annotations from the wireframe that describe interactive behaviour:

| Wireframe Page | Callout Text | Implementation |
|---------------|-------------|----------------|
| 7 (Summary 1/2) | "Map / table changes with initiative selected" | Clicking an initiative card on the left updates the right panel (map/table) |
| 7 (Summary 1/2) | "View toggle" | MAP / TABLE buttons toggle the right panel display mode |
| 7 (Summary 1/2) | "Links to other dashboards" | PMO Dashboard / AQI Dashboard switchers in TopBar |
| 7 (Summary 1/2) | "Link to detailed view dashboard" | "Detailed view ▼" button (bottom-left) navigates to `/dashboard/detail` |
| 7 (Summary 1/2) | "Link to data entry portal" | "Enter manual data field ▼" button (bottom-right) navigates to `/dashboard/upload` |
| 9 (Detail 1/2) | "Filters" | State / City / RTO / Initiative dropdowns in filter bar |
| 9 (Detail 1/2) | "View toggle" | [State] [City] [RTO] segmented control on map panel |
| 9 (Detail 1/2) | "% completion of filtered geo" | Oval badge on map showing completion % for current filter |
| 9 (Detail 1/2) | Hover: "See on map" | Tooltip shown when hovering city bubbles on the map |
| 10 (Detail 2/2) | "All other metrics (previous page) on right side >>>" | Metrics from the top-half panel continue to the right of the tables |
| 11 (Upload) | "User can alternatively upload excel to update data" | Upload button allows file-based data entry as alternative to manual cell editing |
| 12 (Excel Template) | "Downloaded from the manual data upload screen" | Template file is generated from current table state |
| 12 (Excel Template) | "Only unshaded cells are unlocked (depends on the user)" | Cell editability varies by user role/access level |

---

## 19. Suggested Future Enhancements

These are **not** in scope for the initial build but should be planned for:

- **Real authentication** via NextAuth (replacing mock auth cookie)
- **API integration** — replace all `lib/constants.ts` mock data with backend calls
- **Hindi / regional language support** (i18n) — given the government audience
- **Dark mode** — extend the token system with dark-mode variants
- **Print / export view** — PDF generation of dashboard pages for reports
- **Role-based access control** — different ULB users see different city rows
- **Cross-dashboard integration** — wireframe notes "Integration across dashboards will be needed" (page 2)
