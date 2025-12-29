'use client';

import { useEffect, useState } from 'react';
import { fetchYieldOpportunities, YieldOpportunity, formatTVL, getRiskColor } from '@/lib/defi';
import { useAccount } from 'wagmi';

export function YieldDashboard() {
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'risk'>('apy');
  const { isConnected } = useAccount();

  useEffect(() => {
    const loadOpportunities = async () => {
      setLoading(true);
      const data = await fetchYieldOpportunities();
      setOpportunities(data);
      setLoading(false);
    };
    loadOpportunities();

    // Refresh every 30 seconds
    const interval = setInterval(loadOpportunities, 30000);
    return () => clearInterval(interval);
  }, []);

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    if (sortBy === 'apy') return b.apy - a.apy;
    if (sortBy === 'tvl') return b.tvl - a.tvl;
    const riskOrder = { low: 1, medium: 2, high: 3 };
    return riskOrder[a.risk] - riskOrder[b.risk];
  });

  return (
    <div className="bg-navy-dark rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">🌾 Yield Farming</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('apy')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sortBy === 'apy'
                  ? 'bg-neon-green text-navy-dark'
                  : 'bg-navy-darker text-gray-400 hover:text-white'
              }`}
            >
              APY
            </button>
            <button
              onClick={() => setSortBy('tvl')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sortBy === 'tvl'
                  ? 'bg-neon-green text-navy-dark'
                  : 'bg-navy-darker text-gray-400 hover:text-white'
              }`}
            >
              TVL
            </button>
            <button
              onClick={() => setSortBy('risk')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sortBy === 'risk'
                  ? 'bg-neon-green text-navy-dark'
                  : 'bg-navy-darker text-gray-400 hover:text-white'
              }`}
            >
              Risk
            </button>
          </div>
        </div>
        {!isConnected && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-400">
            ⚠️ Connect your wallet to invest in yield opportunities
          </div>
        )}
      </div>

      {/* Opportunities List */}
      <div className="divide-y divide-gray-800">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          sortedOpportunities.map(opp => (
            <div
              key={opp.id}
              className="p-6 hover:bg-navy-darker/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                      {opp.protocol}
                    </h3>
                    <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-gray-400">
                      {opp.asset}
                    </span>
                    <span className={`text-xs font-semibold ${getRiskColor(opp.risk)}`}>
                      {opp.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{opp.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>TVL: {formatTVL(opp.tvl)}</span>
                    <span>•</span>
                    <span>Chain: {opp.chain}</span>
                  </div>
                </div>

                {/* APY & Action */}
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-neon-green font-mono">
                      {opp.apy.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500">APY</div>
                  </div>
                  <button
                    disabled={!isConnected}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      isConnected
                        ? 'bg-neon-green text-navy-dark hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/20'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Invest
                  </button>
                </div>
              </div>

              {/* Risk Warning */}
              {opp.risk !== 'low' && (
                <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-xs text-yellow-400">
                  ⚠️ This is not financial advice. Always DYOR and understand the risks before investing.
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

