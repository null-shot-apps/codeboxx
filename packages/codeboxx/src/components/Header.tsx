'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export function Header() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { theme, setTheme, beginnerMode, setBeginnerMode } = useStore();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleConnect = () => {
    const injectedConnector = connectors.find(c => c.id === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-navy-darker border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-navy-dark font-bold text-lg">₿</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              CryptoRWA Hub
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <input
              type="search"
              placeholder="Search assets, news..."
              className="w-full px-4 py-2 bg-navy-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Beginner Mode Toggle */}
            <button
              onClick={() => setBeginnerMode(!beginnerMode)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden lg:block ${
                beginnerMode
                  ? 'bg-neon-green text-navy-dark'
                  : 'bg-navy-dark text-gray-400 hover:text-white'
              }`}
              title="Toggle beginner-friendly mode"
            >
              {beginnerMode ? '🎓 Beginner' : '⚡ Pro'}
            </button>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 bg-navy-dark rounded-lg hover:bg-gray-800 transition-colors"
                title="Change theme"
              >
                {theme === 'dark' && '🌙'}
                {theme === 'light' && '☀️'}
                {theme === 'doge' && '🐕'}
              </button>
              
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-navy-dark border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors"
                  >
                    🌙 Dark
                  </button>
                  <button
                    onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors"
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => { setTheme('doge'); setShowThemeMenu(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors"
                  >
                    🐕 Doge
                  </button>
                </div>
              )}
            </div>

            {/* Wallet Connect */}
            {isConnected ? (
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-neon-green text-navy-dark rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-neon-green text-navy-dark rounded-lg font-semibold hover:bg-neon-green/90 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

