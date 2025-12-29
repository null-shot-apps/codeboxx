'use client';

import { useEffect, useState } from 'react';
import { fetchNews, NewsArticle, getSentimentColor, formatTimeAgo } from '@/lib/news';
import { useStore } from '@/lib/store';

export function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { newsCategory, setNewsCategory } = useStore();

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const news = await fetchNews(newsCategory);
      setArticles(news);
      setLoading(false);
    };
    loadNews();
  }, [newsCategory]);

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'rwa', label: 'RWAs' },
    { id: 'finance', label: 'Finance' },
    { id: 'defi', label: 'DeFi' },
    { id: 'yield', label: 'Yield' },
  ];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setNewsCategory(cat.id as any)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              newsCategory === cat.id
                ? 'bg-neon-green text-navy-dark'
                : 'bg-navy-dark text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-navy-dark rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <article
              key={article.id}
              className="bg-navy-dark rounded-xl p-6 border border-gray-800 hover:border-neon-green/50 transition-all hover:shadow-lg hover:shadow-neon-green/10 cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs text-gray-500 font-medium">
                  {article.source}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold border ${getSentimentColor(
                    article.sentiment
                  )}`}
                >
                  {article.sentiment}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neon-green transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {formatTimeAgo(article.publishedAt)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Neutrality:</span>
                  <span className="text-neon-green font-semibold">
                    {article.neutralityScore}%
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

