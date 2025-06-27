import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vps-price-comparison.com'),
  title: {
    default: 'VPS Price Comparison - Live Prices & Deals',
    template: '%s | VPS Price Comparison',
  },
  description: "Find and compare the best VPS hosting plans from top providers. We offer real-time pricing, performance benchmarks, and expert reviews.",
  openGraph: {
    title: 'VPS Price Comparison - Live Prices & Deals',
    description: "Find and compare the best VPS hosting plans from top providers. We offer real-time pricing, performance benchmarks, and expert reviews.",
    url: 'https://vps-price-comparison.com',
    siteName: 'VPS Price Comparison',
    images: [
      {
        url: '/og-image.png', // Update with your actual OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VPS Price Comparison - Live Prices & Deals',
    description: "Find and compare the best VPS hosting plans from top providers. We offer real-time pricing, performance benchmarks, and expert reviews.",
    // creator: '@your_twitter_handle', // Add your Twitter handle
    images: ['/twitter-image.png'], // Update with your actual Twitter image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
