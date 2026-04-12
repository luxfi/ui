import {
  Tooltip as GuiTooltip,
  TooltipGroup as GuiTooltipGroup,
} from '@hanzogui/tooltip';
import { useClickAway } from '@uidotdev/usehooks';
import * as React from 'react';

import { cn } from './utils';

// Inline useIsMobile hook (matches lg breakpoint = 1024px)
const LG_BREAKPOINT = 1024;

function useIsMobile(): boolean {
  const [ isMobile, setIsMobile ] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < LG_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${ LG_BREAKPOINT - 1 }px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

/** Map placement string to @hanzogui Popper placement prop. */
function mapPlacement(p: string | undefined): string | undefined {
  if (!p) return undefined;
  // @hanzogui/popper uses same placement strings as floating-ui
  return p;
}

export interface TooltipProps {
  selected?: boolean;
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  triggerProps?: React.HTMLAttributes<HTMLButtonElement>;
  disabled?: boolean;
  disableOnMobile?: boolean;
  children?: React.ReactNode;
  variant?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  closeDelay?: number;
  openDelay?: number;
  interactive?: boolean;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
  positioning?: {
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    overflowPadding?: number;
    offset?: { mainAxis?: number; crossAxis?: number };
  };
  closeOnClick?: boolean;
  closeOnPointerDown?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow: showArrowProp,
      onOpenChange,
      variant,
      selected,
      children,
      disabled,
      disableOnMobile,
      content,
      contentProps,
      defaultOpen = false,
      triggerProps,
      closeDelay = 100,
      openDelay = 100,
      interactive,
      positioning,
    } = props;

    const [ open, setOpen ] = React.useState<boolean>(defaultOpen);
    const timeoutRef = React.useRef<number | null>(null);

    const isMobile = useIsMobile();

    const handleOpenChange = React.useCallback((nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.({ open: nextOpen });
    }, [ onOpenChange ]);

    const handleOpenChangeManual = React.useCallback((nextOpen: boolean) => {
      timeoutRef.current && window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpen(nextOpen);
        onOpenChange?.({ open: nextOpen });
      }, nextOpen ? openDelay : closeDelay);
    }, [ closeDelay, openDelay, onOpenChange ]);

    const handleClickAway = React.useCallback(() => {
      handleOpenChangeManual(false);
    }, [ handleOpenChangeManual ]);

    const triggerRef = useClickAway<HTMLButtonElement>(handleClickAway);

    const handleTriggerClick = React.useCallback(() => {
      handleOpenChangeManual(!open);
    }, [ handleOpenChangeManual, open ]);

    const handleContentClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (interactive) {
        const closestLink = (event.target as HTMLElement)?.closest('a');
        if (closestLink) {
          handleOpenChangeManual(false);
        }
      }
    }, [ interactive, handleOpenChangeManual ]);

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    if (disabled || (disableOnMobile && isMobile)) return children;

    const defaultShowArrow = variant === 'popover' ? false : true;
    const showArrow = showArrowProp !== undefined ? showArrowProp : defaultShowArrow;

    const isPopover = variant === 'popover';

    const placement = mapPlacement(positioning?.placement) ?? 'top';
    const offset = positioning?.offset?.mainAxis ?? 4;

    return (
      <GuiTooltipGroup delay={ openDelay }>
        <GuiTooltip
          open={ open }
          onOpenChange={ handleOpenChange }
          delay={{ open: openDelay, close: closeDelay }}
          placement={ placement as any }
          offset={ offset }
          unstyled
        >
          <GuiTooltip.Trigger
            ref={ open ? triggerRef : undefined }
            asChild
            {...(isMobile ? { onPress: handleTriggerClick } : {})}
            { ...triggerProps as any }
          >
            { children }
          </GuiTooltip.Trigger>

          <GuiTooltip.Content
            ref={ ref }
            unstyled
            className={ cn(
              'z-[9999] overflow-hidden rounded-lg px-3 py-2 text-sm',
              'animate-in fade-in-0 zoom-in-95',
              isPopover && 'bg-[var(--color-popover-bg)] text-[var(--color-text-primary)]',
              isPopover && 'shadow-[var(--shadow-popover)] border border-[var(--color-border-divider)] max-w-sm',
              !isPopover && 'bg-[var(--color-tooltip-bg)] text-[var(--color-tooltip-fg)] max-w-xs',
              contentProps?.className,
            ) }
            onClick={ interactive ? handleContentClick : undefined }
            { ...(selected ? { 'data-selected': true } : {}) }
            { ...contentProps as any }
          >
            { showArrow && (
              <GuiTooltip.Arrow
                unstyled
                className={ cn(
                  isPopover ? 'fill-[var(--color-popover-bg)]' : 'fill-[var(--color-tooltip-bg)]',
                ) }
              />
            ) }
            { content }
          </GuiTooltip.Content>
        </GuiTooltip>
      </GuiTooltipGroup>
    );
  },
);
