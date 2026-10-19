import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cotton Junction | Family Clothing Store • Indore",
  description:
    "Family clothing store in Indore featuring quality apparel and diverse collections at reasonable prices. Branded surplus stock, pure cotton and premium fabrics.",
  keywords: [
    "Cotton Junction",
    "Clothing Store Indore",
    "Sudama Nagar Indore",
    "Pure Cotton Kurta",
    "Family Clothing Store",
    "Branded Surplus Stock Indore",
  ],
  authors: [{ name: "Cotton Junction" }],
  openGraph: {
    title: "Cotton Junction | Family Clothing Store • Indore",
    description:
      "Family clothing store in Indore featuring quality apparel and diverse collections at reasonable prices.",
    siteName: "Cotton Junction",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/brand/logo.svg",
    apple: "/brand/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-screen bg-linen-50 text-charcoal-900 antialiased selection:bg-amber-400 selection:text-charcoal-950">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
