import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");


  if (!accessToken && refreshToken) {
    const redirectUrl = new URL("/api/token-refresh", request.url);
    return NextResponse.rewrite(redirectUrl);
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.well-known).*)"]
};
