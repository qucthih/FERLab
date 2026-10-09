// app/favorites/page.tsx
'use client';

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { products } from '@/data/products';
import { Header } from '@/components/Header';
import { FavoriteButton } from '@/components/FavoriteButton';

export default function FavoritesPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const user = auth?.user;
  const loading = auth?.loading;
  const { favorites } = useFavorites();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Loading favorites...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div
      data-testid="favorites-page"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between border-b border-border/60 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              My Favorites
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your saved favorite products.
            </p>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {favoriteProducts.length === 0 ? (
          <div
            data-testid="favorites-empty"
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 py-16 text-center"
          >
            <div className="mb-3 text-4xl">❤️</div>
            <h3 className="text-lg font-bold text-foreground">No favorites yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">
              You haven&apos;t added any products to your favorites yet. Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                data-testid="favorite-item"
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:shadow-md"
              >
                {/* Link to Detail Page */}
                <Link
                  href={`/products/${product.id}`}
                  className="block group no-underline"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-foreground/75 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-sm tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-4 pb-2">
                    <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </Link>

                {/* Price and Actions */}
                <div className="flex items-center justify-between p-4 pt-2 border-t border-border/40">
                  <span className="text-lg font-extrabold text-blue-600">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <FavoriteButton productId={product.id} />
                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Detail →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
