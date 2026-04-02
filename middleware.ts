import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if ((pathname.startsWith('/exam') || pathname.startsWith('/result')) && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/exam', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/exam/:path*', '/result/:path*'],
};