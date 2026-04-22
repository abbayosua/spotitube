import { NextRequest, NextResponse } from 'next/server';
import youtubesearchapi from 'youtube-search-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('id');

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
  }

  try {
    const result = await youtubesearchapi.GetVideoDetails(videoId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch video details' }, { status: 500 });
  }
}