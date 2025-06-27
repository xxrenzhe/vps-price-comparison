import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
