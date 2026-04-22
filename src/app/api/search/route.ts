import { NextRequest, NextResponse } from 'next/server';
import youtubesearchapi from 'youtube-search-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '12';

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const result = await youtubesearchapi.GetListByKeyword(
      query,
      false,
      parseInt(limit),
      [{ type: 'video' }]
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}