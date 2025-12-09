import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// ============================================
// PERSONALIZE: Update site metadata for SEO
// ============================================
export const metadata: Metadata = {
  title: "Full-Stack Developer & Visual Engineer", // TODO: Replace with your title
  description: "Crafting immersive digital experiences with precision and intention.", // TODO: Replace with your description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="noise-overlay" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

