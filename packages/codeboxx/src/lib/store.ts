import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchlistItem {
  id: string;
  symbol: string;
}

interface AppState {
  // Theme
  theme: 'dark' | 'light' | 'doge';
  setTheme: (theme: 'dark' | 'light' | 'doge') => void;

  // Watchlist
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;

  // News filters
  newsCategory: 'all' | 'crypto' | 'rwa' | 'finance' | 'defi' | 'yield';
  setNewsCategory: (category: 'all' | 'crypto' | 'rwa' | 'finance' | 'defi' | 'yield') => void;

  // User preferences
  beginnerMode: boolean;
  setBeginnerMode: (enabled: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Watchlist
      watchlist: [],
      addToWatchlist: (item) =>
        set((state) => ({
          watchlist: [...state.watchlist, item],
        })),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        })),

      // News filters
      newsCategory: 'all',
      setNewsCategory: (category) => set({ newsCategory: category }),

      // User preferences
      beginnerMode: false,
      setBeginnerMode: (enabled) => set({ beginnerMode: enabled }),
    }),
    {
      name: 'cryptorwa-storage',
    }
  )
);

