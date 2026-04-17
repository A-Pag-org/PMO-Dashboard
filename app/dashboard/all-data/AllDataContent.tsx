'use client';

// FILE: app/dashboard/all-data/AllDataContent.tsx
// PURPOSE: All-data view with initiative, sort/filter controls, and full table visibility
// DESIGN REF: Wireframe page 10 of 13 (All Data View)

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import FilterPill from '@/components/ui/FilterPill';
import DataTable from '@/components/ui/DataTable';
import {
  INITIATIVES,
  MOCK_DETAIL_TABLE_ALL,
  CITY_STATE_MAP,
  UPLOAD_CITY_OPTIONS_BY_STATE,
  STATES,
  MOCK_SUMMARY_BY_INITIATIVE,
} from '@/lib/constants';

type SortBy = 'completion-desc' | 'completion-asc' | 'achieved-desc' | 'achieved-asc';

const SORT_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Completion (high to low)', value: 'completion-desc' },
  { label: 'Completion (low to high)', value: 'completion-asc' },
  { label: 'Achieved (high to low)', value: 'achieved-desc' },
  { label: 'Achieved (low to high)', value: 'achieved-asc' },
];

export default function AllDataContent() {
  const [initiative, setInitiative] = useState(INITIATIVES[0].name);
  const [stateFilter, setStateFilter] = useState('All');
  const [sortBy, setSortBy] = useState<SortBy>('completion-desc');
  const selectedInitiative = INITIATIVES.find((i) => i.name === initiative) ?? INITIATIVES[0];

  const tableRows = useMemo(() => {
    const summaryRows = MOCK_SUMMARY_BY_INITIATIVE[selectedInitiative.slug]?.table ?? [];
    const baseRows = summaryRows.length > 0
      ? summaryRows.map((row) => ({
          geography: row.state,
          target: row.target,
          achieved: row.achieved,
          completion: row.completion,
        }))
      : MOCK_DETAIL_TABLE_ALL;

    const rows = baseRows.filter((row) => {
      if (stateFilter === 'All') return true;
      return CITY_STATE_MAP[row.geography] === stateFilter || row.geography === stateFilter;
    });

    const sorted = [...rows].sort((a, b) => {
      switch (sortBy) {
        case 'completion-asc':
          return a.completion - b.completion;
        case 'completion-desc':
          return b.completion - a.completion;
        case 'achieved-asc':
          return a.achieved - b.achieved;
        case 'achieved-desc':
          return b.achieved - a.achieved;
      }
    });

    return sorted.map((r) => ({
      label: r.geography,
      target: r.target,
      achieved: r.achieved,
      completion: r.completion,
    }));
  }, [selectedInitiative.slug, stateFilter, sortBy]);

  const sortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label ?? SORT_OPTIONS[0].label;
  const stateOptions = ['All', ...STATES];
  const cityCount = stateFilter === 'All'
    ? Object.values(UPLOAD_CITY_OPTIONS_BY_STATE).flat().length
    : (UPLOAD_CITY_OPTIONS_BY_STATE[stateFilter] ?? []).length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-table)] bg-[var(--color-navy-mid)] px-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            label="Initiative"
            options={INITIATIVES.map((i) => i.name)}
            value={initiative}
            onChange={setInitiative}
          />
          <FilterPill
            label="State"
            options={stateOptions}
            value={stateFilter}
            onChange={setStateFilter}
          />
          <FilterPill
            label="Sort"
            options={SORT_OPTIONS.map((o) => o.label)}
            value={sortLabel}
            onChange={(label) => {
              const selected = SORT_OPTIONS.find((o) => o.label === label);
              if (selected) setSortBy(selected.value);
            }}
          />
        </div>

        <Link
          href="/dashboard/detail"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--color-blue-header)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to map
        </Link>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        <div className="flex items-center justify-between rounded-md border border-[var(--color-border-table)] bg-[var(--color-surface-light)] px-3 py-2">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Showing all rows for <span className="font-semibold text-[var(--color-text-primary)]">{initiative}</span>
            {' '}across {cityCount} city records{stateFilter === 'All' ? '' : ` in ${stateFilter}`}.
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Sorted by {sortLabel}
          </span>
        </div>

        <DataTable
          title={`${initiative} — All Data View`}
          geographyLabel="Geography"
          rows={tableRows}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DataTable
            title="Additional Metric Table A"
            geographyLabel="Geography"
            rows={tableRows}
          />
          <DataTable
            title="Additional Metric Table B"
            geographyLabel="Geography"
            rows={tableRows}
          />
        </div>
      </div>
    </div>
  );
}
