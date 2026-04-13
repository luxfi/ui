'use client';

import { createGui } from '@hanzogui/core';
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

// Initialize @hanzogui once at module load
let _guiInitialized = false;
function ensureGui() {
  if (_guiInitialized) return;
  createGui({ settings: { autocompleteSpecificTokens: 'except-special' } });
  _guiInitialized = true;
}
ensureGui();

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
