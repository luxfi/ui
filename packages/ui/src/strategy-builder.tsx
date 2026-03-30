'use client';

import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StrategyLeg {
  action: 'buy' | 'sell';
  type: 'call' | 'put';
  strike: number;
  expiration: string;
  quantity: number;
  premium?: number;
}

export type StrategyType =
  | 'bull_call_spread'
  | 'bear_put_spread'
  | 'iron_condor'
  | 'butterfly'
  | 'straddle'
  | 'strangle'
  | 'collar'
  | 'custom';

export interface StrategySubmission {
  type: string;
  legs: StrategyLeg[];
  netPremium: number;
}

export interface StrategyBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  readonly underlying: string;
  readonly expirations: string[];
  readonly strikes: number[];
  readonly spotPrice: number;
  readonly onSubmit?: (strategy: StrategySubmission) => void;
}

// ---------------------------------------------------------------------------
// Strategy presets
// ---------------------------------------------------------------------------

interface StrategyPreset {
  label: string;
  value: StrategyType;
  description: string;
  buildLegs: (strikes: number[], spotPrice: number, expiration: string) => StrategyLeg[];
}

function findATM(strikes: number[], spot: number): number {
  if (strikes.length === 0) return spot;
  return strikes.reduce((prev, curr) =>
    Math.abs(curr - spot) < Math.abs(prev - spot) ? curr : prev,
  );
}

function findOTM(strikes: number[], spot: number, type: 'call' | 'put', offset: number): number {
  const sorted = [...strikes].sort((a, b) => a - b);
  const atm = findATM(strikes, spot);
  const atIdx = sorted.indexOf(atm);
  if (type === 'call') {
    return sorted[Math.min(atIdx + offset, sorted.length - 1)] ?? atm;
  }
  return sorted[Math.max(atIdx - offset, 0)] ?? atm;
}

const STRATEGY_PRESETS: StrategyPreset[] = [
  {
    label: 'Bull Call Spread',
    value: 'bull_call_spread',
    description: 'Buy lower strike call, sell higher strike call',
    buildLegs: (strikes, spot, exp) => {
      const lower = findATM(strikes, spot);
      const upper = findOTM(strikes, spot, 'call', 2);
      return [
        { action: 'buy', type: 'call', strike: lower, expiration: exp, quantity: 1 },
        { action: 'sell', type: 'call', strike: upper, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Bear Put Spread',
    value: 'bear_put_spread',
    description: 'Buy higher strike put, sell lower strike put',
    buildLegs: (strikes, spot, exp) => {
      const upper = findATM(strikes, spot);
      const lower = findOTM(strikes, spot, 'put', 2);
      return [
        { action: 'buy', type: 'put', strike: upper, expiration: exp, quantity: 1 },
        { action: 'sell', type: 'put', strike: lower, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Iron Condor',
    value: 'iron_condor',
    description: 'Sell OTM put + call, buy further OTM put + call',
    buildLegs: (strikes, spot, exp) => {
      const sellPut = findOTM(strikes, spot, 'put', 1);
      const buyPut = findOTM(strikes, spot, 'put', 3);
      const sellCall = findOTM(strikes, spot, 'call', 1);
      const buyCall = findOTM(strikes, spot, 'call', 3);
      return [
        { action: 'buy', type: 'put', strike: buyPut, expiration: exp, quantity: 1 },
        { action: 'sell', type: 'put', strike: sellPut, expiration: exp, quantity: 1 },
        { action: 'sell', type: 'call', strike: sellCall, expiration: exp, quantity: 1 },
        { action: 'buy', type: 'call', strike: buyCall, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Butterfly',
    value: 'butterfly',
    description: 'Buy 1 low, sell 2 middle, buy 1 high',
    buildLegs: (strikes, spot, exp) => {
      const mid = findATM(strikes, spot);
      const low = findOTM(strikes, spot, 'put', 2);
      const high = findOTM(strikes, spot, 'call', 2);
      return [
        { action: 'buy', type: 'call', strike: low, expiration: exp, quantity: 1 },
        { action: 'sell', type: 'call', strike: mid, expiration: exp, quantity: 2 },
        { action: 'buy', type: 'call', strike: high, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Straddle',
    value: 'straddle',
    description: 'Buy call + put at same strike',
    buildLegs: (strikes, spot, exp) => {
      const atm = findATM(strikes, spot);
      return [
        { action: 'buy', type: 'call', strike: atm, expiration: exp, quantity: 1 },
        { action: 'buy', type: 'put', strike: atm, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Strangle',
    value: 'strangle',
    description: 'Buy OTM call + OTM put',
    buildLegs: (strikes, spot, exp) => {
      const otmCall = findOTM(strikes, spot, 'call', 2);
      const otmPut = findOTM(strikes, spot, 'put', 2);
      return [
        { action: 'buy', type: 'put', strike: otmPut, expiration: exp, quantity: 1 },
        { action: 'buy', type: 'call', strike: otmCall, expiration: exp, quantity: 1 },
      ];
    },
  },
  {
    label: 'Custom',
    value: 'custom',
    description: 'Build your own multi-leg strategy',
    buildLegs: (_strikes, spot, exp) => [
      { action: 'buy', type: 'call', strike: spot, expiration: exp, quantity: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// LegRow
// ---------------------------------------------------------------------------

interface LegRowProps {
  readonly leg: StrategyLeg;
  readonly index: number;
  readonly strikes: number[];
  readonly expirations: string[];
  readonly removable: boolean;
  readonly onChange: (index: number, leg: StrategyLeg) => void;
  readonly onRemove: (index: number) => void;
}

function LegRow({ leg, index, strikes, expirations, removable, onChange, onRemove }: LegRowProps) {
  const update = (patch: Partial<StrategyLeg>) => {
    onChange(index, { ...leg, ...patch });
  };

  return (
    <div className="flex items-center gap-2 rounded-md bg-zinc-800/50 px-2 py-1.5">
      <span className="text-[10px] font-mono text-zinc-500 w-4 shrink-0">
        {index + 1}
      </span>

      {/* Action */}
      <button
        type="button"
        className={cn(
          'px-2 py-0.5 rounded text-xs font-semibold transition-colors',
          leg.action === 'buy'
            ? 'bg-emerald-900/60 text-emerald-400'
            : 'bg-red-900/60 text-red-400',
        )}
        onClick={() => update({ action: leg.action === 'buy' ? 'sell' : 'buy' })}
      >
        {leg.action === 'buy' ? 'BUY' : 'SELL'}
      </button>

      {/* Type */}
      <button
        type="button"
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium transition-colors',
          leg.type === 'call'
            ? 'bg-blue-900/40 text-blue-400'
            : 'bg-orange-900/40 text-orange-400',
        )}
        onClick={() => update({ type: leg.type === 'call' ? 'put' : 'call' })}
      >
        {leg.type === 'call' ? 'CALL' : 'PUT'}
      </button>

      {/* Strike */}
      <select
        value={leg.strike}
        onChange={(e) => update({ strike: Number(e.target.value) })}
        className="bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono text-zinc-200 outline-none focus:border-zinc-500 min-w-[72px]"
      >
        {strikes.map((s) => (
          <option key={s} value={s}>
            {s.toFixed(2)}
          </option>
        ))}
      </select>

      {/* Expiration */}
      <select
        value={leg.expiration}
        onChange={(e) => update({ expiration: e.target.value })}
        className="bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-xs text-zinc-200 outline-none focus:border-zinc-500 min-w-[80px]"
      >
        {expirations.map((exp) => (
          <option key={exp} value={exp}>
            {exp}
          </option>
        ))}
      </select>

      {/* Quantity */}
      <input
        type="number"
        min={1}
        max={999}
        value={leg.quantity}
        onChange={(e) => update({ quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
        className="bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono text-zinc-200 outline-none focus:border-zinc-500 w-[48px] text-center"
      />

      {/* Premium (read-only if provided) */}
      {leg.premium !== undefined && (
        <span className={cn(
          'font-mono tabular-nums text-xs ml-auto',
          leg.premium >= 0 ? 'text-emerald-400' : 'text-red-400',
        )}>
          {leg.premium >= 0 ? '+' : ''}{leg.premium.toFixed(2)}
        </span>
      )}

      {/* Remove */}
      {removable && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="ml-auto p-0.5 text-zinc-500 hover:text-red-400 transition-colors"
          aria-label="Remove leg"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StrategyBuilder
// ---------------------------------------------------------------------------

export const StrategyBuilder = React.forwardRef<HTMLDivElement, StrategyBuilderProps>(
  function StrategyBuilder(props, ref) {
    const {
      underlying,
      expirations,
      strikes,
      spotPrice,
      onSubmit,
      className,
      ...rest
    } = props;

    const defaultExp = expirations[0] ?? '';
    const [strategyType, setStrategyType] = React.useState<StrategyType>('bull_call_spread');
    const [legs, setLegs] = React.useState<StrategyLeg[]>(() => {
      const preset = STRATEGY_PRESETS.find((p) => p.value === 'bull_call_spread');
      return preset ? preset.buildLegs(strikes, spotPrice, defaultExp) : [];
    });

    const handleStrategyChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as StrategyType;
        setStrategyType(type);
        const preset = STRATEGY_PRESETS.find((p) => p.value === type);
        if (preset) {
          setLegs(preset.buildLegs(strikes, spotPrice, defaultExp));
        }
      },
      [strikes, spotPrice, defaultExp],
    );

    const handleLegChange = React.useCallback(
      (index: number, leg: StrategyLeg) => {
        setLegs((prev) => {
          const next = [...prev];
          next[index] = leg;
          return next;
        });
      },
      [],
    );

    const handleLegRemove = React.useCallback(
      (index: number) => {
        setLegs((prev) => prev.filter((_, i) => i !== index));
      },
      [],
    );

    const handleAddLeg = React.useCallback(() => {
      if (legs.length >= 4) return;
      const atm = findATM(strikes, spotPrice);
      setLegs((prev) => [
        ...prev,
        { action: 'buy', type: 'call', strike: atm, expiration: defaultExp, quantity: 1 },
      ]);
    }, [legs.length, strikes, spotPrice, defaultExp]);

    const netPremium = React.useMemo(() => {
      return legs.reduce((sum, leg) => {
        if (leg.premium === undefined) return sum;
        const sign = leg.action === 'buy' ? -1 : 1;
        return sum + sign * leg.premium * leg.quantity;
      }, 0);
    }, [legs]);

    const handleSubmit = React.useCallback(() => {
      if (!onSubmit || legs.length === 0) return;
      onSubmit({
        type: strategyType,
        legs,
        netPremium,
      });
    }, [onSubmit, strategyType, legs, netPremium]);

    const currentPreset = STRATEGY_PRESETS.find((p) => p.value === strategyType);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3',
          className,
        )}
        {...rest}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Strategy
            </span>
            <span className="text-sm font-medium text-zinc-200">
              {underlying}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500">
            Spot: <span className="font-mono tabular-nums text-zinc-300">{spotPrice.toFixed(2)}</span>
          </span>
        </div>

        {/* Strategy selector */}
        <div className="flex items-center gap-2">
          <select
            value={strategyType}
            onChange={handleStrategyChange}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1.5 text-sm text-zinc-200 outline-none focus:border-zinc-500"
          >
            {STRATEGY_PRESETS.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
        </div>

        {currentPreset && (
          <p className="text-[11px] text-zinc-500 -mt-1">
            {currentPreset.description}
          </p>
        )}

        {/* Legs */}
        <div className="flex flex-col gap-1.5">
          {legs.map((leg, i) => (
            <LegRow
              key={i}
              leg={leg}
              index={i}
              strikes={strikes}
              expirations={expirations}
              removable={strategyType === 'custom' && legs.length > 1}
              onChange={handleLegChange}
              onRemove={handleLegRemove}
            />
          ))}
        </div>

        {/* Add leg button (custom only) */}
        {strategyType === 'custom' && legs.length < 4 && (
          <button
            type="button"
            onClick={handleAddLeg}
            className="flex items-center justify-center gap-1 rounded-md border border-dashed border-zinc-700 py-1 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Leg
          </button>
        )}

        {/* Net premium + submit */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Net:</span>
            <span className={cn(
              'font-mono tabular-nums text-sm font-semibold',
              netPremium > 0 ? 'text-emerald-400' : netPremium < 0 ? 'text-red-400' : 'text-zinc-400',
            )}>
              {netPremium > 0 ? 'Credit ' : netPremium < 0 ? 'Debit ' : ''}
              {netPremium !== 0 ? `$${Math.abs(netPremium).toFixed(2)}` : '-'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={legs.length === 0}
            className={cn(
              'px-4 py-1.5 rounded-md text-xs font-semibold transition-colors',
              'bg-blue-600 text-white hover:bg-blue-500',
              'disabled:opacity-40 disabled:cursor-not-allowed',
            )}
          >
            Review Order
          </button>
        </div>
      </div>
    );
  },
);
