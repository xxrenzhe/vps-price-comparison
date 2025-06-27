import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { providerDetails } from '@/services/providerData';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/') {
    const providerName = searchParams.get('provider');

    if (providerName) {
      const provider = providerDetails.find(
        p => p.name.toLowerCase() === providerName.toLowerCase()
      );

      if (provider) {
        const newUrl = new URL(`/providers/${provider.id}`, request.url);
        return NextResponse.redirect(newUrl, 308); // Permanent redirect
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
}; 