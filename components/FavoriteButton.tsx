'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({
  productId,
  className = '',
  showText = false,
}: FavoriteButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    toggleFavorite(productId);
  };

  return (
    <button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={isFav ? "true" : "false"}
      onClick={handleClick}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg p-2.5 transition-all cursor-pointer ${
        isFav
          ? 'text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 shadow-xs'
          : 'text-muted-foreground bg-muted/50 hover:bg-muted hover:text-red-500 border border-border/40'
      } ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-transform duration-200 active:scale-125 ${
          isFav ? 'fill-red-500 text-red-500' : 'text-current'
        }`}
      />
      {showText && (
        <span className="text-sm font-semibold">
          {isFav ? 'In Favorites' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}

export default FavoriteButton;
