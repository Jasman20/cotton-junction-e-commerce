"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Star,
  CheckCircle2,
  CalendarCheck,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Feather,
} from "lucide-react";

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [basketCount, setBasketCount] = useState(0);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+916264673265";
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      {/* Sticky Mobile-First Header */}
      <Header
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
        basketCount={basketCount}
      />

      <main className="flex-1 pb-24 md:pb-12">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-linen-100 border-b border-linen-200">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Hero Copy (Left) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* 8-Year Anniversary Celebration Badge */}
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-linear-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 px-4 py-2 border border-amber-500/40 shadow-xs">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-[13px] sm:text-[14px] font-extrabold text-forest-900 tracking-wide">
                    {language === "hi"
                      ? "🎉 कॉटन जंक्शन ने 8 वर्ष पूरे किए!"
                      : "🎉 Cotton Junction Completed 8 Years"}
                  </span>
                  <span className="hidden sm:inline text-amber-600 font-bold">•</span>
                  <span className="hidden sm:inline text-[13px] font-semibold text-charcoal-700">
                    {language === "hi" ? "सुदामा नगर के 10,000+ परिवारों का भरोसा" : "Trusted by 10,000+ Families"}
                  </span>
                </div>

                {/* Prominent Logo & Heading */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
                      <Image
                        src="/brand/logo.svg"
                        alt="Cotton Junction Diamond Mark"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-800">
                      Cotton Junction
                    </span>
                  </div>

                  <h1 className="font-serif text-[32px] sm:text-[44px] lg:text-[50px] font-bold text-charcoal-900 leading-[1.15] tracking-tight">
                    {language === "hi" ? (
                      <>
                        पूरे परिवार के लिए{" "}
                        <span className="text-forest-800 underline decoration-amber-400 decoration-wavy decoration-2">
                          प्योर कॉटन
                        </span>{" "}
                        और प्रीमियम फैब्रिक्स
                      </>
                    ) : (
                      <>
                        Pure cotton and premium fabrics for the{" "}
                        <span className="text-forest-800 underline decoration-amber-400 decoration-wavy decoration-2">
                          entire family
                        </span>
                      </>
                    )}
                  </h1>

                  {/* Honest One-Line Value Proposition */}
                  <p className="text-[17px] sm:text-[19px] text-charcoal-700 leading-relaxed font-normal max-w-2xl">
                    {language === "hi"
                      ? "फैमिली क्लोदिंग स्टोर: उचित दामों पर गुणवत्तापूर्ण परिधान, विविध संग्रह और ब्रांडेड सरप्लस स्टॉक।"
                      : "Family clothing store featuring quality apparel, diverse collections, and branded surplus stock at reasonable prices."}
                  </p>
                </div>

                {/* Primary Action Buttons (min 48px touch target) */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/shop" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="h-5 w-5" />}>
                      {language === "hi" ? "कलेक्शन देखें" : "Explore Collections"}
                    </Button>
                  </Link>

                  <Link href="/builder" className="w-full sm:w-auto">
                    <Button
                      variant="amber"
                      size="lg"
                      fullWidth
                      leftIcon={<Sparkles className="h-5 w-5 text-charcoal-900" />}
                    >
                      {language === "hi" ? "फैमिली आउटफिट बिल्डर" : "Family Outfit Builder"}
                    </Button>
                  </Link>
                </div>

                {/* Value Highlights Pill List */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-[14px] text-charcoal-700">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-forest-800" />
                    <span>Pure cotton</span>
                  </div>
                  <span className="text-charcoal-300">•</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-forest-800" />
                    <span>Branded surplus stock</span>
                  </div>
                  <span className="text-charcoal-300">•</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-forest-800" />
                    <span>Reserve to try in store</span>
                  </div>
                </div>
              </div>

              {/* Hero Image (Right) */}
              <div className="lg:col-span-5">
                <div
                  className="relative w-full overflow-hidden rounded-3xl shadow-card border-2 border-white min-h-[260px] sm:min-h-[380px]"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    src="/stock/hero-family.jpg"
                    alt="Indian family wearing pure cotton clothing together"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient & Badge Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <Badge variant="sample">Sample image</Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[14px] font-semibold tracking-wide text-amber-300 uppercase">
                      Pure Cotton Collection
                    </p>
                    <p className="font-serif text-lg sm:text-xl font-bold leading-snug">
                      Crafted for comfort, everyday wear &amp; festive celebrations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8TH ANNIVERSARY SPECIAL CELEBRATION STRIP */}
        <section className="bg-linear-to-r from-forest-950 via-forest-900 to-forest-950 text-white border-y border-amber-500/40 py-6 px-4 sm:px-6 shadow-card">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 text-left">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-amber-400 text-charcoal-950 shadow-elevated border-2 border-amber-200">
                <span className="font-serif text-2xl font-black leading-none">8</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest mt-0.5">Years</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                    {language === "hi"
                      ? "8 वर्ष पूरे होने पर इंदौर का हार्दिक धन्यवाद"
                      : "Cotton Junction Completed 8 Years"}
                  </h2>
                  <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-300 uppercase tracking-wider">
                    Completed 8 Years
                  </span>
                </div>
                <p className="text-[14px] sm:text-[15px] text-linen-200 leading-relaxed max-w-3xl">
                  {language === "hi"
                    ? "कॉटन जंक्शन ने 8 गौरवशाली वर्ष पूरे किए हैं। 10,000 से अधिक इंदौर परिवारों के शुद्ध सूती और प्रामाणिक फैब्रिक्स के अटूट विश्वास का हार्दिक आभार।"
                    : "Cotton Junction completed 8 glorious years. Thank you to 10,000+ Indore families for choosing authentic pure cotton, surplus apparel, and honest prices."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
              <div className="rounded-xl bg-white/10 border border-white/15 px-3.5 py-2 text-center flex-1 sm:flex-initial">
                <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">Anniversary Benefit</div>
                <div className="text-[13px] font-bold text-white">2X Points on Store Trials</div>
              </div>
              <Link href="/shop" className="flex-1 sm:flex-initial">
                <Button variant="amber" size="md">
                  Explore 8-Year Special Edit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* IMAGE CATEGORY TILES (Men, Women, Kids, Festive, Family) */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <SectionHeader
            title={language === "hi" ? "श्रेणियाँ खोजें" : "Curated Categories"}
            subtitle={
              language === "hi"
                ? "हर आयु वर्ग और अवसर के लिए शुद्ध कॉटन परिधान"
                : "Pure cotton clothing for Men, Women and Kids"
            }
            actionText={language === "hi" ? "पूरा स्टोर देखें" : "View All"}
            actionHref="/shop"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {/* Category: Men */}
            <Link href="/shop?category=Men" className="group">
              <Card variant="interactive" className="h-full flex flex-col">
                <div
                  className="relative w-full overflow-hidden bg-linen-200 min-h-[200px] sm:min-h-[240px]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src="/stock/cat-men.jpg"
                    alt="Men's pure cotton apparel"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="sample" size="sm">Sample image</Badge>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[12px] font-medium text-amber-300">
                      Kurtas, Shirts, Surplus
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Men
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Category: Women */}
            <Link href="/shop?category=Women" className="group">
              <Card variant="interactive" className="h-full flex flex-col">
                <div
                  className="relative w-full overflow-hidden bg-linen-200 min-h-[200px] sm:min-h-[240px]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src="/stock/cat-women.jpg"
                    alt="Women's pure cotton kurtis and sets"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="sample" size="sm">Sample image</Badge>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[12px] font-medium text-amber-300">
                      Kurta Sets, Tops, Ethnic
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Women
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Category: Kids */}
            <Link href="/shop?category=Kids" className="group">
              <Card variant="interactive" className="h-full flex flex-col">
                <div
                  className="relative w-full overflow-hidden bg-linen-200 min-h-[200px] sm:min-h-[240px]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src="/stock/cat-kids.jpg"
                    alt="Kids' pure cotton clothes"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="sample" size="sm">Sample image</Badge>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[12px] font-medium text-amber-300">
                      Boys &amp; Girls (2-15Y)
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Kids
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Category: Family Outfit Builder */}
            <Link href="/builder" className="group">
              <Card variant="interactive" className="h-full flex flex-col bg-linear-to-br from-forest-800 to-forest-950 text-white border-forest-700">
                <div className="relative aspect-3/4 w-full overflow-hidden p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Badge variant="amber" size="sm">Star Feature</Badge>
                    <Sparkles className="h-6 w-6 text-amber-400 animate-spin-slow" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[13px] font-medium text-amber-300">
                      Coordinated Dressing
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight">
                      Family Outfit Builder
                    </h3>
                    <p className="text-[14px] text-linen-200 line-clamp-3">
                      Coordinate your entire family’s colors and sizes for festive, casual or wedding occasions within your budget.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-amber-400 pt-2 group-hover:translate-x-1 transition-transform">
                      Build Set Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* FESTIVE & SEASONAL CALLOUT STRIP */}
        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-forest-900 border border-forest-800 p-6 sm:p-10 text-white shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="terracotta" size="md">
                  Festive &amp; Family Celebrations
                </Badge>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Coordinated Pure Cotton Sets for Upcoming Festivities
                </h2>
                <p className="text-[16px] text-linen-200 leading-relaxed max-w-xl">
                  Dress together in breathable pure cotton ethnic wear. Reserve matching shades of deep forest green, amber mustard, and warm ivory for the family.
                </p>
                <div className="pt-2">
                  <Link href="/builder?occasion=Festive/Diwali">
                    <Button variant="amber" size="md" rightIcon={<ArrowRight className="h-5 w-5" />}>
                      Explore Festive Coordinates
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-subtle border border-forest-700 min-h-[200px] sm:min-h-[260px]"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src="/stock/cat-festive.jpg"
                    alt="Festive cotton apparel flatlay"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="sample" size="sm">Sample image</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (Browse -> Reserve -> Try in Store) */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              {language === "hi" ? "कॉटन जंक्शन कैसे काम करता है" : "How Cotton Junction Works"}
            </h2>
            <p className="text-[16px] text-charcoal-600 mt-2">
              Bringing our physical store experience online, tailored for Indore families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card className="p-6 text-left border-linen-300 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-charcoal-900 font-serif font-bold text-xl mb-4 border border-amber-300">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Browse &amp; Pick Styles
              </h3>
              <p className="text-[15px] text-charcoal-600 leading-relaxed">
                Explore pure cotton kurtas, surplus branded shirts, sarees and kids’ wear with clear sizes and transparent pricing.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 text-left border-linen-300 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-800 font-serif font-bold text-xl mb-4 border border-forest-200">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Reserve or WhatsApp
              </h3>
              <p className="text-[15px] text-charcoal-600 leading-relaxed">
                Add styles to your enquiry basket and select your convenient store-visit slot or send directly to our WhatsApp number.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 text-left border-linen-300 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linen-200 text-charcoal-900 font-serif font-bold text-xl mb-4 border border-linen-300">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Try in Store &amp; Pick
              </h3>
              <p className="text-[15px] text-charcoal-600 leading-relaxed">
                Visit our physical shop in Sudama Nagar, inspect fabric quality, try the fitting with family, and purchase with confidence.
              </p>
            </Card>
          </div>
        </section>

        {/* PHYSICAL STORE BLOCK WITH DIRECT ACTIONS */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Card className="p-6 sm:p-10 bg-linear-to-b from-white to-linen-100 border-2 border-linen-200 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="cotton">Physical Store in Indore</Badge>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-amber-600">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    4.6 (124 reviews on Google Maps listing)
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  Visit Cotton Junction in Sudama Nagar
                </h2>

                <p className="text-[16px] text-charcoal-700 leading-relaxed">
                  634, Sudama Nagar Main Rd, Usha Nagar, Sudama Nagar, Indore, Madhya Pradesh 452009
                </p>

                <div className="flex items-center gap-2 text-[15px] font-semibold text-forest-800">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span>Open daily • Closes 10:00 pm</span>
                </div>

                {/* Direct Action Buttons: Directions, Call, WhatsApp */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    href="https://maps.google.com/?q=Cotton+Junction+634+Sudama+Nagar+Main+Rd+Indore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-forest-900 transition-colors shadow-subtle"
                  >
                    <MapPin className="h-5 w-5 text-amber-400" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href="tel:+918305554819"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-forest-800 bg-white px-5 py-2.5 text-[15px] font-semibold text-forest-800 hover:bg-forest-50 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                      "Hello Cotton Junction, I want to inquire about store availability."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1B5E20] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#154919] transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Fabric Detail / Pure Cotton Assurance */}
              <div className="lg:col-span-5">
                <div
                  className="relative w-full rounded-2xl overflow-hidden border border-linen-300 shadow-subtle min-h-[220px] sm:min-h-[280px]"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    src="/stock/fabric-cotton.jpg"
                    alt="Pure cotton fabric texture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="sample" size="sm">Sample image</Badge>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[13px] text-amber-300 font-semibold uppercase">
                      Pure Cotton &amp; Premium Fabrics
                    </p>
                    <p className="text-[15px] font-medium leading-snug">
                      Breathable weave suited for Indore summers and all seasons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (Solid background, safe area padding) */}
      <BottomNav basketCount={basketCount} />
    </div>
  );
}
