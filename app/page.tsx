// app/page.tsx
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";

interface HomePageProps {
  searchParams?: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const queryStr = resolvedParams.q?.trim() || "";
  const categoryStr = resolvedParams.category?.trim() || "";

  // Get unique categories for select options
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products on the server
  let filteredProducts = products;

  if (queryStr) {
    const qLower = queryStr.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower)
    );
  }

  if (categoryStr) {
    const catLower = categoryStr.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === catLower
    );
  }

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

      {/* Filter & Search Form */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <form
          method="get"
          action="/"
          className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              name="q"
              data-testid="search-input"
              defaultValue={queryStr}
              placeholder="Search products by title or description..."
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              name="category"
              data-testid="category-select"
              defaultValue={categoryStr}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            data-testid="btn-search"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:translate-y-px transition-colors"
          >
            Search
          </button>
        </form>
      </section>

      {/* Product Grid / Empty State */}
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <div className="mb-7 flex items-end justify-between border-b-2 border-border pb-3">
          <h2 className="text-xl font-extrabold text-foreground">
            {queryStr || categoryStr ? "Search Results" : "Featured Products"}
          </h2>
          <span className="text-sm font-medium text-muted-foreground">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            data-testid="no-results"
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 py-16 text-center"
          >
            <div className="mb-3 text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-foreground">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">
              We couldn&apos;t find any products matching your search criteria. Try different keywords or reset filters.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}