"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { addToBasket, useBasket } from "@/lib/basket";
import { Product, ProductCategory, ProductOccasion } from "@/types";
import localProductsRaw from "@/data/products.json";
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";

const allProducts = localProductsRaw as Product[];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { count: basketCount } = useBasket();

  // URL search params state
  const initialCategory = searchParams.get("category") || "All";
  const initialOccasion = searchParams.get("occasion") || "All";
  const initialFabric = searchParams.get("fabric") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "featured";
  const initialInStock = searchParams.get("inStock") === "true";

  const [category, setCategory] = useState<string>(initialCategory);
  const [occasion, setOccasion] = useState<string>(initialOccasion);
  const [fabric, setFabric] = useState<string>(initialFabric);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(initialInStock);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Category count metrics
  const categoryCounts = useMemo(() => ({
    All: allProducts.length,
    Men: allProducts.filter((p) => p.category === "Men").length,
    Women: allProducts.filter((p) => p.category === "Women").length,
    Kids: allProducts.filter((p) => p.category === "Kids").length,
  }), []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync incoming URL search params to state
  useEffect(() => {
    const urlCat = searchParams.get("category") || "All";
    if (urlCat !== category) {
      setCategory(urlCat);
      setSelectedSize("All");
    }
    const urlOcc = searchParams.get("occasion") || "All";
    if (urlOcc !== occasion) setOccasion(urlOcc);

    const urlFab = searchParams.get("fabric") || "All";
    if (urlFab !== fabric) setFabric(urlFab);

    const urlQ = searchParams.get("q") || "";
    if (urlQ !== searchQuery) {
      setSearchQuery(urlQ);
      setDebouncedSearch(urlQ);
    }

    const urlSort = searchParams.get("sort") || "featured";
    if (urlSort !== sortBy) setSortBy(urlSort);

    const urlInStock = searchParams.get("inStock") === "true";
    if (urlInStock !== inStockOnly) setInStockOnly(urlInStock);
  }, [searchParams]);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (occasion !== "All") params.set("occasion", occasion);
    if (fabric !== "All") params.set("fabric", fabric);
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (inStockOnly) params.set("inStock", "true");

    const queryStr = params.toString();
    const newUrl = queryStr ? `/shop?${queryStr}` : `/shop`;
    router.replace(newUrl, { scroll: false });
  }, [category, occasion, fabric, debouncedSearch, sortBy, inStockOnly, router]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setSelectedSize("All"); // Prevent 0-results due to adult vs kids size divergence
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Category filter
      if (category !== "All" && p.category !== category) return false;

      // Occasion filter
      if (occasion !== "All" && !p.occasion.includes(occasion as ProductOccasion)) return false;

      // Fabric filter
      if (fabric !== "All" && p.fabric !== fabric) return false;

      // Size filter
      if (selectedSize !== "All" && !p.sizes.includes(selectedSize)) return false;

      // Max price
      if (p.price > maxPrice) return false;

      // In stock
      if (inStockOnly && p.stock <= 0) return false;

      // Search
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSubcategory = p.subcategory.toLowerCase().includes(query);
        const matchesFabric = p.fabric.toLowerCase().includes(query);
        const matchesColour = p.colours.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesSubcategory && !matchesFabric && !matchesColour) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "discount") {
        const discA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discB - discA;
      }
      return 0; // featured default
    });
  }, [category, occasion, fabric, selectedSize, maxPrice, inStockOnly, debouncedSearch, sortBy]);

  const handleQuickAdd = (product: Product, size: string) => {
    addToBasket(product, size, product.colours[0]);
    showToast(`Added "${product.name}" (${size}) to enquiry basket`, "success");
  };

  const resetFilters = () => {
    setCategory("All");
    setOccasion("All");
    setFabric("All");
    setSelectedSize("All");
    setSearchQuery("");
    setDebouncedSearch("");
    setMaxPrice(3000);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const activeFiltersCount =
    (category !== "All" ? 1 : 0) +
    (occasion !== "All" ? 1 : 0) +
    (fabric !== "All" ? 1 : 0) +
    (selectedSize !== "All" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={basketCount} />

      <main className="flex-1 pb-24 md:pb-16">
        {/* SHOP HERO / BREADCRUMB STRIP */}
        <div className="bg-linen-100 border-b border-linen-200 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="cotton">pure cotton &amp; surplus</Badge>
                  <Badge variant="sample">Sample catalogue</Badge>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
                  Family Clothing Collection
                </h1>
                <p className="text-[14px] sm:text-[15px] text-charcoal-600 mt-0.5">
                  Showing {filteredProducts.length} styles • Sudama Nagar, Indore
                </p>
              </div>

              {/* Sample Data Fallback Indicator */}
              <div className="rounded-xl border border-linen-300 bg-white px-3 py-1.5 text-[12px] font-medium text-charcoal-700 shadow-xs">
                Data: <span className="font-semibold text-forest-800">Bundled Sample Catalogue</span>
              </div>
            </div>

            {/* Quick Category Tab Chips */}
            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(["All", "Men", "Women", "Kids"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 text-[14px] sm:text-[15px] font-semibold transition-all inline-flex items-center gap-2 ${
                    category === cat
                      ? "bg-forest-800 text-white shadow-subtle"
                      : "bg-white text-charcoal-700 border border-linen-300 hover:bg-linen-200"
                  }`}
                >
                  <span>{cat === "All" ? "All Categories" : cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[12px] font-bold ${
                      category === cat
                        ? "bg-white/20 text-white"
                        : "bg-linen-200 text-charcoal-700"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <div className="sticky top-[106px] z-30 border-b border-linen-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kurtas, shirts, frocks, sarees..."
                className="w-full min-h-[44px] rounded-full border border-linen-300 bg-linen-50 pl-10 pr-9 text-[15px] text-charcoal-900 placeholder:text-charcoal-400 focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden sm:block min-h-[44px] rounded-full border border-linen-300 bg-white px-4 text-[14px] font-medium text-charcoal-800 focus:border-forest-800 focus:outline-none"
              >
                <option value="featured">Featured / Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Surplus Discount</option>
              </select>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-linen-300 bg-white px-4 text-[15px] font-semibold text-charcoal-800 hover:bg-linen-100 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4 text-forest-800" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-800 text-[11px] font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="hidden md:flex min-h-[44px] items-center gap-1 rounded-full px-3 text-[14px] font-medium text-terracotta-500 hover:bg-terracotta-50 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MAIN PRODUCT CATALOGUE GRID */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          {/* Active Filter Chips Strip */}
          {activeFiltersCount > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[13px]">
              <span className="font-medium text-charcoal-500">Active filters:</span>
              {category !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-forest-100 px-3 py-1 font-semibold text-forest-800">
                  {category}
                  <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => setCategory("All")} />
                </span>
              )}
              {occasion !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-linen-200 px-3 py-1 font-semibold text-charcoal-800">
                  {occasion}
                  <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => setOccasion("All")} />
                </span>
              )}
              {fabric !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-linen-200 px-3 py-1 font-semibold text-charcoal-800">
                  {fabric}
                  <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => setFabric("All")} />
                </span>
              )}
              {selectedSize !== "All" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-linen-200 px-3 py-1 font-semibold text-charcoal-800">
                  Size: {selectedSize}
                  <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => setSelectedSize("All")} />
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 rounded-full bg-linen-200 px-3 py-1 font-semibold text-charcoal-800">
                  In Stock Only
                  <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => setInStockOnly(false)} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-[13px] font-semibold text-terracotta-500 hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* SKELETON / EMPTY / GRID STATES */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="space-y-3 rounded-2xl bg-white p-3 border border-linen-200">
                  <Skeleton className="aspect-4/5 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={ShoppingBag}
                title="No matching styles found"
                description="We couldn't find any products matching your selected combination. Try clearing filters or searching with a different term."
                actionLabel="Reset All Filters"
                onAction={resetFilters}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FILTER DRAWER / BOTTOM SHEET */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter Collection"
        description="Refine by category, occasion, fabric and size"
      >
        <div className="space-y-6 pt-2">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-[15px] font-semibold text-charcoal-900 block">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["All", "Men", "Women", "Kids"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`min-h-[48px] rounded-xl border px-3 text-[15px] font-medium transition-all inline-flex items-center justify-between ${
                    category === cat
                      ? "border-forest-800 bg-forest-800 text-white"
                      : "border-linen-300 bg-white text-charcoal-800"
                  }`}
                >
                  <span>{cat === "All" ? "All Categories" : cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[12px] font-bold ${
                      category === cat
                        ? "bg-white/20 text-white"
                        : "bg-linen-100 text-charcoal-600"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2">
            <label className="text-[15px] font-semibold text-charcoal-900 block">
              Occasion
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["All", "Everyday", "Festive/Diwali", "Wedding", "Casual"].map((occ) => (
                <button
                  key={occ}
                  onClick={() => setOccasion(occ)}
                  className={`min-h-[48px] rounded-xl border px-3 text-[14px] font-medium transition-all ${
                    occasion === occ
                      ? "border-forest-800 bg-forest-800 text-white"
                      : "border-linen-300 bg-white text-charcoal-800"
                  }`}
                >
                  {occ === "All" ? "All Occasions" : occ}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Type */}
          <div className="space-y-2">
            <label className="text-[15px] font-semibold text-charcoal-900 block">
              Fabric
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["All", "pure cotton", "premium fabrics", "cotton blend"].map((fab) => (
                <button
                  key={fab}
                  onClick={() => setFabric(fab)}
                  className={`min-h-[48px] rounded-xl border px-3 text-[14px] font-medium capitalize transition-all ${
                    fabric === fab
                      ? "border-forest-800 bg-forest-800 text-white"
                      : "border-linen-300 bg-white text-charcoal-800"
                  }`}
                >
                  {fab === "All" ? "All Fabrics" : fab}
                </button>
              ))}
            </div>
          </div>

          {/* Adult & Kids Sizes */}
          <div className="space-y-2">
            <label className="text-[15px] font-semibold text-charcoal-900 block">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {["All", "XS", "S", "M", "L", "XL", "XXL", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`flex h-11 min-w-[48px] items-center justify-center rounded-xl border px-3 text-[14px] font-medium transition-all ${
                    selectedSize === sz
                      ? "border-forest-800 bg-forest-800 text-white"
                      : "border-linen-300 bg-white text-charcoal-800"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-linen-200">
            <label className="flex items-center gap-3 cursor-pointer min-h-[48px]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-5 w-5 rounded border-linen-400 text-forest-800 focus:ring-forest-800"
              />
              <span className="text-[16px] font-medium text-charcoal-800">
                In-Stock Styles Only
              </span>
            </label>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-linen-200">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={resetFilters}
            >
              Reset All
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              Apply ({filteredProducts.length} styles)
            </Button>
          </div>
        </div>
      </Drawer>

      <Footer />
      <BottomNav basketCount={basketCount} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linen-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-800 border-t-transparent mx-auto" />
          <p className="text-[16px] font-medium text-charcoal-700">Loading collection...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
