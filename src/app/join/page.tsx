"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useBasket } from "@/lib/basket";
import {
  QrCode,
  Sparkles,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  User,
  MapPin,
  MessageCircle,
  Copy,
  Clock,
} from "lucide-react";

export default function JoinPointsPage() {
  const { showToast } = useToast();
  const { count: basketCount } = useBasket();

  // Form states
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [locality, setLocality] = useState("Sudama Nagar");
  const [consentGiven, setConsentGiven] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMember, setSuccessMember] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      showToast("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9", "error");
      return;
    }

    if (!name.trim()) {
      showToast("Please enter your name", "error");
      return;
    }

    if (!consentGiven) {
      showToast("Please accept the DPDP Act consent to join", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone,
          name: name.trim(),
          locality,
          consentGiven: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      setSuccessMember(data.customer);
      showToast(data.message || "Welcome to Cotton Junction Family Club!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* HERO SECTION */}
        <div className="bg-forest-800 text-white px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-4xl text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3.5 py-1 text-[13px] font-bold text-amber-300">
                <Gift className="h-4 w-4" />
                <span>Counter QR Special • 50 Welcome Points</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1 text-[13px] font-extrabold text-charcoal-950 shadow-xs">
                <span>🎉 8th Anniversary Edition</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Cotton Junction Family Points Club
            </h1>

            <p className="text-[16px] sm:text-[18px] text-linen-200 max-w-2xl mx-auto font-normal">
              Join 1,200+ Indore families earning ₹1 instant cash discount for every point. Scan at our Sudama Nagar billing counter or sign up below in 10 seconds.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {!successMember ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Standee Preview Card (Left 5 Cols) */}
              <div className="md:col-span-5 rounded-3xl border-2 border-dashed border-amber-400/60 bg-linear-to-b from-white to-amber-50/50 p-6 shadow-card text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-charcoal-950 shadow-xs">
                  <QrCode className="h-8 w-8" />
                </div>

                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-charcoal-500">
                    Billing Counter Standee
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900 mt-1">
                    Instant ₹50 In-Store Discount
                  </h3>
                </div>

                <div className="rounded-2xl border border-linen-300 bg-white p-4 shadow-inner">
                  <div className="relative w-44 h-44 mx-auto bg-linen-100 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-linen-300">
                    {/* Visual QR representation */}
                    <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col items-center justify-center border border-charcoal-200">
                      <QrCode className="h-32 w-32 text-forest-800" />
                    </div>
                  </div>
                  <p className="text-[12px] text-charcoal-600 mt-2 font-medium">
                    Tabletop standee at 634 Sudama Nagar Main Rd
                  </p>
                </div>

                <div className="space-y-2 text-left text-[13px] text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest-800 shrink-0" />
                    <span>50 Points credited instantly on signup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest-800 shrink-0" />
                    <span>1 Point = ₹1 redeemable against any garment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest-800 shrink-0" />
                    <span>Earn 1 point for every ₹100 spent in store</span>
                  </div>
                </div>
              </div>

              {/* Fast Registration Form (Right 7 Cols) */}
              <div className="md:col-span-7 bg-white rounded-3xl border border-linen-300 p-6 sm:p-8 shadow-card">
                <div className="mb-6">
                  <Badge variant="cotton" size="sm" className="mb-2">
                    Quick 10-Second Sign Up
                  </Badge>
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                    Claim Your 50 Welcome Points
                  </h2>
                  <p className="text-[14px] text-charcoal-600 mt-1">
                    No OTP hassle. Simply provide your 10-digit mobile to link points.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Phone input */}
                  <div>
                    <label className="text-[14px] font-semibold text-charcoal-900 block mb-1.5">
                      Mobile Number <span className="text-terracotta-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-charcoal-500 text-[15px] font-semibold">
                        <span>🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98260 12345"
                        className="w-full min-h-[48px] rounded-xl border border-linen-300 bg-linen-50 pl-24 pr-4 text-[16px] font-medium text-charcoal-900 placeholder:text-charcoal-400 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
                      />
                    </div>
                  </div>

                  {/* Name input */}
                  <div>
                    <label className="text-[14px] font-semibold text-charcoal-900 block mb-1.5">
                      Full Name <span className="text-terracotta-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full min-h-[48px] rounded-xl border border-linen-300 bg-linen-50 pl-10 pr-4 text-[15px] font-medium text-charcoal-900 placeholder:text-charcoal-400 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
                      />
                    </div>
                  </div>

                  {/* Locality input */}
                  <div>
                    <label className="text-[14px] font-semibold text-charcoal-900 block mb-1.5">
                      Indore Area / Locality
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full min-h-[48px] rounded-xl border border-linen-300 bg-linen-50 pl-10 pr-4 text-[15px] font-medium text-charcoal-900 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
                      >
                        <option value="Sudama Nagar">Sudama Nagar (Near Store)</option>
                        <option value="Usha Nagar">Usha Nagar</option>
                        <option value="Annapurna Road">Annapurna Road</option>
                        <option value="Rajendra Nagar">Rajendra Nagar</option>
                        <option value="Ranjeet Hanuman">Ranjeet Hanuman</option>
                        <option value="Vijay Nagar">Vijay Nagar</option>
                        <option value="Other Indore Area">Other Indore Area</option>
                      </select>
                    </div>
                  </div>

                  {/* DPDP Act 2023 Compliance Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-linen-400 text-forest-800 focus:ring-forest-800 shrink-0"
                      />
                      <span className="text-[12px] sm:text-[13px] text-charcoal-600 leading-snug">
                        <strong>DPDP Act 2023 Consent:</strong> I consent to Cotton Junction storing my mobile number solely for loyalty points tracking, discount redemption, and order updates. Cotton Junction does not sell or share customer data with any third party.
                      </span>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      rightIcon={<ArrowRight className="h-5 w-5" />}
                    >
                      {isSubmitting ? "Crediting 50 Points..." : "Claim 50 Welcome Points"}
                    </Button>
                  </div>

                  <p className="text-center text-[13px] text-charcoal-500 pt-1">
                    Already a member?{" "}
                    <Link href="/points" className="font-semibold text-forest-800 hover:underline">
                      Check your points balance here &rarr;
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          ) : (
            /* SUCCESS CELEBRATION CARD */
            <div className="mx-auto max-w-xl rounded-3xl border-2 border-forest-800 bg-white p-6 sm:p-10 shadow-card text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-800 text-amber-400 shadow-subtle animate-bounce">
                <Sparkles className="h-10 w-10" />
              </div>

              <div>
                <Badge variant="amber" size="md" className="mb-2">
                  Welcome Bonus Credited
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-charcoal-900">
                  Welcome to the Family, {successMember.name}!
                </h2>
                <p className="text-[15px] text-charcoal-600 mt-1">
                  Your Cotton Junction Family Points Membership is now active.
                </p>
              </div>

              {/* Digital Pass / Member Card */}
              <div className="rounded-2xl border border-forest-800 bg-linear-to-br from-forest-800 via-forest-900 to-charcoal-950 p-6 text-white text-left shadow-card relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image
                        src="/brand/logo.svg"
                        alt="Cotton Junction"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-serif text-lg font-bold text-amber-400">
                      Cotton Junction
                    </span>
                  </div>
                  <Badge variant="amber" size="sm">
                    {successMember.tier}
                  </Badge>
                </div>

                <div className="my-3">
                  <div className="text-[12px] text-linen-300 uppercase tracking-wider">
                    Available Discount Balance
                  </div>
                  <div className="text-3xl font-bold font-serif text-amber-300">
                    {successMember.pointsBalance} Points (₹{successMember.pointsBalance} Off)
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/20 text-[13px]">
                  <div>
                    <span className="text-linen-300">Member ID:</span>{" "}
                    <span className="font-mono font-bold text-white">{successMember.id}</span>
                  </div>
                  <div>
                    <span className="text-linen-300">Phone:</span>{" "}
                    <span className="font-bold text-white">+91 {successMember.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Explore Pure Cotton Collection
                  </Button>
                </Link>
                <Link href="/points" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" fullWidth>
                    View Points Ledger
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
