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
  title: "Harsh Yadav | Full Stack Developer & Software Engineer",
  description:
    "Portfolio of Harsh Yadav — Full Stack Developer and Software Engineer building with React, Next.js, Node.js, and AI applications. Projects, experience, and resume.",
  keywords: [
    "Harsh Yadav",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "AI Applications",
  ],
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

