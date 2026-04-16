// FILE: app/dashboard/summary/SummaryContent.tsx
// PURPOSE: Interactive content — fits viewport, initiative selection drives map/table
// DESIGN REF: Wireframe pages 7–8 (left panel cards + right panel map/table)
// Wireframe annotation: "Map / table changes with initiative selected"

'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import InitiativeCard from '@/components/ui/InitiativeCard';
import ViewToggle from '@/components/ui/ViewToggle';
import DelhiNCRMap from '@/components/maps/DelhiNCRMap';
import DataTable from '@/components/ui/DataTable';
import { MOCK_SUMMARY_BY_INITIATIVE } from '@/lib/constants';
import type { Initiative } from '@/lib/types';

const VIEW_OPTIONS = ['Map', 'Table'] as const;
type ViewMode = (typeof VIEW_OPTIONS)[number];

interface SummaryContentProps {
  initiatives: Initiative[];
}

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function SummaryContent({ initiatives }: SummaryContentProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('Map');
  const shouldReduceMotion = useReducedMotion();

  const selected = initiatives[selectedIndex];

  // TODO: replace with API call
  const summaryData = MOCK_SUMMARY_BY_INITIATIVE[selected.slug] ??
    MOCK_SUMMARY_BY_INITIATIVE['naya-safar-yojana'];

  const tableRows = summaryData.table.map((r) => ({
    label: r.state,
    target: r.target,
    achieved: r.achieved,
    completion: r.completion,
  }));

  return (
    <main className="flex min-h-0 flex-1">
      {/* ── LEFT PANEL — Initiative Cards (≈38%) ── */}
      <div className="flex w-[38%] shrink-0 flex-col border-r border-[var(--color-divider-dashed)] p-2">
        <div className="grid h-full grid-cols-2 grid-rows-4 gap-2">
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

      {/* ── RIGHT PANEL — Map / Table (≈62%) ── */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Initiative title banner + view toggle */}
        <div className="flex shrink-0 items-center justify-between bg-[var(--color-navy)] px-4 py-2">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-[var(--color-text-white)]">
              {selected.name}
            </h2>
            <p className="mt-0.5 truncate text-xs text-[var(--color-blue-light)]">
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
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected.slug}-${viewMode}`}
              variants={shouldReduceMotion ? undefined : fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full w-full"
            >
              {viewMode === 'Map' ? (
                <div className="mx-auto h-full max-w-[480px]">
                  <DelhiNCRMap
                    data={summaryData.map}
                    centerBubble={summaryData.center}
                  />
                </div>
              ) : (
                <DataTable
                  title={selected.primaryMetric}
                  geographyLabel="State"
                  rows={tableRows}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
