'use client';

import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExpirationOption {
  date: string;
  dte: number;
  type: 'weekly' | 'monthly' | 'quarterly';
}

export interface ExpirationSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  readonly expirations: ExpirationOption[];
  readonly selected: string;
  readonly onSelect: (date: string) => void;
  readonly showGroups?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatExpDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const GROUP_ORDER: ExpirationOption['type'][] = ['weekly', 'monthly', 'quarterly'];

const GROUP_LABELS: Record<ExpirationOption['type'], string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

// ---------------------------------------------------------------------------
// ExpirationPill
// ---------------------------------------------------------------------------

interface ExpirationPillProps {
  readonly exp: ExpirationOption;
  readonly isSelected: boolean;
  readonly onClick: () => void;
}

function ExpirationPill({ exp, isSelected, onClick }: ExpirationPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-0.5 rounded-md px-3 py-1.5 transition-colors shrink-0',
        'border text-xs',
        isSelected
          ? 'border-blue-500/60 bg-blue-900/30 text-blue-300'
          : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200',
      )}
    >
      <span className="font-medium whitespace-nowrap">
        {formatExpDate(exp.date)}
      </span>
      <span className={cn(
        'font-mono tabular-nums text-[10px]',
        isSelected ? 'text-blue-400/70' : 'text-zinc-600',
        exp.dte <= 7 && !isSelected && 'text-amber-600',
      )}>
        {exp.dte}d
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// ExpirationSelector
// ---------------------------------------------------------------------------

export const ExpirationSelector = React.forwardRef<HTMLDivElement, ExpirationSelectorProps>(
  function ExpirationSelector(props, ref) {
    const {
      expirations,
      selected,
      onSelect,
      showGroups = false,
      className,
      ...rest
    } = props;

    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Scroll selected pill into view on mount / change
    React.useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      const selectedEl = container.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, [selected]);

    if (showGroups) {
      const grouped = GROUP_ORDER.map((type) => ({
        type,
        label: GROUP_LABELS[type],
        items: expirations.filter((e) => e.type === type),
      })).filter((g) => g.items.length > 0);

      return (
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', className)}
          {...rest}
        >
          {grouped.map((group) => (
            <div key={group.type} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 px-1">
                {group.label}
              </span>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {group.items.map((exp) => (
                  <div key={exp.date} data-selected={exp.date === selected || undefined}>
                    <ExpirationPill
                      exp={exp}
                      isSelected={exp.date === selected}
                      onClick={() => onSelect(exp.date)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...rest}
      >
        <div
          ref={scrollRef}
          className="flex gap-1.5 overflow-x-auto no-scrollbar"
        >
          {expirations.map((exp) => (
            <div key={exp.date} data-selected={exp.date === selected || undefined}>
              <ExpirationPill
                exp={exp}
                isSelected={exp.date === selected}
                onClick={() => onSelect(exp.date)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);
