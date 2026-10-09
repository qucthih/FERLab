// app/loading.tsx
export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-md" />
        <p className="text-base font-semibold text-muted-foreground animate-pulse">
          Loading content...
        </p>
      </div>
    </div>
  );
}
