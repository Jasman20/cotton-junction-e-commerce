"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isOwnerAuthenticated, setOwnerAuthenticated } from "@/lib/ownerAuth";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { formatINR } from "@/lib/utils";
import { StoreReservation, OrderStatus, Product, BasketItem } from "@/types";
import localProductsRaw from "@/data/products.json";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Phone,
  MessageCircle,
  Users,
  Search,
  Filter,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

const allProducts = localProductsRaw as Product[];

const STATUS_COLOURS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  New: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  Confirmed: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  "Ready for Trial": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  Visited: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300" },
  Purchased: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  Cancelled: { bg: "bg-charcoal-100", text: "text-charcoal-600", border: "border-charcoal-300" },
};

export default function OwnerDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<StoreReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  // Check private authentication on mount
  useEffect(() => {
    if (!isOwnerAuthenticated()) {
      router.push("/owner/login");
    } else {
      fetchOrders();
    }
  }, [router]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch store reservations", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdatingStatus(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      showToast(`Order ${orderId} marked as ${newStatus}`, "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleLogout = () => {
    setOwnerAuthenticated(false);
    router.push("/owner/login");
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const active = orders.filter((o) =>
      ["New", "Confirmed", "Ready for Trial"].includes(o.status)
    ).length;
    const purchased = orders.filter((o) => o.status === "Purchased");
    const visited = orders.filter((o) =>
      ["Visited", "Purchased"].includes(o.status)
    ).length;

    const conversionRate = visited > 0 ? Math.round((purchased.length / visited) * 100) : 0;
    const totalRevenue = purchased.reduce((acc, o) => acc + o.totalAmount, 0);

    return {
      total,
      active,
      purchasedCount: purchased.length,
      conversionRate,
      totalRevenue,
    };
  }, [orders]);

  // Low stock inventory items (<= 6 units)
  const lowStockProducts = useMemo(() => {
    return allProducts.filter((p) => p.stock <= 6);
  }, []);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = o.customerName.toLowerCase().includes(q);
        const matchPhone = o.customerPhone.includes(q);
        const matchId = o.id.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchId) return false;
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  // Generate WhatsApp reminder link for customer
  const getWhatsAppReminderUrl = (order: StoreReservation) => {
    const cleanPhone = "91" + order.customerPhone.replace(/\D/g, "").slice(-10);
    const msg = `Namaste ${order.customerName} ji! 🙏\n\nGreetings from *Cotton Junction*, Sudama Nagar, Indore.\n\nYour reserved garments (*${order.items.length} items*, total ${formatINR(
      order.totalAmount
    )}) are ready for your trial slot on *${order.visitDate || "Today"}* (${order.visitSlot || "Store Hours"}).\n\n📍 Store Address: 634, Sudama Nagar Main Rd, Indore (Closes 10:00 pm).\n\nLooking forward to welcoming your family!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      {/* Top Private Navigation Bar */}
      <header className="sticky top-0 z-40 bg-forest-900 text-white border-b border-forest-800 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/brand/logo.svg"
                alt="Cotton Junction Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-amber-300">
                Cotton Junction
              </span>
              <span className="text-[12px] text-linen-300 block -mt-0.5">
                Sudama Nagar • Private Store Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex h-10 items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 text-[13px] font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
              title="Open storefront in new tab"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View Store</span>
            </Link>

            <button
              onClick={fetchOrders}
              className="flex h-10 items-center gap-1.5 rounded-lg bg-forest-800 px-3 text-[13px] font-semibold text-linen-200 hover:bg-forest-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex h-10 items-center gap-1.5 rounded-lg bg-white/10 px-3 text-[13px] font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
          {/* EXECUTIVE KPI SNAPSHOT */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {/* Total Enquiries */}
            <div className="rounded-2xl border border-linen-300 bg-white p-4 shadow-subtle">
              <span className="text-[12px] font-bold text-charcoal-500 uppercase tracking-wider block">
                Total Reservations
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-charcoal-900 mt-1">
                {metrics.total}
              </div>
              <span className="text-[12px] text-charcoal-600 mt-0.5 block">
                Website &amp; WhatsApp leads
              </span>
            </div>

            {/* Active Pipeline */}
            <div className="rounded-2xl border border-linen-300 bg-white p-4 shadow-subtle">
              <span className="text-[12px] font-bold text-amber-600 uppercase tracking-wider block">
                Active In-Store Trials
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-600 mt-1">
                {metrics.active}
              </div>
              <span className="text-[12px] text-charcoal-600 mt-0.5 block">
                Awaiting customer visit
              </span>
            </div>

            {/* Completed Purchases */}
            <div className="rounded-2xl border border-linen-300 bg-white p-4 shadow-subtle">
              <span className="text-[12px] font-bold text-forest-800 uppercase tracking-wider block">
                Completed Purchases
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-forest-800 mt-1">
                {metrics.purchasedCount}
              </div>
              <span className="text-[12px] text-charcoal-600 mt-0.5 block">
                Billed at counter
              </span>
            </div>

            {/* Trial Conversion Rate */}
            <div className="rounded-2xl border border-linen-300 bg-white p-4 shadow-subtle">
              <span className="text-[12px] font-bold text-charcoal-500 uppercase tracking-wider block">
                Trial &rarr; Sale Rate
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-forest-800 mt-1">
                {metrics.conversionRate}%
              </div>
              <span className="text-[12px] text-charcoal-600 mt-0.5 block">
                Store visit conversion
              </span>
            </div>

            {/* Gross Revenue */}
            <div className="col-span-2 lg:col-span-1 rounded-2xl border border-forest-800 bg-forest-800 p-4 text-white shadow-subtle">
              <span className="text-[12px] font-bold text-amber-300 uppercase tracking-wider block">
                Billed Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                {formatINR(metrics.totalRevenue)}
              </div>
              <span className="text-[12px] text-linen-300 mt-0.5 block">
                From website reservations
              </span>
            </div>
          </div>

          {/* MAIN PIPELINE MANAGER SECTION */}
          <div className="rounded-3xl border border-linen-300 bg-white shadow-card overflow-hidden">
            {/* Table Header & Controls */}
            <div className="border-b border-linen-200 p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                    Customer Reservation &amp; Trial Pipeline
                  </h2>
                  <p className="text-[14px] text-charcoal-600 mt-0.5">
                    Prepare garments before family arrives at Sudama Nagar store. Advance status as trial progresses.
                  </p>
                </div>

                {/* Search input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, ID..."
                    className="w-full min-h-[40px] rounded-xl border border-linen-300 bg-linen-50 pl-9 pr-3 text-[14px] focus:border-forest-800 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {["All", "New", "Confirmed", "Ready for Trial", "Visited", "Purchased", "Cancelled"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`min-h-[38px] whitespace-nowrap rounded-lg px-3.5 text-[13px] font-semibold transition-all ${
                        statusFilter === st
                          ? "bg-forest-800 text-white shadow-xs"
                          : "bg-linen-100 text-charcoal-700 hover:bg-linen-200"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders List / Cards */}
            <div className="divide-y divide-linen-200">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-charcoal-500">
                  No reservations match the selected filter.
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const statusKey = order.status as OrderStatus;
                  const statusStyle = STATUS_COLOURS[statusKey] || STATUS_COLOURS.New;

                  return (
                    <div key={order.id} className="p-4 sm:p-6 space-y-4 hover:bg-linen-50/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[14px] font-bold text-charcoal-900">
                            {order.id}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            {order.status}
                          </span>
                          <span className="text-[12px] text-charcoal-500">
                            {order.orderType === "delivery" ? "🚚 Home Delivery" : "🛍️ Store Trial & Pickup"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[13px] text-charcoal-600 font-medium">
                          <Clock className="h-4 w-4 text-forest-800" />
                          <span>
                            Slot: <strong>{order.visitDate || "Today"}</strong> ({order.visitSlot || "Store Hours"})
                          </span>
                        </div>
                      </div>

                      {/* Customer Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-linen-100/60 rounded-xl p-3 text-[14px]">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="font-bold text-charcoal-900">
                            {order.customerName}
                          </span>
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="text-forest-800 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>+91 {order.customerPhone}</span>
                          </a>
                          <span className="text-charcoal-500">
                            {order.notes || "Indore"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Direct WhatsApp notify */}
                          <a
                            href={getWhatsAppReminderUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-emerald-600 px-3 text-[12px] font-bold text-white hover:bg-emerald-700 shadow-xs"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Notify on WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Items requested row with photos */}
                      <div className="space-y-2">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-charcoal-500 block">
                          Requested Garments ({order.items.length} items • {formatINR(order.totalAmount)}):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {order.items.map((it: BasketItem, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 rounded-xl border border-linen-200 bg-white p-2 text-[13px]"
                            >
                              <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-linen-100 shrink-0">
                                {it.product.image && (
                                  <Image
                                    src={it.product.image}
                                    alt={it.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="font-semibold text-charcoal-900 line-clamp-1">
                                  {it.product.name}
                                </span>
                                <span className="text-charcoal-600 text-[12px]">
                                  Size: <strong>{it.selectedSize}</strong> • {formatINR(it.product.price)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action status buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-linen-100 text-[13px]">
                        <span className="font-medium text-charcoal-500">
                          Update Pipeline Status:
                        </span>

                        <div className="flex flex-wrap gap-1.5">
                          {order.status === "New" && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, "Confirmed")}
                              className="rounded-lg bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700"
                            >
                              Confirm Slot
                            </button>
                          )}
                          {order.status === "Confirmed" && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, "Ready for Trial")}
                              className="rounded-lg bg-purple-600 px-3 py-1 font-semibold text-white hover:bg-purple-700"
                            >
                              Hang in Trial Room
                            </button>
                          )}
                          {order.status === "Ready for Trial" && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, "Visited")}
                              className="rounded-lg bg-indigo-600 px-3 py-1 font-semibold text-white hover:bg-indigo-700"
                            >
                              Customer Arrived
                            </button>
                          )}
                          {order.status === "Visited" && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, "Purchased")}
                              className="rounded-lg bg-emerald-600 px-3 py-1 font-semibold text-white hover:bg-emerald-700"
                            >
                              Mark Billed &amp; Purchased
                            </button>
                          )}
                          {order.status !== "Cancelled" && order.status !== "Purchased" && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, "Cancelled")}
                              className="rounded-lg border border-linen-300 px-2.5 py-1 text-charcoal-600 hover:bg-linen-100"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* LOW STOCK INVENTORY ALERTS (<= 6 units) */}
          <div className="rounded-3xl border border-linen-300 bg-white p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-serif text-xl font-bold text-charcoal-900">
                  Surplus Stock &amp; Low Inventory Alerts ({lowStockProducts.length} styles)
                </h3>
              </div>
              <Badge variant="surplus">Stock &le; 6 units</Badge>
            </div>

            <p className="text-[14px] text-charcoal-600">
              These popular pure cotton items are running low. Procure fresh lots or adjust store display.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/40 p-3"
                >
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-linen-100 shrink-0">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-charcoal-900 text-[13px] line-clamp-1">
                      {p.name}
                    </span>
                    <span className="text-[12px] text-charcoal-600 block">
                      {p.category} • {formatINR(p.price)}
                    </span>
                    <span className="inline-block rounded bg-amber-200 px-1.5 py-0.5 text-[11px] font-bold text-amber-900 mt-1">
                      Only {p.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-linen-200 bg-white py-4 text-center text-[12px] text-charcoal-500">
        Cotton Junction Store Manager Portal • Sudama Nagar, Indore • Completed 8 Years • Closes 10:00 pm
      </footer>
    </div>
  );
}
