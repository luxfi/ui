import '@hanzogui/polyfill-dev';
import { type Delay } from '@hanzogui/floating';
import type { PopoverAnchorProps, PopoverContentProps, PopoverTriggerProps } from '@hanzogui/popover';
import type { PopperProps } from '@hanzogui/popper';
import * as React from 'react';
export type TooltipScopes = string;
type ScopedProps<P> = Omit<P, 'scope'> & {
    scope?: TooltipScopes;
};
export type TooltipContentProps = ScopedProps<PopoverContentProps>;
export type TooltipProps = ScopedProps<PopperProps & {
    open?: boolean;
    unstyled?: boolean;
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    focus?: {
        enabled?: boolean;
        visibleOnly?: boolean;
    };
    groupId?: string;
    restMs?: number;
    delay?: number | {
        open?: number;
        close?: number;
    };
    disableAutoCloseOnScroll?: boolean;
    /**
     * z-index for the tooltip portal. Use this when tooltips need to appear
     * above other portaled content like dialogs.
     */
    zIndex?: number;
}>;
export declare const TooltipGroup: ({ children, delay, preventAnimation, timeoutMs, }: {
    children?: any;
    delay: Delay;
    preventAnimation?: boolean;
    timeoutMs?: number;
}) => React.JSX.Element;
export declare const closeOpenTooltips: () => void;
export declare const Tooltip: React.ForwardRefExoticComponent<Omit<PopperProps & {
    open?: boolean;
    unstyled?: boolean;
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    focus?: {
        enabled?: boolean;
        visibleOnly?: boolean;
    };
    groupId?: string;
    restMs?: number;
    delay?: number | {
        open?: number;
        close?: number;
    };
    disableAutoCloseOnScroll?: boolean;
    /**
     * z-index for the tooltip portal. Use this when tooltips need to appear
     * above other portaled content like dialogs.
     */
    zIndex?: number;
}, "scope"> & {
    scope?: TooltipScopes;
} & React.RefAttributes<unknown>> & {
    Anchor: React.ForwardRefExoticComponent<Omit<ScopedProps<PopoverAnchorProps>, "ref"> & React.RefAttributes<unknown>>;
    Arrow: React.ForwardRefExoticComponent<any>;
    Content: any;
    Trigger: React.ForwardRefExoticComponent<Omit<ScopedProps<PopoverTriggerProps>, "ref"> & React.RefAttributes<unknown>>;
};
export {};
//# sourceMappingURL=Tooltip.d.ts.map