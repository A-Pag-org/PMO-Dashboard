// FILE: components/ui/FilterPill.tsx
// PURPOSE: Dark navy dropdown filter pill used in filter bars
// DESIGN REF: Wireframe page 9 (State/City/RTO/Initiative filters), page 11 (upload filters)

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPillProps {
  label: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterPill({
  label,
  options,
  value,
  onChange,
  className,
}: FilterPillProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex min-h-[44px] items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
          'bg-[var(--color-navy)] text-[var(--color-text-white)]',
          'hover:bg-[var(--color-navy-mid)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{value || label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-md border border-[var(--color-border-table)] bg-white shadow-lg"
        >
          {(options as string[]).map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full min-h-[44px] items-center px-4 py-2 text-left text-sm transition-colors',
                  option === value
                    ? 'bg-[var(--color-blue-pale)] font-semibold text-[var(--color-blue-link)]'
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-light)]',
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
