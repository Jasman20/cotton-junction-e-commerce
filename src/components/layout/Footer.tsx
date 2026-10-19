import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Star, MessageSquare } from "lucide-react";

export const Footer: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+916264673265";
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <footer className="w-full border-t border-linen-300 bg-forest-950 text-linen-100 pb-20 md:pb-8">
      {/* Upper Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Column with Large Logo */}
          <div className="space-y-4 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0">
                <Image
                  src="/brand/logo.svg"
                  alt="Cotton Junction Brand Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Cotton Junction
                </span>
                <p className="text-[13px] text-linen-300">
                  Family Clothing Store • Indore
                </p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-linen-200">
              Family clothing store featuring quality apparel and diverse collections at reasonable prices.
            </p>

            {/* Google Maps Rating Badge (Shown once from public listing) */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-forest-900 border border-forest-800 px-3.5 py-2">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-bold text-[15px] text-white">4.6</span>
              </div>
              <span className="text-[13px] text-linen-200">
                (124 reviews on Google Maps listing)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-white">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-[15px]">
              <li>
                <Link href="/shop?category=Men" className="text-linen-200 hover:text-amber-400 transition-colors">
                  Men&apos;s Cotton Apparel
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Women" className="text-linen-200 hover:text-amber-400 transition-colors">
                  Women&apos;s Ethnic &amp; Casuals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Kids" className="text-linen-200 hover:text-amber-400 transition-colors">
                  Kids&apos; Everyday Comfort
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                  Family Outfit Builder
                </Link>
              </li>
              <li>
                <Link href="/cotton-guide" className="text-linen-200 hover:text-amber-400 transition-colors">
                  Pure Cotton Guide
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-linen-200 hover:text-amber-400 transition-colors">
                  Join Family Points
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit & Contact Information */}
          <div className="space-y-3 md:col-span-1 lg:col-span-2">
            <h4 className="font-serif text-lg font-semibold text-white">
              Visit Store in Indore
            </h4>
            <ul className="space-y-3 text-[15px] text-linen-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  634, Sudama Nagar Main Rd, Usha Nagar, Sudama Nagar, Indore, Madhya Pradesh 452009
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="font-medium text-amber-300">
                  Open daily • Closes 11:30 pm
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                <a href="tel:+918305554819" className="hover:text-amber-400 transition-colors">
                  +91 83055 54819
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                  "Hello Cotton Junction, I would like to enquire about your pure cotton collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1B5E20] px-6 py-2.5 font-semibold text-white shadow-card hover:bg-[#154919] transition-all"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Legal & Honesty Strip */}
        <div className="mt-12 border-t border-forest-900 pt-6 text-[14px] text-linen-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Cotton Junction. Family clothing store. All rights reserved.
            </p>
            <p className="text-[13px] text-linen-400">
              Started Oct 2018 in Indore • Pure cotton and premium fabrics
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
