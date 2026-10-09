// app/error.tsx
'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div
      data-testid="error-boundary"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50/60 p-8 shadow-xl dark:border-red-900/50 dark:bg-red-950/20">
        <div className="mb-4 text-4xl">⚠️</div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
          Something went wrong!
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred while processing your request."}
        </p>
        <button
          type="button"
          data-testid="btn-retry"
          onClick={() => reset()}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
