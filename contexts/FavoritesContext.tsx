'use client';

import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export type FavoritesAction =
  | { type: 'SET'; payload: number[] }
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number };

export function favoritesReducer(state: number[], action: FavoritesAction): number[] {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return state.includes(action.payload) ? state : [...state, action.payload];
    case 'REMOVE':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

export interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchFavorites() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('favorites')
            .select('product_id');

          if (!error && data && isMounted) {
            const ids = data.map((item: { product_id: number }) => item.product_id);
            dispatch({ type: 'SET', payload: ids });
          }
        } catch (err) {
          console.error('Error fetching favorites:', err);
        }
      } else {
        dispatch({ type: 'SET', payload: [] });
      }
    }

    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isFavorite = (id: number): boolean => {
    return favorites.includes(Number(id));
  };

  const toggleFavorite = async (id: number): Promise<void> => {
    const numericId = Number(id);
    if (!user) return;

    const currentlyFavorite = favorites.includes(numericId);

    if (currentlyFavorite) {
      // Optimistic update: REMOVE
      dispatch({ type: 'REMOVE', payload: numericId });
      try {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('product_id', numericId);

        if (error) {
          // Rollback
          dispatch({ type: 'ADD', payload: numericId });
        }
      } catch {
        // Rollback
        dispatch({ type: 'ADD', payload: numericId });
      }
    } else {
      // Optimistic update: ADD
      dispatch({ type: 'ADD', payload: numericId });
      try {
        const { error } = await supabase
          .from('favorites')
          .insert({ product_id: numericId, user_id: user.id });

        if (error) {
          // Rollback
          dispatch({ type: 'REMOVE', payload: numericId });
        }
      } catch {
        // Rollback
        dispatch({ type: 'REMOVE', payload: numericId });
      }
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
