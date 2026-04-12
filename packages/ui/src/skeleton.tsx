import * as React from 'react';

import { cn } from './utils';

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  readonly loading: boolean | undefined;

  /** When true, the Skeleton wraps its single child element instead of adding a wrapper div. */
  readonly asChild?: boolean;

  // Legacy Chakra style-prop shims — converted to inline style.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly w?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly h?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly minW?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly maxW?: any;
  readonly display?: string;
  readonly flexGrow?: number;
  readonly flexShrink?: number;
  readonly flexBasis?: string;
  readonly fontWeight?: number | string;
  readonly textStyle?: string;
  readonly borderRadius?: string;
  readonly alignSelf?: string;
  readonly alignItems?: string;
  readonly justifyContent?: string;
  readonly color?: string;
  readonly mt?: number | string;
  readonly mb?: number | string;
  readonly ml?: number | string;
  readonly mr?: number | string;
  readonly height?: string;
  readonly overflow?: string;
  readonly whiteSpace?: string;
  readonly textOverflow?: string;
  readonly textTransform?: string;
  readonly gap?: number | string;
  readonly gridTemplateColumns?: string;
  readonly minWidth?: string;
  readonly boxSize?: number | string;
  readonly py?: number | string;
  readonly px?: number | string;
  readonly p?: number | string;
  readonly hideBelow?: string;
  readonly as?: React.ElementType;
  readonly fontSize?: string;
  readonly flexWrap?: React.CSSProperties['flexWrap'];
  readonly wordBreak?: React.CSSProperties['wordBreak'];
  readonly lineHeight?: string;
  readonly marginRight?: string;
  readonly position?: React.CSSProperties['position'];
  readonly background?: string;
}

// Style-prop shim names that must NOT leak into the DOM.
const SHIM_PROPS = [
  'w', 'h', 'minW', 'maxW', 'display', 'flexGrow', 'flexShrink', 'flexBasis',
  'fontWeight', 'textStyle', 'borderRadius', 'alignSelf', 'alignItems',
  'justifyContent', 'color', 'mt', 'mb', 'ml', 'mr', 'height', 'overflow',
  'whiteSpace', 'textOverflow', 'textTransform', 'gap', 'gridTemplateColumns',
  'minWidth', 'boxSize', 'py', 'px', 'p', 'hideBelow', 'fontSize', 'flexWrap',
  'wordBreak', 'lineHeight', 'marginRight', 'position', 'background',
] as const;

const S = 4; // Chakra spacing scale

/** Resolve a dimension value (number → px via spacing scale, responsive object → first value). */
function dim(v: unknown): string | undefined {
  if (v == null) return undefined;
  if (typeof v === 'number') return `${ v * S }px`;
  if (typeof v === 'string') return v;
  if (typeof v === 'object') {
    const o = v as Record<string, string>;
    return o.base ?? o.lg ?? o.xl ?? Object.values(o)[0];
  }
  return undefined;
}

/** Convert a spacing number|string via the 4px scale. */
function sp(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === 'number' ? `${ v * S }px` : v;
}

/** Build a CSSProperties object from legacy Chakra style-prop shims. */
function shimToStyle(props: SkeletonProps): React.CSSProperties {
  const s: React.CSSProperties = {};
  if (props.w !== undefined) s.width = dim(props.w);
  if (props.h !== undefined) s.height = dim(props.h);
  if (props.minW !== undefined) s.minWidth = dim(props.minW);
  if (props.maxW !== undefined) s.maxWidth = dim(props.maxW);
  if (props.display !== undefined) s.display = props.display;
  if (props.flexGrow !== undefined) s.flexGrow = props.flexGrow;
  if (props.flexShrink !== undefined) s.flexShrink = props.flexShrink;
  if (props.flexBasis !== undefined) s.flexBasis = props.flexBasis;
  if (props.fontWeight !== undefined) s.fontWeight = props.fontWeight;
  if (props.borderRadius !== undefined) s.borderRadius = props.borderRadius;
  if (props.alignSelf !== undefined) s.alignSelf = props.alignSelf;
  if (props.alignItems !== undefined) s.alignItems = props.alignItems;
  if (props.justifyContent !== undefined) s.justifyContent = props.justifyContent;
  if (props.color !== undefined) s.color = props.color;
  if (props.mt !== undefined) s.marginTop = sp(props.mt);
  if (props.mb !== undefined) s.marginBottom = sp(props.mb);
  if (props.ml !== undefined) s.marginLeft = sp(props.ml);
  if (props.mr !== undefined) s.marginRight = sp(props.mr);
  if (props.height !== undefined) s.height = props.height;
  if (props.overflow !== undefined) s.overflow = props.overflow;
  if (props.whiteSpace !== undefined) s.whiteSpace = props.whiteSpace;
  if (props.textOverflow !== undefined) s.textOverflow = props.textOverflow;
  if (props.textTransform !== undefined) s.textTransform = props.textTransform;
  if (props.gap !== undefined) s.gap = sp(props.gap);
  if (props.gridTemplateColumns !== undefined) s.gridTemplateColumns = props.gridTemplateColumns;
  if (props.minWidth !== undefined) s.minWidth = props.minWidth;
  if (props.boxSize !== undefined) {
    const v = typeof props.boxSize === 'number' ? `${ props.boxSize * S }px` : props.boxSize;
    s.width = v; s.height = v;
  }
  if (props.py !== undefined) { const v = sp(props.py); s.paddingTop = v; s.paddingBottom = v; }
  if (props.px !== undefined) { const v = sp(props.px); s.paddingLeft = v; s.paddingRight = v; }
  if (props.p !== undefined) s.padding = sp(props.p);
  if (props.fontSize !== undefined) s.fontSize = props.fontSize;
  if (props.flexWrap !== undefined) s.flexWrap = props.flexWrap;
  if (props.wordBreak !== undefined) s.wordBreak = props.wordBreak;
  if (props.lineHeight !== undefined) s.lineHeight = props.lineHeight;
  if (props.marginRight !== undefined) s.marginRight = props.marginRight;
  if (props.position !== undefined) s.position = props.position;
  if (props.background !== undefined) s.background = props.background;
  return s;
}

/** Strip shim keys from props so they don't leak into the DOM. */
function stripShims<T extends Record<string, unknown>>(props: T): Omit<T, (typeof SHIM_PROPS)[number]> {
  const out = { ...props };
  for (const k of SHIM_PROPS) delete out[k];
  return out as Omit<T, (typeof SHIM_PROPS)[number]>;
}

const SKELETON_CLASSES = [
  'animate-skeleton-shimmer rounded-sm',
  'bg-[linear-gradient(90deg,var(--color-skeleton-start)_0%,var(--color-skeleton-end)_50%,var(--color-skeleton-start)_100%)]',
  'bg-[length:200%_100%]',
].join(' ');

const HIDE_BELOW_MAP: Record<string, string> = { lg: 'lg:hidden', md: 'md:hidden', sm: 'sm:hidden' };

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const { loading = false, asChild, className, children, style: styleProp, as: Component = 'div', ...allRest } = props;

    const shimStyle = shimToStyle(props);
    const mergedStyle = Object.keys(shimStyle).length > 0 || styleProp ? { ...shimStyle, ...styleProp } : undefined;
    const hideBelowClass = props.hideBelow ? HIDE_BELOW_MAP[props.hideBelow] : undefined;
    const cls = hideBelowClass ? cn(className, hideBelowClass) : className;

    // Strip shim props from what reaches the DOM.
    const htmlRest = stripShims(allRest);

    if (!loading) {
      if (asChild && React.isValidElement(children)) return children;
      return (
        <Component ref={ ref } className={ cls } style={ mergedStyle } { ...htmlRest }>
          { children }
        </Component>
      );
    }

    if (asChild && React.isValidElement(children)) {
      return (
        <Component
          ref={ ref }
          data-loading
          className={ cn(SKELETON_CLASSES, 'text-transparent [&_*]:invisible', cls) }
          style={ mergedStyle }
          { ...htmlRest }
        >
          { children }
        </Component>
      );
    }

    return (
      <Component
        ref={ ref }
        data-loading
        className={ cn(SKELETON_CLASSES, children ? 'text-transparent [&_*]:invisible' : 'min-h-5', cls) }
        style={ mergedStyle }
        { ...htmlRest }
      >
        { children }
      </Component>
    );
  },
);

// ---------------------------------------------------------------------------
// SkeletonCircle
// ---------------------------------------------------------------------------

export interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly size?: string | number;
  readonly loading?: boolean;
}

export const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  function SkeletonCircle(props, ref) {
    const { size = 40, loading = true, className, ...rest } = props;

    const dimension = typeof size === 'number' ? `${ size }px` : size;

    return (
      <Skeleton
        ref={ ref }
        loading={ loading }
        className={ cn('rounded-full shrink-0', className) }
        style={{ width: dimension, height: dimension, ...rest.style }}
        { ...rest }
      />
    );
  },
);

// ---------------------------------------------------------------------------
// SkeletonText
// ---------------------------------------------------------------------------

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly noOfLines?: number;
  readonly loading?: boolean;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, loading = true, className, ...rest } = props;

    return (
      <div ref={ ref } className={ cn('flex w-full flex-col gap-2', className) } { ...rest }>
        { Array.from({ length: noOfLines }).map((_, index) => (
          <Skeleton
            key={ index }
            loading={ loading }
            className={ cn('h-4', index === noOfLines - 1 && 'max-w-[80%]') }
          />
        )) }
      </div>
    );
  },
);
