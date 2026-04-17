// FILE: components/layout/TopBar.tsx
// PURPOSE: Persistent top bar with A-PAG brand, page tab navigation, dashboard switchers
// DESIGN REF: Wireframe pages 7–11 — redesigned for clarity + ease of use

import Link from 'next/link';
import { Home, BarChart3, Search, Upload, Table } from 'lucide-react';
import DashboardSwitcher from './DashboardSwitcher';
import { cn } from '@/lib/utils';

export type ActivePage = 'summary' | 'detail' | 'all-data' | 'upload';

interface TopBarProps {
  activePage: ActivePage;
  className?: string;
}

const NAV_TABS: { key: ActivePage; label: string; href: string; icon: typeof BarChart3 }[] = [
  { key: 'summary',  label: 'Summary',       href: '/dashboard/summary', icon: BarChart3 },
  { key: 'detail',   label: 'Detailed View',  href: '/dashboard/detail',  icon: Search },
  { key: 'all-data', label: 'All Data',      href: '/dashboard/all-data', icon: Table },
  { key: 'upload',   label: 'Data Upload',    href: '/dashboard/upload',  icon: Upload },
];

export default function TopBar({ activePage, className }: TopBarProps) {
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
          const isActive = tab.key === activePage;
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
    </header>
  );
}
