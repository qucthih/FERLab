// app/not-found.tsx
import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="min-h-screen bg-background font-sans text-foreground flex flex-col"
    >
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md rounded-2xl border border-border/70 bg-card p-8 shadow-xl">
          <div className="mb-4 text-5xl font-black text-blue-600">404</div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sorry, we could not find the page or product you were looking for. It might have been moved or removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
