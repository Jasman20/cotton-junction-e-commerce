# Cotton Junction Digital Hub

A mobile-first, production-ready digital bridge for **Cotton Junction**, a local family clothing store in Sudama Nagar, Indore (est. October 2018).

---

## 1. Business Context & Problem

- **The Store**: Founded in October 2018 as a garage-converted store in Sudama Nagar, Indore, Cotton Junction sells pure cotton and premium fabric apparel for Men, Women, and Kids, alongside authentic branded surplus stock.
- **The Challenge**: The business has operated strictly offline. Over the past two years, revenue growth flattened as local middle and upper-middle income families increasingly migrated to digital-first Instagram labels and aggressive low-price synthetic clothing sellers.
- **The Solution**: Cotton Junction Digital Hub does not attempt to be another faceless eCommerce app. Instead, it digitizes the store's physical strengths:
  1. **Fabric Trust**: Highlighting 100% pure cotton breathability suited for Malwa / Central India summers.
  2. **Family Coordination**: The star *Family Outfit Builder* lets parents coordinate festive and everyday looks for the whole family in matching palettes within a target budget.
  3. **Zero-Risk In-Store Trial**: "Reserve to Try in Store" lets families choose sizes online; garments are kept hanging in a designated trial room before they arrive.
  4. **Counter Loyalty Retention**: A DPDP Act 2023 compliant *Family Points Club* (1 Point = ₹1 Cash Discount) that turns walk-in shoppers into repeat customers.
  5. **Private Owner Operations**: A protected portal with real-time trial pipelines, conversion analytics, and inventory alerts.

---

## 2. Key Features

### 🛍️ Curated Pure Cotton & Surplus Catalogue (`/shop`)
- 40 seeded styles across **Men (15)**, **Women (15)**, and **Kids (10)** with verified pure cotton and branded surplus tags.
- Photorealistic studio product imagery for all garments.
- URL-synchronized category switching (`/shop?category=Men`, `Women`, `Kids`) with live product count badges and automatic size filter resets.
- Multi-attribute filter drawer (Occasion, Fabric type, Sizes `XS` to `XXL` & `2-3Y` to `10-12Y`, In-Stock only).

### 👨‍👩‍👧‍👦 Family Outfit Builder (`/builder` — Star Feature)
- Interactive family configuration: customize outfits for Father, Mother, Son, and Daughter.
- Occasion selector: `Festive/Diwali`, `Wedding`, `Everyday`, and `Casual`.
- 4 Curated Central Indian Color Stories:
  - *Royal Forest Green & Antique Gold* (Signature)
  - *Festive Amber Yellow & Terracotta*
  - *Pastel Ivory & Soft Peach*
  - *Indigo Blue & Natural Linen*
- Dynamic budget target slider (₹2,500 – ₹10,000) with live price breakdown and surplus savings badges.
- One-click batch reservation to enquiry basket and pre-formatted WhatsApp enquiry.

### 🕒 Reserve to Try in Store & WhatsApp Fulfillment (`/basket`)
- 6-day date picker with 5 daily timing slots matching store hours (up to 11:30 pm closing).
- Flexible fulfillment: *In-Store Trial & Pickup* (no advance payment) or *WhatsApp Home Delivery*.
- 10-digit Indian phone validation (`^[6-9]\d{9}$`).
- Visual 5-step trial pipeline on confirmation screen.

### 🎁 Billing Counter QR Standee & Family Points (`/join` & `/points`)
- **Counter Standee Preview**: Replicates the tabletop acrylic standee at the Sudama Nagar cashier desk.
- **10-Second Sign Up**: 50 Welcome Points (₹50 discount value) credited immediately.
- **DPDP Act 2023 Compliance**: Explicit data storage consent checkbox with zero third-party sharing.
- **Rewards Balance Ledger**: Phone number lookup, tier progression (*Silver*, *Gold*, *Diamond*), cashier redemption simulator, and transaction ledger.

### 🔒 Private Store Manager Portal (`/owner/login` & `/owner/dashboard`)
- Completely private route (strictly separated from public navigation).
- Executive KPI snapshot: Total Reservations, Active In-Store Trials, Completed Purchases, Conversion Rate (%), and Billed Revenue.
- 6-Stage Interactive Pipeline Manager (`New` &rarr; `Confirmed` &rarr; `Ready for Trial` &rarr; `Visited` &rarr; `Purchased` &rarr; `Cancelled`).
- One-click WhatsApp notification trigger to inform customers their trial room is ready.
- Inventory low-stock alerts (&le; 6 units left).

### 🌿 Pure Cotton Malwa Climate Guide (`/cotton-guide`)
- Honest fabric guide comparing pure cotton, linen blends, and synthetic polyesters for Central Indian weather.
- Transparent explanation of branded surplus stock sourcing and quality grading.
- In-store fabric test guide (touch test, water absorbency, and burn test).

---

## 3. Technology Stack & Design System

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom Indian boutique color system:
  - Signature Amber Yellow (`#F7C82D`)
  - Deep Forest Green (`#1E3F35`)
  - Warm Ivory Linen (`#FAF8F5`)
  - Charcoal (`#222222`)
  - Earthy Terracotta (`#B05B35`)
- **Typography**: Playfair Display (Serif headings) + Inter (Sans body)
- **Icons**: Lucide React
- **Data Layer**: Hybrid Google Sheets published CSV integration with resilient local JSON fallbacks (`products.json`, `orders.json`, `customers.json`).

---

## 4. Store Identity & Verified Details

- **Store Name**: Cotton Junction
- **Physical Address**: 634, Sudama Nagar Main Rd, Usha Nagar, Sudama Nagar, Indore, Madhya Pradesh 452009
- **Store Hours**: Closes 11:30 pm
- **Public Google Rating**: 4.6 (124 reviews)
- **WhatsApp Support & Orders**: `+91 6264673265`
- **Store Phone**: `+91 83055 54819`
- **Owner Demo PIN**: `CJ2018`

---

## 5. Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# Customer Storefront: http://localhost:3000
# Family Outfit Builder: http://localhost:3000/builder
# Customer Points: http://localhost:3000/points
# Counter QR Sign Up: http://localhost:3000/join
# Private Store Manager: http://localhost:3000/owner/login (PIN: CJ2018)
```

---

## 6. Project Architecture

```
├── public/
│   ├── brand/               # Vector SVG and PNG logos
│   └── stock/               # Real garment and lifestyle photography
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── orders/      # Orders pipeline REST endpoints
│   │   │   └── points/      # Loyalty points & redemption REST endpoints
│   │   ├── basket/          # Slot reservation & checkout
│   │   ├── builder/         # Family Outfit Builder (Star feature)
│   │   ├── cotton-guide/    # Educational fabric & surplus guide
│   │   ├── join/            # Billing counter QR standee sign-up
│   │   ├── owner/
│   │   │   ├── dashboard/   # Executive KPIs & trial pipeline manager
│   │   │   └── login/       # Private owner authentication
│   │   ├── points/          # Customer rewards ledger & simulator
│   │   ├── shop/            # Catalogue grid, filters & product details
│   │   ├── layout.tsx       # Root layout with responsive metadata
│   │   └── page.tsx         # Storefront landing page
│   ├── components/
│   │   ├── illustrations/   # Garment fallback vector illustrations
│   │   ├── layout/          # Sticky header, bottom nav, footer
│   │   └── ui/              # Button, Badge, Card, Drawer, Toast, Skeleton
│   ├── data/
│   │   ├── customers.json   # Seeded loyalty customer records
│   │   ├── orders.json      # Pipeline order records
│   │   └── products.json    # 40 pure cotton & surplus products
│   ├── lib/
│   │   ├── basket.ts        # Client-side enquiry basket state
│   │   ├── data.ts          # Google Sheets CSV integration layer
│   │   ├── ownerAuth.ts     # Owner portal session helper
│   │   └── utils.ts         # Currency & date formatters
│   └── types/               # TypeScript interfaces
```
