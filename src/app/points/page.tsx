"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useBasket } from "@/lib/basket";
import { formatINR } from "@/lib/utils";
import {
  Sparkles,
  Gift,
  QrCode,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Receipt,
  ShieldCheck,
  Percent,
} from "lucide-react";

export default function FamilyPointsPage() {
  const { showToast } = useToast();
  const { count: basketCount } = useBasket();

  // Search state
  const [phoneQuery, setPhoneQuery] = useState("9826012345");
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // In-store redemption simulation
  const [redeemPoints, setRedeemPoints] = useState<number>(50);
  const [isRedeeming, setIsRedeeming] = useState(false);

  // Auto fetch initial demo customer on mount
  useEffect(() => {
    fetchCustomer("9826012345");
  }, []);

  const fetchCustomer = async (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/points?phone=${clean}`);
      const data = await res.json();
      if (res.ok && data.found) {
        setCustomer(data.customer);
      } else {
        setCustomer(null);
      }
    } catch (e) {
      console.error(e);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomer(phoneQuery);
  };

  // Simulate in-store discount redemption
  const handleRedeem = async () => {
    if (!customer) return;
    if (customer.pointsBalance < redeemPoints) {
      showToast(`You have ${customer.pointsBalance} points available to redeem`, "error");
      return;
    }

    setIsRedeeming(true);
    try {
      const res = await fetch("/api/points", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: customer.phone,
          pointsToRedeem: redeemPoints,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCustomer(data.customer);
      showToast(data.message, "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* HERO SECTION */}
        <div className="bg-forest-800 text-white px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-4xl text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3.5 py-1 text-[13px] font-bold text-amber-300">
              <Gift className="h-4 w-4" />
              <span>1 Point = ₹1 Cash Discount</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Family Rewards &amp; Points Ledger
            </h1>

            <p className="text-[16px] sm:text-[18px] text-linen-200 max-w-2xl mx-auto font-normal">
              Check your points balance, redeem cash discounts at our billing counter, or view your past trial &amp; purchase history.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
          {/* PHONE SEARCH & DEMO CHIPS */}
          <div className="rounded-3xl border border-linen-300 bg-white p-6 shadow-card">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <label className="text-[15px] font-semibold text-charcoal-900 block">
                Lookup by 10-Digit Mobile Number
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-500 font-semibold text-[15px]">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneQuery}
                    onChange={(e) => setPhoneQuery(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full min-h-[48px] rounded-xl border border-linen-300 bg-linen-50 pl-24 pr-4 text-[16px] font-medium text-charcoal-900 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isLoading}
                  leftIcon={<Search className="h-4 w-4" />}
                >
                  {isLoading ? "Searching..." : "Check Balance"}
                </Button>
              </div>

              {/* Quick Demo Pre-fill Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[13px]">
                <span className="font-medium text-charcoal-500">Quick Test Profiles:</span>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneQuery("9826012345");
                    fetchCustomer("9826012345");
                  }}
                  className="rounded-full border border-linen-300 bg-linen-100 px-3 py-1 font-semibold text-charcoal-800 hover:bg-forest-100 hover:text-forest-800 transition-colors"
                >
                  Rajesh (Gold • 350 pts)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneQuery("9826098765");
                    fetchCustomer("9826098765");
                  }}
                  className="rounded-full border border-linen-300 bg-linen-100 px-3 py-1 font-semibold text-charcoal-800 hover:bg-forest-100 hover:text-forest-800 transition-colors"
                >
                  Pooja (Silver • 190 pts)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneQuery("6264673265");
                    fetchCustomer("6264673265");
                  }}
                  className="rounded-full border border-linen-300 bg-linen-100 px-3 py-1 font-semibold text-charcoal-800 hover:bg-forest-100 hover:text-forest-800 transition-colors"
                >
                  VIP Demo (Diamond • 500 pts)
                </button>
              </div>
            </form>
          </div>

          {/* CUSTOMER LEDGER DISPLAY */}
          {customer ? (
            <div className="space-y-6">
              {/* Top Digital Membership Card */}
              <div className="rounded-3xl border border-forest-800 bg-linear-to-br from-forest-800 via-forest-900 to-charcoal-950 p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-xl bg-white/10 p-1">
                      <Image
                        src="/brand/logo.svg"
                        alt="Cotton Junction"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white">
                        {customer.name}
                      </h2>
                      <p className="text-[13px] text-linen-300">
                        {customer.locality} • Member since {customer.joinedDate}
                      </p>
                    </div>
                  </div>

                  <Badge variant="amber" size="md">
                    {customer.tier}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs">
                    <div className="text-[12px] uppercase tracking-wider text-linen-300">
                      Available Points
                    </div>
                    <div className="text-3xl font-bold text-amber-300 font-serif mt-1">
                      {customer.pointsBalance}
                    </div>
                    <div className="text-[12px] text-linen-200 mt-0.5">
                      = ₹{customer.pointsBalance} instant discount
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs">
                    <div className="text-[12px] uppercase tracking-wider text-linen-300">
                      Lifetime Spend
                    </div>
                    <div className="text-3xl font-bold text-white font-serif mt-1">
                      {formatINR(customer.lifetimeSpent)}
                    </div>
                    <div className="text-[12px] text-linen-200 mt-0.5">
                      at Sudama Nagar store
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs flex flex-col justify-between">
                    <div>
                      <div className="text-[12px] uppercase tracking-wider text-linen-300">
                        Counter Member ID
                      </div>
                      <div className="text-xl font-mono font-bold text-amber-300 mt-1">
                        {customer.id}
                      </div>
                    </div>
                    <div className="text-[11px] text-linen-300 flex items-center gap-1 mt-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                      <span>DPDP Act 2023 Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* In-Store Billing Discount Simulator */}
              <div className="rounded-3xl border border-linen-300 bg-white p-6 shadow-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">
                      Redeem at Cashier Counter
                    </h3>
                    <p className="text-[14px] text-charcoal-600 mt-0.5">
                      Tell the cashier your mobile (+91 {customer.phone}) or tap below to simulate ₹1/point bill deduction.
                    </p>
                  </div>
                  <Badge variant="cotton">1 Point = ₹1</Badge>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {[50, 100, 200].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      disabled={customer.pointsBalance < pts}
                      onClick={() => setRedeemPoints(pts)}
                      className={`min-h-[44px] rounded-xl px-4 text-[14px] font-bold transition-all ${
                        redeemPoints === pts
                          ? "bg-forest-800 text-white shadow-xs"
                          : "border border-linen-300 bg-linen-50 text-charcoal-800 hover:bg-linen-100"
                      } ${customer.pointsBalance < pts ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      Redeem ₹{pts} Off ({pts} Pts)
                    </button>
                  ))}

                  <Button
                    variant="amber"
                    size="md"
                    disabled={isRedeeming || customer.pointsBalance < redeemPoints}
                    onClick={handleRedeem}
                  >
                    {isRedeeming ? "Applying Discount..." : `Apply ₹${redeemPoints} Discount to Bill`}
                  </Button>
                </div>
              </div>

              {/* Points History & Transactions Ledger */}
              <div className="rounded-3xl border border-linen-300 bg-white p-6 shadow-card space-y-4">
                <h3 className="font-serif text-xl font-bold text-charcoal-900 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-forest-800" />
                  <span>Points Activity History</span>
                </h3>

                <div className="divide-y divide-linen-200">
                  {customer.transactions?.map((tx: any) => (
                    <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[14px] font-semibold text-charcoal-900">
                          {tx.description}
                        </div>
                        <div className="text-[12px] text-charcoal-500 mt-0.5 flex items-center gap-2">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span className="font-mono">{tx.id}</span>
                        </div>
                      </div>

                      <div
                        className={`text-[16px] font-bold font-mono ${
                          tx.points > 0 ? "text-forest-800" : "text-terracotta-600"
                        }`}
                      >
                        {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="rounded-3xl border border-linen-300 bg-white p-8 text-center shadow-card space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Gift className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                Member Not Registered Yet
              </h3>
              <p className="text-[15px] text-charcoal-600 max-w-md mx-auto">
                No points account found for +91 {phoneQuery}. Register in 10 seconds to receive 50 Welcome Points immediately!
              </p>
              <Link href="/join">
                <Button variant="primary" size="lg">
                  Join &amp; Claim 50 Free Points &rarr;
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
