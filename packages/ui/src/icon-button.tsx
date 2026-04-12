import { styled, View } from '@hanzogui/core';
import * as React from 'react';

import { Skeleton } from './skeleton';

// ---------------------------------------------------------------------------
// IconButtonFrame — styled base
// ---------------------------------------------------------------------------

const IconButtonFrame = styled(View, {
  name: 'LuxIconButton',
  render: <button type="button" />,
  role: 'button',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  minWidth: 'auto' as any,
  flexShrink: 1,
  backgroundColor: 'transparent',
  borderWidth: 0,

  variants: {
    size: {
      '2xs': { width: 20, height: 20, borderRadius: 4 },
      '2xs_alt': { width: 20, height: 20, borderRadius: 4 },
      md: { width: 32, height: 32, borderRadius: 'var(--radius-base, 8px)' as any },
    },

    disabled: {
      true: {
        opacity: 0.4,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,
});

// ---------------------------------------------------------------------------
// Variant class maps (CSS custom properties via Tailwind)
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  plain: 'bg-transparent text-inherit border-none hover:bg-transparent',

  icon_secondary: [
    'bg-transparent text-icon-secondary border-none',
    'hover:text-hover',
    'data-[selected]:bg-selected-control-bg data-[selected]:text-selected-control-text',
    'data-[selected]:hover:text-hover',
    'data-[expanded]:text-hover',
  ].join(' '),

  icon_background: [
    'bg-[var(--color-button-icon-background-bg)] text-icon-secondary border-none',
    'hover:text-hover',
    'data-[selected]:bg-selected-control-bg data-[selected]:text-selected-control-text',
    'data-[selected]:hover:text-hover',
    'data-[expanded]:text-hover',
  ].join(' '),

  link: [
    'bg-transparent text-link-primary border-none font-normal px-0 h-auto',
    'hover:bg-transparent hover:text-link-primary-hover',
    'disabled:text-text-secondary',
  ].join(' '),

  dropdown: [
    'border-2 border-solid bg-transparent',
    'text-[var(--color-button-dropdown-fg)] border-[var(--color-button-dropdown-border)]',
    'hover:bg-transparent hover:text-hover hover:border-hover',
    'data-[expanded]:bg-transparent data-[expanded]:text-hover data-[expanded]:border-hover',
    'data-[selected]:bg-selected-control-bg data-[selected]:text-selected-control-text data-[selected]:border-transparent',
    'data-[selected]:hover:text-hover',
  ].join(' '),

  pagination: [
    'border-2 border-solid bg-transparent',
    'text-[var(--color-button-pagination-fg)] border-[var(--color-button-pagination-border)]',
    'hover:bg-transparent hover:text-hover hover:border-hover',
    'data-[selected]:bg-selected-control-bg data-[selected]:text-selected-control-text data-[selected]:border-transparent',
  ].join(' '),
};

// SVG icon size classes per size variant
const ICON_SIZE_CLASSES: Record<string, string> = {
  '2xs': '[&_svg]:size-5',
  '2xs_alt': '[&_svg]:size-3',
  md: '[&_svg]:size-5',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Variant = 'plain' | 'icon_secondary' | 'icon_background' | 'link' | 'dropdown' | 'pagination';
type Size = '2xs' | '2xs_alt' | 'md';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Visual variant */
  variant?: Variant;
  /** Icon-button size */
  size?: Size;
  /** Show a loading spinner (disables button) */
  loading?: boolean;
  /** Render a skeleton placeholder instead of the button */
  loadingSkeleton?: boolean;
  /** Maps to data-expanded for popover trigger styling */
  expanded?: boolean;
  /** Maps to data-selected for toggle styling */
  selected?: boolean;
  /** Maps to data-highlighted */
  highlighted?: boolean;
  /** Polymorphic element type (e.g. "div") */
  as?: React.ElementType;
  // Legacy Chakra style-prop shims
  boxSize?: number | string;
  color?: string;
  px?: string | number;
  borderRadius?: string;
  ml?: number | string;
  mr?: number | string;
  _hover?: Record<string, string>;
  _expanded?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SP = 4;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      size,
      variant = 'plain',
      loading,
      loadingSkeleton = false,
      expanded,
      selected,
      highlighted,
      disabled,
      className,
      children,
      as: _as,
      style: styleProp,
      // Strip Chakra style props
      boxSize: _boxSize,
      color: _color,
      px: _px,
      borderRadius: _borderRadius,
      ml: _ml,
      mr: _mr,
      _hover,
      _expanded,
      ...rest
    } = props;

    const shimStyle: React.CSSProperties = { ...styleProp };
    if (_boxSize !== undefined) {
      const bs = typeof _boxSize === 'number' ? `${_boxSize * SP}px` : _boxSize;
      shimStyle.width = bs;
      shimStyle.height = bs;
    }
    if (_color) shimStyle.color = _color;
    if (_px !== undefined) {
      const v = typeof _px === 'number' ? `${_px * SP}px` : _px;
      shimStyle.paddingLeft = v;
      shimStyle.paddingRight = v;
    }
    if (_borderRadius) shimStyle.borderRadius = _borderRadius;
    if (_ml !== undefined) shimStyle.marginLeft = typeof _ml === 'number' ? `${_ml * SP}px` : _ml;
    if (_mr !== undefined) shimStyle.marginRight = typeof _mr === 'number' ? `${_mr * SP}px` : _mr;
    const mergedStyle = Object.keys(shimStyle).length > 0 ? shimStyle : undefined;

    const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.plain;
    const iconSizeClass = size ? (ICON_SIZE_CLASSES[size] ?? '') : '';
    const combinedClassName = [variantClass, iconSizeClass, className].filter(Boolean).join(' ');

    const button = (
      <IconButtonFrame
        ref={ref as any}
        size={size as any}
        disabled={(!loadingSkeleton && (loading || disabled)) || undefined}
        render={_as ? (React.createElement(_as) as React.ReactElement) : undefined}
        className={combinedClassName}
        style={mergedStyle}
        {...(expanded ? { 'data-expanded': true } : {})}
        {...(selected ? { 'data-selected': true } : {})}
        {...(highlighted ? { 'data-highlighted': true } : {})}
        {...(loadingSkeleton ? { 'data-loading-skeleton': true } : {})}
        {...(rest as any)}
      >
        {loading ? (
          <span
            className="inline-block size-5 animate-spin rounded-full border-2 border-current border-b-transparent border-l-transparent"
            role="status"
            aria-label="Loading"
          />
        ) : children}
      </IconButtonFrame>
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
