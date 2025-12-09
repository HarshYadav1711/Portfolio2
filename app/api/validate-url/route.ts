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
      // First try HEAD request (faster)
      let response: Response;
      try {
        response = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal,
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
          },
        });
      } catch (headError) {
        // If HEAD fails, try GET to check the actual content
        response = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
          },
        });
      }

      clearTimeout(timeoutId);

      // If it's a 404, definitely invalid
      if (response.status === 404) {
        return NextResponse.json({ valid: false, status: 404, error: 'Not Found' });
      }

      // Consider only 2xx status codes as valid (exclude 3xx redirects and 4xx/5xx errors)
      // This ensures we catch 404 errors from Vercel and other platforms
      const isValid = response.status >= 200 && response.status < 300;
      
      // For Vercel deployments, also check the response body for error messages
      if (isValid && (url.includes('vercel.app') || url.includes('vercel.com'))) {
        try {
          const text = await response.text();
          // Check for Vercel error indicators in the response
          if (text.includes('404') || 
              text.includes('NOT_FOUND') || 
              text.includes('DEPLOYMENT_NOT_FOUND') ||
              text.includes('This deployment cannot be found')) {
            return NextResponse.json({ valid: false, status: 200, error: 'Vercel deployment not found' });
          }
        } catch (textError) {
          // If we can't read the text, assume it's valid if status is 200
        }
      }
      
      return NextResponse.json({ valid: isValid, status: response.status });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // If it's a timeout or network error, consider it invalid
      if (fetchError.name === 'AbortError') {
        return NextResponse.json({ valid: false, error: 'Timeout' });
      }
      
      // For other errors (like 404, network errors), return invalid
      return NextResponse.json({ valid: false, error: fetchError.message });
    }
  } catch (error: any) {
    // Invalid URL format
    return NextResponse.json({ valid: false, error: 'Invalid URL format' });
  }
}

