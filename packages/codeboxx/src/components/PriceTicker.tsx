'use client';

import { useEffect, useState } from 'react';
import { getStorkClient, StorkPrice, MOCK_PRICES } from '@/lib/stork';
import { useStore } from '@/lib/store';

export function PriceTicker() {
  const [prices, setPrices] = useState<StorkPrice[]>(MOCK_PRICES);
  const { watchlist } = useStore();

  useEffect(() => {
    const stork = getStorkClient();
    const unsubscribers: (() => void)[] = [];

    // Subscribe to all price updates
    MOCK_PRICES.forEach(price => {
      const unsubscribe = stork.subscribe(price.id, (updatedPrice) => {
        setPrices(prev => 
          prev.map(p => p.id === updatedPrice.id ? updatedPrice : p)
        );
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, []);

  // Show watchlist items first if any, otherwise show all
  const displayPrices = watchlist.length > 0
    ? prices.filter(p => watchlist.some(w => w.id === p.id))
    : prices;

  return (
    <div className="bg-navy-darker border-b border-gray-800 overflow-hidden">
      <div className="flex animate-scroll-x hover:pause-animation">
        {displayPrices.concat(displayPrices).map((price, idx) => (
          <div
            key={`${price.id}-${idx}`}
            className="flex items-center gap-3 px-6 py-3 whitespace-nowrap border-r border-gray-800"
          >
            <span className="font-mono text-sm font-semibold text-gray-300">
              {price.symbol}
            </span>
            <span className="font-mono text-base font-bold text-white">
              ${price.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`font-mono text-sm font-semibold ${
                price.change24h >= 0 ? 'text-neon-green' : 'text-red-400'
              }`}
            >
              {price.change24h >= 0 ? '+' : ''}
              {price.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

