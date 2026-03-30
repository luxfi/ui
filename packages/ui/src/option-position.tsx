'use client';

import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OptionPosition {
  symbol: string;
  underlying: string;
  type: 'call' | 'put';
  strike: number;
  expiration: string;
  quantity: number;
  avgCost: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
}

export interface OptionPositionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly position: OptionPosition;
  readonly onClose?: (position: OptionPosition) => void;
  readonly onExercise?: (position: OptionPosition) => void;
  readonly onRoll?: (position: OptionPosition) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ---------------------------------------------------------------------------
// OptionPositionCard
// ---------------------------------------------------------------------------

export const OptionPositionCard = React.forwardRef<HTMLDivElement, OptionPositionCardProps>(
  function OptionPositionCard(props, ref) {
    const {
      position,
      onClose,
      onExercise,
      onRoll,
      className,
      ...rest
    } = props;

    const isLong = position.quantity > 0;
    const isCall = position.type === 'call';
    const isProfitable = position.pnl >= 0;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3',
          className,
        )}
        {...rest}
      >
        {/* Header row: symbol badge + quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Symbol badge */}
            <span className={cn(
              'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold',
              isCall ? 'bg-blue-900/40 text-blue-400' : 'bg-orange-900/40 text-orange-400',
            )}>
              {position.underlying}
              <span className="font-mono tabular-nums">{position.strike}</span>
              <span className="uppercase">{position.type === 'call' ? 'C' : 'P'}</span>
              <span className="text-zinc-500 font-normal">{formatDate(position.expiration)}</span>
            </span>
          </div>

          {/* Quantity */}
          <span className={cn(
            'text-xs font-semibold font-mono tabular-nums',
            isLong ? 'text-emerald-400' : 'text-red-400',
          )}>
            {isLong ? '+' : ''}{position.quantity}
          </span>
        </div>

        {/* Values row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">Avg Cost</span>
            <span className="font-mono tabular-nums text-xs text-zinc-300">
              ${position.avgCost.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">Value</span>
            <span className="font-mono tabular-nums text-xs text-zinc-300">
              ${position.currentValue.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">P/L</span>
            <div className="flex items-center gap-1">
              <span className={cn(
                'font-mono tabular-nums text-xs font-semibold',
                isProfitable ? 'text-emerald-400' : 'text-red-400',
              )}>
                {isProfitable ? '+' : ''}{position.pnl.toFixed(2)}
              </span>
              <span className={cn(
                'font-mono tabular-nums text-[10px]',
                isProfitable ? 'text-emerald-500/70' : 'text-red-500/70',
              )}>
                ({isProfitable ? '+' : ''}{position.pnlPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Greeks row */}
        <div className="flex items-center gap-3 border-t border-zinc-800/60 pt-2">
          <GreekPill label={'\u0394'} value={position.greeks.delta} color="text-blue-400" />
          <GreekPill label={'\u0393'} value={position.greeks.gamma} color="text-purple-400" />
          <GreekPill label={'\u0398'} value={position.greeks.theta} color="text-red-400" />
          <GreekPill label={'\u03BD'} value={position.greeks.vega} color="text-emerald-400" />
        </div>

        {/* Action buttons */}
        {(onClose || onExercise || onRoll) && (
          <div className="flex items-center gap-2 border-t border-zinc-800/60 pt-2">
            {onClose && (
              <button
                type="button"
                onClick={() => onClose(position)}
                className="flex-1 rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
              >
                Close
              </button>
            )}
            {onExercise && (
              <button
                type="button"
                onClick={() => onExercise(position)}
                className="flex-1 rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
              >
                Exercise
              </button>
            )}
            {onRoll && (
              <button
                type="button"
                onClick={() => onRoll(position)}
                className="flex-1 rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
              >
                Roll
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

// ---------------------------------------------------------------------------
// GreekPill (internal)
// ---------------------------------------------------------------------------

interface GreekPillProps {
  readonly label: string;
  readonly value: number;
  readonly color: string;
}

function GreekPill({ label, value, color }: GreekPillProps) {
  return (
    <div className="flex items-center gap-1">
      <span className={cn('text-[10px] font-semibold', color)}>
        {label}
      </span>
      <span className={cn(
        'font-mono tabular-nums text-[11px]',
        value < 0 ? 'text-red-400' : 'text-zinc-400',
      )}>
        {value.toFixed(4)}
      </span>
    </div>
  );
}
