// app/page.tsx
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header – sticky glassmorphism bar */}
      <Header />

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