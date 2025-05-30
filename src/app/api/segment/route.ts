import { NextResponse } from 'next/server';
import { signUrl } from '../../../lib/bunnycdn';

// Cache to store recently accessed segments (optional, for performance)
const segmentCache = new Map<string, { data: ArrayBuffer, timestamp: number, headers: Headers }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache TTL
const CACHE_MAX_SIZE = 100; // Maximum number of segments to cache

export async function GET(request: Request) {
  try {
    // Get the original URL from the request
    const { searchParams } = new URL(request.url);
    const originalUrl = searchParams.get('url');
    
    if (!originalUrl) {
      return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }
    
    // Get client IP for optional IP binding
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || null;
    
    // Check if we have this segment cached
    const cacheKey = originalUrl + (clientIp || '');
    const now = Date.now();
    const cachedSegment = segmentCache.get(cacheKey);
    
    if (cachedSegment && (now - cachedSegment.timestamp) < CACHE_TTL) {
      // Return cached segment
      return new NextResponse(cachedSegment.data, {
        headers: Object.fromEntries(cachedSegment.headers.entries())
      });
    }
    
    // Generate a signed URL with short expiration (30 seconds)
    const securityKey = process.env.BUNNY_SECURITY_KEY;
    if (!securityKey) {
      console.error('BUNNY_SECURITY_KEY not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    const signedUrl = signUrl(
      originalUrl,
      securityKey,
      30, // 30 second expiration
      clientIp // Optional IP binding
    );
    
    // Fetch the content from Bunny CDN using the signed URL
    const response = await fetch(signedUrl, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'Next.js Video Proxy',
      }
    });
    
    if (!response.ok) {
      throw new Error(`CDN responded with ${response.status}: ${response.statusText}`);
    }
    
    // Get the response body as an array buffer
    const buffer = await response.arrayBuffer();
    
    // Store in cache if it's not too large
    if (buffer.byteLength < 10 * 1024 * 1024) { // Don't cache segments larger than 10MB
      // Clean cache if it's too large
      if (segmentCache.size >= CACHE_MAX_SIZE) {
        // Remove oldest entries
        const entries = Array.from(segmentCache.entries());
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        for (let i = 0; i < Math.ceil(CACHE_MAX_SIZE / 4); i++) {
          segmentCache.delete(entries[i][0]);
        }
      }
      
      segmentCache.set(cacheKey, {
        data: buffer,
        timestamp: now,
        headers: response.headers
      });
    }
    
    // Return the response to the client with appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Cache-Control', 'private, max-age=60'); // Short client-side cache
    
    // Add CORS headers if needed
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new NextResponse(buffer, {
      status: response.status,
      headers
    });
  } catch (error) {
    console.error('Error proxying video segment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video segment' },
      { status: 500 }
    );
  }
}