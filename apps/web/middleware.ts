import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt-br'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  // 1. Generate Request ID
  const requestId = crypto.randomUUID();

  // 2. Add to request headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('X-Request-ID', requestId);

  // Create a modified request
  // Note: We use the original req but with new headers for downstream
  // However, next-intl middleware takes a NextRequest.
  // We can pass the modified request.
  const modifiedReq = new NextRequest(req.url, {
    headers: requestHeaders,
  });

  // 3. Chain next-intl middleware
  const response = await intlMiddleware(modifiedReq);

  // 4. Add Request ID to response headers
  if (response) {
    response.headers.set('X-Request-ID', requestId);
    return response;
  }

  // Fallback (unlikely given the matcher)
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-br|en)/:path*']
};
