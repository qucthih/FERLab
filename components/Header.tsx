'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';

export function Header() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const signOut = auth?.signOut;
  const { favorites } = useFavorites();

  const handleLogout = async () => {
    if (signOut) {
      await signOut();
    }
  };

  return (
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

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/favorites"
              data-testid="link-favorites"
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground no-underline hover:bg-muted transition-colors"
            >
              <span>Favorites</span>
              <span
                data-testid="favorites-count"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white leading-none min-w-[20px]"
              >
                {favorites.length}
              </span>
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground no-underline hover:bg-muted transition-colors"
            >
              Account
            </Link>
            <span
              data-testid="user-email"
              className="max-w-[200px] truncate text-sm font-semibold text-blue-600 sm:max-w-none"
            >
              {user.email}
            </span>
            <button
              type="button"
              data-testid="btn-logout"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </header>
  );
}

export default Header;
