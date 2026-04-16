// FILE: lib/constants.ts
// PURPOSE: All static data, mock data arrays, and threshold configuration
// DESIGN REF: Wireframe pages 7–12 (all data values)

import type {
  Initiative,
  CompletionThreshold,
  SummaryTableRow,
  DetailTableRow,
  UploadRow,
  DashboardOption,
  MapDataPoint,
  MapCenterBubble,
} from './types';

// ─── 8 Initiatives (grid order from wireframe pages 7–8) ───────────────

export const INITIATIVES: Initiative[] = [
  {
    name: 'Naya Safar Yojana',
    slug: 'naya-safar-yojana',
    primaryMetric: 'Pre-BSIV buses/trucks converted',
    metrics: [
      { name: 'Pre-BS VI trucks / buses converted', type: 'outcome', target: 76496, achieved: 15300, unit: 'vehicles' },
      { name: 'No. of Events Conducted', type: 'outcome', target: 300, achieved: 120 },
      { name: 'No. of Events Planned', type: 'progress', target: 300, achieved: 180 },
      { name: 'No. of Outlets Activated', type: 'progress', target: 1500, achieved: 950 },
      { name: 'EOIs and Scrapping Requests', type: 'progress', target: 200000, achieved: 50000 },
      { name: 'PSBs / NBFCs Onboarded', type: 'progress', target: 7, achieved: 5 },
    ],
  },
  {
    name: 'C&D - ICCC',
    slug: 'cd-iccc',
    primaryMetric: '# sites integrated in ICCC',
    metrics: [
      { name: '# sites integrated in ICCC', type: 'outcome', target: 100, achieved: 45 },
    ],
  },
  {
    name: 'CEMS/APCD Installation',
    slug: 'cems-apcd',
    primaryMetric: '# industries with CEMS / APCDs installed',
    metrics: [
      { name: '# industries with CEMS / APCDs installed', type: 'outcome', target: 500, achieved: 210 },
    ],
  },
  {
    name: 'Road Repair',
    slug: 'road-repair',
    primaryMetric: 'Km road-length repaired',
    metrics: [
      { name: 'Km road-length repaired', type: 'outcome', target: 1200, achieved: 780 },
    ],
  },
  {
    name: 'Green Cess',
    slug: 'green-cess',
    primaryMetric: '# tolls with cess collection initiated',
    metrics: [
      { name: '# tolls with cess collection initiated', type: 'outcome', target: 50, achieved: 32 },
    ],
  },
  {
    name: 'C&D - SCC',
    slug: 'cd-scc',
    primaryMetric: '# SCC setup achieved',
    metrics: [
      { name: 'No. of SCC setup achieved', type: 'outcome', target: 500, achieved: 200 },
      { name: 'Total quantum of malba received at SCC', type: 'outcome', target: 400, achieved: 50, unit: 'MMT' },
      { name: 'No. of SCC identified (land parcels earmarked)', type: 'progress', target: null, achieved: 30 },
      { name: 'No. of SCC required', type: 'readiness', target: null, achieved: 500 },
    ],
  },
  {
    name: 'Greening',
    slug: 'greening',
    primaryMetric: 'Phase 1 implementation of greening action plan initiated',
    metrics: [
      { name: 'Phase 1 implementation of greening action plan initiated', type: 'outcome', target: 100, achieved: 60 },
    ],
  },
  {
    name: 'MRS',
    slug: 'mrs',
    primaryMetric: 'Route coverage achieved',
    metrics: [
      { name: 'Route coverage achieved', type: 'outcome', target: 200, achieved: 140 },
    ],
  },
];

// ─── 9 Cities ───────────────────────────────────────────────────────────

export const CITIES = [
  'Delhi',
  'Noida',
  'Gurugram',
  'Greater Noida',
  'Ghaziabad',
  'Neemrana',
  'Rohtak',
  'Panipat',
  'Alwar',
] as const;

export type CityName = (typeof CITIES)[number];

// ─── 4 States ───────────────────────────────────────────────────────────

export const STATES = [
  'Delhi',
  'Uttar Pradesh',
  'Haryana',
  'Rajasthan',
] as const;

export type StateName = (typeof STATES)[number];

// ─── Completion Bar Thresholds ──────────────────────────────────────────

export const COMPLETION_THRESHOLDS: CompletionThreshold[] = [
  { min: 70, max: 100, filledColor: 'var(--color-bar-high)',    remainderColor: 'var(--color-bar-high-rem)' },
  { min: 40, max: 69,  filledColor: 'var(--color-bar-mid)',     remainderColor: 'var(--color-bar-mid-rem)' },
  { min: 20, max: 39,  filledColor: 'var(--color-bar-low)',     remainderColor: 'var(--color-bar-low-rem)' },
  { min: 0,  max: 19,  filledColor: 'var(--color-bar-low)',     remainderColor: 'var(--color-bar-low-rem)' },
];

// ─── Dashboard Selection Options (wireframe page 6) ────────────────────

export const DASHBOARD_OPTIONS: DashboardOption[] = [
  { name: 'PMO Dashboard', slug: 'pmo', label: 'PMO DASHBOARD', active: false, color: 'blue' },
  { name: 'Impact Dashboard', slug: 'impact', label: 'IMPACT DASHBOARD', active: true, color: 'blue' },
  { name: 'AQI Dashboard', slug: 'aqi', label: 'AQI DASHBOARD', sublabel: '(Phase 3 - TBD)', active: false, color: 'orange' },
];

// ─── Mock Data: Summary Page Table (wireframe page 8) ──────────────────
// TODO: replace with API call

export const MOCK_SUMMARY_TABLE: SummaryTableRow[] = [
  { state: 'Delhi',         target: 3200, achieved: 2240, completion: 70 },
  { state: 'Uttar Pradesh', target: 2000, achieved: 500,  completion: 40 },
  { state: 'Haryana',       target: 2500, achieved: 500,  completion: 20 },
  { state: 'Rajasthan',     target: 1500, achieved: 750,  completion: 50 },
];

// ─── Mock Data: Summary Map — State Level (wireframe page 7) ───────────
// TODO: replace with API call

export const MOCK_SUMMARY_MAP_DATA: MapDataPoint[] = [
  { name: 'Haryana',        value: 7280, onTrack: true, label: '7,280 Trucks / 1,820 Buses' },
  { name: 'Uttar Pradesh',  value: 4640, onTrack: true, label: '4,640 Trucks / 1,160 Buses' },
  { name: 'Delhi',          value: 1760, onTrack: true, label: '1,760 / 440 Buses' },
  { name: 'Rajasthan',      value: 1920, onTrack: true, label: '1,920 Trucks / 480 Buses' },
];

export const MOCK_SUMMARY_CENTER_BUBBLE: MapCenterBubble = {
  value: 15300,
  label: 'Pre-BS VI Trucks/Buses Converted',
  subtitle: '76,496 / 1,91,239 trucks',
};

// ─── Mock Data: Detail Page Map — City Level (wireframe page 9) ────────
// TODO: replace with API call

export const MOCK_DETAIL_MAP_DATA: MapDataPoint[] = [
  { name: 'Panipat',       value: 2800, onTrack: true },
  { name: 'Rohtak',        value: 2800, onTrack: true },
  { name: 'Delhi',         value: 2200, onTrack: true },
  { name: 'Gurugram',      value: 3500, onTrack: true },
  { name: 'Alwar',         value: 1200, onTrack: true },
  { name: 'Meerut',        value: 1100, onTrack: true },
  { name: 'Noida',         value: 800,  onTrack: false },
  { name: 'Greater Noida', value: 700,  onTrack: false },
];

export const MOCK_DETAIL_CENTER_BUBBLE: MapCenterBubble = {
  value: 15300,
  label: 'Pre-BS VI Trucks/Buses Converted',
  subtitle: '76,496 / 1,91,239 trucks',
};

// ─── Mock Data: Detail Page Tables (wireframe page 10) ─────────────────
// TODO: replace with API call

export const MOCK_DETAIL_TABLE: DetailTableRow[] = [
  { geography: 'Delhi',    target: 3200, achieved: 2240, completion: 70 },
  { geography: 'Noida',    target: 2000, achieved: 500,  completion: 40 },
  { geography: 'Gurugram', target: 2500, achieved: 500,  completion: 20 },
  { geography: 'Neemrana', target: 1500, achieved: 750,  completion: 50 },
];

// ─── Mock Data: Upload Page Rows (wireframe page 11) ───────────────────
// TODO: replace with API call

export const MOCK_UPLOAD_ROWS: UploadRow[] = [
  {
    geography: 'Noida', metric: 'No. of SCC setup achieved', metricType: 'outcome',
    targetVal: 500, currentVal: 200, unit: '-', newVal: '', lastUpdated: '2026-04-10T14:30:00',
    lastUpdatedBy: 'admin@noida.gov.in', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Noida', metric: 'Total quantum of malba received at SCC', metricType: 'outcome',
    targetVal: 400, currentVal: 50, unit: 'MMT', newVal: '', lastUpdated: '2026-04-10T14:30:00',
    lastUpdatedBy: 'admin@noida.gov.in', startDate: '2026-01-01', endDate: '2026-12-31', remarks: '',
  },
  {
    geography: 'Noida', metric: 'No. of SCC identified (land parcels earmarked)', metricType: 'progress',
    targetVal: null, currentVal: 30, unit: '-', newVal: '', lastUpdated: '2026-04-10T14:30:00',
    lastUpdatedBy: 'admin@noida.gov.in', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Noida', metric: 'No. of SCC required', metricType: 'readiness',
    targetVal: null, currentVal: 500, unit: '-', newVal: '', lastUpdated: '2026-04-10T14:30:00',
    lastUpdatedBy: 'admin@noida.gov.in', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Greater Noida', metric: 'No. of SCC setup achieved', metricType: 'outcome',
    targetVal: null, currentVal: null, unit: '-', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Greater Noida', metric: 'Total quantum of malba received at SCC', metricType: 'outcome',
    targetVal: null, currentVal: null, unit: 'MMT', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Greater Noida', metric: 'No. of SCC identified (land parcels earmarked)', metricType: 'progress',
    targetVal: null, currentVal: null, unit: '-', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Greater Noida', metric: 'No. of SCC required', metricType: 'readiness',
    targetVal: null, currentVal: null, unit: '-', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Ghaziabad', metric: 'No. of SCC setup achieved', metricType: 'outcome',
    targetVal: null, currentVal: null, unit: '-', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
  {
    geography: 'Ghaziabad', metric: 'Total quantum of malba received at SCC', metricType: 'outcome',
    targetVal: null, currentVal: null, unit: 'MMT', newVal: '', lastUpdated: '',
    lastUpdatedBy: '', startDate: '', endDate: '', remarks: '',
  },
];

// ─── Filter Options for Upload Page (wireframe page 11) ────────────────

export const UPLOAD_INITIATIVE_OPTIONS = [
  'CEMS and APCD Installation',
  'Construction dust and waste - ICCC',
  'Road repair and remediation',
  'MRS',
  'Construction dust and waste - SCC setup and operations',
  'Greening',
] as const;

export const UPLOAD_STATE_OPTIONS = ['Delhi', 'Uttar Pradesh', 'Haryana', 'Rajasthan'] as const;

export const UPLOAD_CITY_OPTIONS_BY_STATE: Record<string, string[]> = {
  'Delhi': ['Delhi'],
  'Uttar Pradesh': ['Noida', 'Greater Noida', 'Ghaziabad'],
  'Haryana': ['Gurugram', 'Rohtak', 'Panipat'],
  'Rajasthan': ['Neemrana', 'Alwar'],
};
