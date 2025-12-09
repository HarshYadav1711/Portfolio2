import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ valid: false, error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Validate URL format
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return NextResponse.json({ valid: false });
    }

    // Check if URL is accessible
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
        },
      });

      clearTimeout(timeoutId);

      // Consider 2xx and 3xx status codes as valid
      const isValid = response.status >= 200 && response.status < 400;
      return NextResponse.json({ valid: isValid, status: response.status });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // If it's a timeout or network error, consider it invalid
      if (fetchError.name === 'AbortError') {
        return NextResponse.json({ valid: false, error: 'Timeout' });
      }
      
      // For other errors (like 404), return invalid
      return NextResponse.json({ valid: false, error: fetchError.message });
    }
  } catch (error: any) {
    // Invalid URL format
    return NextResponse.json({ valid: false, error: 'Invalid URL format' });
  }
}

