'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface VideoDetails {
  id: string;
  title: string;
  thumbnail: Array<{ url: string; width: number; height: number }>;
  channel: string;
  channelId: string;
  description: string;
  isLive: boolean;
}

export default function VideoPage() {
  const params = useParams();
  const videoId = params?.id as string;
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`/api/video?id=${videoId}`);
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500">Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">SpotiTube</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{video.title}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <Link 
            href={`https://www.youtube.com/channel/${video.channelId}`}
            target="_blank"
            className="text-zinc-600 dark:text-zinc-400 hover:text-red-600"
          >
            {video.channel}
          </Link>
          {video.isLive && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium">LIVE</span>
          )}
        </div>

        {video.description && (
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4">
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{video.description}</p>
          </div>
        )}
      </main>
    </div>
  );
}