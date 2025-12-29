import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoRWA Hub - Real-Time Crypto, RWA & DeFi News",
  description: "Unbiased news and real-time data on cryptocurrency, real-world assets, DeFi, and yield farming opportunities.",
  keywords: ["crypto", "RWA", "DeFi", "yield farming", "cryptocurrency news", "tokenized assets"],
  openGraph: {
    title: "CryptoRWA Hub",
    description: "Your one-stop hub for crypto, RWA, and DeFi news with real-time price feeds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-navy-dark text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

