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
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import {
  useBasket,
  updateBasketQuantity,
  removeFromBasket,
  clearBasket,
} from "@/lib/basket";
import { formatINR } from "@/lib/utils";
import { StoreReservation, OrderStatus } from "@/types";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function BasketPage() {
  const { items, count, total } = useBasket();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<StoreReservation | null>(null);
  const [waLink, setWaLink] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  // Generate next 6 days for trial slots
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" });
      const display = `${dayName}, ${d.getDate()} ${d.toLocaleDateString("en-IN", { month: "short" })}`;
      dates.push({ iso, display });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.iso || "");
  const [selectedSlot, setSelectedSlot] = useState<string>("5:00 PM - 7:00 PM");

  const timeSlots = [
    { id: "11:30 AM - 1:30 PM", label: "11:30 AM - 1:30 PM", tag: "Morning" },
    { id: "2:00 PM - 4:00 PM", label: "2:00 PM - 4:00 PM", tag: "Afternoon" },
    { id: "5:00 PM - 7:00 PM", label: "5:00 PM - 7:00 PM", tag: "Popular" },
    { id: "7:00 PM - 8:30 PM", label: "7:00 PM - 8:30 PM", tag: "Evening" },
    { id: "8:30 PM - 10:00 PM", label: "8:30 PM - 10:00 PM", tag: "Closes 10:00 pm" },
  ];

  const validatePhone = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    if (!/^[6-9]\d{9}$/.test(clean)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmitReservation = async (openWhatsAppDirectly: boolean = false) => {
    if (!customerName.trim()) {
      showToast("Please enter your name", "error");
      return;
    }

    if (!validatePhone(customerPhone)) {
      showToast("Please enter a valid 10-digit phone number", "error");
      return;
    }

    if (orderType === "delivery" && !deliveryAddress.trim()) {
      showToast("Please enter your delivery address in Indore", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        visitDate: orderType === "pickup" ? selectedDate : "",
        visitSlot: orderType === "pickup" ? selectedSlot : "",
        items,
        totalAmount: total,
        notes: orderType === "delivery" ? `Delivery to: ${deliveryAddress.trim()}. ${notes.trim()}` : notes.trim(),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        setWaLink(data.waUrl);
        clearBasket();
        showToast(`Reservation ${data.order.id} confirmed!`, "success");

        if (openWhatsAppDirectly && data.waUrl) {
          window.open(data.waUrl, "_blank");
        }
      } else {
        showToast(data.error || "Failed to create reservation", "error");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      showToast("Could not submit order. Please check connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pipeline status definition
  const pipelineStatuses: OrderStatus[] = [
    "New",
    "Confirmed",
    "Ready for Trial",
    "Visited",
    "Purchased",
  ];

  return (
    <div className="min-h-screen bg-linen-50 flex flex-col justify-between">
      <Header basketCount={count} />

      <main className="flex-1 pb-24 md:pb-16">
        {confirmedOrder ? (
          /* ========================================================= */
          /* CONFIRMATION SCREEN WITH PIPELINE & WHATSAPP ACTION      */
          /* ========================================================= */
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
            <Card className="p-6 sm:p-10 border-2 border-forest-800 shadow-elevated space-y-8 text-center bg-white">
              {/* Success Icon & Ref */}
              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-800">
                  <CheckCircle2 className="h-9 w-9 text-forest-800" />
                </div>
                <Badge variant="cotton" size="md">
                  Reservation Received
                </Badge>
                <h1 className="font-serif text-3xl font-bold text-charcoal-900">
                  Store Trial Confirmed!
                </h1>
                <p className="text-[16px] text-charcoal-600">
                  Reference ID:{" "}
                  <span className="font-mono font-bold text-forest-900 text-lg bg-linen-100 px-3 py-1 rounded-md">
                    {confirmedOrder.id}
                  </span>
                </p>
              </div>

              {/* STATUS PIPELINE VISUALIZER */}
              <div className="space-y-3 rounded-2xl bg-linen-100 p-4 border border-linen-200">
                <span className="text-[13px] font-bold uppercase tracking-wider text-charcoal-600 block text-left">
                  Order Status Pipeline
                </span>
                <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
                  {pipelineStatuses.map((st, idx) => {
                    const isCurrent = st === confirmedOrder.status;
                    return (
                      <div key={st} className="flex flex-col items-center flex-1 min-w-[70px]">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ${
                            isCurrent
                              ? "bg-forest-800 text-white ring-4 ring-forest-200"
                              : "bg-white text-charcoal-400 border border-linen-300"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span
                          className={`mt-1.5 text-[11px] font-medium leading-tight text-center ${
                            isCurrent ? "font-bold text-forest-900" : "text-charcoal-500"
                          }`}
                        >
                          {st}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Slot & Store Details */}
              <div className="rounded-2xl border border-linen-200 bg-linen-50 p-5 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[14px] font-bold text-charcoal-900 block">
                      Scheduled Visit Window:
                    </span>
                    <span className="text-[15px] text-charcoal-700">
                      {confirmedOrder.visitDate} • {confirmedOrder.visitSlot}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-linen-200 pt-3">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[14px] font-bold text-charcoal-900 block">
                      Store Address:
                    </span>
                    <span className="text-[15px] text-charcoal-700 leading-snug">
                      634, Sudama Nagar Main Rd, Usha Nagar, Indore (Open daily, Closes 10:00 pm)
                    </span>
                  </div>
                </div>
              </div>

              {/* Reserved Items Summary */}
              <div className="text-left space-y-2 border-t border-linen-200 pt-4">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Reserved Items ({confirmedOrder.items.length})
                </h3>
                <div className="divide-y divide-linen-200">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-[15px]">
                      <div>
                        <span className="font-semibold text-charcoal-900 block">
                          {item.product.name}
                        </span>
                        <span className="text-[13px] text-charcoal-500">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-charcoal-900">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 border-t border-linen-300 font-bold text-[16px]">
                  <span>Total Amount for Trial:</span>
                  <span className="text-forest-900">{formatINR(confirmedOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E20] px-6 py-3 font-semibold text-white shadow-card hover:bg-[#154a19] transition-all"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Open Pre-filled WhatsApp Chat</span>
                  </a>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://maps.google.com/?q=Cotton+Junction+634+Sudama+Nagar+Main+Rd+Indore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-forest-800 text-forest-800 bg-white font-semibold hover:bg-forest-50 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Directions in Maps</span>
                  </a>

                  <Link href="/shop" className="flex-1">
                    <Button variant="secondary" size="md" fullWidth>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ) : items.length === 0 ? (
          /* ========================================================= */
          /* EMPTY BASKET STATE                                        */
          /* ========================================================= */
          <div className="mx-auto max-w-lg py-16 px-4">
            <EmptyState
              icon={ShoppingBag}
              title="Your Enquiry Basket is Empty"
              description="Browse our pure cotton apparel, branded surplus shirts, and kids collections to reserve styles for a free trial at our Sudama Nagar store."
              actionLabel="Explore Collections"
              onAction={() => (window.location.href = "/shop")}
            />
          </div>
        ) : (
          /* ========================================================= */
          /* BASKET ITEMS & SLOT BOOKING FORM                         */
          /* ========================================================= */
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-linen-200 pb-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  Enquiry Basket &amp; Store Reservation
                </h1>
                <p className="text-[15px] text-charcoal-600 mt-1">
                  Reserve styles to inspect fabric and try fitting at 634, Sudama Nagar, Indore
                </p>
              </div>
              <button
                onClick={clearBasket}
                className="text-[14px] font-semibold text-terracotta-500 hover:underline"
              >
                Clear Basket
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: BASKET ITEMS LIST */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="divide-y divide-linen-200 bg-white p-4 sm:p-6 border-linen-200">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColour}`}
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/shop/${item.product.id}`}
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-linen-100 border border-linen-200"
                      >
                        <Image
                          src={item.product.image || "/stock/fabric-cotton.jpg"}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/shop/${item.product.id}`}>
                          <h3 className="text-[16px] font-semibold text-charcoal-900 hover:text-forest-800 line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-[13px] text-charcoal-500">
                          <span className="font-medium bg-linen-100 px-2 py-0.5 rounded text-charcoal-800">
                            Size: {item.selectedSize}
                          </span>
                          <span>•</span>
                          <span>{item.selectedColour}</span>
                        </div>
                        <div className="mt-1 font-bold text-[16px] text-charcoal-900">
                          {formatINR(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateBasketQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColour,
                              -1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-linen-300 text-charcoal-700 hover:bg-linen-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-[15px] text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateBasketQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColour,
                              1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-linen-300 text-charcoal-700 hover:bg-linen-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeFromBasket(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColour
                          )
                        }
                        className="p-2 text-charcoal-400 hover:text-terracotta-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </Card>

                {/* Free Trial Banner */}
                <div className="rounded-2xl bg-forest-50 border border-forest-200/80 p-4 text-[14px] text-forest-950 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[15px]">Zero Obligation Store Trial:</span>
                    <span>
                      We keep your selected sizes set aside in store. Try fabrics for comfort, fit, and feel before purchasing.
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: STORE-VISIT SLOT & RESERVATION FORM */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-5 sm:p-6 bg-white border-linen-200 shadow-card space-y-6 text-left">
                  {/* Order Type Toggle */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-charcoal-900 block">
                      Choose Fulfilment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType("pickup")}
                        className={`min-h-[48px] rounded-xl border p-2.5 text-center transition-all ${
                          orderType === "pickup"
                            ? "border-forest-800 bg-forest-800 text-white font-semibold shadow-subtle"
                            : "border-linen-300 bg-linen-50 text-charcoal-800 hover:bg-linen-100"
                        }`}
                      >
                        <span className="block text-[14px]">Try in Store</span>
                        <span className="block text-[11px] opacity-80">Free Reservation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType("delivery")}
                        className={`min-h-[48px] rounded-xl border p-2.5 text-center transition-all ${
                          orderType === "delivery"
                            ? "border-forest-800 bg-forest-800 text-white font-semibold shadow-subtle"
                            : "border-linen-300 bg-linen-50 text-charcoal-800 hover:bg-linen-100"
                        }`}
                      >
                        <span className="block text-[14px]">Local Delivery</span>
                        <span className="block text-[11px] opacity-80">Within Indore</span>
                      </button>
                    </div>
                  </div>

                  {/* If Store Trial: Select Date & Slot */}
                  {orderType === "pickup" && (
                    <div className="space-y-4 rounded-2xl bg-linen-50 p-4 border border-linen-200">
                      {/* Date Selector */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[14px] font-bold text-charcoal-900">
                          <Calendar className="h-4 w-4 text-forest-800" />
                          <span>Select Visit Date</span>
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {availableDates.map((d) => (
                            <button
                              key={d.iso}
                              type="button"
                              onClick={() => setSelectedDate(d.iso)}
                              className={`min-h-[44px] rounded-xl border p-2 text-center text-[12px] font-semibold transition-all ${
                                selectedDate === d.iso
                                  ? "border-forest-800 bg-forest-800 text-white shadow-xs"
                                  : "border-linen-300 bg-white text-charcoal-800 hover:bg-linen-100"
                              }`}
                            >
                              {d.display}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Window Selector */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[14px] font-bold text-charcoal-900">
                          <Clock className="h-4 w-4 text-forest-800" />
                          <span>Select Store Timing Window</span>
                        </label>
                        <div className="grid grid-cols-1 gap-1.5">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`flex min-h-[44px] items-center justify-between rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-all ${
                                selectedSlot === slot.id
                                  ? "border-forest-800 bg-forest-800 text-white shadow-xs font-semibold"
                                  : "border-linen-300 bg-white text-charcoal-800 hover:bg-linen-100"
                              }`}
                            >
                              <span>{slot.label}</span>
                              <span
                                className={`text-[11px] rounded px-2 py-0.5 ${
                                  selectedSlot === slot.id
                                    ? "bg-amber-400 text-charcoal-950 font-bold"
                                    : "bg-linen-100 text-charcoal-600"
                                }`}
                              >
                                {slot.tag}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer Information Form */}
                  <div className="space-y-3">
                    <Input
                      label="Your Name *"
                      placeholder="e.g. Rajesh Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />

                    <Input
                      label="10-Digit Mobile Number *"
                      placeholder="e.g. 9826012345"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (phoneError) validatePhone(e.target.value);
                      }}
                      error={phoneError}
                      helperText="Used only to reserve items and verify your visit."
                    />

                    {orderType === "delivery" && (
                      <div className="space-y-1">
                        <label className="block text-[14px] font-medium text-charcoal-800">
                          Delivery Address in Indore *
                        </label>
                        <textarea
                          rows={2}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="e.g. Flat 302, Scheme 54, Vijay Nagar, Indore"
                          className="w-full rounded-xl border border-linen-300 p-3 text-[15px] focus:border-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-800/20"
                        />
                      </div>
                    )}

                    <Input
                      label="Special Requests / Fitting Notes (Optional)"
                      placeholder="e.g. Also keep size L ready for comparison"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {/* Summary & Totals */}
                  <div className="border-t border-linen-200 pt-4 space-y-2 text-[15px]">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Items Subtotal ({count} styles)</span>
                      <span>{formatINR(total)}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Store Trial &amp; Reservation</span>
                      <span className="font-semibold text-forest-800">FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-linen-200 pt-2 text-lg font-bold text-charcoal-900">
                      <span>Estimated Amount</span>
                      <span className="text-forest-900">{formatINR(total)}</span>
                    </div>
                    <p className="text-[13px] text-charcoal-500 pt-1">
                      No advance payment needed. Pay in store by cash/UPI after trial.
                    </p>
                  </div>

                  {/* Submit Actions */}
                  <div className="space-y-2.5 pt-2">
                    {/* Primary Action: Confirm on WhatsApp */}
                    <Button
                      onClick={() => handleSubmitReservation(true)}
                      variant="whatsapp"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                      leftIcon={<MessageSquare className="h-5 w-5" />}
                    >
                      Confirm &amp; Open WhatsApp
                    </Button>

                    {/* Secondary Action: Reserve Store Visit (Web only) */}
                    <Button
                      onClick={() => handleSubmitReservation(false)}
                      variant="primary"
                      size="md"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Reserve Store Visit (Web Only)
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav basketCount={count} />
    </div>
  );
}
