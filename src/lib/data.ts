import { Product, ProductCategory, ProductOccasion } from "@/types";
import localProductsRaw from "@/data/products.json";

const localProducts = localProductsRaw as Product[];

interface CachedData {
  products: Product[];
  timestamp: number;
  isFromSheet: boolean;
}

let memoryCache: CachedData | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

/**
 * Parses published CSV rows from Google Sheets
 */
function parseCsv(csvText: string): Product[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV splitting handling commas within quotes if any
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cols.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] || "";
    });

    if (!row.id || !row.name) continue;

    products.push({
      id: row.id,
      name: row.name,
      category: (row.category || "Men") as ProductCategory,
      subcategory: row.subcategory || "Apparel",
      garmentType: (row.garmenttype || "kurta") as any,
      fabric: (row.fabric || "pure cotton") as any,
      occasion: row.occasion
        ? (row.occasion.split(";").map((o) => o.trim()) as ProductOccasion[])
        : ["Everyday"],
      colours: row.colours ? row.colours.split(";").map((c) => c.trim()) : ["Ivory"],
      sizes: row.sizes ? row.sizes.split(";").map((s) => s.trim()) : ["M", "L"],
      ageGroup: row.agegroup || undefined,
      price: parseInt(row.price, 10) || 999,
      originalPrice: row.originalprice ? parseInt(row.originalprice, 10) : undefined,
      stock: parseInt(row.stock, 10) || 10,
      isSurplusBranded: row.issurplusbranded === "true" || row.issurplusbranded === "1",
      image: row.image || "/stock/fabric-cotton.jpg",
      careNotes: row.carenotes || "Gentle cold wash.",
      description: row.description || "",
      isSample: false,
    });
  }

  return products;
}

/**
 * Data layer function to fetch products from Google Sheet CSV or bundled JSON fallback
 */
export async function getProducts(): Promise<{
  products: Product[];
  isSampleData: boolean;
  source: "sheet" | "bundled-sample";
}> {
  const sheetUrl = process.env.GOOGLE_SHEET_CATALOGUE_CSV_URL;

  // Use memory cache if still valid
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return {
      products: memoryCache.products,
      isSampleData: !memoryCache.isFromSheet,
      source: memoryCache.isFromSheet ? "sheet" : "bundled-sample",
    };
  }

  // Attempt Google Sheet published CSV if configured
  if (sheetUrl && sheetUrl.startsWith("http")) {
    try {
      const response = await fetch(sheetUrl, {
        next: { revalidate: 300 }, // 5 min Next.js revalidation
      });
      if (response.ok) {
        const text = await response.text();
        const sheetProducts = parseCsv(text);
        if (sheetProducts.length > 0) {
          memoryCache = {
            products: sheetProducts,
            timestamp: now,
            isFromSheet: true,
          };
          return { products: sheetProducts, isSampleData: false, source: "sheet" };
        }
      }
    } catch (err) {
      console.warn("[Data Layer] Google Sheet fetch failed, falling back to bundled sample JSON:", err);
    }
  }

  // Bundled sample JSON fallback
  memoryCache = {
    products: localProducts,
    timestamp: now,
    isFromSheet: false,
  };

  return {
    products: localProducts,
    isSampleData: true,
    source: "bundled-sample",
  };
}

export async function getProductById(id: string): Promise<{
  product: Product | null;
  isSampleData: boolean;
}> {
  const { products, isSampleData } = await getProducts();
  const product = products.find((p) => p.id === id) || null;
  return { product, isSampleData };
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const { products } = await getProducts();
  return products.slice(0, limit);
}
