// FILE: components/layout/DashboardSwitcher.tsx
// PURPOSE: PMO / AQI dashboard switcher dropdowns in the top bar
// DESIGN REF: Wireframe pages 7–11 (right side of top bar on every dashboard page)

import { LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSwitcherProps {
  className?: string;
}

const dashboards = [
  { label: 'PMO Dashboard', href: '#' },
  { label: 'AQI Dashboard', href: '#' },
];

export default function DashboardSwitcher({ className }: DashboardSwitcherProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {dashboards.map((d) => (
        <a
          key={d.label}
          href={d.href}
          className={cn(
            'flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'bg-[var(--color-navy-mid)] text-[var(--color-text-white)]',
            'hover:bg-[var(--color-navy)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>{d.label}</span>
        </a>
      ))}
    </div>
  );
}
