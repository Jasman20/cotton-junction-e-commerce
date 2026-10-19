import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CUSTOMERS_FILE_PATH = path.join(process.cwd(), "src/data/customers.json");

interface PointTransaction {
  id: string;
  date: string;
  type: "EARN_SIGNUP" | "EARN_PURCHASE" | "REDEEM_DISCOUNT";
  points: number;
  description: string;
}

interface CustomerRecord {
  id: string;
  phone: string;
  name: string;
  email?: string;
  locality?: string;
  joinedDate: string;
  pointsBalance: number;
  lifetimeSpent: number;
  tier: "Silver Family" | "Gold Family" | "Diamond Family";
  consentGiven: boolean;
  consentTimestamp: string;
  transactions: PointTransaction[];
}

function getCustomers(): CustomerRecord[] {
  try {
    if (fs.existsSync(CUSTOMERS_FILE_PATH)) {
      const data = fs.readFileSync(CUSTOMERS_FILE_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading customers file", e);
  }
  return [];
}

function saveCustomers(customers: CustomerRecord[]) {
  try {
    fs.writeFileSync(CUSTOMERS_FILE_PATH, JSON.stringify(customers, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing customers file", e);
  }
}

// GET: Lookup customer points by phone number
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone")?.replace(/\D/g, "");

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const customers = getCustomers();
  const found = customers.find((c) => c.phone.endsWith(phone.slice(-10)));

  if (!found) {
    return NextResponse.json({ found: false, message: "Member not registered yet" }, { status: 404 });
  }

  return NextResponse.json({
    found: true,
    customer: found,
  });
}

// POST: Join Family Points Club (Counter QR or Online)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cleanPhone = (body.phone || "").replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please provide a valid 10-digit Indian mobile number" }, { status: 400 });
    }

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide your full name" }, { status: 400 });
    }

    if (!body.consentGiven) {
      return NextResponse.json(
        { error: "DPDP consent is required to participate in the points program" },
        { status: 400 }
      );
    }

    const customers = getCustomers();
    const existing = customers.find((c) => c.phone.endsWith(cleanPhone.slice(-10)));

    if (existing) {
      return NextResponse.json({
        success: true,
        isNew: false,
        customer: existing,
        message: "Welcome back! Your existing points account is active.",
      });
    }

    // New member registration with 50 welcome points
    const newId = `CJ-CUST-${1000 + customers.length + 1}`;
    const nowIso = new Date().toISOString();
    const today = nowIso.split("T")[0];

    const newCustomer: CustomerRecord = {
      id: newId,
      phone: cleanPhone.slice(-10),
      name: body.name.trim(),
      email: body.email?.trim() || undefined,
      locality: body.locality?.trim() || "Indore",
      joinedDate: today,
      pointsBalance: 50, // 50 Welcome Points = ₹50
      lifetimeSpent: 0,
      tier: "Silver Family",
      consentGiven: true,
      consentTimestamp: nowIso,
      transactions: [
        {
          id: `TX-${Date.now().toString().slice(-5)}`,
          date: today,
          type: "EARN_SIGNUP",
          points: 50,
          description: "Counter QR Welcome Bonus (₹50 discount value)",
        },
      ],
    };

    customers.unshift(newCustomer);
    saveCustomers(customers);

    return NextResponse.json({
      success: true,
      isNew: true,
      customer: newCustomer,
      message: "Congratulations! 50 Welcome Points (₹50 value) have been credited.",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to register" }, { status: 500 });
  }
}

// PATCH: Redeem points in store
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, pointsToRedeem } = body;
    const cleanPhone = (phone || "").replace(/\D/g, "");

    const customers = getCustomers();
    const customer = customers.find((c) => c.phone.endsWith(cleanPhone.slice(-10)));

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    if (customer.pointsBalance < pointsToRedeem) {
      return NextResponse.json(
        { error: `Insufficient points. Available: ${customer.pointsBalance}` },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    customer.pointsBalance -= pointsToRedeem;
    customer.transactions.unshift({
      id: `TX-RED-${Date.now().toString().slice(-4)}`,
      date: today,
      type: "REDEEM_DISCOUNT",
      points: -pointsToRedeem,
      description: `In-Store Billing Discount Redeemed (₹${pointsToRedeem} off)`,
    });

    saveCustomers(customers);

    return NextResponse.json({
      success: true,
      customer,
      message: `Successfully redeemed ${pointsToRedeem} points (₹${pointsToRedeem} off bill)!`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Redemption failed" }, { status: 500 });
  }
}
