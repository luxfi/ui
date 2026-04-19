import { styled, View } from '@hanzo/gui';
import * as React from 'react';

import { Skeleton } from './skeleton';

// ---------------------------------------------------------------------------
// Spinner (CSS-only, no react-native ActivityIndicator)
// ---------------------------------------------------------------------------

const SpinnerFrame = styled(View, {
  name: 'ButtonSpinner',
  render: <span />,
  width: 16,
  height: 16,
  borderRadius: 1000,
  borderWidth: 2,
  borderColor: 'currentColor' as any,
  borderBottomColor: 'transparent' as any,
  borderLeftColor: 'transparent' as any,
});

function Spinner({ className }: { readonly className?: string }): React.ReactElement {
  return (
    <SpinnerFrame
      role="status"
      aria-label="Loading"
      className={[
        'animate-spin',
        className,
      ].filter(Boolean).join(' ')}
    />
  );
}

// ---------------------------------------------------------------------------
// ButtonFrame — styled base
// ---------------------------------------------------------------------------

const ButtonFrame = styled(View, {
  name: 'LuxButton',
  render: <button type="button" />,
  role: 'button',
  tabIndex: 0,
  cursor: 'pointer',
  userSelect: 'none' as any,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  overflow: 'hidden',
  borderRadius: 6,
  // Whitespace nowrap via className since hanzogui doesn't have a direct token
  // Transition via className

  variants: {
    size: {
      '2xs': { paddingHorizontal: 8, height: 20, minWidth: 20, fontSize: 12, borderRadius: 4, gap: 4 },
      xs: { paddingHorizontal: 8, height: 24, minWidth: 24, fontSize: 14, borderRadius: 4, gap: 4 },
      sm: { paddingHorizontal: 12, height: 32, minWidth: 32, fontSize: 14, borderRadius: 6, gap: 4 },
      md: { paddingHorizontal: 12, height: 40, minWidth: 40, fontSize: 16, borderRadius: 6, gap: 8 },
    },

    disabled: {
      true: {
        opacity: 0.2,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Variant class maps — CSS custom properties referenced via Tailwind classes.
// hanzogui styled() handles layout/sizing; className handles color theming
// so the existing tokens.css contract is honored without duplication.
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  solid: [
    'bg-[var(--color-button-solid-bg)] text-[var(--color-button-solid-text)]',
    'hover:bg-[var(--color-hover)]',
    'data-[expanded]:bg-[var(--color-hover)]',
  ].join(' '),

  solid_danger: [
    'bg-red-600 text-[var(--color-button-solid-text)]',
    'hover:bg-red-500',
    'data-[expanded]:bg-red-500',
  ].join(' '),

  outline: [
    'border-2 border-solid bg-transparent',
    'text-[var(--color-button-outline-fg)] border-[var(--color-button-outline-fg)]',
    'hover:bg-transparent hover:text-[var(--color-hover)] hover:border-[var(--color-hover)]',
  ].join(' '),

  outline_danger: [
    'border-2 border-solid bg-transparent',
    'text-red-600 border-red-600',
    'hover:bg-transparent hover:text-red-500 hover:border-red-500',
  ].join(' '),

  dropdown: [
    'border-2 border-solid bg-transparent',
    'text-[var(--color-button-dropdown-fg)] border-[var(--color-button-dropdown-border)]',
    'hover:bg-transparent hover:text-[var(--color-hover)] hover:border-[var(--color-hover)]',
    'data-[expanded]:bg-transparent data-[expanded]:text-[var(--color-hover)] data-[expanded]:border-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-selected-control-bg)] data-[selected]:text-[var(--color-selected-control-text)] data-[selected]:border-transparent',
    'data-[selected]:hover:bg-[var(--color-selected-control-bg)]',
    'data-[selected]:hover:text-[var(--color-hover)] data-[selected]:hover:border-transparent',
    'data-[selected]:data-[expanded]:text-[var(--color-hover)]',
  ].join(' '),

  header: [
    'bg-transparent border-2 border-solid',
    'text-[var(--color-button-header-fg)] border-[var(--color-button-header-border)]',
    'hover:bg-transparent hover:text-[var(--color-hover)] hover:border-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-button-header-bg-selected)]',
    'data-[selected]:text-[var(--color-button-header-fg-selected)] data-[selected]:border-transparent data-[selected]:border-0',
    'data-[selected]:hover:bg-[var(--color-button-header-bg-selected)] data-[selected]:hover:text-[var(--color-hover)]',
    'data-[selected]:data-[expanded]:text-[var(--color-hover)]',
    'data-[selected]:data-[highlighted]:bg-[var(--color-button-header-bg-highlighted)]',
    'data-[selected]:data-[highlighted]:text-[var(--color-button-header-fg-highlighted)]',
    'data-[selected]:data-[highlighted]:border-transparent data-[selected]:data-[highlighted]:border-0',
    'data-[selected]:data-[highlighted]:hover:bg-[var(--color-button-header-bg-highlighted)]',
    'data-[selected]:data-[highlighted]:hover:text-[var(--color-hover)]',
    'data-[selected]:data-[highlighted]:data-[expanded]:text-[var(--color-hover)]',
  ].join(' '),

  hero: [
    'bg-[var(--color-button-hero-bg)] text-[var(--color-button-hero-fg)]',
    'hover:bg-[var(--color-button-hero-bg-hover)] hover:text-[var(--color-button-hero-fg-hover)]',
    'data-[selected]:bg-[var(--color-button-hero-bg-selected)] data-[selected]:text-[var(--color-button-hero-fg-selected)]',
    'data-[selected]:hover:bg-[var(--color-button-hero-bg-selected)] data-[selected]:hover:text-[var(--color-hover)]',
    'data-[selected]:data-[expanded]:text-[var(--color-hover)]',
  ].join(' '),

  segmented: [
    'bg-transparent border-2 border-solid rounded-none',
    'text-[var(--color-button-segmented-fg)] border-[var(--color-selected-control-bg)]',
    'hover:text-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-selected-control-bg)] data-[selected]:text-[var(--color-selected-control-text)]',
    'data-[selected]:hover:bg-[var(--color-selected-control-bg)] data-[selected]:hover:text-[var(--color-selected-control-text)]',
    '[&:not(:last-child)]:border-r-0 data-[selected]:[&:not(:last-child)]:border-r-2',
    'data-[selected]+*:border-l-0',
    'first:rounded-l-md last:rounded-r-md',
  ].join(' '),

  plain: 'bg-transparent text-inherit border-none hover:bg-transparent',

  subtle: [
    'bg-[var(--color-button-subtle-bg)] text-[var(--color-button-subtle-fg)]',
    'hover:bg-[var(--color-button-subtle-bg)] hover:text-[var(--color-hover)]',
    'disabled:bg-[var(--color-button-subtle-bg)] disabled:text-[var(--color-button-subtle-fg)]',
  ].join(' '),

  link: [
    'bg-transparent text-[var(--color-link-primary)] border-none font-normal',
    'px-0 h-auto',
    'hover:bg-transparent hover:text-[var(--color-link-primary-hover)]',
    'disabled:text-[var(--color-text-secondary)]',
  ].join(' '),

  icon_secondary: [
    'bg-transparent text-[var(--color-icon-secondary)] border-none',
    'hover:text-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-selected-control-bg)] data-[selected]:text-[var(--color-selected-control-text)]',
    'data-[selected]:hover:bg-[var(--color-selected-control-bg)] data-[selected]:hover:text-[var(--color-hover)]',
    'data-[selected]:data-[expanded]:text-[var(--color-hover)]',
    'data-[expanded]:text-[var(--color-hover)]',
  ].join(' '),

  icon_background: [
    'bg-[var(--color-button-icon-background-bg)] text-[var(--color-icon-secondary)] border-none',
    'hover:text-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-selected-control-bg)] data-[selected]:text-[var(--color-selected-control-text)]',
    'data-[selected]:hover:bg-[var(--color-selected-control-bg)] data-[selected]:hover:text-[var(--color-hover)]',
    'data-[selected]:data-[expanded]:text-[var(--color-hover)]',
    'data-[expanded]:text-[var(--color-hover)]',
  ].join(' '),

  pagination: [
    'border-2 border-solid bg-transparent',
    'text-[var(--color-button-pagination-fg)] border-[var(--color-button-pagination-border)]',
    'hover:bg-transparent hover:text-[var(--color-hover)] hover:border-[var(--color-hover)]',
    'data-[selected]:bg-[var(--color-selected-control-bg)] data-[selected]:text-[var(--color-selected-control-text)] data-[selected]:border-transparent',
    'data-[selected]:hover:bg-[var(--color-selected-control-bg)]',
    'data-[selected]:hover:text-[var(--color-selected-control-text)] data-[selected]:hover:border-transparent',
  ].join(' '),
};

const BASE_CLASSES = 'font-semibold whitespace-nowrap transition-colors duration-150';

type ButtonVariant = keyof typeof VARIANT_CLASSES;
type ButtonSize = '2xs' | 'xs' | 'sm' | 'md';

// ---------------------------------------------------------------------------
// ButtonProps
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly asChild?: boolean;
  readonly loading?: boolean;
  readonly loadingText?: React.ReactNode;
  readonly loadingSkeleton?: boolean;
  readonly expanded?: boolean;
  readonly selected?: boolean;
  readonly highlighted?: boolean;
  // Legacy Chakra style-prop shims
  readonly mt?: number | string;
  readonly ml?: number | string;
  readonly mr?: number | string;
  readonly px?: number | string;
  readonly py?: number | string;
  readonly fontWeight?: number | string;
  readonly gap?: number | string;
  readonly flexShrink?: number;
  readonly columnGap?: number | string;
  readonly gridColumn?: number | string;
  readonly gridRow?: string;
  readonly justifySelf?: string;
  readonly alignSelf?: string;
  readonly textStyle?: string;
  readonly h?: string;
  readonly w?: string;
  readonly display?: string;
  readonly borderBottomRightRadius?: number | string;
  readonly borderTopRightRadius?: number | string;
  readonly 'data-call-strategy'?: string;
}

// ---------------------------------------------------------------------------
// Chakra shim style builder
// ---------------------------------------------------------------------------

const SP = 4;

function buildShimStyle(props: {
  style?: React.CSSProperties;
  mt?: number | string;
  ml?: number | string;
  mr?: number | string;
  px?: number | string;
  py?: number | string;
  fontWeight?: number | string;
  gap?: number | string;
  flexShrink?: number;
  columnGap?: number | string;
  gridColumn?: number | string;
  gridRow?: string;
  justifySelf?: string;
  alignSelf?: string;
  h?: string;
  w?: string;
  display?: string;
  borderBottomRightRadius?: number | string;
  borderTopRightRadius?: number | string;
}): React.CSSProperties | undefined {
  const s: React.CSSProperties = { ...props.style };
  if (props.mt !== undefined) s.marginTop = typeof props.mt === 'number' ? `${props.mt * SP}px` : props.mt;
  if (props.ml !== undefined) s.marginLeft = typeof props.ml === 'number' ? `${props.ml * SP}px` : props.ml;
  if (props.mr !== undefined) s.marginRight = typeof props.mr === 'number' ? `${props.mr * SP}px` : props.mr;
  if (props.px !== undefined) { const v = typeof props.px === 'number' ? `${props.px * SP}px` : props.px; s.paddingLeft = v; s.paddingRight = v; }
  if (props.py !== undefined) { const v = typeof props.py === 'number' ? `${props.py * SP}px` : props.py; s.paddingTop = v; s.paddingBottom = v; }
  if (props.fontWeight !== undefined) s.fontWeight = props.fontWeight;
  if (props.gap !== undefined) s.gap = typeof props.gap === 'number' ? `${props.gap * SP}px` : props.gap;
  if (props.flexShrink !== undefined) s.flexShrink = props.flexShrink;
  if (props.columnGap !== undefined) s.columnGap = typeof props.columnGap === 'number' ? `${props.columnGap * SP}px` : props.columnGap;
  if (props.gridColumn !== undefined) s.gridColumn = typeof props.gridColumn === 'number' ? String(props.gridColumn) : props.gridColumn;
  if (props.gridRow) s.gridRow = props.gridRow;
  if (props.justifySelf) s.justifySelf = props.justifySelf;
  if (props.alignSelf) s.alignSelf = props.alignSelf;
  if (props.h) s.height = props.h;
  if (props.w) s.width = props.w;
  if (props.display) s.display = props.display;
  if (props.borderBottomRightRadius !== undefined) s.borderBottomRightRadius = typeof props.borderBottomRightRadius === 'number' ? `${props.borderBottomRightRadius}px` : props.borderBottomRightRadius;
  if (props.borderTopRightRadius !== undefined) s.borderTopRightRadius = typeof props.borderTopRightRadius === 'number' ? `${props.borderTopRightRadius}px` : props.borderTopRightRadius;
  return Object.keys(s).length > 0 ? s : undefined;
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      className,
      variant = 'solid',
      size = 'md',
      asChild = false,
      loading = false,
      loadingText,
      loadingSkeleton = false,
      expanded,
      selected,
      highlighted,
      disabled,
      children,
      style: styleProp,
      // Strip Chakra style props
      mt, ml, mr, px, py,
      fontWeight, gap, flexShrink,
      columnGap, gridColumn, gridRow,
      justifySelf, alignSelf, textStyle: _textStyle,
      h, w, display,
      borderBottomRightRadius, borderTopRightRadius,
      ...rest
    } = props;

    const mergedStyle = buildShimStyle({
      style: styleProp, mt, ml, mr, px, py, fontWeight, gap, flexShrink,
      columnGap, gridColumn, gridRow, justifySelf, alignSelf, h, w, display,
      borderBottomRightRadius, borderTopRightRadius,
    });

    const dataAttrs: Record<string, true> = {};
    if (expanded) dataAttrs['data-expanded'] = true;
    if (selected) dataAttrs['data-selected'] = true;
    if (highlighted) dataAttrs['data-highlighted'] = true;
    if (loadingSkeleton) dataAttrs['data-loading-skeleton'] = true;

    const isDisabled = !loadingSkeleton && (loading || disabled);

    const inner = loading ? (
      <>
        <Spinner />
        {loadingText != null && <span style={{ marginLeft: 8 }}>{loadingText}</span>}
      </>
    ) : (
      children
    );

    const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.solid;
    const combinedClassName = [BASE_CLASSES, variantClass, className].filter(Boolean).join(' ');

    const button = (
      <ButtonFrame
        ref={ref as any}
        size={size as any}
        disabled={isDisabled || undefined}
        asChild={asChild || undefined}
        className={combinedClassName}
        style={mergedStyle}
        {...dataAttrs}
        {...(rest as any)}
      >
        {inner}
      </ButtonFrame>
    );

    if (loadingSkeleton) {
      return (
        <Skeleton loading={loadingSkeleton} asChild ref={ref as React.ForwardedRef<HTMLDivElement>}>
          {button}
        </Skeleton>
      );
    }

    return button;
  },
);

// ---------------------------------------------------------------------------
// buttonVariants — compatibility shim for consumers that call buttonVariants()
// Returns the className string for a given variant + size combo.
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<string, string> = {
  '2xs': 'px-2 h-5 min-w-5 text-xs rounded-sm gap-1',
  xs: 'px-2 h-6 min-w-6 text-sm rounded-sm gap-1',
  sm: 'px-3 h-8 min-w-8 text-sm rounded-md gap-1',
  md: 'px-3 h-10 min-w-10 text-base rounded-md gap-2',
};

export function buttonVariants(opts?: { variant?: string; size?: string }): string {
  const v = opts?.variant ?? 'solid';
  const s = opts?.size ?? 'md';
  return [BASE_CLASSES, VARIANT_CLASSES[v] ?? '', SIZE_CLASSES[s] ?? ''].filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// ButtonGroup
// ---------------------------------------------------------------------------

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(props, ref) {
    const { className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={['inline-flex', className].filter(Boolean).join(' ')}
        role="group"
        {...rest}
      />
    );
  },
);

// ---------------------------------------------------------------------------
// ButtonGroupRadio
// ---------------------------------------------------------------------------

export interface ButtonGroupRadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  children: Array<React.ReactElement<ButtonProps>>;
  onChange?: (value: string) => void;
  defaultValue?: string;
  loading?: boolean;
  equalWidth?: boolean;
  variant?: ButtonProps['variant'];
}

export const ButtonGroupRadio = React.forwardRef<HTMLDivElement, ButtonGroupRadioProps>(
  function ButtonGroupRadio(props, ref) {
    const {
      children,
      onChange,
      variant = 'segmented',
      defaultValue,
      loading = false,
      equalWidth = false,
      className,
      ...rest
    } = props;

    const firstChildValue = React.useMemo(() => {
      const firstChild = Array.isArray(children) ? children[0] : undefined;
      return typeof firstChild?.props.value === 'string' ? firstChild.props.value : undefined;
    }, [children]);

    const [value, setValue] = React.useState<string | undefined>(defaultValue ?? firstChildValue);

    const handleItemClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const v = event.currentTarget.value;
      setValue(v);
      onChange?.(v);
    }, [onChange]);

    const clonedChildren = React.Children.map(children, (child: React.ReactElement<ButtonProps>) => {
      return React.cloneElement(child, {
        onClick: handleItemClick,
        selected: value === child.props.value,
        variant,
      });
    });

    const childrenLength = React.Children.count(children);

    return (
      <Skeleton loading={loading}>
        <div
          ref={ref}
          className={[
            'inline-flex gap-0',
            equalWidth ? 'grid' : '',
            className,
          ].filter(Boolean).join(' ')}
          style={equalWidth ? { gridTemplateColumns: `repeat(${childrenLength}, 1fr)` } : undefined}
          role="group"
          {...rest}
        >
          {clonedChildren}
        </div>
      </Skeleton>
    );
  },
);
