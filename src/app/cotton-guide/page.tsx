"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useBasket } from "@/lib/basket";
import {
  Feather,
  Droplets,
  Sun,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MapPin,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function CottonGuidePage() {
  const { count: basketCount } = useBasket();

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* HERO SECTION */}
        <div className="bg-linen-100 border-b border-linen-200 px-4 py-8 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-4xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cotton">Fabric Knowledge</Badge>
              <Badge variant="default">Store Educational Guide</Badge>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 tracking-tight leading-tight">
              The Pure Cotton &amp; Fabric Guide
            </h1>
            <p className="mt-3 text-[17px] sm:text-[19px] text-charcoal-700 leading-relaxed max-w-2xl">
              An honest, practical guide to understanding pure cotton, branded surplus stock, and everyday garment care for Indore families.
            </p>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-12 text-left">
          {/* SECTION 1: WHY PURE COTTON FOR INDORE */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              Why Pure Cotton for Central India&apos;s Climate
            </h2>
            <p className="text-[16px] text-charcoal-700 leading-relaxed">
              Indore experiences extreme temperature variations—from dry hot summers exceeding 40°C to pleasant festival seasons. Pure cotton remains the most practical fabric choice for daily family wear for distinct physical reasons:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <Card className="p-5 space-y-2 border-linen-300">
                <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Feather className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Natural Breathability
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Cotton fibers allow air circulation between skin and fabric, preventing heat accumulation during humid summer afternoons.
                </p>
              </Card>

              <Card className="p-5 space-y-2 border-linen-300">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Droplets className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Moisture Absorption
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Cotton absorbs perspiration directly and releases it through evaporation, keeping skin feeling cool and dry.
                </p>
              </Card>

              <Card className="p-5 space-y-2 border-linen-300">
                <div className="h-10 w-10 rounded-xl bg-linen-200 text-charcoal-800 flex items-center justify-center">
                  <Sun className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Zero Static Cling
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Unlike synthetic polyesters and nylons, cotton does not accumulate static electricity or cling uncomfortably to the body.
                </p>
              </Card>
            </div>
          </section>

          {/* SECTION 2: WHAT IS BRANDED SURPLUS STOCK? */}
          <section className="rounded-3xl bg-linen-100 border border-linen-300 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="surplus">Store Origin Fact</Badge>
              <span className="text-[13px] font-medium text-charcoal-600">
                Started October 2018
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              Understanding Branded Surplus Stock
            </h2>

            <p className="text-[16px] text-charcoal-700 leading-relaxed">
              Cotton Junction started in a garage in October 2018 specializing in surplus stock. Many customers ask: <em>&ldquo;What does surplus stock actually mean?&rdquo;</em>
            </p>

            <div className="space-y-3 pt-1 text-[15px] text-charcoal-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Export &amp; Factory Overruns:</strong> When certified export apparel mills manufacture orders for domestic or international retail brands, they produce 3% to 5% buffer quantity to cover quality controls.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Genuine Fabric &amp; Stitch Quality:</strong> These garments use the exact same cotton yarn, durable stitch counts, and branded hardware as standard retail lots.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Accessible Pricing:</strong> Because surplus lots are purchased in bulk clearance, Cotton Junction passes the savings directly to families in Indore without retail brand markup.
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 3: HOW TO CARE FOR PURE COTTON */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              How to Care for Pure Cotton Garments
            </h2>
            <p className="text-[16px] text-charcoal-700 leading-relaxed">
              Pure cotton is resilient and durable, but requires basic mindful laundering to retain color vibrancy and shape:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-2xl border border-linen-300 p-5 space-y-2 bg-white">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  1. Washing &amp; Water Temperature
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Wash in cold or lukewarm water (under 30°C). Hot water can cause natural fiber shrinkage. Wash dark colors (indigo, maroon, forest green) separately for the first two washes.
                </p>
              </div>

              <div className="rounded-2xl border border-linen-300 p-5 space-y-2 bg-white">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  2. Shade Drying Prevents Fading
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Direct Central Indian sunlight bleaches natural dyes. Turn pure cotton kurtas and shirts inside-out and dry them in partial shade on a hanger.
                </p>
              </div>

              <div className="rounded-2xl border border-linen-300 p-5 space-y-2 bg-white">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  3. Ironing Tips
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Pure cotton wrinkles naturally because of zero synthetic binders. Iron while the garment is slightly damp, or use steam on medium-high heat for crisp crease lines.
                </p>
              </div>

              <div className="rounded-2xl border border-linen-300 p-5 space-y-2 bg-white">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  4. Natural Fiber Relaxation
                </h3>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  High-count pure cotton may experience 1% to 2% shrinkage on first soak. If in doubt between two sizes for kurtas, choose the slightly looser fit.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: FABRIC TESTING AT HOME */}
          <section className="space-y-4 border-t border-linen-300 pt-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              How to Test Pure Cotton vs Synthetic Blends
            </h2>
            <p className="text-[16px] text-charcoal-700 leading-relaxed">
              Two simple home methods can verify natural cotton fibers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5 space-y-2 border-linen-300">
                <div className="flex items-center gap-2 font-serif font-bold text-charcoal-900 text-lg">
                  <Flame className="h-5 w-5 text-terracotta-500" />
                  <span>The Thread Burn Test</span>
                </div>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Pull a loose thread from the inner seam. Pure cotton burns with a steady yellow flame, smells like burning paper/leaves, and leaves a soft, crushable grey ash. Synthetic blends melt into hard plastic beads.
                </p>
              </Card>

              <Card className="p-5 space-y-2 border-linen-300">
                <div className="flex items-center gap-2 font-serif font-bold text-charcoal-900 text-lg">
                  <Droplets className="h-5 w-5 text-forest-800" />
                  <span>The Water Drop Test</span>
                </div>
                <p className="text-[14px] text-charcoal-600 leading-relaxed">
                  Place a drop of water on the fabric. Pure cotton absorbs it almost instantly. Synthetic fabrics cause the water droplet to bead up on the surface.
                </p>
              </Card>
            </div>
          </section>

          {/* STORE INVITATION CALLOUT */}
          <div className="rounded-3xl bg-forest-900 text-white p-6 sm:p-10 text-center space-y-4">
            <Badge variant="amber">Experience in Person</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Come Feel the Fabrics in Store
            </h2>
            <p className="text-[16px] text-linen-200 max-w-xl mx-auto leading-relaxed">
              Nothing replaces the tactile feel of pure cotton and premium fabrics against your hand. Visit our shop in Sudama Nagar to try fittings with your family.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/shop">
                <Button variant="amber" size="md" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Browse Our Collection
                </Button>
              </Link>
              <Link href="/builder">
                <Button variant="outline" size="md" className="border-white text-white hover:bg-white/10">
                  Build Family Outfit Set
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav basketCount={basketCount} />
    </div>
  );
}
