// FILE: app/dashboard/summary/SummaryContent.tsx
// PURPOSE: Interactive content area for summary page — initiative selection, map/table toggle
// DESIGN REF: Wireframe pages 7–8 (left panel cards + right panel map/table)

'use client';

import { useState } from 'react';
import InitiativeCard from '@/components/ui/InitiativeCard';
import ViewToggle from '@/components/ui/ViewToggle';
import DelhiNCRMap from '@/components/maps/DelhiNCRMap';
import DataTable from '@/components/ui/DataTable';
import {
  MOCK_SUMMARY_MAP_DATA,
  MOCK_SUMMARY_CENTER_BUBBLE,
  MOCK_SUMMARY_TABLE,
} from '@/lib/constants';
import type { Initiative } from '@/lib/types';

const VIEW_OPTIONS = ['Map', 'Table'] as const;
type ViewMode = (typeof VIEW_OPTIONS)[number];

interface SummaryContentProps {
  initiatives: Initiative[];
}

export default function SummaryContent({ initiatives }: SummaryContentProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('Map');

  const selected = initiatives[selectedIndex];

  // TODO: replace with API call — map/table data should change per initiative
  const tableRows = MOCK_SUMMARY_TABLE.map((r) => ({
    label: r.state,
    target: r.target,
    achieved: r.achieved,
    completion: r.completion,
  }));

  return (
    <main className="flex flex-1 gap-0">
      {/* ── LEFT PANEL — Initiative Cards (≈40%) ── */}
      <div className="w-[40%] shrink-0 border-r border-[var(--color-divider-dashed)] p-4">
        <div className="grid grid-cols-2 gap-3">
          {initiatives.map((init, i) => (
            <InitiativeCard
              key={init.slug}
              initiative={init}
              selected={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — Map / Table (≈60%) ── */}
      <div className="flex flex-1 flex-col">
        {/* Initiative title banner + view toggle */}
        <div className="flex items-center justify-between bg-[var(--color-navy)] px-5 py-3">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-white)]">
              {selected.name}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--color-blue-light)]">
              {selected.primaryMetric}
            </p>
          </div>
          <ViewToggle
            options={VIEW_OPTIONS}
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        {/* Content area */}
        <div className="flex flex-1 items-center justify-center p-5">
          {viewMode === 'Map' ? (
            <div className="h-full w-full max-h-[420px] max-w-[500px]">
              <DelhiNCRMap
                data={MOCK_SUMMARY_MAP_DATA}
                centerBubble={MOCK_SUMMARY_CENTER_BUBBLE}
              />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                title={selected.primaryMetric}
                geographyLabel="State"
                rows={tableRows}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
