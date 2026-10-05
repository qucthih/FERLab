// app/register/page.tsx
'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const signUp = auth?.signUp;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // 1. Full name: empty or spaces only
    if (!fullName.trim()) {
      errs.name = "Full name is required";
    }

    // 2. Email: empty or invalid
    if (!email.trim()) {
      errs.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = "Please enter a valid email address";
      }
    }

    // 3. Password: empty or < 6 chars
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    // 4. Confirm password: empty or mismatch
    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSuccess(false);

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      if (!signUp) return;
      setIsSubmitting(true);
      try {
        const { error } = await signUp(email.trim(), password);
        if (error) {
          setAuthError(error.message);
          setSuccess(false);
        } else {
          setSuccess(true);
          setAuthError(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAuthError(err.message);
        } else {
          setAuthError('An unexpected error occurred');
        }
        setSuccess(false);
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
            ✨
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground">Join StoreDemo today to start shopping</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 pb-8">
          {/* Auth Error Banner */}
          {authError && (
            <div
              data-testid="error-auth"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
            >
              {authError}
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div
              data-testid="form-success"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700"
            >
              Registration successful
            </div>
          )}

          {/* Form */}
          <form data-testid="register-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-name">Full Name</Label>
              <Input
                id="register-name"
                data-testid="register-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.name) {
                    const newErrs = { ...errors };
                    delete newErrs.name;
                    setErrors(newErrs);
                  }
                  if (authError) {
                    setAuthError(null);
                  }
                }}
                placeholder="John Doe"
                className={`h-11 rounded-xl px-4 text-base ${errors.name ? 'border-red-500 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {errors.name && (
                <p data-testid="error-name" className="text-xs font-semibold text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-email">Email Address</Label>
              <Input
                id="register-email"
                data-testid="register-email"
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
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                data-testid="register-password"
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
                placeholder="At least 6 characters"
                className={`h-11 rounded-xl px-4 text-base ${errors.password ? 'border-red-500 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {errors.password && (
                <p data-testid="error-password" className="text-xs font-semibold text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-confirm-password">Confirm Password</Label>
              <Input
                id="register-confirm-password"
                data-testid="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    const newErrs = { ...errors };
                    delete newErrs.confirmPassword;
                    setErrors(newErrs);
                  }
                  if (authError) {
                    setAuthError(null);
                  }
                }}
                placeholder="Re-type your password"
                className={`h-11 rounded-xl px-4 text-base ${errors.confirmPassword ? 'border-red-500 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-red-500/20' : ''}`}
              />
              {errors.confirmPassword && (
                <p data-testid="error-confirm-password" className="text-xs font-semibold text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              data-testid="register-submit"
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/35 hover:shadow-lg hover:shadow-blue-600/45 hover:-translate-y-px active:translate-y-0 transition-all mt-1 cursor-pointer"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>

          {/* Footer links */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 no-underline hover:text-blue-700 hover:underline transition-colors">
              Sign In
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