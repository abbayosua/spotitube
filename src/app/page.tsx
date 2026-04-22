'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: { thumbnails: Array<{ url: string; width: number; height: number }> };
  channelTitle: string;
  length?: { simpleText: string };
  isLive?: boolean;
}

interface SearchResult {
  items: VideoItem[];
  nextPage?: { nextPageToken: string };
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=20`);
      const data: SearchResult = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">SpotiTube</span>
          </Link>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!hasSearched ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              Search for your favorite videos
            </h2>
            <p className="text-zinc-500 mt-2">Enter a keyword above to get started</p>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-zinc-500 mt-4">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500">No results found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="group block bg-white dark:bg-zinc-900 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video bg-zinc-200 dark:bg-zinc-800">
                  {video.thumbnail?.thumbnails?.[0]?.url ? (
                    <img
                      src={video.thumbnail.thumbnails[0].url}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </div>
                  )}
                  {video.length?.simpleText && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.length.simpleText}
                    </span>
                  )}
                  {video.isLive && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium">
                      LIVE
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">{video.channelTitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}