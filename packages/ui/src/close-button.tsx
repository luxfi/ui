import { styled, View } from '@hanzo/gui';
import * as React from 'react';

// eslint-disable-next-line max-len
const CLOSE_ICON_PATH = 'M9.44 8.035a.791.791 0 0 0 1.12 0l3.802-3.803a.791.791 0 0 1 1.119 0l.287.287a.79.79 0 0 1 0 1.119L11.965 9.44a.79.79 0 0 0 0 1.118l3.803 3.803a.791.791 0 0 1 0 1.119l-.287.287a.791.791 0 0 1-1.119 0l-3.803-3.803a.79.79 0 0 0-1.118 0l-3.803 3.803a.79.79 0 0 1-1.119 0l-.287-.287a.791.791 0 0 1 0-1.119l3.803-3.803a.791.791 0 0 0 0-1.118L4.232 5.638a.791.791 0 0 1 0-1.119l.287-.287a.791.791 0 0 1 1.119 0L9.44 8.035Z';

const CloseButtonFrame = styled(View, {
  name: 'LuxCloseButton',
  render: <button type="button" aria-label="Close" />,
  role: 'button',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  minWidth: 0,
  flexShrink: 1,
  padding: 0,
  borderRadius: 4,
  borderWidth: 0,
  overflow: 'hidden',
  backgroundColor: 'transparent',

  hoverStyle: {
    backgroundColor: 'transparent',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.4,
        pointerEvents: 'none',
      },
    },
  } as const,
});

const CLOSE_BUTTON_CLASSES = [
  'text-[var(--closeButton-fg,currentColor)]',
  'hover:text-[var(--hover-color,currentColor)]',
  'disabled:opacity-40',
].join(' ');

export interface CloseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  readonly variant?: 'plain';
  readonly size?: 'md';
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const { variant: _variant, size: _size, className, children, ...rest } = props;

  return (
    <CloseButtonFrame
      ref={ref as any}
      className={[CLOSE_BUTTON_CLASSES, className].filter(Boolean).join(' ')}
      {...(rest as any)}
    >
      {children ?? (
        <svg
          className="size-5"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={CLOSE_ICON_PATH}
            fill="currentColor"
          />
        </svg>
      )}
    </CloseButtonFrame>
  );
});
