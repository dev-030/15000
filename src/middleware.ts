import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // 1. Token refresh logic
  if (!accessToken && refreshToken) {
    const redirectUrl = new URL("/api/token-refresh", request.url);
    return NextResponse.rewrite(redirectUrl);
  }


  // 2. Mentor route protection
   if (pathname.startsWith('/mentor')) {

    if (!accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const decoded = jwtDecode<JwtPayload & { role?: string }>(accessToken);

      if (decoded?.role !== 'mentor') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      console.error('JWT decode error:', err);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  


  
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.well-known).*)"]
};



