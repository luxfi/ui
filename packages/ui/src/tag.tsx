import * as React from 'react';

import { cn } from './utils';

import { CloseButton } from './close-button';
import { Skeleton } from './skeleton';
import { Tooltip } from './tooltip';

// Inline constants
const nbsp = String.fromCharCode(160);

// Inline truncation tooltip
function TruncatedTextTooltip({ label, children }: { readonly label: React.ReactNode; readonly children: React.ReactNode }) {
  return (
    <Tooltip content={ label } positioning={{ placement: 'top' }}>
      { children }
    </Tooltip>
  );
}

type TagVariant = 'subtle' | 'clickable' | 'filter' | 'select';
type TagSize = 'sm' | 'md' | 'lg';

const TAG_BASE = 'inline-flex items-center align-top max-w-full select-text rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500';

const TAG_VARIANT_CLASSES: Record<TagVariant, string> = {
  subtle: 'bg-[var(--color-tag-subtle-bg)] text-[var(--color-tag-subtle-fg)]',
  clickable: 'cursor-pointer bg-[var(--color-tag-clickable-bg)] text-[var(--color-tag-clickable-fg)] hover:opacity-76',
  filter: 'bg-[var(--color-tag-filter-bg)]',
  select: 'cursor-pointer bg-[var(--color-tag-select-bg)] text-[var(--color-tag-select-fg)] hover:text-[var(--color-hover)] hover:opacity-76',
};

const TAG_SIZE_CLASSES: Record<TagSize, string> = {
  sm: 'px-1 py-0.5 min-h-5 gap-1 text-xs',
  md: 'px-1 py-0.5 min-h-6 gap-1 text-sm',
  lg: 'px-1.5 py-1.5 min-h-8 min-w-8 gap-1 text-sm',
};

const TAG_SELECTED_CLASSES = [
  'bg-[var(--color-tag-select-selected-bg)]',
  'text-[var(--color-tag-select-selected-fg)]',
  'hover:text-[var(--color-tag-select-selected-fg)]',
  'hover:opacity-76',
].join(' ');

const TAG_DISABLED_CLASSES = 'opacity-40 pointer-events-none cursor-not-allowed';

export interface TagProps extends Omit<React.ComponentPropsWithRef<'span'>, 'size'> {
  readonly variant?: TagVariant;
  readonly size?: TagSize;
  readonly startElement?: React.ReactNode;
  readonly endElement?: React.ReactNode;
  readonly endElementProps?: React.HTMLAttributes<HTMLSpanElement>;
  readonly label?: string;
  readonly onClose?: VoidFunction;
  readonly closable?: boolean;
  readonly truncated?: boolean;
  readonly loading?: boolean;
  readonly selected?: boolean;
  readonly disabled?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const {
      variant,
      size,
      startElement,
      endElement,
      endElementProps,
      label,
      onClose,
      closable = Boolean(onClose),
      children,
      truncated = false,
      loading,
      selected,
      disabled,
      className,
      ...rest
    } = props;

    const labelElement = label ? (
      <span className="text-[var(--color-text-secondary)]">{ label }:{ nbsp }</span>
    ) : null;

    const labelSpan = (
      <span className="line-clamp-1 whitespace-nowrap text-ellipsis font-medium inline">
        { labelElement }{ children }
      </span>
    );

    const contentElement = truncated ? (
      <TruncatedTextTooltip label={ children }>
        { labelSpan }
      </TruncatedTextTooltip>
    ) : labelSpan;

    return (
      <Skeleton loading={ loading } asChild>
        <span
          ref={ ref }
          className={ cn(
            TAG_BASE,
            TAG_VARIANT_CLASSES[variant ?? 'subtle'],
            TAG_SIZE_CLASSES[size ?? 'md'],
            selected && !loading && TAG_SELECTED_CLASSES,
            disabled && TAG_DISABLED_CLASSES,
            className,
          ) }
          { ...(selected && !loading && { 'data-selected': true }) }
          { ...(disabled && { 'data-disabled': true }) }
          { ...rest }
        >
          { startElement && (
            <span className="shrink-0 inline-flex items-center justify-center empty:hidden">
              { startElement }
            </span>
          ) }
          { contentElement }
          { endElement && (
            <span
              { ...endElementProps }
              className={ cn(
                'shrink-0 inline-flex items-center justify-center',
                endElementProps?.className,
              ) }
            >
              { endElement }
            </span>
          ) }
          { closable && (
            <span className="shrink-0 inline-flex items-center justify-center">
              <CloseButton onClick={ onClose }/>
            </span>
          ) }
        </span>
      </Skeleton>
    );
  },
);
