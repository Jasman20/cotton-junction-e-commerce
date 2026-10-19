import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { StoreReservation, OrderStatus } from "@/types";
import initialOrders from "@/data/orders.json";

const ordersFilePath = path.join(process.cwd(), "src", "data", "orders.json");

function readOrders(): StoreReservation[] {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const data = fs.readFileSync(ordersFilePath, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read orders from file:", err);
  }
  return initialOrders as StoreReservation[];
}

function writeOrders(orders: StoreReservation[]) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write orders to file:", err);
  }
}

export async function GET() {
  const orders = readOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, orderType, visitDate, visitSlot, items, totalAmount, notes } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and at least one item are required." },
        { status: 400 }
      );
    }

    // Generate readable order reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `CJ-ORD-${randomSuffix}`;

    const newOrder: StoreReservation = {
      id: orderId,
      customerName,
      customerPhone,
      orderType: orderType || "pickup",
      visitDate: visitDate || "",
      visitSlot: visitSlot || "",
      items,
      totalAmount: totalAmount || 0,
      notes: notes || "",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // Save locally
    const currentOrders = readOrders();
    currentOrders.unshift(newOrder);
    writeOrders(currentOrders);

    // Attempt Google Sheet webhook if configured
    let webhookStatus = "not_configured";
    const webhookUrl = process.env.GOOGLE_SHEET_ORDERS_WEBHOOK;

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          webhookStatus = "success";
        } else {
          webhookStatus = "failed_queued_locally";
        }
      } catch (e) {
        console.warn("[Orders API] Google Sheet webhook timeout/error, queued locally:", e);
        webhookStatus = "failed_queued_locally";
      }
    }

    // Generate pre-filled WhatsApp message
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+916264673265";
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

    let itemsList = items
      .map(
        (i: any, idx: number) =>
          `${idx + 1}. *${i.product.name}*\n   Size: ${i.selectedSize} | Qty: ${i.quantity} | ₹${
            i.product.price * i.quantity
          }`
      )
      .join("\n");

    let slotText =
      orderType === "pickup"
        ? `*Trial Slot:* ${visitDate} (${visitSlot}) at Sudama Nagar Store`
        : `*Delivery Request:* Indore Address (${notes || "Call for address"})`;

    const message = `*COTTON JUNCTION ENQUIRY / RESERVATION*\nRef: *${orderId}*\n\n*Customer:* ${customerName} (${customerPhone})\n${slotText}\n\n*Reserved Items:*\n${itemsList}\n\n*Estimated Total:* ₹${totalAmount}\n${
      notes ? `*Notes:* ${notes}\n` : ""
    }\n_Please confirm availability for trial._`;

    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      order: newOrder,
      waUrl,
      webhookStatus,
    });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error creating order." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status required" }, { status: 400 });
    }

    const currentOrders = readOrders();
    const orderIndex = currentOrders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    currentOrders[orderIndex].status = status as OrderStatus;
    writeOrders(currentOrders);

    return NextResponse.json({
      success: true,
      order: currentOrders[orderIndex],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update order status" }, { status: 500 });
  }
}
