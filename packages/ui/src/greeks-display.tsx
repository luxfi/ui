'use client';

import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GreeksDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly delta: number;
  readonly gamma: number;
  readonly theta: number;
  readonly vega: number;
  readonly rho?: number;
  readonly iv?: number;
  readonly compact?: boolean;
}

// ---------------------------------------------------------------------------
// Greek definitions
// ---------------------------------------------------------------------------

interface GreekDef {
  key: string;
  label: string;
  symbol: string;
  color: string;
  barColor: string;
  decimals: number;
  maxMagnitude: number;
}

const GREEKS: GreekDef[] = [
  { key: 'delta', label: 'Delta', symbol: '\u0394', color: 'text-blue-400', barColor: 'bg-blue-500', decimals: 4, maxMagnitude: 1 },
  { key: 'gamma', label: 'Gamma', symbol: '\u0393', color: 'text-purple-400', barColor: 'bg-purple-500', decimals: 4, maxMagnitude: 0.1 },
  { key: 'theta', label: 'Theta', symbol: '\u0398', color: 'text-red-400', barColor: 'bg-red-500', decimals: 4, maxMagnitude: 1 },
  { key: 'vega', label: 'Vega', symbol: '\u03BD', color: 'text-emerald-400', barColor: 'bg-emerald-500', decimals: 4, maxMagnitude: 1 },
  { key: 'rho', label: 'Rho', symbol: '\u03C1', color: 'text-orange-400', barColor: 'bg-orange-500', decimals: 4, maxMagnitude: 1 },
  { key: 'iv', label: 'IV', symbol: '\u03C3', color: 'text-amber-400', barColor: 'bg-amber-500', decimals: 1, maxMagnitude: 100 },
];

// ---------------------------------------------------------------------------
// GreekItem
// ---------------------------------------------------------------------------

interface GreekItemProps {
  readonly def: GreekDef;
  readonly value: number;
  readonly compact?: boolean;
}

function GreekItem({ def, value, compact }: GreekItemProps) {
  const magnitude = Math.min(Math.abs(value) / def.maxMagnitude, 1);
  const displayValue = def.key === 'iv'
    ? `${(value * 100).toFixed(def.decimals)}%`
    : value.toFixed(def.decimals);

  return (
    <div
      className={cn(
        'flex items-center gap-1.5',
        compact ? 'min-w-0' : 'min-w-[100px]',
      )}
    >
      <span className={cn('text-[10px] font-semibold shrink-0', def.color)}>
        {def.symbol}
      </span>
      {!compact && (
        <span className="text-[10px] text-zinc-500 shrink-0 w-[34px]">
          {def.label}
        </span>
      )}
      <span className={cn(
        'font-mono tabular-nums text-xs text-zinc-200 shrink-0',
        value < 0 && 'text-red-400',
      )}>
        {displayValue}
      </span>
      {!compact && (
        <div className="flex-1 h-1 rounded-full bg-zinc-800 min-w-[24px] max-w-[48px] overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', def.barColor)}
            style={{ width: `${magnitude * 100}%`, opacity: 0.7 }}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GreeksDisplay
// ---------------------------------------------------------------------------

export const GreeksDisplay = React.forwardRef<HTMLDivElement, GreeksDisplayProps>(
  function GreeksDisplay(props, ref) {
    const {
      delta,
      gamma,
      theta,
      vega,
      rho,
      iv,
      compact = false,
      className,
      ...rest
    } = props;

    const values: Record<string, number | undefined> = {
      delta, gamma, theta, vega, rho, iv,
    };

    const activeGreeks = GREEKS.filter((g) => values[g.key] !== undefined);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center',
          compact ? 'gap-3' : 'gap-4',
          className,
        )}
        {...rest}
      >
        {activeGreeks.map((g) => (
          <GreekItem
            key={g.key}
            def={g}
            value={values[g.key] as number}
            compact={compact}
          />
        ))}
      </div>
    );
  },
);
