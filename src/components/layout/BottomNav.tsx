"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Sparkles, Award, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  basketCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ basketCount = 0 }) => {
  const pathname = usePathname();

  // Hide bottom nav on owner dashboard pages
  if (pathname?.startsWith("/owner")) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Grid,
      isActive: pathname === "/shop" || pathname?.startsWith("/shop/"),
    },
    {
      label: "Builder",
      href: "/builder",
      icon: Sparkles,
      isCenter: true,
      isActive: pathname === "/builder",
    },
    {
      label: "Points",
      href: "/points",
      icon: Award,
      isActive: pathname === "/points" || pathname === "/join",
    },
    {
      label: "Basket",
      href: "/basket",
      icon: ShoppingBag,
      badge: basketCount > 0 ? (basketCount > 9 ? "9+" : basketCount) : null,
      isActive: pathname === "/basket",
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-linen-300 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative -top-4 flex flex-col items-center"
                aria-label="Family Outfit Builder"
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full shadow-elevated transition-transform duration-200 active:scale-95",
                    item.isActive
                      ? "bg-forest-800 text-amber-400 ring-4 ring-amber-400"
                      : "bg-forest-800 text-white hover:bg-forest-900 ring-4 ring-linen-50"
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span
                  className={cn(
                    "mt-1 text-[11px] font-bold tracking-tight",
                    item.isActive ? "text-forest-900" : "text-charcoal-700"
                  )}
                >
                  Builder
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-h-[48px] min-w-[54px] flex-col items-center justify-center py-1 transition-colors",
                item.isActive
                  ? "text-forest-800 font-semibold"
                  : "text-charcoal-500 hover:text-charcoal-900"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-charcoal-950">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[11px] leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe Area Spacer for iOS Home Bar */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
};
