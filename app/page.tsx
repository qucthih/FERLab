// app/page.tsx
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header – sticky glassmorphism bar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-extrabold text-white shadow-md shadow-blue-600/25">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Store<span className="text-blue-600">Demo</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              data-testid="btn-login"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground no-underline hover:bg-muted hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              data-testid="btn-register"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-gradient-to-br from-blue-600 to-blue-700 text-white no-underline shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:-translate-y-px transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="mx-auto mt-8 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-10 py-12 text-white shadow-2xl shadow-slate-900/30">
          <div className="pointer-events-none absolute -top-1/2 -right-1/5 h-[500px] w-[500px] rounded-full bg-blue-500/25 blur-3xl" />
          <span className="inline-block rounded-full border border-blue-500/40 bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 mb-4">
            Exclusive Collection 2026
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-3 md:text-4xl">
            Discover Premium Lifestyle Products
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-400">
            Explore our curated accessories, tech wear, and daily essentials designed with precision and elegance.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="mb-7 flex items-end justify-between border-b-2 border-border pb-3">
          <h2 className="text-xl font-extrabold text-foreground">Featured Products</h2>
          <span className="text-sm font-medium text-muted-foreground">
            Showing {products.length} curated items
          </span>
        </div>

        <div
          data-testid="product-list"
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </main>
    </div>
  );
}