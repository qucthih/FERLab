'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const user = auth?.user;
  const loading = auth?.loading;
  const signOut = auth?.signOut;

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
          <p className="text-sm font-medium text-muted-foreground">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    if (signOut) {
      await signOut();
      router.push('/login');
    }
  };

  return (
    <div data-testid="account-page" className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Account Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your personal profile and account credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User overview card */}
          <Card className="md:col-span-1 border-border/70 shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-6 gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-md shadow-blue-600/30">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="w-full">
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">
                  Active User
                </p>
                <p data-testid="account-email" className="text-base font-bold text-foreground break-all">
                  {user.email}
                </p>
              </div>
              <div className="w-full pt-4 border-t border-border/70">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full rounded-xl cursor-pointer"
                >
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account details card */}
          <Card className="md:col-span-2 border-border/70 shadow-lg">
            <CardHeader className="pb-3 border-b border-border/50">
              <h2 className="text-lg font-bold text-foreground">Account Information</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </span>
                <p className="text-sm font-medium text-foreground bg-muted/40 rounded-lg p-3 border border-border/40">
                  {user.email}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User ID (UUID)
                </span>
                <p className="text-xs font-mono text-muted-foreground bg-muted/40 rounded-lg p-3 border border-border/40 break-all">
                  {user.id}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last Sign In
                </span>
                <p className="text-sm font-medium text-foreground bg-muted/40 rounded-lg p-3 border border-border/40">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : 'Current session'}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  ← Return to Store
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
