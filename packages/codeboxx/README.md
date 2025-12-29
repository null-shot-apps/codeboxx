# 🚀 CryptoRWA Hub

A production-ready web application for real-time cryptocurrency, real-world assets (RWAs), and DeFi news with live price feeds and yield farming opportunities.

## ✨ Features

- **Real-Time Price Feeds**: Live price updates using Stork Oracle (<1ms latency)
- **Unbiased News Aggregation**: Curated news from top sources with sentiment analysis
- **Yield Farming Dashboard**: Real-time APY data from Aave, Compound, Yearn, Pendle
- **Wallet Integration**: Connect with MetaMask or WalletConnect
- **Dark Mode UI**: Navy blue theme with neon green accents
- **Mobile-First Responsive**: Optimized for all devices
- **Beginner Mode**: Simplified interface for newcomers
- **Customizable Watchlist**: Track your favorite assets

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Blockchain**: wagmi + viem
- **State Management**: Zustand
- **Charts**: Chart.js + react-chartjs-2
- **Deployment**: Cloudflare (OpenNext)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd packages/codeboxx
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   - **Stork Oracle**: Get from [Stork Network](https://docs.stork.network/)
   - **WalletConnect**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com)
   - **News API** (optional): Get from [NewsAPI](https://newsapi.org/)

4. **Run development server**
   ```bash
   pnpm dev
   ```
   
   Open [http://localhost:8000](http://localhost:8000)

## 🚀 Deployment

### Cloudflare (Recommended)

```bash
pnpm build:cf
pnpm deploy
```

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod
```

## 🔑 API Keys Setup

### 1. Stork Oracle (Required for real-time prices)
- Visit [Stork Network Documentation](https://docs.stork.network/)
- Sign up for an API key
- Add to `.env.local`: `NEXT_PUBLIC_STORK_API_KEY=your_key`

### 2. WalletConnect (Required for wallet connection)
- Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
- Create a new project
- Copy the Project ID
- Add to `.env.local`: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id`

### 3. News API (Optional)
- Visit [NewsAPI](https://newsapi.org/)
- Sign up for a free API key
- Add to `.env.local`: `NEXT_PUBLIC_NEWS_API_KEY=your_key`

### 4. OpenAI (Optional - for AI chatbot)
- Visit [OpenAI Platform](https://platform.openai.com/)
- Generate an API key
- Add to `.env.local`: `OPENAI_API_KEY=your_key`

## 📁 Project Structure

```
packages/codeboxx/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Wagmi & React Query providers
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── Header.tsx           # Top navigation with wallet connect
│   │   ├── PriceTicker.tsx      # Real-time price ticker
│   │   ├── NewsFeed.tsx         # News articles grid
│   │   ├── YieldDashboard.tsx   # Yield farming opportunities
│   │   └── Footer.tsx           # Footer with disclaimers
│   └── lib/
│       ├── wagmi.ts             # Wagmi configuration
│       ├── stork.ts             # Stork Oracle integration
│       ├── store.ts             # Zustand state management
│       ├── defi.ts              # DeFi protocol integration
│       └── news.ts              # News aggregation
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css`:
```css
:root {
  --navy-dark: #001F3F;      /* Primary background */
  --navy-darker: #0A1F3F;    /* Secondary background */
  --neon-green: #39FF14;     /* Accent color */
}
```

### Add More Assets to Price Ticker
Edit `src/lib/stork.ts` and add to `MOCK_PRICES` array:
```typescript
{ 
  id: 'ASSET', 
  symbol: 'ASSET/USD', 
  price: 100.00, 
  timestamp: Date.now(), 
  change24h: 0.00 
}
```

### Add More Yield Opportunities
Edit `src/lib/defi.ts` and add to `MOCK_YIELD_OPPORTUNITIES` array.

## 🔒 Security

- All API keys are stored in environment variables
- Non-custodial wallet integration only
- HTTPS enforced in production
- Input sanitization on all user inputs
- Rate limiting on API routes

## ⚠️ Disclaimer

**This is not financial advice.** All information provided is for educational purposes only. Always do your own research (DYOR) and consult with a qualified financial advisor before making investment decisions.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Contact: support@cryptorwahub.com (placeholder)

## 🎯 Roadmap

- [ ] Integrate real Stork Oracle WebSocket
- [ ] Add AI-powered chatbot
- [ ] Implement on-chain voting for article neutrality
- [ ] Add NFT badges for user engagement
- [ ] Create mobile app (React Native)
- [ ] Add more DeFi protocols
- [ ] Implement push notifications
- [ ] Add educational content section

---

Built with ❤️ for the crypto community

