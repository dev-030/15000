// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {

//   const accessToken = request.cookies.get("access_token");
//   const refreshToken = request.cookies.get("refresh_token");


//   if (!accessToken && refreshToken) {
//     const redirectUrl = new URL("/api/token-refresh", request.url);
//     return NextResponse.rewrite(redirectUrl);
//   }
  
//   return NextResponse.next();
// }


// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.well-known).*)"]
// };




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  // Only protect /my-courses/<courseId> paths, allow /my-courses base path
  // Check if pathname starts with /my-courses and is longer than "/my-courses"
  if (pathname.startsWith('/my-courses')) {
    // If exactly "/my-courses" or "/my-courses/" allow access without auth
    if (pathname === '/my-courses' || pathname === '/my-courses/') {
      return NextResponse.next();
    }

    // For deeper paths like /my-courses/0c1cf544-acda-4d12-9
    if (!accessToken) {
      if (refreshToken) {
        // Try to refresh token
        const refreshUrl = new URL('/api/token-refresh', request.url);
        return NextResponse.rewrite(refreshUrl);
      } else {
        // Redirect unauthenticated users to /my-courses (or login page)
        const redirectUrl = new URL('/my-courses', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  // For all other paths, continue normally
  return NextResponse.next();
}

// Apply middleware only to /my-courses and its subpaths
export const config = {
  matcher: ['/my-courses/:path*'],
};
