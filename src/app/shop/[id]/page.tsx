"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GarmentIllustration } from "@/components/illustrations/GarmentIllustration";
import { useToast } from "@/components/ui/Toast";
import { addToBasket, useBasket } from "@/lib/basket";
import { formatINR } from "@/lib/utils";
import { Product } from "@/types";
import localProductsRaw from "@/data/products.json";
import {
  ShoppingBag,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Info,
  Share2,
} from "lucide-react";

const allProducts = localProductsRaw as Product[];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { count: basketCount } = useBasket();

  const productId = params?.id as string;
  const product = allProducts.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || "M");
  const [selectedColour, setSelectedColour] = useState<string>(product?.colours[0] || "Standard");
  const [imageError, setImageError] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+916264673265";
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

  if (!product) {
    return (
      <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
        <Header basketCount={basketCount} />
        <div className="mx-auto max-w-lg py-20 px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
            Style Not Found
          </h2>
          <p className="text-charcoal-600 mb-6">
            The product you requested does not exist or may have been unlisted.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="md">
              Back to Collection
            </Button>
          </Link>
        </div>
        <Footer />
        <BottomNav basketCount={basketCount} />
      </div>
    );
  }

  const handleReserve = () => {
    addToBasket(product, selectedSize, selectedColour);
    showToast(`Reserved "${product.name}" (${selectedSize}) in your visit basket!`, "success");
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Cotton Junction, I would like to enquire/order:\n\n*${product.name}*\n• SKU: ${product.id}\n• Size: ${selectedSize}\n• Colour: ${selectedColour}\n• Price: ${formatINR(product.price)}\n\nPlease confirm availability at your Sudama Nagar store.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, "_blank");
  };

  const handleAddToFamilyBuilder = () => {
    router.push(
      `/builder?memberType=${product.category.toLowerCase()}&preselectedItem=${encodeURIComponent(
        product.id
      )}`
    );
  };

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* BREADCRUMB STRIP */}
        <div className="border-b border-linen-200 bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center gap-2 text-[13px] sm:text-[14px] text-charcoal-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-forest-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link href="/shop" className="hover:text-forest-800 transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-forest-800 transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="font-semibold text-charcoal-900 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: PRODUCT IMAGE & SAMPLE BADGE */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-linen-100 border border-linen-200 shadow-card">
                {!imageError && product.image && !product.image.includes("illustration") ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <GarmentIllustration
                    type={product.garmentType}
                    colorVariant={selectedColour.toLowerCase()}
                    className="h-full w-full"
                  />
                )}

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="flex flex-wrap gap-1.5">
                    {product.isSurplusBranded ? (
                      <Badge variant="surplus">branded surplus stock</Badge>
                    ) : (
                      <Badge variant="cotton">{product.fabric}</Badge>
                    )}
                  </div>
                  <Badge variant="sample">Sample image</Badge>
                </div>
              </div>

              {/* In-Store Assurance Callout */}
              <div className="rounded-2xl bg-forest-50 border border-forest-200/70 p-4 text-[14px] text-forest-950 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[15px]">Available for physical trial:</span>
                  <span>
                    Visit Cotton Junction, 634, Sudama Nagar, Indore. Closes 11:30 pm daily.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS & ACTIONS */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Category & Tags */}
              <div className="flex items-center gap-2">
                <Badge variant="default" size="sm">
                  {product.category} • {product.subcategory}
                </Badge>
                {product.occasion.map((occ) => (
                  <Badge key={occ} variant="outline" size="sm">
                    {occ}
                  </Badge>
                ))}
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-900 leading-tight">
                {product.name}
              </h1>

              {/* Price & Surplus Savings */}
              <div className="flex items-baseline gap-3 border-b border-linen-200 pb-4">
                <span className="text-3xl font-bold text-charcoal-900">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-charcoal-500 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                    <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 text-[13px] font-bold">
                      Save {formatINR(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center gap-2 text-[14px]">
                {product.stock <= 3 ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-terracotta-600">
                    <AlertCircle className="h-4 w-4" />
                    Low stock: Only {product.stock} items available in store
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-forest-800">
                    <CheckCircle2 className="h-4 w-4" />
                    In stock at Sudama Nagar store ({product.stock} units)
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[15px] font-bold text-charcoal-900">
                    Select Size:
                  </label>
                  <span className="text-[13px] text-charcoal-500">
                    Standard Indian Fit
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex min-h-[48px] min-w-[52px] items-center justify-center rounded-xl border px-3 text-[15px] font-semibold transition-all ${
                        selectedSize === size
                          ? "border-forest-800 bg-forest-800 text-white shadow-subtle"
                          : "border-linen-300 bg-white text-charcoal-800 hover:bg-linen-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Strict minimum 48px touch targets) */}
              <div className="space-y-3 pt-2">
                {/* 1. Reserve to Try in Store */}
                <Button
                  onClick={handleReserve}
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<ShoppingBag className="h-5 w-5" />}
                >
                  Reserve to Try in Store (Free)
                </Button>

                {/* 2. Order / Enquire on WhatsApp */}
                <Button
                  onClick={handleWhatsAppOrder}
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<MessageSquare className="h-5 w-5" />}
                >
                  Enquire &amp; Order on WhatsApp
                </Button>

                {/* 3. Add to Family Outfit */}
                <Button
                  onClick={handleAddToFamilyBuilder}
                  variant="secondary"
                  size="md"
                  fullWidth
                  leftIcon={<Sparkles className="h-5 w-5 text-amber-500" />}
                >
                  Coordinate in Family Outfit Builder
                </Button>
              </div>

              {/* Honest Product Description */}
              <div className="border-t border-linen-200 pt-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Product Overview
                </h3>
                <p className="text-[16px] text-charcoal-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Honest Fabric & Care Notes */}
              <div className="rounded-2xl bg-linen-100 p-4 border border-linen-200 space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-charcoal-900 text-[16px]">
                  <Info className="h-4 w-4 text-forest-800" />
                  <span>Fabric Care &amp; Washing Instructions</span>
                </div>
                <p className="text-[15px] text-charcoal-700 leading-relaxed">
                  {product.careNotes}
                </p>
                <p className="text-[13px] text-charcoal-500 pt-1">
                  Pure cotton fabrics may experience minimal 1-2% natural relaxation after initial wash. Wash dark shades separately.
                </p>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-linen-200 pt-10">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                  More for {product.category}
                </h2>
                <Link
                  href={`/shop?category=${product.category}`}
                  className="text-[15px] font-semibold text-forest-800 hover:underline"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
                {relatedProducts.map((p) => (
                  <Card key={p.id} variant="interactive" className="p-3">
                    <Link href={`/shop/${p.id}`} className="block aspect-4/5 relative rounded-xl overflow-hidden bg-linen-100 mb-2">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </Link>
                    <Link href={`/shop/${p.id}`}>
                      <h4 className="text-[15px] font-semibold line-clamp-1 hover:text-forest-800">
                        {p.name}
                      </h4>
                    </Link>
                    <span className="text-[16px] font-bold text-charcoal-900 mt-1 block">
                      {formatINR(p.price)}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav basketCount={basketCount} />
    </div>
  );
}
