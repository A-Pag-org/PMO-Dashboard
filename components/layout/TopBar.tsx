// FILE: components/layout/TopBar.tsx
// PURPOSE: Persistent top bar with A-PAG brand, page tab navigation, dashboard switchers
// DESIGN REF: Wireframe pages 7–11 — redesigned for clarity + ease of use

import Link from 'next/link';
import { Home, BarChart3, Search, Upload, ArrowRight } from 'lucide-react';
import DashboardSwitcher from './DashboardSwitcher';
import { cn } from '@/lib/utils';

export type ActivePage = 'summary' | 'detail' | 'all-data' | 'upload';

interface TopBarProps {
  activePage: ActivePage;
  pageTitle: string;
  showBackToSummary?: boolean;
  className?: string;
}

const NAV_TABS: { key: Exclude<ActivePage, 'all-data'>; label: string; href: string; icon: typeof BarChart3 }[] = [
  { key: 'summary',  label: 'Summary',         href: '/dashboard/summary', icon: BarChart3 },
  { key: 'detail',   label: 'Detailed Report', href: '/dashboard/detail',  icon: Search },
  { key: 'upload',   label: 'Enter Data',      href: '/dashboard/upload',  icon: Upload },
];

const BREADCRUMB_LABELS: Record<ActivePage, string> = {
  summary: 'Summary',
  detail: 'Detailed Report',
  'all-data': 'Full Data Table',
  upload: 'Data Entry',
};

export default function TopBar({
  activePage,
  pageTitle,
  showBackToSummary = false,
  className,
}: TopBarProps) {
  return (
    <header className={cn('shrink-0', className)}>
      {/* ── Top strip: brand + switchers ── */}
      <div className="flex items-center justify-between bg-[var(--color-ink)] px-5 py-1.5">
        <Link
          href="/home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          aria-label="Back to Dashboard Selection"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--color-accent)]">
            <Home className="h-4 w-4 text-[var(--color-ink)]" />
          </span>
        </Link>
        <DashboardSwitcher />
      </div>

      {/* ── Tab navigation bar ── */}
      <nav className="flex bg-[var(--color-navy)]" aria-label="Dashboard pages">
        {NAV_TABS.map((tab) => {
          const isActive =
            tab.key === activePage ||
            (activePage === 'all-data' && tab.key === 'detail');
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                'flex min-h-[44px] flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset',
                isActive
                  ? 'border-b-[3px] border-[var(--color-accent)] bg-[var(--color-navy-mid)] text-[var(--color-accent)]'
                  : 'border-b-[3px] border-transparent text-white/70 hover:bg-[var(--color-navy-mid)] hover:text-white',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between bg-white px-4 py-2">
        {showBackToSummary ? (
          <Link
            href="/dashboard/summary"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded px-2 text-xs font-medium text-[var(--color-blue-link)] transition-colors hover:bg-[var(--color-blue-pale)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Summary page
          </Link>
        ) : (
          <div className="h-[36px] w-[170px]" aria-hidden />
        )}

        <span className="rounded-full bg-[var(--color-navy)] px-4 py-1 text-xs font-semibold tracking-wide text-[var(--color-text-white)]">
          {pageTitle}
        </span>

        <div className="h-[36px] w-[170px]" aria-hidden />
      </div>

      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 border-b border-[var(--color-border-table)] bg-[var(--color-surface-light)] px-4 py-1.5 text-xs"
      >
        <span className="font-medium text-[var(--color-text-secondary)]">You are here:</span>
        <Link
          href="/home"
          className="text-[var(--color-blue-link)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
        >
          Home
        </Link>
        <span className="text-[var(--color-text-muted)]">/</span>
        <Link
          href="/dashboard/summary"
          className="text-[var(--color-blue-link)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
        >
          Impact Dashboard
        </Link>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span
          className="font-medium text-[var(--color-text-secondary)]"
          aria-current="page"
        >
          {BREADCRUMB_LABELS[activePage]}
        </span>
      </nav>

      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border-table)] bg-white px-4 py-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Quick actions:</span>
        <Link
          href="/dashboard/summary"
          className="inline-flex min-h-[36px] items-center gap-1 rounded-md bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-navy-mid)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Summary
        </Link>
        <Link
          href="/dashboard/detail"
          className="inline-flex min-h-[36px] items-center gap-1 rounded-md bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-navy-mid)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Detailed Report
          <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          href="/dashboard/upload"
          className="inline-flex min-h-[36px] items-center gap-1 rounded-md bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-navy-mid)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Enter Data
        </Link>
      </div>
    </header>
  );
}
