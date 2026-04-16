// FILE: components/ui/DashboardCard.tsx
// PURPOSE: Dashboard selector card used on /home — PMO, Impact, AQI
// DESIGN REF: Wireframe page 6 of 13 (Dashboard selection)

'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { DashboardOption } from '@/lib/types';

interface DashboardCardProps {
  dashboard: DashboardOption;
  href?: string;
}

export default function DashboardCard({ dashboard, href }: DashboardCardProps) {
  const router = useRouter();
  const isClickable = dashboard.active && href;

  function handleActivate() {
    if (isClickable) {
      router.push(href);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <div
      role="button"
      tabIndex={isClickable ? 0 : -1}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-disabled={!isClickable}
      className={cn(
        'flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 p-8 text-center transition-all',
        dashboard.active
          ? 'cursor-pointer border-[var(--color-border-blue)] bg-white shadow-lg hover:shadow-xl'
          : 'border-[var(--color-border)] bg-[var(--color-surface-grey)]',
        isClickable &&
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
      )}
    >
      <div
        className={cn(
          'mb-6 flex h-16 w-16 items-center justify-center rounded-full',
          dashboard.active
            ? 'bg-[var(--color-blue-pale)]'
            : 'bg-[var(--color-surface-light)]',
        )}
      >
        <div
          className={cn(
            'h-6 w-6 rounded-sm',
            dashboard.color === 'orange'
              ? 'bg-[var(--color-text-orange)]'
              : 'bg-[var(--color-blue-link)]',
          )}
        />
      </div>

      <h2
        className={cn(
          'text-lg font-bold tracking-wide',
          dashboard.color === 'orange'
            ? 'text-[var(--color-text-orange)]'
            : 'text-[var(--color-blue-link)]',
        )}
      >
        {dashboard.label}
      </h2>

      {dashboard.sublabel && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {dashboard.sublabel}
        </p>
      )}

      {dashboard.active && (
        <span className="mt-4 inline-block rounded-full bg-[var(--color-blue-link)] px-4 py-1 text-xs font-medium text-white">
          Active
        </span>
      )}
    </div>
  );
}
