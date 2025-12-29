'use client';

import { Header } from '@/components/Header';
import { PriceTicker } from '@/components/PriceTicker';
import { NewsFeed } from '@/components/NewsFeed';
import { YieldDashboard } from '@/components/YieldDashboard';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-dark">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-Time Crypto & RWA Intelligence
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unbiased news, live price feeds, and yield opportunities for cryptocurrency, 
            real-world assets, and DeFi protocols.
          </p>
        </section>

        {/* Yield Dashboard */}
        <section className="mb-12">
          <YieldDashboard />
        </section>

        {/* News Feed */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">📰 Latest News</h2>
          <NewsFeed />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

