'use client';

import * as React from 'react';

import { cn } from './utils';

import type { StrategyLeg } from './strategy-builder';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type { StrategyLeg };

export interface PnlDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly legs: StrategyLeg[];
  readonly spotPrice: number;
  readonly multiplier?: number;
}

// ---------------------------------------------------------------------------
// P/L calculation
// ---------------------------------------------------------------------------

function calcLegPnl(leg: StrategyLeg, price: number, multiplier: number): number {
  const premium = leg.premium ?? 0;
  let intrinsic: number;
  if (leg.type === 'call') {
    intrinsic = Math.max(price - leg.strike, 0);
  } else {
    intrinsic = Math.max(leg.strike - price, 0);
  }
  const sign = leg.action === 'buy' ? 1 : -1;
  return sign * (intrinsic - premium) * leg.quantity * multiplier;
}

function calcTotalPnl(legs: StrategyLeg[], price: number, multiplier: number): number {
  return legs.reduce((sum, leg) => sum + calcLegPnl(leg, price, multiplier), 0);
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

interface ViewBox {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

function buildPath(points: Array<{ x: number; y: number }>, vb: ViewBox, width: number, height: number): string {
  if (points.length === 0) return '';
  const scaleX = (x: number) => ((x - vb.xMin) / (vb.xMax - vb.xMin)) * width;
  const scaleY = (y: number) => height - ((y - vb.yMin) / (vb.yMax - vb.yMin)) * height;

  const parts = points.map((p, i) => {
    const sx = scaleX(p.x);
    const sy = scaleY(p.y);
    return i === 0 ? `M${sx},${sy}` : `L${sx},${sy}`;
  });
  return parts.join(' ');
}

// ---------------------------------------------------------------------------
// Leg colors
// ---------------------------------------------------------------------------

const LEG_COLORS = ['#6366f1', '#f59e0b', '#ec4899', '#06b6d4'];

// ---------------------------------------------------------------------------
// PnlDiagram
// ---------------------------------------------------------------------------

export const PnlDiagram = React.forwardRef<HTMLDivElement, PnlDiagramProps>(
  function PnlDiagram(props, ref) {
    const {
      legs,
      spotPrice,
      multiplier = 100,
      className,
      ...rest
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [hoverX, setHoverX] = React.useState<number | null>(null);
    const [dims, setDims] = React.useState({ width: 600, height: 240 });

    // Observe container size
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setDims({
            width: Math.max(entry.contentRect.width, 200),
            height: Math.max(entry.contentRect.height, 120),
          });
        }
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Compute price range: strikes +/- 20%
    const allStrikes = legs.map((l) => l.strike);
    const minStrike = Math.min(...allStrikes, spotPrice);
    const maxStrike = Math.max(...allStrikes, spotPrice);
    const range = maxStrike - minStrike || spotPrice * 0.1;
    const xMin = minStrike - range * 0.3;
    const xMax = maxStrike + range * 0.3;

    // Sample points
    const SAMPLES = 200;
    const step = (xMax - xMin) / SAMPLES;

    const combinedPoints = React.useMemo(() => {
      const pts: Array<{ x: number; y: number }> = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const price = xMin + i * step;
        pts.push({ x: price, y: calcTotalPnl(legs, price, multiplier) });
      }
      return pts;
    }, [legs, multiplier, xMin, step]);

    const legPointSets = React.useMemo(() => {
      return legs.map((leg) => {
        const pts: Array<{ x: number; y: number }> = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const price = xMin + i * step;
          pts.push({ x: price, y: calcLegPnl(leg, price, multiplier) });
        }
        return pts;
      });
    }, [legs, multiplier, xMin, step]);

    // Y-axis range
    const allY = combinedPoints.map((p) => p.y);
    const rawYMin = Math.min(...allY);
    const rawYMax = Math.max(...allY);
    const yPad = Math.max((rawYMax - rawYMin) * 0.15, 10);
    const vb: ViewBox = { xMin, xMax, yMin: rawYMin - yPad, yMax: rawYMax + yPad };

    const { width, height } = dims;
    const PADDING = { top: 20, bottom: 28, left: 56, right: 16 };
    const chartW = width - PADDING.left - PADDING.right;
    const chartH = height - PADDING.top - PADDING.bottom;

    const scaleX = (x: number) => PADDING.left + ((x - vb.xMin) / (vb.xMax - vb.xMin)) * chartW;
    const scaleY = (y: number) => PADDING.top + chartH - ((y - vb.yMin) / (vb.yMax - vb.yMin)) * chartH;

    // Breakeven points (where combined PnL crosses zero)
    const breakevens = React.useMemo(() => {
      const pts: number[] = [];
      for (let i = 1; i < combinedPoints.length; i++) {
        const prev = combinedPoints[i - 1]!;
        const curr = combinedPoints[i]!;
        if ((prev.y <= 0 && curr.y >= 0) || (prev.y >= 0 && curr.y <= 0)) {
          // Linear interpolation
          const ratio = Math.abs(prev.y) / (Math.abs(prev.y) + Math.abs(curr.y));
          pts.push(prev.x + ratio * (curr.x - prev.x));
        }
      }
      return pts;
    }, [combinedPoints]);

    // Max gain / max loss
    const maxGain = Math.max(...allY);
    const maxLoss = Math.min(...allY);
    const maxGainPoint = combinedPoints.find((p) => p.y === maxGain);
    const maxLossPoint = combinedPoints.find((p) => p.y === maxLoss);

    // Zero line
    const zeroY = scaleY(0);

    // Hover
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const price = vb.xMin + ((mouseX - PADDING.left) / chartW) * (vb.xMax - vb.xMin);
        if (price >= vb.xMin && price <= vb.xMax) {
          setHoverX(price);
        } else {
          setHoverX(null);
        }
      },
      [vb.xMin, vb.xMax, chartW],
    );

    const handleMouseLeave = React.useCallback(() => setHoverX(null), []);

    const hoverPnl = hoverX !== null ? calcTotalPnl(legs, hoverX, multiplier) : null;

    // Combined path with fill
    const combinedPath = buildPath(
      combinedPoints.map((p) => ({ x: scaleX(p.x), y: scaleY(p.y) })).map((p) => ({ x: p.x - PADDING.left, y: p.y - PADDING.top })),
      { xMin: 0, xMax: chartW, yMin: 0, yMax: chartH },
      chartW,
      chartH,
    );

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...rest}
      >
        <div ref={containerRef} className="w-full h-full min-h-[200px]">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background */}
            <rect x={PADDING.left} y={PADDING.top} width={chartW} height={chartH} fill="#09090b" rx="2" />

            {/* Grid lines */}
            {Array.from({ length: 5 }).map((_, i) => {
              const y = PADDING.top + (chartH / 4) * i;
              const val = vb.yMax - ((vb.yMax - vb.yMin) / 4) * i;
              return (
                <g key={`grid-y-${i}`}>
                  <line
                    x1={PADDING.left} y1={y} x2={PADDING.left + chartW} y2={y}
                    stroke="#27272a" strokeWidth="1" strokeDasharray="2,2"
                  />
                  <text
                    x={PADDING.left - 4} y={y + 3}
                    fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="end"
                  >
                    {val >= 0 ? '+' : ''}{val.toFixed(0)}
                  </text>
                </g>
              );
            })}

            {/* Zero line */}
            {zeroY >= PADDING.top && zeroY <= PADDING.top + chartH && (
              <line
                x1={PADDING.left} y1={zeroY} x2={PADDING.left + chartW} y2={zeroY}
                stroke="#3f3f46" strokeWidth="1"
              />
            )}

            {/* Individual leg lines (dashed) */}
            {legPointSets.map((pts, i) => {
              const path = pts.map((p, j) => {
                const sx = scaleX(p.x);
                const sy = scaleY(p.y);
                return j === 0 ? `M${sx},${sy}` : `L${sx},${sy}`;
              }).join(' ');
              return (
                <path
                  key={`leg-${i}`}
                  d={path}
                  fill="none"
                  stroke={LEG_COLORS[i % LEG_COLORS.length]}
                  strokeWidth="1"
                  strokeDasharray="4,3"
                  opacity="0.5"
                />
              );
            })}

            {/* Combined P/L fill (green above zero, red below) */}
            {combinedPoints.length > 0 && (() => {
              const path = combinedPoints.map((p, i) => {
                const sx = scaleX(p.x);
                const sy = scaleY(p.y);
                return i === 0 ? `M${sx},${sy}` : `L${sx},${sy}`;
              }).join(' ');
              const lastX = scaleX(combinedPoints[combinedPoints.length - 1]!.x);
              const firstX = scaleX(combinedPoints[0]!.x);
              const clampedZeroY = Math.max(PADDING.top, Math.min(PADDING.top + chartH, zeroY));
              const fillPath = `${path} L${lastX},${clampedZeroY} L${firstX},${clampedZeroY} Z`;
              return (
                <>
                  <defs>
                    <linearGradient id="pnl-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                      <stop offset="50%" stopColor="#22c55e" stopOpacity="0.02" />
                      <stop offset="50%" stopColor="#ef4444" stopOpacity="0.02" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path d={fillPath} fill="url(#pnl-grad)" />
                </>
              );
            })()}

            {/* Combined P/L line */}
            {combinedPoints.length > 0 && (
              <path
                d={combinedPoints.map((p, i) => {
                  const sx = scaleX(p.x);
                  const sy = scaleY(p.y);
                  return i === 0 ? `M${sx},${sy}` : `L${sx},${sy}`;
                }).join(' ')}
                fill="none"
                stroke="#e4e4e7"
                strokeWidth="1.5"
              />
            )}

            {/* Current price vertical line */}
            <line
              x1={scaleX(spotPrice)} y1={PADDING.top}
              x2={scaleX(spotPrice)} y2={PADDING.top + chartH}
              stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3,3"
            />
            <text
              x={scaleX(spotPrice)} y={PADDING.top + chartH + 14}
              fill="#a1a1aa" fontSize="9" fontFamily="monospace" textAnchor="middle"
            >
              {spotPrice.toFixed(2)}
            </text>

            {/* Breakeven markers */}
            {breakevens.map((be, i) => (
              <g key={`be-${i}`}>
                <circle cx={scaleX(be)} cy={zeroY} r="3" fill="#fbbf24" stroke="#18181b" strokeWidth="1" />
                <text
                  x={scaleX(be)} y={PADDING.top + chartH + 14}
                  fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle"
                >
                  {be.toFixed(1)}
                </text>
              </g>
            ))}

            {/* Max gain marker */}
            {maxGainPoint && maxGain > 0 && (
              <g>
                <polygon
                  points={`${scaleX(maxGainPoint.x)},${scaleY(maxGainPoint.y) - 8} ${scaleX(maxGainPoint.x) - 4},${scaleY(maxGainPoint.y) - 2} ${scaleX(maxGainPoint.x) + 4},${scaleY(maxGainPoint.y) - 2}`}
                  fill="#22c55e"
                />
              </g>
            )}

            {/* Max loss marker */}
            {maxLossPoint && maxLoss < 0 && (
              <g>
                <polygon
                  points={`${scaleX(maxLossPoint.x)},${scaleY(maxLossPoint.y) + 8} ${scaleX(maxLossPoint.x) - 4},${scaleY(maxLossPoint.y) + 2} ${scaleX(maxLossPoint.x) + 4},${scaleY(maxLossPoint.y) + 2}`}
                  fill="#ef4444"
                />
              </g>
            )}

            {/* Hover crosshair */}
            {hoverX !== null && hoverPnl !== null && (
              <g>
                <line
                  x1={scaleX(hoverX)} y1={PADDING.top}
                  x2={scaleX(hoverX)} y2={PADDING.top + chartH}
                  stroke="#52525b" strokeWidth="1"
                />
                <circle
                  cx={scaleX(hoverX)}
                  cy={scaleY(hoverPnl)}
                  r="3"
                  fill={hoverPnl >= 0 ? '#22c55e' : '#ef4444'}
                  stroke="#18181b"
                  strokeWidth="1"
                />
                {/* Tooltip */}
                <rect
                  x={scaleX(hoverX) + 8}
                  y={scaleY(hoverPnl) - 20}
                  width="90"
                  height="28"
                  rx="3"
                  fill="#18181b"
                  stroke="#3f3f46"
                  strokeWidth="1"
                />
                <text
                  x={scaleX(hoverX) + 14}
                  y={scaleY(hoverPnl) - 10}
                  fill="#a1a1aa"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  ${hoverX.toFixed(2)}
                </text>
                <text
                  x={scaleX(hoverX) + 14}
                  y={scaleY(hoverPnl) + 1}
                  fill={hoverPnl >= 0 ? '#22c55e' : '#ef4444'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {hoverPnl >= 0 ? '+' : ''}{hoverPnl.toFixed(2)}
                </text>
              </g>
            )}

            {/* X-axis labels */}
            {Array.from({ length: 5 }).map((_, i) => {
              const x = vb.xMin + ((vb.xMax - vb.xMin) / 4) * i;
              return (
                <text
                  key={`x-label-${i}`}
                  x={scaleX(x)}
                  y={PADDING.top + chartH + 14}
                  fill="#52525b"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {x.toFixed(0)}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 px-2 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 bg-zinc-200 rounded" />
            <span className="text-[10px] text-zinc-400">Combined</span>
          </div>
          {legs.map((leg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="h-0.5 w-4 rounded"
                style={{
                  backgroundColor: LEG_COLORS[i % LEG_COLORS.length],
                  opacity: 0.6,
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, ${LEG_COLORS[i % LEG_COLORS.length]}00 2px, ${LEG_COLORS[i % LEG_COLORS.length]}00 5px)`,
                }}
              />
              <span className="text-[10px] text-zinc-500">
                {leg.action === 'buy' ? 'B' : 'S'} {leg.quantity} {leg.strike} {leg.type === 'call' ? 'C' : 'P'}
              </span>
            </div>
          ))}
          {breakevens.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] text-zinc-500">
                BE: {breakevens.map((b) => b.toFixed(1)).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
