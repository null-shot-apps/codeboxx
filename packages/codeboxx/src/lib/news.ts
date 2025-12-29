// News Aggregation and Sentiment Analysis

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'crypto' | 'rwa' | 'finance' | 'defi' | 'yield';
  sentiment: 'bullish' | 'bearish' | 'neutral';
  neutralityScore: number; // 0-100, higher is more neutral
  imageUrl?: string;
}

// Mock news data - Replace with actual NewsAPI, CryptoPanic, or RSS feeds
export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Bitcoin ETF Sees Record Inflows as Institutional Interest Surges',
    summary: 'Major Bitcoin ETFs recorded over $500M in net inflows this week, signaling growing institutional adoption.',
    source: 'CoinDesk',
    url: '#',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'crypto',
    sentiment: 'bullish',
    neutralityScore: 75,
  },
  {
    id: '2',
    title: 'Tokenized Real Estate Market Reaches $2B Milestone',
    summary: 'Real-world asset tokenization continues to grow, with real estate tokens now representing over $2 billion in value.',
    source: 'The Block',
    url: '#',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'rwa',
    sentiment: 'bullish',
    neutralityScore: 82,
  },
  {
    id: '3',
    title: 'Federal Reserve Maintains Interest Rates, Markets React',
    summary: 'The Fed held rates steady at 5.25-5.50%, citing progress on inflation but concerns about economic growth.',
    source: 'Reuters',
    url: '#',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'finance',
    sentiment: 'neutral',
    neutralityScore: 90,
  },
  {
    id: '4',
    title: 'Aave V3 Launches on New Layer 2, Offers 8% APY on Stablecoins',
    summary: 'Aave expands to another L2 network, providing competitive yields for stablecoin suppliers.',
    source: 'DeFi Pulse',
    url: '#',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: 'defi',
    sentiment: 'bullish',
    neutralityScore: 78,
  },
  {
    id: '5',
    title: 'Ethereum Staking Yields Drop Below 4% as More Validators Join',
    summary: 'Increased validator participation leads to lower staking rewards, but network security improves.',
    source: 'Decrypt',
    url: '#',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: 'yield',
    sentiment: 'bearish',
    neutralityScore: 85,
  },
  {
    id: '6',
    title: 'Gold-Backed Tokens Gain Traction as Inflation Hedge',
    summary: 'Tokenized gold (XAU) sees increased demand as investors seek inflation protection in digital form.',
    source: 'Bloomberg',
    url: '#',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'rwa',
    sentiment: 'bullish',
    neutralityScore: 88,
  },
];

export async function fetchNews(category: string = 'all'): Promise<NewsArticle[]> {
  // TODO: Integrate with NewsAPI, CryptoPanic, or custom RSS aggregator
  // const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  // const response = await fetch(`https://newsapi.org/v2/everything?q=crypto&apiKey=${apiKey}`);
  
  // For now, return filtered mock data
  if (category === 'all') {
    return MOCK_NEWS;
  }
  return MOCK_NEWS.filter(article => article.category === category);
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'bullish':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'bearish':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'neutral':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

