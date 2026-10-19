"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "./Badge";
import { GarmentIllustration } from "../illustrations/GarmentIllustration";
import { ShoppingBag, Sparkles } from "lucide-react";

export interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-linen-200 bg-white shadow-subtle transition-all duration-300 hover:shadow-card">
      {/* Product Image / Illustration Container */}
      <Link
        href={`/shop/${product.id}`}
        className="relative block w-full overflow-hidden bg-linen-100 min-h-[220px] sm:min-h-[280px]"
        style={{ aspectRatio: "4 / 5" }}
      >
        {!imageError && product.image && !product.image.includes("illustration") ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <GarmentIllustration
            type={product.garmentType}
            colorVariant={product.colours[0]?.toLowerCase()}
            className="h-full w-full"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 pointer-events-none">
          {product.isSurplusBranded ? (
            <Badge variant="surplus" size="sm">
              branded surplus stock
            </Badge>
          ) : product.fabric === "pure cotton" ? (
            <Badge variant="cotton" size="sm">
              pure cotton
            </Badge>
          ) : (
            <Badge variant="default" size="sm">
              {product.fabric}
            </Badge>
          )}

          <Badge variant="sample" size="sm">
            Sample image
          </Badge>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {/* Category & Subcategory Tag */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px] font-medium text-charcoal-500 mb-0.5 sm:mb-1">
          <span>{product.category}</span>
          <span>•</span>
          <span className="truncate">{product.subcategory}</span>
        </div>

        {/* Product Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="line-clamp-2 text-[14px] sm:text-[17px] font-semibold text-charcoal-900 group-hover:text-forest-800 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-[15px] sm:text-[18px] font-bold text-charcoal-900">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[12px] sm:text-[14px] text-charcoal-500 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Size Selection Chips */}
        <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] sm:text-[12px] font-medium text-charcoal-500 mr-0.5 shrink-0">Size:</span>
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`flex h-6 min-w-6 sm:h-7 sm:min-w-7 items-center justify-center rounded px-1 text-[11px] sm:text-[12px] font-medium transition-all shrink-0 ${
                selectedSize === size
                  ? "bg-forest-800 text-white shadow-xs"
                  : "bg-linen-100 text-charcoal-700 hover:bg-linen-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quick Action Button */}
        <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t border-linen-200">
          <button
            type="button"
            onClick={() => onQuickAdd && onQuickAdd(product, selectedSize)}
            className="flex min-h-[40px] sm:min-h-[44px] w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-forest-800 px-3 py-1.5 sm:px-4 sm:py-2 text-[13px] sm:text-[15px] font-semibold text-white transition-all hover:bg-forest-900 active:scale-98"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Reserve to Try</span>
          </button>
        </div>
      </div>
    </div>
  );
};
