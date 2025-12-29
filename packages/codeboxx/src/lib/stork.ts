// Stork Oracle Integration for Real-Time Price Feeds
// Documentation: https://docs.stork.network/

export interface StorkPrice {
  id: string;
  symbol: string;
  price: number;
  timestamp: number;
  change24h: number;
  sparkline?: number[];
}

// Mock data for development - Replace with actual Stork Oracle WebSocket connection
export const MOCK_PRICES: StorkPrice[] = [
  { id: 'BTC', symbol: 'BTC/USD', price: 43250.50, timestamp: Date.now(), change24h: 2.45, sparkline: [42000, 42500, 43000, 42800, 43250] },
  { id: 'ETH', symbol: 'ETH/USD', price: 2280.75, timestamp: Date.now(), change24h: -1.23, sparkline: [2300, 2290, 2270, 2285, 2280] },
  { id: 'SOL', symbol: 'SOL/USD', price: 98.32, timestamp: Date.now(), change24h: 5.67, sparkline: [93, 95, 97, 96, 98] },
  { id: 'USDT', symbol: 'USDT/USD', price: 1.00, timestamp: Date.now(), change24h: 0.01, sparkline: [1, 1, 1, 1, 1] },
  { id: 'XAU', symbol: 'XAU/USD', price: 2045.30, timestamp: Date.now(), change24h: 0.85, sparkline: [2030, 2035, 2040, 2042, 2045] },
  { id: 'AAPL', symbol: 'AAPL (Tokenized)', price: 185.50, timestamp: Date.now(), change24h: 1.20, sparkline: [183, 184, 185, 184.5, 185.5] },
];

export class StorkClient {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<(price: StorkPrice) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private apiKey?: string) {}

  // Connect to Stork Oracle WebSocket
  connect() {
    if (typeof window === 'undefined') return;

    // TODO: Replace with actual Stork WebSocket endpoint
    // const wsUrl = `wss://api.stork.network/v1/prices?apiKey=${this.apiKey}`;
    
    // For now, simulate real-time updates with mock data
    this.simulatePriceUpdates();
  }

  // Subscribe to price updates for specific assets
  subscribe(assetId: string, callback: (price: StorkPrice) => void) {
    if (!this.subscribers.has(assetId)) {
      this.subscribers.set(assetId, new Set());
    }
    this.subscribers.get(assetId)?.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.get(assetId)?.delete(callback);
    };
  }

  // Simulate real-time price updates (for development)
  private simulatePriceUpdates() {
    setInterval(() => {
      MOCK_PRICES.forEach(price => {
        const volatility = 0.002; // 0.2% price movement
        const change = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = price.price * (1 + change);
        
        const updatedPrice: StorkPrice = {
          ...price,
          price: newPrice,
          timestamp: Date.now(),
          change24h: price.change24h + (change * 100),
        };

        // Notify subscribers
        this.subscribers.get(price.id)?.forEach(callback => {
          callback(updatedPrice);
        });
      });
    }, 2000); // Update every 2 seconds
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Singleton instance
let storkClient: StorkClient | null = null;

export function getStorkClient(): StorkClient {
  if (!storkClient) {
    const apiKey = process.env.NEXT_PUBLIC_STORK_API_KEY;
    storkClient = new StorkClient(apiKey);
    storkClient.connect();
  }
  return storkClient;
}

