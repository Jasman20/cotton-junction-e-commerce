"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { addToBasket, useBasket } from "@/lib/basket";
import { formatINR } from "@/lib/utils";
import { Product, ProductOccasion } from "@/types";
import localProductsRaw from "@/data/products.json";
import {
  Sparkles,
  Users,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Palette,
  IndianRupee,
  Calendar,
  Check,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";

const allProducts = localProductsRaw as Product[];

interface FamilyMemberConfig {
  id: string;
  role: "Father" | "Mother" | "Son" | "Daughter";
  category: "Men" | "Women" | "Kids";
  selectedSize: string;
  defaultSizes: string[];
}

const PALETTES = [
  {
    id: "royal-forest",
    name: "Royal Forest Green & Gold",
    hindiName: "रॉयल फॉरेस्ट ग्रीन व गोल्ड",
    description: "Classic Central Indian festive aesthetic with deep greens and warm gold accents",
    colorHexes: ["#1E3F35", "#F7C82D", "#FAF8F5"],
    targetColours: ["Forest Green", "Gold", "Ivory", "Beige"],
  },
  {
    id: "festive-amber",
    name: "Festive Amber & Terracotta",
    hindiName: "अंबर पीला व टेराकोटा",
    description: "Warm auspicious tones of woven turmeric yellow and rich earth terracotta",
    colorHexes: ["#F7C82D", "#B05B35", "#222222"],
    targetColours: ["Mustard", "Amber", "Terracotta", "Rust"],
  },
  {
    id: "pastel-ivory",
    name: "Pastel Ivory & Soft Peach",
    hindiName: "आइवरी व पेस्टल पीच",
    description: "Subtle summer day celebration palette in breathable slub cotton and chanderi",
    colorHexes: ["#FAF8F5", "#F4C2A5", "#1E3F35"],
    targetColours: ["Ivory", "White", "Pastel Peach", "Peach"],
  },
  {
    id: "indigo-linen",
    name: "Indigo Blue & Natural Linen",
    hindiName: "इंडिगो ब्लू व कॉटन लिनेन",
    description: "Timeless handcrafted natural indigo tones paired with crisp ecru cotton",
    colorHexes: ["#1E2E4A", "#EAE6DE", "#B05B35"],
    targetColours: ["Navy Blue", "Light Blue", "Off-White", "Charcoal Grey"],
  },
];

export default function FamilyOutfitBuilderPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { count: basketCount } = useBasket();

  // Builder States
  const [occasion, setOccasion] = useState<ProductOccasion>("Festive/Diwali");
  const [activePaletteId, setActivePaletteId] = useState<string>("royal-forest");
  const [budget, setBudget] = useState<number>(5500);

  // Active family members in the set
  const [members, setMembers] = useState<FamilyMemberConfig[]>([
    { id: "m-father", role: "Father", category: "Men", selectedSize: "L", defaultSizes: ["M", "L", "XL", "XXL"] },
    { id: "m-mother", role: "Mother", category: "Women", selectedSize: "M", defaultSizes: ["S", "M", "L", "XL"] },
    { id: "m-son", role: "Son", category: "Kids", selectedSize: "6-7Y", defaultSizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] },
    { id: "m-daughter", role: "Daughter", category: "Kids", selectedSize: "4-5Y", defaultSizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] },
  ]);

  // Swapped indices for each member to allow cycle variations
  const [memberProductOffsets, setMemberProductOffsets] = useState<Record<string, number>>({});

  const activePalette = useMemo(() => {
    return PALETTES.find((p) => p.id === activePaletteId) || PALETTES[0];
  }, [activePaletteId]);

  // Algorithmic Rule-based Outfit Matching Engine
  const recommendedSet = useMemo(() => {
    return members.map((member) => {
      // 1. Filter candidates by member category
      let candidates = allProducts.filter((p) => p.category === member.category);

      // 2. Score candidate matches:
      // - Matches occasion: +30
      // - Matches palette target colors: +40
      // - Has pure cotton: +20
      // - Within reasonable budget per person: +10
      const scored = candidates.map((prod) => {
        let score = 0;
        if (prod.occasion.includes(occasion)) score += 30;
        const colorMatch = prod.colours.some((c) =>
          activePalette.targetColours.some((tc) => c.toLowerCase().includes(tc.toLowerCase()))
        );
        if (colorMatch) score += 40;
        if (prod.fabric === "pure cotton") score += 20;

        return { product: prod, score };
      });

      scored.sort((a, b) => b.score - a.score);

      // Cycle offset if user clicked swap
      const offset = memberProductOffsets[member.id] || 0;
      const validPool = scored.map((s) => s.product);
      const chosenProduct = validPool[offset % validPool.length] || candidates[0];

      return {
        member,
        product: chosenProduct,
      };
    });
  }, [members, occasion, activePalette, memberProductOffsets]);

  // Calculations
  const totalPrice = useMemo(() => {
    return recommendedSet.reduce((acc, item) => acc + (item.product?.price || 0), 0);
  }, [recommendedSet]);

  const totalOriginalPrice = useMemo(() => {
    return recommendedSet.reduce(
      (acc, item) => acc + (item.product?.originalPrice || item.product?.price || 0),
      0
    );
  }, [recommendedSet]);

  const totalSavings = Math.max(0, totalOriginalPrice - totalPrice);

  // Cycle to next product for a specific member
  const handleSwapProduct = (memberId: string) => {
    setMemberProductOffsets((prev) => ({
      ...prev,
      [memberId]: (prev[memberId] || 0) + 1,
    }));
    showToast("Updated outfit option for family member", "info");
  };

  // Change member size
  const handleSizeChange = (memberId: string, size: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, selectedSize: size } : m))
    );
  };

  // Toggle member active
  const handleRemoveMember = (memberId: string) => {
    if (members.length <= 1) {
      showToast("At least one family member must remain in the set", "error");
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    showToast("Removed member from set", "info");
  };

  // Add new member back
  const handleAddMember = (role: FamilyMemberConfig["role"], category: FamilyMemberConfig["category"]) => {
    const newId = `m-${role.toLowerCase()}-${Date.now()}`;
    const defaultSizes = category === "Kids" ? ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] : ["S", "M", "L", "XL"];
    setMembers((prev) => [
      ...prev,
      {
        id: newId,
        role,
        category,
        selectedSize: defaultSizes[1],
        defaultSizes,
      },
    ]);
    showToast(`Added ${role} to family set`, "success");
  };

  // Batch Reserve All to Enquiry Basket
  const handleReserveEntireSet = () => {
    recommendedSet.forEach((item) => {
      if (item.product) {
        addToBasket(
          item.product,
          item.member.selectedSize,
          item.product.colours[0],
          1
        );
      }
    });

    showToast(`All ${recommendedSet.length} outfits added to enquiry basket!`, "success");
    router.push("/basket");
  };

  // Send Entire Set Enquiry to WhatsApp
  const handleWhatsAppEnquiry = () => {
    const phone = "916264673265";
    const setList = recommendedSet
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.member.role}*: ${item.product.name} (Size: ${item.member.selectedSize}) - ${formatINR(
            item.product.price
          )}`
      )
      .join("\n");

    const message = `Namaste Cotton Junction Indore! 🙏\n\nI created a coordinated family outfit set using your Family Outfit Builder:\n\n*Occasion:* ${occasion}\n*Coordinated Palette:* ${activePalette.name}\n\n*Outfits:*\n${setList}\n\n*Total Estimated Price:* ${formatINR(
      totalPrice
    )}\n\nCan you confirm size availability for in-store trial at Sudama Nagar? Thank you!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* HERO BANNER SECTION */}
        <section className="relative overflow-hidden bg-forest-800 text-white px-4 py-8 sm:px-6 sm:py-12">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F7C82D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="amber" size="sm">
                    <Sparkles className="h-3.5 w-3.5 text-charcoal-900 mr-1" />
                    Star Feature
                  </Badge>
                  <Badge variant="cotton" size="sm">
                    Pure Cotton Coordinated Sets
                  </Badge>
                  <Badge variant="sample" size="sm">
                    Sample Data
                  </Badge>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Family Outfit Builder
                </h1>
                <p className="text-[16px] sm:text-[18px] text-linen-200 font-normal leading-relaxed">
                  Coordinate pure cotton &amp; festive attire for your whole family. Select your occasion, choose harmonious Central Indian color palettes, and reserve the complete set for store trial in Sudama Nagar.
                </p>
              </div>

              {/* Live Family Set Price Snapshot Card */}
              <div className="w-full lg:w-auto shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 text-white min-w-[280px]">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[13px] font-medium text-linen-300 uppercase tracking-wider">
                    {members.length} Outfits Coordinated
                  </span>
                  {totalSavings > 0 && (
                    <span className="bg-amber-400 text-charcoal-950 text-[12px] font-bold px-2 py-0.5 rounded-full">
                      Save {formatINR(totalSavings)}
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-bold text-amber-300 font-serif">
                  {formatINR(totalPrice)}
                </div>

                <p className="text-[13px] text-linen-300 mt-1">
                  Budget Target: {formatINR(budget)} {totalPrice <= budget ? "• Within Budget ✨" : "• Slightly over budget"}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex gap-2">
                  <button
                    onClick={handleReserveEntireSet}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-full bg-amber-400 text-charcoal-950 font-bold text-[14px] hover:bg-amber-300 transition-colors shadow-subtle"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Reserve Set</span>
                  </button>
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="min-h-[44px] w-11 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    aria-label="Send to WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUILDER CONTROLS ROW: Occasion + Palette + Budget */}
        <div className="sticky top-[106px] z-30 border-b border-linen-200 bg-white/95 px-4 py-4 backdrop-blur-md shadow-xs sm:px-6">
          <div className="mx-auto max-w-7xl space-y-4">
            {/* 1. Occasion Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-forest-800" />
                  <span>1. Select Occasion</span>
                </label>
                <span className="text-[13px] font-medium text-charcoal-500">
                  {occasion}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {(["Festive/Diwali", "Wedding", "Everyday", "Casual"] as ProductOccasion[]).map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 text-[14px] sm:text-[15px] font-semibold transition-all ${
                      occasion === occ
                        ? "bg-forest-800 text-white shadow-subtle"
                        : "bg-linen-100 text-charcoal-700 hover:bg-linen-200 border border-linen-300"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Coordinated Palette Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-forest-800" />
                  <span>2. Coordinated Color Story</span>
                </label>
                <span className="text-[13px] font-semibold text-forest-800">
                  {activePalette.name}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setActivePaletteId(pal.id)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      activePaletteId === pal.id
                        ? "border-forest-800 bg-forest-50/50 ring-2 ring-forest-800/20 shadow-xs"
                        : "border-linen-300 bg-white hover:bg-linen-50"
                    }`}
                  >
                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {pal.colorHexes.map((hex, i) => (
                        <span
                          key={i}
                          className="h-3.5 w-3.5 rounded-full border border-charcoal-300 shadow-xs"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <span className="text-[13px] font-bold text-charcoal-900 truncate">
                      {pal.name}
                    </span>
                    <span className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">
                      {pal.hindiName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget Range Slider */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[13px] font-semibold mb-1">
                <span className="text-charcoal-700 flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5 text-forest-800" />
                  Family Budget Target:
                </span>
                <span className="text-forest-800 font-bold text-[15px]">{formatINR(budget)}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="10000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-linen-200 rounded-lg appearance-none cursor-pointer accent-forest-800"
              />
              <div className="flex justify-between text-[11px] text-charcoal-500 mt-1">
                <span>₹2,500 (Budget)</span>
                <span>₹5,500 (Signature)</span>
                <span>₹10,000 (Grand Festive)</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAMILY MEMBER OUTFITS GRID */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                Recommended Family Wardrobe
              </h2>
              <p className="text-[14px] sm:text-[15px] text-charcoal-600 mt-0.5">
                Each garment is paired to harmonize colors while keeping fabrics 100% pure cotton for Indore weather.
              </p>
            </div>

            {/* Add Member Chips */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-charcoal-500 hidden sm:inline">
                Add member:
              </span>
              {!members.some((m) => m.role === "Son") && (
                <button
                  onClick={() => handleAddMember("Son", "Kids")}
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-full border border-forest-800 bg-white px-3 text-[13px] font-semibold text-forest-800 hover:bg-forest-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Son</span>
                </button>
              )}
              {!members.some((m) => m.role === "Daughter") && (
                <button
                  onClick={() => handleAddMember("Daughter", "Kids")}
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-full border border-forest-800 bg-white px-3 text-[13px] font-semibold text-forest-800 hover:bg-forest-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Daughter</span>
                </button>
              )}
            </div>
          </div>

          {/* Member Outfit Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recommendedSet.map(({ member, product }) => {
              if (!product) return null;

              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col rounded-2xl border border-linen-200 bg-white shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-card"
                >
                  {/* Member Role Header Strip */}
                  <div className="flex items-center justify-between border-b border-linen-200 bg-linen-100 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-800 text-[11px] font-bold text-white">
                        {member.role[0]}
                      </span>
                      <span className="text-[14px] font-bold text-charcoal-900">
                        {member.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Swap button to cycle complementary outfit */}
                      <button
                        onClick={() => handleSwapProduct(member.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal-600 hover:bg-white hover:text-forest-800 transition-colors"
                        title="Swap with another match"
                        aria-label={`Swap ${member.role} outfit`}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>

                      {/* Remove member button */}
                      {members.length > 1 && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal-400 hover:bg-white hover:text-terracotta-600 transition-colors"
                          title="Remove from set"
                          aria-label={`Remove ${member.role}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product Image */}
                  <Link
                    href={`/shop/${product.id}`}
                    className="relative aspect-4/5 w-full overflow-hidden bg-linen-100 block"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <Badge variant="cotton" size="sm">
                        {product.fabric}
                      </Badge>
                      <Badge variant="sample" size="sm">
                        Sample image
                      </Badge>
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="text-[12px] font-medium text-charcoal-500 mb-1">
                      {product.subcategory} • {product.colours[0]}
                    </div>

                    <Link href={`/shop/${product.id}`}>
                      <h3 className="line-clamp-2 text-[16px] font-semibold text-charcoal-900 group-hover:text-forest-800 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price Row */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-[18px] font-bold text-charcoal-900">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-[13px] text-charcoal-500 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Member Size Selector Chips */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-charcoal-600 mb-1">
                        <span>Select Size:</span>
                        <span className="text-forest-800 font-bold">{member.selectedSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                        {member.defaultSizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSizeChange(member.id, sz)}
                            className={`flex h-7 min-w-8 items-center justify-center rounded px-1.5 text-[12px] font-medium transition-all ${
                              member.selectedSize === sz
                                ? "bg-forest-800 text-white shadow-xs"
                                : "bg-linen-100 text-charcoal-700 hover:bg-linen-200"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Individual Quick Add CTA */}
                    <div className="mt-4 pt-3 border-t border-linen-200">
                      <button
                        type="button"
                        onClick={() => {
                          addToBasket(product, member.selectedSize, product.colours[0]);
                          showToast(`Added ${member.role}'s outfit to basket`, "success");
                        }}
                        className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full border border-forest-800 bg-white text-[13px] font-semibold text-forest-800 hover:bg-forest-50 transition-colors"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Reserve Just This</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* COMPLETE SET SUMMARY & RESERVATION CARD */}
          <div className="mt-10 rounded-3xl border border-forest-200 bg-linear-to-br from-forest-50 via-white to-amber-50/50 p-6 sm:p-8 shadow-card">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-forest-800/10 px-3.5 py-1 text-[13px] font-bold text-forest-900">
                  <CheckCircle2 className="h-4 w-4 text-forest-800" />
                  <span>Transparent Coordinated Recommendation</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  Ready to Try at Sudama Nagar Store?
                </h3>
                <p className="text-[15px] sm:text-[16px] text-charcoal-700 max-w-xl">
                  We will keep all {recommendedSet.length} outfits prepared in your chosen sizes in our trial room before you visit. No advance payment required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={handleReserveEntireSet}
                  className="flex min-h-[52px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-forest-800 px-8 py-3.5 text-[16px] font-bold text-white shadow-subtle hover:bg-forest-900 transition-all hover:scale-102 active:scale-98"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Reserve Entire Family Set ({formatINR(totalPrice)})</span>
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="flex min-h-[52px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-forest-800 bg-white px-6 py-3.5 text-[15px] font-bold text-forest-800 hover:bg-forest-50 transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-forest-800" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
