// FILE: components/ui/InitiativeCard.tsx
// PURPOSE: KPI card for summary page left panel — initiative name, progress, bar, metric label
// DESIGN REF: Wireframe pages 7–8 (8 initiative cards in 2×4 grid)

'use client';

import { Info } from 'lucide-react';
import CompletionBar from './CompletionBar';
import { cn, formatNumber, getCompletionPercentage } from '@/lib/utils';
import type { Initiative } from '@/lib/types';

interface InitiativeCardProps {
  initiative: Initiative;
  selected?: boolean;
  onClick?: () => void;
}

export default function InitiativeCard({
  initiative,
  selected = false,
  onClick,
}: InitiativeCardProps) {
  const primary = initiative.metrics[0];
  const pct = primary
    ? getCompletionPercentage(primary.target, primary.achieved)
    : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex w-full flex-col rounded-lg border p-4 text-left transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
        selected
          ? 'border-[var(--color-border-blue)] bg-white shadow-md'
          : 'border-[var(--color-border)] bg-[var(--color-surface-light)] hover:bg-white hover:shadow-sm',
      )}
    >
      {/* Initiative name */}
      <h3 className="text-sm font-semibold text-[var(--color-blue-link)]">
        {initiative.name}
      </h3>

      {/* Progress fraction + percentage */}
      <p className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
        {primary
          ? `${formatNumber(primary.achieved)}/${formatNumber(primary.target)} (${pct}%)`
          : '—'}
      </p>

      {/* Completion bar */}
      <div className="mt-2">
        <CompletionBar value={pct} size="sm" />
      </div>

      {/* Primary metric sub-label */}
      <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
        {initiative.primaryMetric}
      </p>

      {/* Drill-down icon */}
      <div className="absolute bottom-3 right-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-blue-pale)] text-[var(--color-blue-link)] transition-colors group-hover:bg-[var(--color-blue-link)] group-hover:text-white">
          <Info className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}
