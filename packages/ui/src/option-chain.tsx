'use client';

import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OptionQuote {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface OptionContract {
  symbol: string;
  type: 'call' | 'put';
  strike: number;
  bid: number;
  ask: number;
}

export interface Strike {
  strike: number;
  call: OptionQuote | null;
  put: OptionQuote | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number | undefined | null, decimals = 2): string {
  if (n === undefined || n === null) return '-';
  return n.toFixed(decimals);
}

function fmtInt(n: number | undefined | null): string {
  if (n === undefined || n === null) return '-';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function fmtPct(n: number | undefined | null): string {
  if (n === undefined || n === null) return '-';
  return `${(n * 100).toFixed(1)}%`;
}

// ---------------------------------------------------------------------------
// QuoteCell — clickable cell in the option chain
// ---------------------------------------------------------------------------

interface QuoteCellProps {
  readonly value: string;
  readonly highlight?: boolean;
  readonly align?: 'left' | 'right';
  readonly onClick?: () => void;
  readonly className?: string;
}

function QuoteCell({ value, highlight, align = 'right', onClick, className }: QuoteCellProps) {
  return (
    <td
      className={cn(
        'px-1.5 py-1 font-mono tabular-nums text-xs whitespace-nowrap',
        align === 'right' ? 'text-right' : 'text-left',
        highlight && 'text-zinc-100',
        !highlight && 'text-zinc-400',
        onClick && 'cursor-pointer hover:bg-zinc-700/50 transition-colors',
        className,
      )}
      onClick={onClick}
    >
      {value}
    </td>
  );
}

// ---------------------------------------------------------------------------
// Column headers
// ---------------------------------------------------------------------------

const CALL_HEADERS = ['Bid', 'Ask', 'Last', 'Vol', 'OI', 'IV', 'Delta'] as const;
const PUT_HEADERS = ['Delta', 'IV', 'OI', 'Vol', 'Last', 'Ask', 'Bid'] as const;

// ---------------------------------------------------------------------------
// OptionChain
// ---------------------------------------------------------------------------

export interface OptionChainProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly symbol: string;
  readonly expiration: string;
  readonly strikes: Strike[];
  readonly spotPrice: number;
  readonly onSelectContract?: (contract: OptionContract) => void;
}

export const OptionChain = React.forwardRef<HTMLDivElement, OptionChainProps>(
  function OptionChain(props, ref) {
    const {
      symbol: _symbol,
      expiration: _expiration,
      strikes,
      spotPrice,
      onSelectContract,
      className,
      ...rest
    } = props;

    const handleClick = React.useCallback(
      (quote: OptionQuote | null, type: 'call' | 'put', strike: number) => {
        if (!quote || !onSelectContract) return;
        onSelectContract({
          symbol: quote.symbol,
          type,
          strike,
          bid: quote.bid,
          ask: quote.ask,
        });
      },
      [onSelectContract],
    );

    return (
      <div
        ref={ref}
        className={cn('w-full overflow-x-auto', className)}
        {...rest}
      >
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-800">
              {/* Call headers */}
              <th
                colSpan={CALL_HEADERS.length}
                className="px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-emerald-400"
              >
                Calls
              </th>
              {/* Strike header */}
              <th className="px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Strike
              </th>
              {/* Put headers */}
              <th
                colSpan={PUT_HEADERS.length}
                className="px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-red-400"
              >
                Puts
              </th>
            </tr>
            <tr className="border-b border-zinc-800/60">
              {CALL_HEADERS.map((h) => (
                <th
                  key={`call-${h}`}
                  className="px-1.5 py-1 text-right text-[10px] font-medium uppercase tracking-wider text-zinc-500"
                >
                  {h}
                </th>
              ))}
              <th className="px-2 py-1 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-500" />
              {PUT_HEADERS.map((h) => (
                <th
                  key={`put-${h}`}
                  className={cn(
                    'px-1.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500',
                    h === 'Bid' || h === 'Ask' || h === 'Last' ? 'text-left' : 'text-right',
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {strikes.map((row) => {
              const isATM = Math.abs(row.strike - spotPrice) <=
                (strikes.length > 1
                  ? Math.abs((strikes[1]?.strike ?? 0) - (strikes[0]?.strike ?? 0)) / 2
                  : 0.5);
              const callITM = row.strike < spotPrice;
              const putITM = row.strike > spotPrice;
              const c = row.call;
              const p = row.put;

              return (
                <tr
                  key={row.strike}
                  className={cn(
                    'border-b border-zinc-800/30 transition-colors',
                    isATM && 'bg-zinc-800/60',
                    !isATM && callITM && 'bg-emerald-950/20',
                    !isATM && putITM && 'bg-red-950/20',
                    !isATM && !callITM && !putITM && 'hover:bg-zinc-800/30',
                  )}
                >
                  {/* Call side */}
                  <QuoteCell
                    value={fmt(c?.bid)}
                    highlight={!!c}
                    onClick={() => handleClick(c, 'call', row.strike)}
                  />
                  <QuoteCell
                    value={fmt(c?.ask)}
                    highlight={!!c}
                    onClick={() => handleClick(c, 'call', row.strike)}
                  />
                  <QuoteCell value={fmt(c?.last)} highlight={!!c} />
                  <QuoteCell value={fmtInt(c?.volume)} />
                  <QuoteCell value={fmtInt(c?.openInterest)} />
                  <QuoteCell value={fmtPct(c?.iv)} />
                  <QuoteCell value={fmt(c?.delta, 3)} />

                  {/* Strike */}
                  <td
                    className={cn(
                      'px-2 py-1 text-center font-mono tabular-nums text-xs font-semibold',
                      isATM ? 'text-amber-400 bg-zinc-800/80' : 'text-zinc-300',
                    )}
                  >
                    {fmt(row.strike)}
                  </td>

                  {/* Put side (mirrored order) */}
                  <QuoteCell value={fmt(p?.delta, 3)} align="right" />
                  <QuoteCell value={fmtPct(p?.iv)} align="right" />
                  <QuoteCell value={fmtInt(p?.openInterest)} align="right" />
                  <QuoteCell value={fmtInt(p?.volume)} align="right" />
                  <QuoteCell value={fmt(p?.last)} align="left" highlight={!!p} />
                  <QuoteCell
                    value={fmt(p?.ask)}
                    align="left"
                    highlight={!!p}
                    onClick={() => handleClick(p, 'put', row.strike)}
                  />
                  <QuoteCell
                    value={fmt(p?.bid)}
                    align="left"
                    highlight={!!p}
                    onClick={() => handleClick(p, 'put', row.strike)}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);
