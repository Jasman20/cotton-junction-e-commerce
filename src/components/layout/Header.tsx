"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Globe, MapPin, Clock, X, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentLanguage?: "en" | "hi";
  onToggleLanguage?: () => void;
  basketCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage = "en",
  onToggleLanguage,
  basketCount = 0,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-subtle border-b border-linen-200">
      {/* Upper Info Strip: Wraps cleanly on mobile, never cut off */}
      <div className="w-full bg-forest-800 text-white px-3 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[13px] sm:text-[14px]">
          <div className="flex flex-wrap items-center gap-2 text-linen-100 flex-1 min-w-[240px]">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
              <span className="leading-snug">
                634, Sudama Nagar Main Rd, Usha Nagar, Indore
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-extrabold text-charcoal-950 shadow-xs">
              🎉 Completed 8 Years
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-amber-300 shrink-0">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Closes 10:00 pm</span>
            </div>
            <Link
              href="/owner/login"
              className="flex items-center gap-1 text-[12px] font-semibold text-white/90 hover:text-amber-300 bg-forest-900/80 hover:bg-forest-900 px-2.5 py-0.5 rounded-full border border-forest-700/60 transition-colors"
              title="Store Owner & Admin Portal"
            >
              <Lock className="h-3 w-3 text-amber-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3.5">
        {/* Brand Logo & Wordmark (flex, min-width: 0, never wraps or overlaps) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-shrink group"
          aria-label="Cotton Junction Home"
        >
          {/* Logo: >= 56px high on mobile, 72px on desktop */}
          <div className="relative h-[56px] w-[56px] sm:h-[72px] sm:w-[72px] shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/brand/logo.svg"
              alt="Cotton Junction Diamond Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Wordmark (never wraps, flex min-w-0) */}
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-[22px] sm:text-[28px] font-bold tracking-tight text-forest-800 leading-none truncate group-hover:text-forest-900 transition-colors">
              Cotton Junction
            </span>
            <span className="text-[12px] sm:text-[14px] font-medium tracking-wide text-charcoal-600 truncate mt-0.5">
              {currentLanguage === "hi"
                ? "शुद्ध सूती परिधान • इंदौर"
                : "Family Clothing Store • Indore"}
            </span>
          </div>
        </Link>

        {/* Desktop Quick Category Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          <Link
            href="/shop?category=Men"
            className="text-[15px] font-semibold text-charcoal-700 hover:text-forest-800 transition-colors"
          >
            {currentLanguage === "hi" ? "पुरुष" : "Men"}
          </Link>
          <Link
            href="/shop?category=Women"
            className="text-[15px] font-semibold text-charcoal-700 hover:text-forest-800 transition-colors"
          >
            {currentLanguage === "hi" ? "महिलाएँ" : "Women"}
          </Link>
          <Link
            href="/shop?category=Kids"
            className="text-[15px] font-semibold text-charcoal-700 hover:text-forest-800 transition-colors"
          >
            {currentLanguage === "hi" ? "बच्चे" : "Kids"}
          </Link>
          <Link
            href="/shop?occasion=Festive/Diwali"
            className="text-[15px] font-semibold text-charcoal-700 hover:text-forest-800 transition-colors"
          >
            {currentLanguage === "hi" ? "त्योहार" : "Festive"}
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/25 px-3 py-1 text-[14px] font-bold text-forest-900 hover:bg-amber-400/40 transition-colors"
          >
            <span>Outfit Builder</span>
          </Link>
          <Link
            href="/cotton-guide"
            className="text-[15px] font-semibold text-charcoal-700 hover:text-forest-800 transition-colors"
          >
            {currentLanguage === "hi" ? "कॉटन गाइड" : "Fabric Guide"}
          </Link>
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Search Trigger / Expandable */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full text-charcoal-700 hover:bg-linen-100 hover:text-forest-800 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
            aria-label="Search clothing"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Language Toggle (EN / HI) */}
          <button
            onClick={onToggleLanguage}
            className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-linen-300 bg-linen-50 px-3 py-1.5 text-[14px] font-semibold text-charcoal-800 hover:bg-linen-100 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
            aria-label="Switch Language"
          >
            <Globe className="h-4 w-4 text-forest-800" />
            <span>{currentLanguage === "en" ? "हिन्दी" : "EN"}</span>
          </button>

          {/* Admin / Store Portal Button */}
          <Link
            href="/owner/login"
            className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-forest-800 bg-forest-50 px-3 py-1.5 text-[13px] font-bold text-forest-800 hover:bg-forest-100 hover:text-forest-900 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800 shadow-xs shrink-0"
            title="Store Manager & Admin Login (PIN: CJ2018)"
          >
            <Lock className="h-3.5 w-3.5 text-forest-800" />
            <span className="hidden sm:inline">Store Portal</span>
            <span className="sm:hidden text-[12px]">Admin</span>
          </Link>

          {/* Basket Trigger */}
          <Link
            href="/basket"
            className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-forest-800 text-white hover:bg-forest-900 transition-all shadow-subtle hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest-800"
            aria-label={`Basket with ${basketCount} items`}
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            {basketCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-charcoal-950 shadow-xs ring-2 ring-white">
                {basketCount > 9 ? "9+" : basketCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Expandable Search Drawer / Bar */}
      {isSearchOpen && (
        <div className="border-t border-linen-200 bg-linen-50 px-4 py-3 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-3xl items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentLanguage === "hi"
                    ? "कुर्ता, साड़ी, बच्चों के कपड़े खोजें..."
                    : "Search pure cotton styles for men, women, kids..."
                }
                className="w-full min-h-[48px] rounded-full border border-linen-300 bg-white px-5 py-2.5 pr-10 text-[16px] text-charcoal-900 placeholder:text-charcoal-400 focus:border-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-800/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="flex min-h-[48px] items-center justify-center rounded-full bg-forest-800 px-6 font-semibold text-white hover:bg-forest-900 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
