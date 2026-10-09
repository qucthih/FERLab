// app/products/[id]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return {
      title: "Product Not Found | StoreDemo",
    };
  }

  return {
    title: `${product.name} | StoreDemo`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            data-testid="link-back"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            ← Back to Store
          </Link>
        </div>

        {/* Product Detail Container */}
        <div
          data-testid="product-detail"
          className="grid grid-cols-1 gap-10 rounded-2xl border border-border/70 bg-card p-6 shadow-lg md:grid-cols-2 md:p-10"
        >
          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/40 shadow-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {/* Category */}
              <div>
                <span
                  data-testid="detail-category"
                  className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                >
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1
                data-testid="detail-name"
                className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="detail-price"
                  className="text-3xl font-extrabold text-blue-600"
                >
                  ${product.price}
                </span>
                <span className="text-xs text-muted-foreground">USD (Incl. taxes)</span>
              </div>

              {/* Description */}
              <div className="border-t border-b border-border/60 py-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Description
                </h3>
                <p
                  data-testid="detail-description"
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {product.description}
                </p>
              </div>

              {/* Specifications / Highlights */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="font-semibold text-muted-foreground">Product ID</p>
                  <p className="font-bold text-foreground">#{product.id}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="font-semibold text-muted-foreground">Availability</p>
                  <p className="font-bold text-green-600">In Stock</p>
                </div>
              </div>
            </div>

            {/* Actions: Favorite and Add to Cart */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border/60">
              <FavoriteButton productId={product.id} showText className="h-12 px-5" />
              <Button
                size="lg"
                className="flex-1 h-12 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
