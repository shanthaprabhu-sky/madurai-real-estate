import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const start = Date.now();
  const url = request.nextUrl.pathname;
  const method = request.method;

  // Let the request continue normally
  const response = NextResponse.next();

  const duration = Date.now() - start;
  
  // Log every single route access to your terminal
  console.log(`🌐 [HTTP] ${method} ${url} — Status: ${response.status} (${duration}ms)`);

  return response;
}

// Configure which paths the middleware runs on (excludes static files & internal Next.js assets)
export const config = {
  matcher: ['/admin/:path*'],
};