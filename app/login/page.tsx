// app/login/page.tsx
'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const signIn = auth?.signIn;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};

    // 1. Email check
    if (!email.trim()) {
      errs.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = "Please enter a valid email address";
      }
    }

    // 2. Password check
    if (!password) {
      errs.password = "Password is required";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      if (!signIn) return;
      setIsSubmitting(true);
      try {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          setAuthError(error.message);
        } else {
          router.push('/');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAuthError(err.message);
        } else {
          setAuthError('An unexpected error occurred');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-[radial-gradient(circle_at_15%_20%,#1e40af_0%,transparent_45%),radial-gradient(circle_at_85%_80%,#4338ca_0%,transparent_45%),#090d16]">
      <Card className="w-full max-w-[440px] border-none bg-white/95 shadow-2xl shadow-black/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-400">
        {/* Header */}
        <CardHeader className="items-center text-center gap-2 pt-8">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 text-2xl shadow-sm shadow-blue-600/12">
            🔒
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 pb-8">
          {/* Auth error banner */}
          {authError && (
            <div
              data-testid="error-auth"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
            >
              {authError}
            </div>
          )}

          {/* Form */}
          <form data-testid="login-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-email">Email or Username</Label>
              <Input
                id="login-email"
                data-testid="login-email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    const newErrs = { ...errors };
                    delete newErrs.email;
                    setErrors(newErrs);
                  }
                  if (authError) {
                    setAuthError(null);
                  }
                }}
                placeholder="name@example.com"
                className={`h-11 rounded-xl px-4 text-base ${errors.email ? 'border-red-500 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {errors.email && (
                <p data-testid="error-email" className="text-xs font-semibold text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                data-testid="login-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    const newErrs = { ...errors };
                    delete newErrs.password;
                    setErrors(newErrs);
                  }
                  if (authError) {
                    setAuthError(null);
                  }
                }}
                placeholder="••••••••"
                className={`h-11 rounded-xl px-4 text-base ${errors.password ? 'border-red-500 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {errors.password && (
                <p data-testid="error-password" className="text-xs font-semibold text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm -mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded accent-blue-600 cursor-pointer" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-blue-600 no-underline hover:text-blue-700 hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              data-testid="login-submit"
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/35 hover:shadow-lg hover:shadow-blue-600/45 hover:-translate-y-px active:translate-y-0 transition-all mt-1 cursor-pointer"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer links */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-600 no-underline hover:text-blue-700 hover:underline transition-colors">
              Register
            </Link>
          </p>

          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground/70 no-underline hover:text-muted-foreground transition-colors">
              ← Back to Store
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}