'use client';

import { createGui } from '@hanzogui/core';
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

// Initialize @hanzogui once at module scope — guarded for SSR (no window).
// Must be synchronous: child components need config during first render,
// before useEffect fires. 7.3.1 used useEffect which was too late (Err0).
if (typeof window !== 'undefined') {
  createGui({ settings: { autocompleteSpecificTokens: 'except-special' } });
}

const defaultQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 30_000 } },
});

interface AppProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export const AppProvider = ({ children, queryClient }: AppProviderProps) => {
  return (
    <QueryClientProvider client={ queryClient ?? defaultQueryClient }>
      { children }
    </QueryClientProvider>
  );
};

// Re-export tanstack hooks so consumers never import @tanstack/react-query directly
export { QueryClient, useQueryClient, useQuery, useMutation, useInfiniteQuery };
