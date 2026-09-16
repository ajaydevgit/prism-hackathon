import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PRISM — Through the Dimensions | Hackathon '26",
  description: "PRISM Hackathon '26 — Tech for Tomorrow. Jointly organized by μLEARN AEC, IEDC AEC & IEEE AEC. ₹6,000 prize pool. Register your team now!",
  keywords: ["PRISM hackathon", "AEC", "μLEARN", "IEDC", "IEEE", "hackathon 2026", "Tech for Tomorrow"],
  openGraph: {
    title: "PRISM: Through the Dimensions — Hackathon '26",
    description: "₹6,000 prize pool · 25th–26th · AEC Campus · Theme: Tech for Tomorrow. Register your team now!",
    url: "https://prism-hackathon.vercel.app",
    siteName: "PRISM Hackathon '26",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PRISM Hackathon '26 — Through the Dimensions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM: Through the Dimensions — Hackathon '26",
    description: "₹6,000 prize pool · 25th–26th · AEC Campus · Theme: Tech for Tomorrow",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white selection:bg-violet-500/30`}>
        {children}
      </body>
    </html>
  );
}
