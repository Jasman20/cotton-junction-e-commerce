# Cotton Junction — Design System & Theme Specification

Extracted from the brand style reference and UI kit.

## 1. Color Palette
- **Signature Amber Yellow (`#F7C82D`)**: High-contrast accent for road-sign diamond logo, promotional badges, ratings, and highlighted navigation actions.
- **Deep Forest Green (`#1E3F35`)**: Primary brand color for main CTAs, headers, bottom active nav, primary text accents, and key interactive elements. Tested for WCAG AA compliance (contrast ratio > 7:1 against ivory and white).
- **Warm Ivory Linen (`#FAF8F5`)**: Base background evoking natural unbleached cotton and soft textiles, replacing sterile digital white.
- **Linen Surface (`#F4F0E8` / `#EAE5DB`)**: Elevated card backgrounds, modal surfaces, and subtle divider strokes.
- **Charcoal (`#222222`)**: Deep charcoal for high-legibility body text, pricing, and high-contrast headlines.
- **Muted Charcoal (`#666666`)**: Secondary metadata, SKU details, and subcategory labels.
- **Earthy Terracotta (`#B05B35`)**: Warm accent for festive callouts, seasonal tags, and discount highlights.

## 2. Typography
- **Headings (Display / Editorial)**: Serif typeface (`next/font/google` Cormorant Garamond / Playfair Display) providing an artisanal, trusted heritage feel for a local Indian family apparel brand.
  - H1: 30–34px, font-bold, leading-tight.
  - H2: 22–24px, font-semibold, leading-snug.
  - H3: 18–20px, font-medium.
- **Body & Controls**: Sans-serif (`next/font/google` Inter) for effortless legibility on mobile screens.
  - Body: 16–17px (never below 15px), line-height 1.5.
  - Product Names: 17–18px, font-semibold.
  - Prices: 18px font-bold with Indian grouping (`₹1,499`).
  - Buttons / Navigation: 16–17px, font-medium.
- **Hindi Localization**: Noto Sans Devanagari (`font-hindi`) for Hindi translations.

## 3. Spacing & Mobile Touch Targets
- Minimum touch target: 48px × 48px (`min-h-[48px]`, `min-w-[48px]`).
- Base spacing unit: 4px / 8px grid.
- Safe Area bottom navigation padding: `pb-24` on mobile pages to prevent the solid bottom bar from obscuring content.

## 4. Radii & Elevation
- **Cards**: `rounded-2xl` (16px) with subtle warm border (`#E5E0D6`) and warm ambient drop-shadow (`box-shadow: 0 4px 16px -2px rgba(30, 63, 53, 0.08)`).
- **Buttons / Chips**: `rounded-full` pills for friendly, modern aesthetic.
- **Drawers / Bottom Sheets**: `rounded-t-3xl` (24px) for mobile gestures.

## 5. UI Elements
- **Buttons**:
  - Primary CTA: Deep Forest Green (`#1E3F35`) solid fill, crisp white text, pill shape, subtle hover elevation.
  - Secondary CTA: Outline with Deep Forest Green border and text, or Warm Amber highlight.
  - WhatsApp CTA: Forest green badge with WhatsApp green / amber accents.
- **Badges / Chips**:
  - Soft pill chips with subtle borders: Pure Cotton (`#1E3F35` / `#FAF8F5`), New Arrival (`#F7C82D`), Earthy Offer (`#B05B35`).
  - Small "Sample image" badge on non-store photography.
- **Navigation**:
  - Sticky mobile header with prominent logo (≥56px mobile, 72px desktop), un-wrapped wordmark `flex, min-width:0`, search trigger, language switch, basket count.
  - Solid bottom navigation bar with 5 destinations: Home, Shop, Star Center Builder button, Family Points, Basket.

## 6. Image Treatment & Tone
- Real, warm family photography in Indian ethnic and pure cotton apparel (kurta sets, shirts, sarees, frocks).
- Warm golden-hour lighting and authentic textures.
- Reusable `<GarmentIllustration/>` fallback component ensures zero empty/broken layout boxes.
