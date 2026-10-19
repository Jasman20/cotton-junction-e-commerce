"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setOwnerAuthenticated } from "@/lib/ownerAuth";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function OwnerLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Accept default store PIN or configured credentials
    if (pin.trim() === "CJ2018" || pin.trim() === "6264673265" || pin.trim() === "admin") {
      setIsLoading(true);
      setOwnerAuthenticated(true);
      router.push("/owner/dashboard");
    } else {
      setError("Incorrect store security PIN. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linen-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-linen-300 shadow-card p-8 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="mx-auto relative h-16 w-16">
            <Image
              src="/brand/logo.svg"
              alt="Cotton Junction Diamond"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-forest-800">
              Cotton Junction
            </h1>
            <p className="text-[14px] text-charcoal-600 mt-0.5">
              Sudama Nagar • Private Store Manager Portal
            </p>
          </div>
        </div>

        {/* Security Alert Note */}
        <div className="rounded-xl bg-forest-50 border border-forest-200 p-3.5 flex items-start gap-3 text-[13px] text-forest-900">
          <ShieldCheck className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
          <div className="leading-snug">
            Private store operations. Customer reservations, in-store trial slots &amp; inventory control.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[14px] font-semibold text-charcoal-900 block mb-1.5">
              Store Access PIN / Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
              <input
                type={showPin ? "text" : "password"}
                autoFocus
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter store PIN (Demo: CJ2018)"
                className="w-full min-h-[48px] rounded-xl border border-linen-300 bg-linen-50 pl-10 pr-11 text-[16px] font-medium text-charcoal-900 placeholder:text-charcoal-400 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              >
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-[13px] font-semibold text-terracotta-600 bg-terracotta-50 p-2.5 rounded-lg border border-terracotta-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-forest-800 text-white text-[15px] font-bold shadow-subtle hover:bg-forest-900 transition-colors"
          >
            <span>{isLoading ? "Authenticating..." : "Open Store Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Quick Demo Divider */}
          <div className="relative flex py-2 items-center">
            <div className="grow border-t border-linen-300"></div>
            <span className="shrink mx-3 text-xs text-charcoal-400 uppercase font-semibold">or one-click access</span>
            <div className="grow border-t border-linen-300"></div>
          </div>

          {/* One-Click Instant Demo Login */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setOwnerAuthenticated(true);
              router.push("/owner/dashboard");
            }}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-forest-800 bg-forest-50 text-forest-800 text-[15px] font-bold hover:bg-forest-100 transition-colors"
          >
            <ShieldCheck className="h-5 w-5 text-forest-800" />
            <span>Instant Demo Login as Store Owner</span>
          </button>

          <div className="text-center pt-2 space-y-2">
            <div>
              <span className="text-[12px] text-charcoal-500">
                Store demo PIN: <code className="bg-linen-200 px-1.5 py-0.5 rounded font-mono font-bold text-forest-800">CJ2018</code>
              </span>
            </div>
            <div>
              <Link
                href="/"
                className="text-[13px] font-medium text-charcoal-600 hover:text-forest-800 underline underline-offset-4"
              >
                ← Return to Cotton Junction Store
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
